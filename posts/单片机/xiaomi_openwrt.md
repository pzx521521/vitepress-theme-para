---
title: "小米4a刷openert"
hidemeta: true
---





# xiaomi4A百兆刷openwrt简介

网上教程乱七八糟的, 这里整理一下, 最新的[这个](https://www.luyouwang.net/9751.html)能用

[官网在这里](https://openwrt.org/inbox/toh/xiaomi/r4ac?s[]=xiaomi&s[]=4a)

注意4a百兆 和千兆的刷的包是不一样的

# 总结一下官网的介绍:

## 官方提供有2个包:

+ 4A百兆用这个

  [xiaomi_mi-router-4a-100m-intl-initramfs-kernel.bin](https://downloads.openwrt.org/snapshots/targets/ramips/mt76x8/openwrt-ramips-mt76x8-xiaomi_mi-router-4a-100m-intl-initramfs-kernel.bin)

  [xiaomi_mi-router-4a-100m-intl-squashfs-sysupgrade.bin](https://downloads.openwrt.org/snapshots/targets/ramips/mt76x8/openwrt-ramips-mt76x8-xiaomi_mi-router-4a-100m-intl-squashfs-sysupgrade.bin)

+ 注意我们用**squashfs-sysupgrade.bin**这个包刷, 不同包刷的方式不一样, 这里不对initramfs-kernel.bin包的刷入方法做介绍

+ 4A千兆有千兆的包不要用百兆的包

## 刷机流程:

+ 注意看路由的固件版本号, 此教程仅适用于3.xx

+ Use [OpenWRTInvasion](https://github.com/acecilia/OpenWRTInvasion) 获取root权限的shell
+ **cat /proc/mtd**检查是否有一个分区叫 **mtd6: 00200000 00010000 “overlay”**, 只有有该分区才能刷
+ openwrt-**sysupgrade**.bin 下载到路由器的 `/tmp`  目录
+ 刷刚刚下载的包 with `mtd -r write <image> OS1`

## 注意事项

+ 看路由器的版本, 推荐更新到最新版本再刷, 因为[R4AC with v3.0.10 bricked when downgrading to v3.0.5](https://forum.openwrt.org/t/xiaomi-mi-router-4a-mir4ac-100m-international-version-bricked-and-cant-unbrick/134430)
+ 无需安装Breed, 否则会造成bootloop

# [对路由器进行root](https://github.com/acecilia/OpenWRTInvasion)

## 安装python

## 下载代码

[github地址](https://github.com/acecilia/OpenWRTInvasion)

## 运行代码

怎么跑[github地址](https://github.com/acecilia/OpenWRTInvasion)这里已经写的很详细了, 还有动图:

+ 登录路由器获得stock
+ 安装python依赖
+ 运行脚本
+ 在脚本中输入路由器的Ip和stock3
+ 使用telnet进行测试

# 下载openwrt

[xiaomi_mi-router-4a-100m-intl-squashfs-sysupgrade.bin](https://downloads.openwrt.org/snapshots/targets/ramips/mt76x8/openwrt-ramips-mt76x8-xiaomi_mi-router-4a-100m-intl-squashfs-sysupgrade.bin)

在上一步 [OpenWRTInvasion](https://github.com/acecilia/OpenWRTInvasion)已经开启了FTP服务器

> The script also starts an ftp server at port 21, so you can get access to the filesystem using a GUI (for example [cyberduck](https://cyberduck.io/)).

然后用任意ftp的客户端, 把openwrt传到服务器的 tmp 目录下面

# 刷入openwrt

```
# <image> 指的是完整的路径 如 /tmp/openwrt-21.02.3-ramips-mt76x8-xiaomi_mi-router-4a-100m-squashfs-sysupgrade.bin
mtd -r write <image> OS1
```

参考网址给的是 -e 猜测是erser擦除的意思  我相信官网 用 -r 应该是recover的意思