---
title: "小米4a 内网穿透"
hidemeta: true
---

# [rathole](https://github.com/rapiz1/rathole) 使用

## 路由器端

因为小米4a是一个定制的openwrt, openwrt的libc 是 musl

## 服务器端

### centos 

看一下cpu

```
cat /proc/cpuinfo
```

是intel的芯片

所以用linux x86

运行起来提示

/lib64/libc.so.6: version `GLIBC_2.18' not found (required by ./rathole)

但是懒得装了

### 更换为docker

```
docker run -d -p 2333:2333 -p 5202:5202 -v "/root/rathole/config.toml:/app/config.toml" rapiz1/rathole --server /app/config.toml
```



# [ngrok](https://github.com/inconshreveable/ngrok) 使用

## 服务器端

### 下载依赖

打开src 文件夹新进 go.mod

同步包

### 添加tls

src\ngrok\server

新建文件夹及文件 src/ngrok/server/assets/tls.go

tls.go:

```
package assets

import "embed"

// 使用1.16特性编译阶段将静态资源文件打包进编译好的程序
var (
	//go:embed tls
	Asset embed.FS
)

```

复制 \assets\server\tls 到 src/ngrok/server/assets/

修改server/tls 下对应的路径



加参运行

```
-httpAddr :8080 
```

# Frp

```bash
docker run --network host -d -v /root/frp/frps.ini:/etc/frp/frps.ini --name frps snowdreamtech/frps
```