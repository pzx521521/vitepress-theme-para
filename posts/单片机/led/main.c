#include <stdio.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <string.h>

#define PLPM_BASE 0xc8100014

// 定义LED对应的位掩码
#define RED_LED_BIT    0x00040000
#define GREEN_LED_BIT  0x00080000
#define BLUE_LED_BIT   0x00100000

#define __IO volatile

void *var_addr_satr = 0;
unsigned int var_addr_size = 0;
unsigned int *gpioaddr;
void *gpio_base = 0;

int gpio_init(void) {
    int fd = open("/dev/mem", O_RDWR);
    if (fd < 0) return -1;

    unsigned int PageSize = sysconf(_SC_PAGESIZE);
    unsigned int PageMask = ~(PageSize - 1);
    unsigned int addr_start = PLPM_BASE & PageMask;
    unsigned int addr_offset = PLPM_BASE & ~PageMask;

    var_addr_size = PageSize * 2;
    var_addr_satr = mmap(0, var_addr_size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, addr_start);
    close(fd);

    if (var_addr_satr == MAP_FAILED) return -1;

    gpio_base = var_addr_satr + addr_offset;
    return 0;
}

int gpio_deinit(void) {
    return munmap(var_addr_satr, var_addr_size) == 0 ? 0 : -1;
}

// 通用LED控制函数
void led_control(unsigned int bit, int state) {
    if (state) {
        *(gpioaddr + 4) |= bit; // Turn on
    } else {
        *(gpioaddr + 4) &= ~bit; // Turn off
    }
}

void toggle_led(unsigned int bit, int shift) {

    unsigned char c = (*(gpioaddr + 4) & bit) >> shift;
    led_control(bit, !c);
}

int main(int argc, char *argv[]) {
    if (gpio_init() != 0) {
        printf("gpio_init failed\n");
        return -1;
    }
    if (argc < 2) {
        printf("led [red|green|blue] [0|1] or led [r|g|b]\n");
        return 1;
    }
    gpioaddr = (unsigned int *) gpio_base;

    // GPIO initialization logic
    unsigned int temp = *gpioaddr & (~0x01800066);
    *gpioaddr = temp;
    temp = *(gpioaddr + 4) & (~0x0000001c);
    *(gpioaddr + 4) = temp;
    *(gpioaddr + 4) |= 0x00000020;
    if (argc == 2) {
        if (strcmp(argv[1], "red") == 0) toggle_led(RED_LED_BIT, 18);
        else if (strcmp(argv[1], "green") == 0) toggle_led(GREEN_LED_BIT, 19);
        else if (strcmp(argv[1], "blue") == 0) toggle_led(BLUE_LED_BIT, 20);
        else{
            led_control(RED_LED_BIT, strchr(argv[1], 'r') != NULL);
            led_control(GREEN_LED_BIT, strchr(argv[1], 'g') != NULL);
            led_control(BLUE_LED_BIT, strchr(argv[1], 'b') != NULL);
        }
    } else if (argc == 3) {
        if (strcmp(argv[1], "red") == 0) led_control(RED_LED_BIT, strcmp(argv[2], "0") != 0);
        else if (strcmp(argv[1], "green") == 0) led_control(GREEN_LED_BIT, strcmp(argv[2], "0") != 0);
        else if (strcmp(argv[1], "blue") == 0) led_control(BLUE_LED_BIT, strcmp(argv[2], "0") != 0);
    }

    gpio_deinit();
    return 0;
}
