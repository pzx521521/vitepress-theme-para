import{_ as s,c as e,a0 as t,o as n}from"./chunks/framework.DADtiyJ8.js";const u=JSON.parse('{"title":"Tor","description":"","frontmatter":{},"headers":[],"relativePath":"posts/杂记/tor介绍.md","filePath":"posts/杂记/tor介绍.md"}'),i={name:"posts/杂记/tor介绍.md"};function l(o,a,p,r,c,d){return n(),e("div",null,a[0]||(a[0]=[t(`<h1 id="tor" tabindex="-1">Tor <a class="header-anchor" href="#tor" aria-label="Permalink to &quot;Tor&quot;">​</a></h1><h2 id="简介" tabindex="-1">简介: <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介:&quot;">​</a></h2><p>结尾是.onion的网络</p><h2 id="服务器端搭建" tabindex="-1">服务器端搭建 <a class="header-anchor" href="#服务器端搭建" aria-label="Permalink to &quot;服务器端搭建&quot;">​</a></h2><ul><li>安装</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>yum -y install tor</span></span>
<span class="line"><span>yum -y install nginx</span></span>
<span class="line"><span>systemctl start nginx</span></span></code></pre></div><ul><li>修改配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>vi /etc/tor/torrc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>HiddenServiceDir /var/lib/tor/my-website/</span></span>
<span class="line"><span>HiddenServicePort 80 127.0.0.1:80</span></span></code></pre></div><p>HiddenServiceDir: 其中应包含 Onion 服务的信息和加密密钥</p><ul><li>开启服务</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>systemctl start tor</span></span>
<span class="line"><span>systemctl status tor</span></span></code></pre></div><h3 id="客户端访问" tabindex="-1">客户端访问 <a class="header-anchor" href="#客户端访问" aria-label="Permalink to &quot;客户端访问&quot;">​</a></h3><p><a href="https://www.torproject.org/download/" target="_blank" rel="noreferrer">浏览器下载</a></p>`,13)]))}const b=s(i,[["render",l]]);export{u as __pageData,b as default};
