import{_ as a,c as s,a0 as p,o as e}from"./chunks/framework.DADtiyJ8.js";const g=JSON.parse('{"title":"Nginx 限流","description":"","frontmatter":{"title":"Nginx 限流","hidemeta":true},"headers":[],"relativePath":"posts/Linux/nginx_limit.md","filePath":"posts/Linux/nginx_limit.md"}'),i={name:"posts/Linux/nginx_limit.md"};function t(l,n,o,u,c,r){return e(),s("div",null,n[0]||(n[0]=[p(`<h1 id="nginx-限流" tabindex="-1"><a href="https://docs.nginx.com/nginx/admin-guide/security-controls/controlling-access-proxied-http/" target="_blank" rel="noreferrer">Nginx 限流</a> <a class="header-anchor" href="#nginx-限流" aria-label="Permalink to &quot;[Nginx 限流](https://docs.nginx.com/nginx/admin-guide/security-controls/controlling-access-proxied-http/)&quot;">​</a></h1><h2 id="一共三种办法" tabindex="-1">一共三种办法: <a class="header-anchor" href="#一共三种办法" aria-label="Permalink to &quot;一共三种办法:&quot;">​</a></h2><ul><li>limit_conn_zone (桶算算法)</li><li>limit_req_zone (令牌桶算法)</li><li>ngx_http_upstream_module(计数限流)</li></ul><p>Nginx使用的限流算法是漏桶算法。</p><h3 id="limit-conn-zone-桶算算法" tabindex="-1"><a href="http://nginx.org/en/docs/http/ngx_http_limit_conn_module.html" target="_blank" rel="noreferrer">limit_conn_zone: 桶算算法</a> <a class="header-anchor" href="#limit-conn-zone-桶算算法" aria-label="Permalink to &quot;[limit_conn_zone: 桶算算法](http://nginx.org/en/docs/http/ngx_http_limit_conn_module.html)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Syntax:	limit_conn_zone key zone=name:size;</span></span>
<span class="line"><span>Default:	—</span></span>
<span class="line"><span>Context:	http</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Syntax:	limit_conn zone number;</span></span>
<span class="line"><span>Default:	—</span></span>
<span class="line"><span>Context:	http, server, location</span></span></code></pre></div><h4 id="示例-只允许每个ip保持一个连接" tabindex="-1">示例: 只允许每个IP保持一个连接 <a class="header-anchor" href="#示例-只允许每个ip保持一个连接" aria-label="Permalink to &quot;示例: 只允许每个IP保持一个连接&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>limit_conn_zone $binary_remote_addr zone=addr:10m; </span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span>    location /download/ { </span></span>
<span class="line"><span>        limit_conn addr 1; </span></span>
<span class="line"><span>    }</span></span></code></pre></div><h4 id="示例2-可以配置多个limit-coon指令-客户端每个ip连接数-同时限制服务端最大保持连接数" tabindex="-1">示例2: 可以配置多个limit_coon指令 客户端每个IP连接数，同时限制服务端最大保持连接数 <a class="header-anchor" href="#示例2-可以配置多个limit-coon指令-客户端每个ip连接数-同时限制服务端最大保持连接数" aria-label="Permalink to &quot;示例2: 可以配置多个limit_coon指令 客户端每个IP连接数，同时限制服务端最大保持连接数&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>limit_conn_zone $binary_remote_addr zone=perip:10m; </span></span>
<span class="line"><span>limit_conn_zone $server_name zone=perserver:10m; </span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span>    ... </span></span>
<span class="line"><span>    limit_conn perip 10; </span></span>
<span class="line"><span>    limit_conn perserver 100; </span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="漏桶算法" tabindex="-1">漏桶算法 <a class="header-anchor" href="#漏桶算法" aria-label="Permalink to &quot;漏桶算法&quot;">​</a></h4><p><img src="https://img-blog.csdnimg.cn/img_convert/ca807b4e337f8141c6548218e9c4459e.png" alt="漏铜算法"></p><ul><li>水（请求）从上方倒入水桶，从水桶下方流出（被处理）；</li><li>来不及流出的水存在水桶中（缓冲），以固定速率流出；</li><li>水桶满后水溢出（丢弃）。</li><li>这个算法的核心是：缓存请求、匀速处理、多余的请求直接丢弃。</li></ul><h3 id="limit-req-zone-令牌桶算法" tabindex="-1"><a href="http://nginx.org/en/docs/http/ngx_http_limit_req_module.html" target="_blank" rel="noreferrer">limit_req_zone: 令牌桶算法</a> <a class="header-anchor" href="#limit-req-zone-令牌桶算法" aria-label="Permalink to &quot;[limit_req_zone: 令牌桶算法](http://nginx.org/en/docs/http/ngx_http_limit_req_module.html)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Syntax:	limit_req_zone key zone=name:size rate=rate [sync];</span></span>
<span class="line"><span>Default:	—</span></span>
<span class="line"><span>Context:	http</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Syntax:	limit_req zone=name [burst=number] [nodelay | delay=number];</span></span>
<span class="line"><span>Default:	—</span></span>
<span class="line"><span>Context:	http, server, location</span></span></code></pre></div><h4 id="示例1-对ip进行限流" tabindex="-1">示例1: 对IP进行限流 <a class="header-anchor" href="#示例1-对ip进行限流" aria-label="Permalink to &quot;示例1: 对IP进行限流&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http {</span></span>
<span class="line"><span>    limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location /search/ {</span></span>
<span class="line"><span>            limit_req zone=one burst=20;</span></span>
<span class="line"><span>        }</span></span></code></pre></div><h4 id="示例2-可以配置多个limit-coon指令-客户端每个ip连接数-同时限制服务端最大保持连接数-1" tabindex="-1">示例2: 可以配置多个limit_coon指令 客户端每个IP连接数，同时限制服务端最大保持连接数 <a class="header-anchor" href="#示例2-可以配置多个limit-coon指令-客户端每个ip连接数-同时限制服务端最大保持连接数-1" aria-label="Permalink to &quot;示例2: 可以配置多个limit_coon指令 客户端每个IP连接数，同时限制服务端最大保持连接数&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>limit_req_zone $binary_remote_addr zone=perip:10m rate=1r/s;</span></span>
<span class="line"><span>limit_req_zone $server_name zone=perserver:10m rate=10r/s;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    limit_req zone=perip burst=5 nodelay;</span></span>
<span class="line"><span>    limit_req zone=perserver burst=10;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><p>$binary_remote_addr</p><p>它是Nginx内置的一个值，代表的是客户端的IP地址的二进制表示。因此换言之，我们的示例配置，是希望限流系统以客户端的IP地址为键进行限流。</p></li><li><p>10M，即可以存储160000个IP地址</p></li><li><p>rate</p><p>rate=10r/s表示允许<strong>同一个客户端</strong>的访问频次是每秒10次，还可以有比如30r/m的</p></li></ul><h4 id="令牌桶算法" tabindex="-1">令牌桶算法 <a class="header-anchor" href="#令牌桶算法" aria-label="Permalink to &quot;令牌桶算法&quot;">​</a></h4><p><img src="https://img-blog.csdnimg.cn/20190817201625821.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5Mzk5OTY2,size_16,color_FFFFFF,t_70" alt="令牌桶算法"></p><ul><li>param burst(令牌桶队列长度)</li></ul><p>即漏桶算法中我们的“桶”最多可以接受20个请求。即 queue 大小</p><ul><li>param nodelay (令牌桶流速)</li></ul><p>默认是 delay = 0 即所有的都delay</p><p>相对于传统的漏桶算法慢吞吞地转发请求的缺陷，Nginx实现了一种漏桶算法的优化版，允许开发者指定快速转发，而且还不影响正常的限流功能。开发者只需要在指定limit_req的一行中指定burst之后指定另一个参数nodelay，就可以在请求总数没有超过burst指定值的情况下，迅速转发所有请求了</p><h4 id="令牌桶-nodelay-详细解释" tabindex="-1">令牌桶 nodelay 详细解释 <a class="header-anchor" href="#令牌桶-nodelay-详细解释" aria-label="Permalink to &quot;令牌桶 nodelay 详细解释&quot;">​</a></h4><p>当有没有超过burst上限的请求数量进入系统时，快速转发，然后将当前桶中可以填充的数量标为0</p><p>举例而言，配置如上所示，假如在某个瞬时有100个请求进入系统，Nginx会先转发20个到burst（或21个，取决于瞬时情况），然后拒绝剩下的80个请求，并将当前桶中数量标为0，然后接下来的每100ms(10r/s)，缓慢恢复1个空位。</p><p>在此基础上</p><p>如果设置 nodelay, 由于burst 是20 个 而且对于这些突发的请求，不再按照100ms的节奏去处理，而且立刻（nodelay）发送出去</p><p>如果设置 delay=0(默认值) 20请求会按照10r/s一个一个去拿令牌</p><p>如果设置 delay=5 第一个阶段前5个立刻发送出，然后后面20-5=15个请求按照定义的速率每100ms处理一个。</p><p>因为</p><h3 id="ngx-http-upstream-module-max-conns-在nginx1-11-5版本以后" tabindex="-1"><a href="http://nginx.org/en/docs/http/ngx_http_upstream_module.html" target="_blank" rel="noreferrer">ngx_http_upstream_module</a> -&gt; max_conns(在nginx1.11.5版本以后) <a class="header-anchor" href="#ngx-http-upstream-module-max-conns-在nginx1-11-5版本以后" aria-label="Permalink to &quot;[ngx_http_upstream_module](http://nginx.org/en/docs/http/ngx_http_upstream_module.html) -&gt; max_conns(在nginx1.11.5版本以后)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>upstream backend{ </span></span>
<span class="line"><span>    server 127.0.0.1:8081 max_conns=10; </span></span>
<span class="line"><span>    server 127.0.0.1:8082 max_conns=10; </span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="ab-测试-limit-req-zone-令牌桶算法中的delay" tabindex="-1">ab 测试(limit_req_zone: 令牌桶算法中的delay): <a class="header-anchor" href="#ab-测试-limit-req-zone-令牌桶算法中的delay" aria-label="Permalink to &quot;ab 测试(limit_req_zone: 令牌桶算法中的delay):&quot;">​</a></h3><h4 id="使用lua脚本模拟业务" tabindex="-1">使用lua脚本模拟业务: <a class="header-anchor" href="#使用lua脚本模拟业务" aria-label="Permalink to &quot;使用lua脚本模拟业务:&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function sleep(n)</span></span>
<span class="line"><span>   if n &gt; 0 then os.execute(&quot;ping -n &quot; .. tonumber(n + 1) .. &quot; localhost &gt; NUL&quot;) end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span>sleep(1)</span></span>
<span class="line"><span>ngx.say(&quot;sleep 1&quot;)</span></span></code></pre></div><h4 id="ab测试脚本-总数100-并发100-发送100-100-1次" tabindex="-1">ab测试脚本(总数100, 并发100, 发送100/100 = 1次) <a class="header-anchor" href="#ab测试脚本-总数100-并发100-发送100-100-1次" aria-label="Permalink to &quot;ab测试脚本(总数100, 并发100, 发送100/100 = 1次)&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ab -n 100 -c 100  http://127.0.0.1/search</span></span>
<span class="line"><span>pause</span></span></code></pre></div><h4 id="测试-delay-5-openresty-nginx-config" tabindex="-1">测试 delay=5 openresty nginx.config <a class="header-anchor" href="#测试-delay-5-openresty-nginx-config" aria-label="Permalink to &quot;测试 delay=5  openresty nginx.config&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http {</span></span>
<span class="line"><span>    limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location /search/ {</span></span>
<span class="line"><span>            limit_req zone=one burst=20;</span></span>
<span class="line"><span>            content_by_lua_file lua/sleep.lua;</span></span>
<span class="line"><span>            access_log logs/access.log;</span></span>
<span class="line"><span>        }</span></span></code></pre></div><p><strong>access.log结果</strong></p><p>可以看到</p><p>并发100的情况下:</p><p>一共执行burst=20个, 80个被抛弃(实际情况因为瞬时burst 22 抛弃78)</p><p>第一步先不延迟执行delay=5个(实际情况因为瞬时delay=7)</p><p>第二步每100ms执行一次把剩下的burst-delay 个执行完</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:47 +0800] &quot;GET /limit HTTP/1.0&quot; 503 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:51 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:37:57 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:38:03 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:38:09 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:38:16 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:38:21 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:38:27 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:38:33 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:38:39 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:38:46 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:38:52 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:38:58 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:39:04 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:39:10 +0800] &quot;GET /limit HTTP/1.0&quot; 200 </span></span>
<span class="line"><span>127.0.0.1 - - [10/Aug/2022:09:39:16 +0800] &quot;GET /limit HTTP/1.0&quot; 200</span></span></code></pre></div><h4 id="测试-delay默认值-不填delay参数-delay-0-openresty-nginx-config" tabindex="-1">测试 delay默认值(不填delay参数) (delay=0) openresty nginx.config <a class="header-anchor" href="#测试-delay默认值-不填delay参数-delay-0-openresty-nginx-config" aria-label="Permalink to &quot;测试 delay默认值(不填delay参数) (delay=0) openresty nginx.config&quot;">​</a></h4><p>一共执行20个</p><p>第一步 不延迟执行delay=0个(实际情况因为瞬时delay=1)</p><p>第二步 每100ms执行一次把剩下的burst-delay 个执行完</p><p><strong>access.log结果</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>200*1</span></span>
<span class="line"><span>503*80</span></span>
<span class="line"><span>200*19</span></span></code></pre></div><h4 id="测试-nodelay-openresty-nginx-config" tabindex="-1">测试 nodelay openresty nginx.config <a class="header-anchor" href="#测试-nodelay-openresty-nginx-config" aria-label="Permalink to &quot;测试 nodelay  openresty nginx.config&quot;">​</a></h4><p>一共执行20个</p><p>不延迟执行nodelay 20个</p><p>access.log结果**</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>200*20</span></span>
<span class="line"><span>503*80</span></span></code></pre></div><h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h4><h4 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-label="Permalink to &quot;&quot;">​</a></h4>`,66)]))}const m=a(i,[["render",t]]);export{g as __pageData,m as default};
