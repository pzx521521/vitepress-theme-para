import{_ as s,c as a,a0 as t,o as p}from"./chunks/framework.DADtiyJ8.js";const m=JSON.parse('{"title":"golang http demo","description":"","frontmatter":{"title":"golang http demo","hidemeta":true},"headers":[],"relativePath":"posts/golang/simple_http_golang.md","filePath":"posts/golang/simple_http_golang.md"}'),e={name:"posts/golang/simple_http_golang.md"};function l(o,n,i,u,r,c){return p(),a("div",null,n[0]||(n[0]=[t(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;io&quot;</span></span>
<span class="line"><span>	&quot;net&quot;</span></span>
<span class="line"><span>	&quot;net/http&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	mux := http.NewServeMux()</span></span>
<span class="line"><span>	mux.HandleFunc(&quot;/webhook&quot;, webhook)</span></span>
<span class="line"><span>	l, _ := net.Listen(&quot;tcp4&quot;, &quot;:80&quot;)</span></span>
<span class="line"><span>	err := http.Serve(l, mux)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		fmt.Printf(&quot;%v\\n&quot;, err)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func webhook(w http.ResponseWriter, r *http.Request) {</span></span>
<span class="line"><span>	fmt.Printf(&quot;%v\\n&quot;, r.Header)</span></span>
<span class="line"><span>	fmt.Printf(&quot;%v\\n&quot;, &quot;Body:&quot;)</span></span>
<span class="line"><span>	all, _ := io.ReadAll(r.Body)</span></span>
<span class="line"><span>	fmt.Printf(&quot;%v\\n&quot;, all)</span></span>
<span class="line"><span>	fmt.Printf(&quot;%v\\n&quot;, r.URL.Path)</span></span>
<span class="line"><span>	fmt.Printf(&quot;%v\\n&quot;, r.URL.Query())</span></span>
<span class="line"><span>	w.Write([]byte(fmt.Sprintf(&quot;%v\\n&quot;, &quot;Header:&quot;)))</span></span>
<span class="line"><span>	w.Write([]byte(fmt.Sprintf(&quot;%v\\n\\n\\n&quot;, r.Header)))</span></span>
<span class="line"><span>	w.Write([]byte(fmt.Sprintf(&quot;%v\\n&quot;, &quot;Body:&quot;)))</span></span>
<span class="line"><span>	w.Write([]byte(fmt.Sprintf(&quot;%v\\n\\n\\n&quot;, all)))</span></span>
<span class="line"><span>	w.Write([]byte(fmt.Sprintf(&quot;%v\\n&quot;, &quot;Query:&quot;)))</span></span>
<span class="line"><span>	w.Write([]byte(fmt.Sprintf(&quot;%v\\n\\n\\n&quot;, r.RequestURI)))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div>`,1)]))}const f=s(e,[["render",l]]);export{m as __pageData,f as default};
