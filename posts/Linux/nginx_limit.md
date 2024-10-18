---
title: "Nginx 限流"
hidemeta: true
---

# [Nginx 限流](https://docs.nginx.com/nginx/admin-guide/security-controls/controlling-access-proxied-http/)

## 一共三种办法:

- limit_conn_zone (桶算算法)
- limit_req_zone (令牌桶算法)
- ngx_http_upstream_module(计数限流)

Nginx使用的限流算法是漏桶算法。



### [limit_conn_zone: 桶算算法](http://nginx.org/en/docs/http/ngx_http_limit_conn_module.html)

```
Syntax:	limit_conn_zone key zone=name:size;
Default:	—
Context:	http
```

```
Syntax:	limit_conn zone number;
Default:	—
Context:	http, server, location
```

#### 示例: 只允许每个IP保持一个连接

```
limit_conn_zone $binary_remote_addr zone=addr:10m; 
server {
    location /download/ { 
        limit_conn addr 1; 
    }
```

#### 示例2: 可以配置多个limit_coon指令 客户端每个IP连接数，同时限制服务端最大保持连接数

```
limit_conn_zone $binary_remote_addr zone=perip:10m; 
limit_conn_zone $server_name zone=perserver:10m; 
server {
    ... 
    limit_conn perip 10; 
    limit_conn perserver 100; 
    ...
}
```



#### 漏桶算法

![漏铜算法](https://img-blog.csdnimg.cn/img_convert/ca807b4e337f8141c6548218e9c4459e.png)

- 水（请求）从上方倒入水桶，从水桶下方流出（被处理）；
- 来不及流出的水存在水桶中（缓冲），以固定速率流出；
- 水桶满后水溢出（丢弃）。
- 这个算法的核心是：缓存请求、匀速处理、多余的请求直接丢弃。

### [limit_req_zone: 令牌桶算法](http://nginx.org/en/docs/http/ngx_http_limit_req_module.html) 

```
Syntax:	limit_req_zone key zone=name:size rate=rate [sync];
Default:	—
Context:	http
```

```
Syntax:	limit_req zone=name [burst=number] [nodelay | delay=number];
Default:	—
Context:	http, server, location
```



#### 示例1: 对IP进行限流

```
http {
    limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;

    ...

    server {

        ...

        location /search/ {
            limit_req zone=one burst=20;
        }
```

#### 示例2: 可以配置多个limit_coon指令 客户端每个IP连接数，同时限制服务端最大保持连接数

```
limit_req_zone $binary_remote_addr zone=perip:10m rate=1r/s;
limit_req_zone $server_name zone=perserver:10m rate=10r/s;

server {
    ...
    limit_req zone=perip burst=5 nodelay;
    limit_req zone=perserver burst=10;
}
```



+ $binary_remote_addr

  它是Nginx内置的一个值，代表的是客户端的IP地址的二进制表示。因此换言之，我们的示例配置，是希望限流系统以客户端的IP地址为键进行限流。

+ 10M，即可以存储160000个IP地址

+ rate

  rate=10r/s表示允许**同一个客户端**的访问频次是每秒10次，还可以有比如30r/m的

#### 令牌桶算法

![令牌桶算法](https://img-blog.csdnimg.cn/20190817201625821.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5Mzk5OTY2,size_16,color_FFFFFF,t_70)

+ param burst(令牌桶队列长度)

即漏桶算法中我们的“桶”最多可以接受20个请求。即 queue 大小

+ param  nodelay (令牌桶流速)

默认是 delay =  0 即所有的都delay

相对于传统的漏桶算法慢吞吞地转发请求的缺陷，Nginx实现了一种漏桶算法的优化版，允许开发者指定快速转发，而且还不影响正常的限流功能。开发者只需要在指定limit_req的一行中指定burst之后指定另一个参数nodelay，就可以在请求总数没有超过burst指定值的情况下，迅速转发所有请求了

#### 令牌桶 nodelay 详细解释 

当有没有超过burst上限的请求数量进入系统时，快速转发，然后将当前桶中可以填充的数量标为0

举例而言，配置如上所示，假如在某个瞬时有100个请求进入系统，Nginx会先转发20个到burst（或21个，取决于瞬时情况），然后拒绝剩下的80个请求，并将当前桶中数量标为0，然后接下来的每100ms(10r/s)，缓慢恢复1个空位。

在此基础上

如果设置 nodelay, 由于burst 是20 个 而且对于这些突发的请求，不再按照100ms的节奏去处理，而且立刻（nodelay）发送出去

如果设置 delay=0(默认值) 20请求会按照10r/s一个一个去拿令牌

如果设置 delay=5 第一个阶段前5个立刻发送出，然后后面20-5=15个请求按照定义的速率每100ms处理一个。

因为

### [ngx_http_upstream_module](http://nginx.org/en/docs/http/ngx_http_upstream_module.html) -> max_conns(在nginx1.11.5版本以后)

```
upstream backend{ 
    server 127.0.0.1:8081 max_conns=10; 
    server 127.0.0.1:8082 max_conns=10; 
} 
```

### ab 测试(limit_req_zone: 令牌桶算法中的delay): 

#### 使用lua脚本模拟业务:

```
function sleep(n)
   if n > 0 then os.execute("ping -n " .. tonumber(n + 1) .. " localhost > NUL") end
end
sleep(1)
ngx.say("sleep 1")
```

#### ab测试脚本(总数100, 并发100, 发送100/100 = 1次)

```
ab -n 100 -c 100  http://127.0.0.1/search
pause
```

####  测试 delay=5  openresty nginx.config

```
http {
    limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;

    ...

    server {

        ...

        location /search/ {
            limit_req zone=one burst=20;
            content_by_lua_file lua/sleep.lua;
            access_log logs/access.log;
        }
```

**access.log结果**

可以看到

并发100的情况下:

一共执行burst=20个, 80个被抛弃(实际情况因为瞬时burst 22 抛弃78)

第一步先不延迟执行delay=5个(实际情况因为瞬时delay=7)

第二步每100ms执行一次把剩下的burst-delay 个执行完

```
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] "GET /limit HTTP/1.0" 503 
127.0.0.1 - - [10/Aug/2022:09:37:51 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:37:57 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:38:03 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:38:09 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:38:16 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:38:21 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:38:27 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:38:33 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:38:39 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:38:46 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:38:52 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:38:58 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:39:04 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:39:10 +0800] "GET /limit HTTP/1.0" 200 
127.0.0.1 - - [10/Aug/2022:09:39:16 +0800] "GET /limit HTTP/1.0" 200 
```

####  测试 delay默认值(不填delay参数) (delay=0) openresty nginx.config 

一共执行20个 

第一步 不延迟执行delay=0个(实际情况因为瞬时delay=1)

第二步 每100ms执行一次把剩下的burst-delay 个执行完

**access.log结果**

```
200*1
503*80
200*19
```

#### 测试 nodelay  openresty nginx.config

一共执行20个 

不延迟执行nodelay   20个

access.log结果**

```
200*20
503*80
```

#### 

#### 