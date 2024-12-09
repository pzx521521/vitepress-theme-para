import{_ as s,c as n,a2 as e,o as t}from"./chunks/framework.D_NaTb9t.js";const h=JSON.parse('{"title":"netdata","description":"","frontmatter":{"title":"netdata","hidemeta":true},"headers":[],"relativePath":"posts/Linux/netdata.md","filePath":"posts/Linux/netdata.md"}'),p={name:"posts/Linux/netdata.md"};function c(l,a,o,i,d,r){return t(),n("div",null,a[0]||(a[0]=[e(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run -d --name=netdata \\</span></span>
<span class="line"><span>  -p 19999:19999 \\</span></span>
<span class="line"><span>  -v netdataconfig:/etc/netdata \\</span></span>
<span class="line"><span>  -v netdatalib:/var/lib/netdata \\</span></span>
<span class="line"><span>  -v netdatacache:/var/cache/netdata \\</span></span>
<span class="line"><span>  -v /etc/passwd:/host/etc/passwd:ro \\</span></span>
<span class="line"><span>  -v /etc/group:/host/etc/group:ro \\</span></span>
<span class="line"><span>  -v /proc:/host/proc:ro \\</span></span>
<span class="line"><span>  -v /sys:/host/sys:ro \\</span></span>
<span class="line"><span>  -v /etc/os-release:/host/etc/os-release:ro \\</span></span>
<span class="line"><span>  --restart unless-stopped \\</span></span>
<span class="line"><span>  --cap-add SYS_PTRACE \\</span></span>
<span class="line"><span>  --security-opt apparmor=unconfined \\</span></span>
<span class="line"><span>  netdata/netdata</span></span></code></pre></div>`,1)]))}const v=s(p,[["render",c]]);export{h as __pageData,v as default};
