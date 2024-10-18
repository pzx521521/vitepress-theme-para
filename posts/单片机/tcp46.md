---
title: "golang tcp6 网无法访问"
hidemeta: true
---

# 记一次golang服务外网无法访问的问题

## TCP6导致的外网无法访问

golang 代码如下: 

```golang
package main

import (
	"io"
	"log"
	"net/http"
	"time"
)


func HelloServer(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, time.Now().String())
}

func main() {
	http.HandleFunc("/", HelloServer)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

```

发现 用域名访问信息  https://xxxx:8080 无法显示

发现 用ip访问信息  {ip}:8080 无法显示

使用 netstat -antlp 之后发现 仅仅开了tcp6的端口而没有tcp的端口, 因此猜测是tcp6 导致的

![QQ截图20220804113739.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h4ukyatyx4j30o004e77q.jpg)

## 解决方案1 修改tcp6为tcp4

[参考](https://stackoverflow.com/questions/38592064/listen-on-tcp4-not-tcp6/38592286#38592286), 修改代码如下:

```golang
package main

import (
	"io"
	"log"
	"net"
	"net/http"
	"time"
)

func HelloServer(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, time.Now().String())
}

func main() {
	http.HandleFunc("/", HelloServer)
	l, err := net.Listen("tcp4", ":8080")
	err = http.Serve(l, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
```

就可发现 tcp6的端口而没有tcp的端口(ps: 修改为 tcp 没有效果)

## 解决方案2 centos设置tcp4转发tcp6

上面的办法不是很好, 正确的方式应该是 开启ipv4端口转发

[参考](https://blog.csdn.net/zhouzhou992/article/details/122697920)

### 临时设置(重启网卡或服务器后会丢失配置)

1. 检查是否开启ipv4端口转发

```
sysctl net.ipv4.ip_forward
```

2. 若指令返回结果为net.ipv4.ip_forward = 0，执行如下指令

```
echo 1 > /proc/sys/net/ipv4/ip_forward
sysctl -w net.ipv4.ip_forward=1
```

### 永久设置

修改/etc/sysctl.conf文件

添加或修改:

```sh
net.ipv4.ip_forward=1
```

加载配置

```sh
sysctl -p /etc/sysctl.conf
```

### 检查

完成后通过netstat -antlpu 仍旧显示只有tcp6，但是此时通过ipv4地址是可以访问了。

## cloudflare 导致的https 无法访问的问题

但是 https 是无法访问的, 原因是  经过了cloudflare的CDN

只允许80 443 过 https, 不用cloudflare做ssl, 或者不用https 即可