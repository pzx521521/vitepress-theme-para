# Tor 

## 简介:



结尾是.onion的网络

## 服务器端搭建

+ 安装

```
yum -y install tor
yum -y install nginx
systemctl start nginx
```

+ 修改配置

```
vi /etc/tor/torrc

HiddenServiceDir /var/lib/tor/my-website/
HiddenServicePort 80 127.0.0.1:80
```

HiddenServiceDir: 其中应包含 Onion 服务的信息和加密密钥

+ 开启服务

```
systemctl start tor
systemctl status tor
```







### 客户端访问

[浏览器下载](https://www.torproject.org/download/)

