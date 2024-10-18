---
title: "上拉电阻和下拉电阻的模拟"
hidemeta: true
---

# wokwi 运行不了解决办法:

因为引用了github里面的asm, 所以github必须通, 可以翻墙/其他方法 解决

看控制台就知道了

# [上拉电阻和下拉电阻的模拟](https://www.bilibili.com/video/BV1H5411d7tr/)

## 为什么需要上拉和下拉电阻:

开关在断开的情况下, 因为有板载电压, 所以电压是不稳定的

## 电压不稳定试验:

因为MCU本身是有电阻的, 对于正常的引脚, 其  电压不是固定的

```
void setup() {
  Serial.begin(9600);
  pinMode(3, INPUT);
  pinMode(A0, INPUT);
}

void loop() {
  //3口的数字电路(0/1)
  Serial.print("3 B:");
  Serial.println(digitalRead(3));
  //0-255
  //analogWrite(A0, 150);
  //A0口的数字电路(0/1)
  Serial.println(digitalRead(A0));
  //A0口的模拟电路(0-1023)
  //此函数返回0到1023之间的数字，表示0到5伏特之间的电压。例如，如果施加到编号0的引脚的电压为2.5V，则analogRead(0)返回512。
  Serial.print("A0 v-num:");
  Serial.println( + analogRead(A0));

  delay(1000);
}

```

```

Simulation
3 B:0
A0 B:0
A0 v-num:762
3 B:0
A0 B:0
A0 v-num:782
3 B:0
A0 B:0
A0 v-num:757
```

可以看到  A0的电压是不稳定的

## 上拉电阻:

电路图:

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h5iybm6qvaj30jc0c275k.jpg)

在A0上做试验: 一端接A0, 一端接VCC

```
3 B:0
A0 B:1
A0 v-num:1023
```

添加上述电路图:

按下按钮后

```
3 B:0
A0 B:0
A0 v-num:0
```

## 下拉电阻:

电路图把VCC 和GND 换位置即可

在A0上做试验: 一端接A0, 一端接地(GND)

```
3 B:0
A0 B:0
A0 v-num:0
```

添加开关, 并按下开关后

```
3 B:0
A0 B:1
A0 v-num:1023
```

