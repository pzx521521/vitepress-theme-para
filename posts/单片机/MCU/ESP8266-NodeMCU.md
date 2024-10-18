---
title: "ESP8266-NodeMCU"
hidemeta: true
---

# 简介

我是小白,对智能家居很感兴趣,之前wifi/物联网太贵了,学习成本太高了.发现ESP8266太便宜了,还带wifi.想用ESP8266做一个简单的智能插座.基本就是整个学习过程

## 学习建议

纯新人入门的话, ESP8266 的资料较少, 推荐先学一下 Arduino, 了解一下最基本的东西, 如上下拉电阻, io操作等等

 因为有wokwi这个在线模拟, 所以还是很好学的

[Arduino官网](https://www.arduino.cc/)

[Arduino 指引](https://www.arduino.cc/en/Guide)

[wokwi-Arduino在线模拟](https://wokwi.com/)

wokwi 如果运行不起来, 需要学会怎么上github, 可以翻墙, 可以cdn加速, 因为wsa在github上

## ESP-01/S和ESP8266 的关系

ESP8266 是一个SCM(Single chip micro computer) 就是一个芯片

根据ESP8266 芯片做出了电路板:ESP-01/S, 

举个不太恰当的例子:

ESP8266 相当于发动机, ESP-01/S 相当于普通汽车, ESP-12F/E 相当于豪华汽车

要确定你买到的是什么东西

[相关的关联详见](#_173)

## ESPXX类型介绍

[官网](www.esp8266.com)

 [各种型号对比, 电路图, 引脚介绍](https://www.esp8266.com/wiki/doku.php?id=esp8266-module-family)

+ ESP-01 ESP-01S

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h5j0r6n3o1j30aw0630ue.jpg)

+ ESP-12F/E

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h5j0uwzx6oj30bw0bl41k.jpg)

+ 带 CP2102 测试版

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h5j0svl54jj30bq0bjn12.jpg)



+ 带 CP340 测试版

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h5j0xv96ibj30bk0bdgpc.jpg)

+ CH340 烧录器

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h5j0yts0qnj30bn0bmjuv.jpg)

## 类型分类

分为2类:  

+ 带测试板
+ 不带测试板

带测试板 相当于烧录器 + 不带测试板. 

带测试版的话就省一个烧录器, 但是烧录器没办法复用

从价格上来说, 差别不大  

+ 不带测试板(8RMB) + 烧录器(6RMB) = 14 RMB
+ 带测试板 13 RMB

## 个人选择

因为本来就是玩玩, 没有想着做多个->所以买的带开发板的

# [烧录](https://www.esp8266.com/wiki/doku.php?id=start-with-esp-12-arduino)

## 烧录器

如果没有带开发板, 那么需要烧录器对MCU的ROM进行烧录, 如果带开发板, 无需烧录器直接就可以烧录. 因为开发板是带了烧录器的

```To program the module, you will need a USB-to-serial adapter```

### 要有一个 USB-TTL 烧录器

```There are many USB to serial adapters - most adapters are identified by the name of the adapter chip```

有很多种烧录器, 都是可以使用的:

+ CP2102P(4RMB)
+ CH340(6RMB) 
+ L2303HX(2.5RMB)

### 烧录器选择

`The most common USB to Serial chips are the CH340G or various chips from FTDI`

官方推荐CH340G

## 烧录方法

#### [官方文档](https://www.esp8266.com/wiki/doku.php?id=start-with-esp-12-arduino)

- When programming, the GPIO0 pin has to be held low during reset to enable programming mode
  - Some breakout boards include pushbuttons or jumpers
    - For programing mode: While holding the FLASH button down, momentarily press “RESET”, then release the FLASH button
    - For normal mode: press RESET without also pressing FLASH
  - Some USB to Serial adapters allow using two of the serial handshake signals to allow the programming software to reset the module and pulldown GPIO0 during reset so you don't need to use jumpers or push any buttons during programming.
  - You can also manually wire your own jumpers and/or switches for reset and GPIO0
- Summary
  - Wire up Reset and GPIO0 Programming switch
    - If you are using a programming switch and reset switch from the adapter, connect these from the adapter to the ESP12E.
  - RXD from adapter to TX on ESP12E
  - TXD from adapter to RX on ESP12E
  - GND from adapter to GND on ESP12E
  - VCC 3.3V from adapter to VCC 3.3V of ESP-12E (or the external 3.3V supply powering the ESP-12E module)

#### 关于电压

无论开发板还是烧录器都有5V-3.3V的电压转换

#### 实际操作:

##### 如果是开发板

+ 烧录: 按住FLASH按钮的同时  短暂按一下Reset, 然后松开FLASH, 就开始烧录了

+ 运行: 按一下 Reset

##### 专门设计的8角CH340/CP2102

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h5jx5aecw6j30ar0a9gna.jpg)

, 直接插就好了, 按一下按钮(Reset) 开始下载

##### 如果是通用的CH340/CP2102/L2303HX 

+ 烧录: **IO0管脚接地为烧录模式**
+ 运行: 代码烧录完成后**需要IO0断开重新上电**程序才能运行

##### 通用的CH340/CP2102/L2303HX 接线模式

+ CH340 示例图

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h5j3ihw9nqj30l70fewo0.jpg)

+ ESP-01s 

| esp-01s | usb-ttl |
| ------- | ------- |
| 3V3     | 3V3     |
| RX      | TXD     |
| TX      | RXD     |
| GND     | GND     |

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h5jyf240suj306205f3z2.jpg)

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h5j2ztpic7j30f607p76w.jpg)

![](https://tva1.sinaimg.cn/large/006ulzy2ly1h5jxjn6b5vj30g40jmtei.jpg)

![](https://tva1.sinaimg.cn/large/006ulzy2ly1h5jxlhdy5xj30eh0ibq7n.jpg)

##### 电路图解释

以ESP01为例:

ESP01/S 其实只有两个IO口就是IO0, IO2

ESP8266 实际上有

# 程序开发

[文档](http://bbs.espressif.com/download/file.php?id=253)

## 编译器设置和使用(IDE)

- [Arduino IDE](https://www.esp8266.com/wiki/doku.php?id=windows_setup-windows-compiler-esp8266)
- [Visual Studio IDE](https://www.esp8266.com/wiki/doku.php?id=setup-windows-compiler-esp8266)
- [OSX](https://www.esp8266.com/wiki/doku.php?id=setup-osx-compiler-esp8266)

# Getting Started(实际操作)

- ## [Start with the ESP8266-12E and the Arduino tools](https://www.esp8266.com/wiki/doku.php?id=start-with-esp-12-arduino)

  请参考文档

- ## [NodeMCU development board](https://www.esp8266.com/wiki/doku.php?id=getting-started-with-the-nodemcu_development_board)

  ### 我这里直接买的开发板 淘宝(9.9rmb + 3rmb运费) 



- ## [Over the Air information (OTA)](https://www.esp8266.com/wiki/doku.php?id=ota-over-the-air-esp8266)

  请参考文档

# [Flash/RS232/串口流控原理](https://blog.csdn.net/EAyayaya/article/details/112801769):

![img](https://img-blog.csdnimg.cn/20210121102429138.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0VBeWF5YXlh,size_16,color_FFFFFF,t_70#pic_center)

##### 引脚介绍

+ RTS:（Request To Send 请求发送）
  模组的RTS是给mcu说准备好了,低电平，如果模组没有准备好，MCU给模组发数据，可能会丢包

+ CTS:（Clear To Send 清除发送，允许发送）
  模组的cts必须要外部的mcu给低电平，模组才能发送数据，

+ RXD: （Receive Data 接收数据）
  接收数据

+ TXD:（ Transmit Data 发送数据）
  发送数据

# [集成电路发展史](https://baijiahao.baidu.com/s?id=1704133753207266151&wfr=spider&for=pc)

## 指令集的发展

1. 芯片的本质是二极管, 为了在芯片上跑程序, 出现了指令集(ISA)这个东西.

2. 指令集分两大流派: 复杂指令集（CISC）精简指令集（RISC)

| 指令集ISA                                         | 优点                                       | 缺点                                                   |
| ------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------ |
| 复杂指令集CISC(Complex Instruction Set Computing) | 一条指令中完成更多的工作, 最大限度榨干硬件 | 日趋庞杂的指令芯片不但不易实现，而且还可能降低系统性能 |
| 精简指令集RISC(Reduced Instruction Set Computer)  | 芯片容易实现                               | 多条指令才能完成一个任务, 造成硬件的浪费               |

### 比较主流的指令集

1. CISC 发展出了
   + X86
   + 8051
2. RISC百花齐放, 
   + ARM(Acorn RISC Machine)
   + MIPS(Microprocessor without interlocked pipelined stages 无内部互锁流水级的微处理器)
   + [RISC-V](https://zh.wikipedia.org/wiki/RISC-V)(开源BSD)
   + AVR
   + PIC
   + PowerPC
3. 还有一些专门针对某些运算出来的指令集, 这些并不能用上面两个标准区分如:
   + DSP
   + FPGA 
   + EPSXX

### [为什么有这么多ISA](https://zhuanlan.zhihu.com/p/64199775)?

+ X86和ARM指令集的实现方式都是闭源的
+ x86架构由于授权问题只有几家可以生产，包括现在的Intel、AMD
+ [但是ARM有多种授权方式](https://zh.wikipedia.org/wiki/ARM%E6%9E%B6%E6%A7%8B#ARM%E6%8E%88%E6%AC%8A%E6%96%B9%E5%BC%8F)
  + ARM公司本身并不靠自有的设计来制造或出售CPU，而是将处理器架构授权给有兴趣的厂家。
  + 如苹果M1,M2.海思部分麒麟处理器就是采用这种方式生产出来的。
  + x86是占了先手的, ARM[1983](https://zh.wikipedia.org/wiki/ARM%E6%9E%B6%E6%A7%8B)年才开始设计,但是授权方式的原因ARM也抢了很多市场.
  + 从2020年英伟达强势宣布将以400亿美元的价格收购英国ARM公司的事件,可以看出, ARM这种不生成CPU的方式并没有X86这种和intel牢牢绑定的方式赚钱.
  + 一旦英伟达收购ARM,很难说新的授权方式,因此包括苹果,华为等都开始威胁要拥抱RISC-V

+ [RISC-V](https://zh.wikipedia.org/wiki/RISC-V) 是开源的([BSD](https://zh.wikipedia.org/wiki/BSD%E8%AE%B8%E5%8F%AF%E8%AF%81))

如今,复杂指令集和精简指令集界限日渐模糊, 都在吸取别人的优点.在性能和易实现之间做权衡

### X86和ARM的优劣势

X86结构的电脑采用“桥”的方式与扩展设备（如：硬盘、内存等）进行连接，而且x86结构的电脑出现了近30年，其配套扩展的设备种类多、价格也比较便宜，所以x86结构的电脑能很容易进行性能扩展，如增加内存、硬盘等。

ARM结构的电脑是通过专用的数据接口使CPU与数据存储设备进行连接，所以ARM的存储、内存等性能扩展难以进行（一般在产品设计时已经定好其内存及数据存储的容量），所以采用ARM结构的系统，一般不考虑扩展。基本奉行“够用就好”的原则。这就是为什么现在苹果电脑不留出多个硬盘/内存接口的原因之一.

### 指令集之间是可以转换的

同时还可以软件兼容, M1跑intel芯片的程序, M1不能识别x86的指令苹果就开发了一个叫做[Rosetta 2](https://zh.wikipedia.org/wiki/Rosetta) 的转译机制,把x86的复杂指令翻译成ARM的精简指令, 显然这中间必定有效率的问题.

## 指令集(ISA)与架构与芯片之间的关系

### 什么是架构

[架构 architecture：是一个抽象的概念](https://www.zhihu.com/question/22464046/answer/21450143)

比如我们常说的计算机处理器有486、Ivy Bridge、Pentium M……这就是架构的不同(但其都从属于[x86](https://link.zhihu.com/?target=http%3A//zh.wikipedia.org/wiki/X86)架构)

ARMv1~ARMv8到STM32这些名称都属于ARM架构



### [六个经典单片机种类介绍](https://baijiahao.baidu.com/s?id=1690664375387238551&wfr=spider&for=pc)

#### 51单片机

51单片机是对所有兼容Intel8051指令系统的单片机的统称, 如

- Intel（[英特尔](https://baike.baidu.com/item/英特尔/305730)）：80C31、[80C51](https://baike.baidu.com/item/80C51/4200558)、87C51，80C32、80C52、87C52等；
- [Atmel](https://baike.baidu.com/item/Atmel/8207336)（艾特梅尔）：89C51、89C52、89C2051，89S51(RC)，89S52(RC)等；
- Philips（[飞利浦](https://baike.baidu.com/item/飞利浦/14316)）、华邦、Dallas（达拉斯）、Siemens（[西门子](https://baike.baidu.com/item/西门子/25878)）等公司的许多产品；
- STC（宏晶）：STC89C51、STC90C51、STC11系列、STC15系列、STC8, STC16系列等。
- 等

他们并不都是8位的:  如STC16是个32位的8051, 阉割为了16位

51单片机泛滥的原因:

+ intel看不上看不上这块肉了, 同时要和其他人竞争, 就开放了授权
+ 入场早,前面学习的人都是用的这个

#### AVR/PIC/PowerPC/MIPS

+ PIC芯片示例: 
  + PIC16C5X，PIC12C6XX, PIC17CXX

+ AVR芯片示例: 比较典型的就是Altera、Lattice、Xilinx世界三大权威公司
  + AlteraEPM7128S(PLCC84)、LatticeLC4128V(TQFP100)、XilinxXC95108(PLCC84)
+ MIPS是卖得最好的RISCCPU
  + MIPS324Kc, MIPS645Kc
  + 如Sony，Nintendo的游戏机，Cisco的路由器和SGI超级计算机
+ PowerPC
  + 任天堂Gamecube

都是跟8051单片机的机构不同的位单片机，因为结构不同，所以他的汇编指令也不同，并且他们都是使用的RISC指令集，只有几十条指令，大部分的还都是单周期的指令，所以在相同的晶振频率下，比8051速度要快.但是他们不属于ARM架构, 算是和ARM同时期发展出来的RISC指令集.

#### ARM

+ 手机芯片,任天堂游戏机, iPod:

  GameBoyAdvance，NintendoDS，iPodARM9TDMIArmadillo，GP32，GP2X（第一颗内核）,TapwaveZodiac（Motorolai.MX1）；GP2X（第二颗内核）ARM9ENintendoDS，NokiaN-GageConexant802.11chips；STM32, STMicroSTR91xF，ARM11NokiaN93，Zune，NokiaN800，NOKIAE72CortexTexasInstrumentsOMAP3；Broadcomisauser；LuminaryMicro

他的内部资源（寄存器和外设功能）较8051、AVR和PIC都要多的多，基本上接近于计算机的CPU了

#### DSP/FPGA

DSP其实也是一种特殊的单片机，他从8bit到32bit的都有，他专门是用来计算数字信号的，在某些计算公式上，他甚至比现在的家用计算机的最快CPU还要快，比如说一个32bit的DSP能在一个指令周期内完成一个32bit数乘以32bit数再加上一个32bit数的计算。不好定义属于CISC还是RISC 



# 单片机的各种编程语言

## 汇编语言

汇编不是编程语言，他只是机器指令和一些宏的组合。

为了用人类看得懂的语言来描述指令集, 就有了汇编语言, 不同架构的汇编语言是不一样的,ARM的汇编语言与Intel X86的就不同。

## 汇编语言编译器

+ AVR Studio 

## 高级语言

虽然汇编语言读起来方便了，但也有缺陷。首先汇编语言操作起来还是挺麻烦的。其次汇编语言对应一条条指令集，所以当指令集改变时，就得修改相应汇编语言，导致其可移植性很差，不能跨平台使用，这时人们就想开发一种更方便操作，超越指令集的语言，于是有了C，C++等**高级语言**.

### C/C++语言

+ 大部分单片机支持C语言编译出来的二进制文件, 但是像FPGA就不支持C语言[verilog](https://www.elecfans.com/tags/verilog/)和VHDL语言或者C语言无法编译出FPGA需要的二进制文件,因为C语言是先出现的.

+ 至于C++, 要看编译器支不支持, 把C++编译为对应指令集2进制的东西, 理论上来说C++是可以用C的代码复写的,但是这个事情太庞大了, C++是一直更新的现在都C++20了.如Keil支持STL库

  + 但是C++对运行效率有很大的影响, CPU速率大于100MHz不用考虑C++语言本身对程序运行效率的影响

  + C++编译出来的东西比C大很多, 各种库使用都会增大体积, Flash一般要大于100K

  + C++的编译器要针对 在针对8位MCU, 32位MCU做不一样的处理(地址长度都不一样)

  + C++的各种库不一定对单片机支持: 如STL标准库

  + C++11、C++14和C++17还是有不小区别的。不能有换编译器的需求

  + C++ 并没有比C写起来快很多

    But mind you, writing complex code in C can give you nightmares.

    But then debugging C++ code can give you nightmares as well.

  + C++写的时候有时候要 提前分配存储空间，而不是自动分配.否则会有小概率情况会出问题

  ### C++/C编译器:

  #### Keil

  Keil公司2005年由ARM公司收购。现在已经迭代到 Keil μVision5, 

  支持ARM, 51单片机

  #### IAR/STVD/ICCAVR

  ST系列芯片用STVD

  IAR,ICCAVR用于AVR

  #### [ArduinoIDE](https://www.arduino.cc/)

  Arduino2005 才开始出现, 有人嫌弃学一个单片机开发太麻烦了, 要先写代码, 然后读手册,烧录.

  学几天都学不会.然后出了一套电路板,给学生学习,同时出了ArduinoIDE用于敲代码和烧录.

  然后大家发现都很好用, 由于是开源的, 有人做了[wokwi-Arduino在线模拟](https://wokwi.com/)

  有人做了对各种开发板的支持.发展到现在云平台也做.

  

  #### 其他编译器

  基本一个芯片就有一个编译器, 毕竟不太复杂, 要么编译器支持你,要么你自己写一个编译器, 编译器在工作量和兼容更多的芯片之间做出选择, 厂家在学习成本/对客户吸引力和对编译器支持的力度做出选择, 开发者也会对学习成本和芯片价格做出选择.三方是互相影响的

  

其他语言

#### micropython

+ 支持部分芯片的部分功能

#### tinygo

+ 支持部分芯片的部分功能

#### nodemcu

+ 好像是专门为了esp系列出的一套系统

## ESPXXXX属于哪一类?

+ ESP8266处理器是Teensilica L106的RISC内核

+ ESP32处理器是Xtensa Dual-Core 32-bit LX6

ESPXXXX 每一个型号用的CPU都不一样, 这些CPU属于不同的指令集, 和DSP一样, 不好定义它属于精简指令集还是复杂指令集

## 总结

都是钱的问题,谁都知道开源发展快, 但是就会没有钱.

各种芯片的选择也是,那个芯片便宜用哪个.不会用?要么学怎么用,要么找一个会用的人.

### 关于学习入门时Arduino与51与树莓派

#### 定位/芯片不一样

+ 这是一个发展的毕竟阶段 51->Arduino->树莓派 是一个硬件要求越来越高的过程

+ 由于硬件成本要压缩,所以能用51不用, 能用Arduino不用树莓派,能用Arduino不用树莓派
+ 51用一个51单片机就可以了
+ Arduino 要用 AVR单片机
+ 树莓派更像一个小型计算机

#### 学习难度/学到的东西不一样

+ 51可以完整清晰地讲明白单片机的基础内部工作原理, 包括串口通信,内存、寄存器，GPIO口功能，定时器，单片机汇编语句等。另外两个不行,因为都是封装好的,你搞好了,但是原理你并不明白
+ Arduino 相当于在C/C++语言的基础上封装了一个库你不用了解底层是是如何对IO读写数值,你不用了解TCP的各种协议,封闭了你对底层的了解,优点是开发快,不用学那么多东西,

+ 简单来说就是，想学技术就玩单片机，不想学技术，只想快速做出产品就学arduino。

#### 对比表

|                           | 51                           | Arduino                  | 树莓派                       |
| ------------------------- | ---------------------------- | ------------------------ | ---------------------------- |
| 学习成本 传感器开发板套装 | 50靠上                       | 淘宝一搜 一个套装 50靠上 | 上千                         |
| 生产成本                  | STM8芯片1w个2块钱            | 最便宜的                 | 上千                         |
| 实现功能                  | 少                           | 较多                     | 相当于小型计算机             |
| 尺寸                      | STM8贴片就可以               | 能让你看出来那是一个芯片 | 相当于小型计算机             |
| 芯片数量不一样            | 很多                         | 没有51多不在一个数量级   | 没有Arduino 多不在一个数量级 |
| 发展阶段                  | 初期                         | 中期                     | 计算机期                     |
| 功能                      | 用于不需要太多功能的工业生产 | 自娱自乐                 | 服务器做的东西               |
| 在线模拟器                | 没有                         | wokwi                    | 普通Linux系统                |
| 图形化编程                | 有                           | 有                       | 你都是电脑要什么自行车没有   |

#### 未来发展

就像在服务器软件开发,java/python/golang 侵蚀了C/C++的市场,但是C/C++在需要效率的地方还得用,适用性广.

都有各自的缺点,他们出现的原因都是为了解决各自的痛点,没有好坏,还得看适不适合你

如果自娱自乐做个小车,飞行器, 可以用STM32(51), 也可以用Arduino, 

如果做智能家居用ESP8226(可以用Arduino), 便宜, 支持Arduino

如果找个工作 51

#### 最后总结

个人认为学习还得51, 但是如果你仅仅想做一个联网的小东西,ESP8226就够了.

仅仅为了 一个 ESP8226 学一个Arduino比学51学习成本低,我学Arduino了.因为有wokwi这个模拟的,学习成本又省去了.我是为了减少学习成本学的Arduino.即使这样使我少学了很多东西.

Arduino支持ESP8226的编译是一个很出色的表现, 官方提供了nodemcu, micropython也提供了支持. 还有原生的C/C++编译可以支持(这意味记事本就可以keil带代码提示就更可以了).

个人很看好ESP8226(而非Arduino, 只是ESP8226选择了可以用Arduino编程, 同时也可以用NONOS来编),未来所有需要联网的地方有可能不需要学习51及其CPU基础原理, 因为ESP8226是买wifi送芯片 手动狗头

# Wifi zigbee bluetooth

- |                  | NB-IOT                                                       | LoRa                                                         | Zigbee                                                       |
  | ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | 组网方式         | 基于现有蜂窝组网                                             | 基于LoRa网关                                                 | 基于Zigbee网关                                               |
  | 网络部署方式     | 节点                                                         | 节点 + 网关（网关部署位置要求较高，需要考虑因素多）          | 节点 + 网关                                                  |
  | 传输距离         | 远距离（可达十几公里，一般情况下10KM以上）                   | 远距离（可达十几公里，城市1~2公里,郊区可达20km）             | 短距离（10米~百米级别）                                      |
  | 单网接入节点容量 | 约20万                                                       | 约6万，实际受网关信道数量，节点发包频率，数据包大小等有关。一般有500~5000个不等 | 理论6万多个，一般情况200~500个                               |
  | 电池续航         | 理论约10年/AA电池                                            | 理论约10年/AA电池                                            | 理论约2年/AA电池                                             |
  | 成本             | 模块5-10$，未来目标降到1$                                    |                                                              | 1.4rmb                                                       |
  | 频段             | License频段，运营商频段                                      | unlicense频段，Sub-GHZ(433、868、915 MHz等)                  | unlicense频段2.4G                                            |
  | 传输速度         | 理论160kbp ~ 250Kbps，实际一般小于100kbps，受限低速通信接口UART | 0.3~50kbps                                                   | 理论250kps，实际一般小于100kbps，受限低速通信接口UART        |
  | 网络时延         | 6s -10s                                                      | TBD                                                          | 不到1S                                                       |
  | 适合领域         | 户外场景，LPWAN大面积传感器应用                              | 户外场景，LPWAN，大面积传感器应用可搭私有网网络，蜂窝网络覆盖不到地方 | 常见于户内场景，户外也有,LPLAN小范围传感器应用可搭建私有网网络。 |
