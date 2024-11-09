import{_ as s,c as n,a2 as p,o as t}from"./chunks/framework.DDqBDuc9.js";const u=JSON.parse('{"title":"golang tcp6 网无法访问","description":"","frontmatter":{"title":"golang tcp6 网无法访问","hidemeta":true},"headers":[],"relativePath":"posts/单片机/tcp46.md","filePath":"posts/单片机/tcp46.md"}'),e={name:"posts/单片机/tcp46.md"};function l(i,a,o,c,r,h){return t(),n("div",null,a[0]||(a[0]=[p(`<h1 id="记一次golang服务外网无法访问的问题" tabindex="-1">记一次golang服务外网无法访问的问题 <a class="header-anchor" href="#记一次golang服务外网无法访问的问题" aria-label="Permalink to &quot;记一次golang服务外网无法访问的问题&quot;">​</a></h1><h2 id="tcp6导致的外网无法访问" tabindex="-1">TCP6导致的外网无法访问 <a class="header-anchor" href="#tcp6导致的外网无法访问" aria-label="Permalink to &quot;TCP6导致的外网无法访问&quot;">​</a></h2><p>golang 代码如下:</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;io&quot;</span></span>
<span class="line"><span>	&quot;log&quot;</span></span>
<span class="line"><span>	&quot;net/http&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>func HelloServer(w http.ResponseWriter, req *http.Request) {</span></span>
<span class="line"><span>	io.WriteString(w, time.Now().String())</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	http.HandleFunc(&quot;/&quot;, HelloServer)</span></span>
<span class="line"><span>	err := http.ListenAndServe(&quot;:8080&quot;, nil)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		log.Fatal(&quot;ListenAndServe: &quot;, err)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>发现 用域名访问信息 <a href="https://xxxx:8080" target="_blank" rel="noreferrer">https://xxxx:8080</a> 无法显示</p><p>发现 用ip访问信息 {ip}:8080 无法显示</p><p>使用 netstat -antlp 之后发现 仅仅开了tcp6的端口而没有tcp的端口, 因此猜测是tcp6 导致的</p><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h4ukyatyx4j30o004e77q.jpg" alt="QQ截图20220804113739.png"></p><h2 id="解决方案1-修改tcp6为tcp4" tabindex="-1">解决方案1 修改tcp6为tcp4 <a class="header-anchor" href="#解决方案1-修改tcp6为tcp4" aria-label="Permalink to &quot;解决方案1 修改tcp6为tcp4&quot;">​</a></h2><p><a href="https://stackoverflow.com/questions/38592064/listen-on-tcp4-not-tcp6/38592286#38592286" target="_blank" rel="noreferrer">参考</a>, 修改代码如下:</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;io&quot;</span></span>
<span class="line"><span>	&quot;log&quot;</span></span>
<span class="line"><span>	&quot;net&quot;</span></span>
<span class="line"><span>	&quot;net/http&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func HelloServer(w http.ResponseWriter, req *http.Request) {</span></span>
<span class="line"><span>	io.WriteString(w, time.Now().String())</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	http.HandleFunc(&quot;/&quot;, HelloServer)</span></span>
<span class="line"><span>	l, err := net.Listen(&quot;tcp4&quot;, &quot;:8080&quot;)</span></span>
<span class="line"><span>	err = http.Serve(l, nil)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		log.Fatal(&quot;ListenAndServe: &quot;, err)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>就可发现 tcp6的端口而没有tcp的端口(ps: 修改为 tcp 没有效果)</p><h2 id="解决方案2-centos设置tcp4转发tcp6" tabindex="-1">解决方案2 centos设置tcp4转发tcp6 <a class="header-anchor" href="#解决方案2-centos设置tcp4转发tcp6" aria-label="Permalink to &quot;解决方案2 centos设置tcp4转发tcp6&quot;">​</a></h2><p>上面的办法不是很好, 正确的方式应该是 开启ipv4端口转发</p><p><a href="https://blog.csdn.net/zhouzhou992/article/details/122697920" target="_blank" rel="noreferrer">参考</a></p><h3 id="临时设置-重启网卡或服务器后会丢失配置" tabindex="-1">临时设置(重启网卡或服务器后会丢失配置) <a class="header-anchor" href="#临时设置-重启网卡或服务器后会丢失配置" aria-label="Permalink to &quot;临时设置(重启网卡或服务器后会丢失配置)&quot;">​</a></h3><ol><li>检查是否开启ipv4端口转发</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sysctl net.ipv4.ip_forward</span></span></code></pre></div><ol start="2"><li>若指令返回结果为net.ipv4.ip_forward = 0，执行如下指令</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>echo 1 &gt; /proc/sys/net/ipv4/ip_forward</span></span>
<span class="line"><span>sysctl -w net.ipv4.ip_forward=1</span></span></code></pre></div><h3 id="永久设置" tabindex="-1">永久设置 <a class="header-anchor" href="#永久设置" aria-label="Permalink to &quot;永久设置&quot;">​</a></h3><p>修改/etc/sysctl.conf文件</p><p>添加或修改:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">net.ipv4.ip_forward</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=1</span></span></code></pre></div><p>加载配置</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sysctl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/sysctl.conf</span></span></code></pre></div><h3 id="检查" tabindex="-1">检查 <a class="header-anchor" href="#检查" aria-label="Permalink to &quot;检查&quot;">​</a></h3><p>完成后通过netstat -antlpu 仍旧显示只有tcp6，但是此时通过ipv4地址是可以访问了。</p><h2 id="cloudflare-导致的https-无法访问的问题" tabindex="-1">cloudflare 导致的https 无法访问的问题 <a class="header-anchor" href="#cloudflare-导致的https-无法访问的问题" aria-label="Permalink to &quot;cloudflare 导致的https 无法访问的问题&quot;">​</a></h2><p>但是 https 是无法访问的, 原因是 经过了cloudflare的CDN</p><p>只允许80 443 过 https, 不用cloudflare做ssl, 或者不用https 即可</p>`,31)]))}const g=s(e,[["render",l]]);export{u as __pageData,g as default};
