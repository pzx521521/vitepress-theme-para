---
title: "wifi kill 是如何工作的"
hidemeta: true
---

# wifi 杀手原理分析(By ESP8226)

[官方源码在这里](https://github.com/spacehuhntech/esp8266_deauther/)

云盘: https://wwu.lanzouy.com/i83vl0aiducj

提供了bin 和 Arduino 两种安装方式

总而言之就是利用wifi协议的漏洞, wifi提供方是大爷,所以协议没有对wifi提供方做太多限制

## Deauth：

现象: 对方wifi连不上了, 已经连上的设备掉线了.

因为WIFI管理数据帧没有被加密，导致攻击者可以伪造管理帧，从而让攻击者可以任意发送“取消认证”数据包来强行切断AP与客户端的连接.

说白点就是无脑洪水堵塞攻击，通过伪造信息一直告诉手机我要和你断掉, 手机就会听话的一直切断和路由器的连接，从而导致对方设备无法正常连接.

## Beacon

现象: 出现一大堆wifi,名字可以一样也可以不一样,干扰用户选择到正确的wifi

信标帧(Beacon)数据包用于宣告接入点，通过不断发送信标帧数据包，由于目前部分设备自带SSID检测，所以我们使用随机生成SSID以达到目的。

说白点就是ESP8226创建许多新的wifi干扰对方的正常连接, 新的wifi可以和被攻击的wifi名字一样, 但是目前部分设备自带SSID检测, 所以也可以生成随机生成SSID



## Probe-response

probe-request 也是管理帧,所以可以伪造

探测请求帧由用户设备(手机)发送，以询问一个已知网络是否在附近。通过请求您在SSID列表中指定的网络，以此来混淆WiFi跟踪器。

说白点就是手机给已知WiFi网络发送一个probe-request帧，可提供网络服务的接入点(ESP8226)将响应一个probe-response帧，你的手机将会跟这个响应接入点进行连接。



## 钓鱼攻击

通过伪造wifi使受害者连接假冒wifi，通过钓鱼页面等一系列手法可以实现监听流量，获取原真实wifi密码等等