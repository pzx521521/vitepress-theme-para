import{_ as s,c as a,a2 as p,o as e}from"./chunks/framework.D_NaTb9t.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"posts/golang/go-http.md","filePath":"posts/golang/go-http.md"}'),t={name:"posts/golang/go-http.md"};function l(i,n,c,r,o,h){return e(),a("div",null,n[0]||(n[0]=[p(`<p>golang http 包源码简介(中间件实现原理/函数作为接口):</p><p>下面4段代码都可以开启一个http服务,他们有什么区别呢?</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>type myHandler struct {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func (h myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {</span></span>
<span class="line"><span>	io.WriteString(w, &quot;Hello from a HandleFunc #1!\\n&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>func http1() {</span></span>
<span class="line"><span>	h := myHandler{}</span></span>
<span class="line"><span>	log.Fatalln(http.ListenAndServe(&quot;:8000&quot;, h))</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func http2() {</span></span>
<span class="line"><span>	h := myHandler{}</span></span>
<span class="line"><span>	http.Handle(&quot;/hello&quot;, &amp;h)</span></span>
<span class="line"><span>	log.Fatalln(http.ListenAndServe(&quot;:8000&quot;, nil))</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>var h = func(w http.ResponseWriter, r *http.Request) {</span></span>
<span class="line"><span>	w.Write([]byte(&quot;hello&quot;))</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func http3() {</span></span>
<span class="line"><span>	http.ListenAndServe(&quot;:8000&quot;, http.HandlerFunc(h))</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func http4() {</span></span>
<span class="line"><span>	http.HandleFunc(&quot;/hello&quot;, h)</span></span>
<span class="line"><span>	http.ListenAndServe(&quot;:8000&quot;, nil)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>http2 相对 http1 多了 一个路径解析.</p><p>http1 和 http3 是什么区别呢?</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>type Handler interface {</span></span>
<span class="line"><span>	ServeHTTP(ResponseWriter, *Request)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type HandlerFunc func(ResponseWriter, *Request)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ServeHTTP calls f(w, r).</span></span>
<span class="line"><span>func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {</span></span>
<span class="line"><span>   f(w, r)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>http1 一个是类(myHandler)实现了接口(Handler).</p><p>http3 一个是函数(HandlerFunc)也可以实现接口(Handler).</p><p>然后看一下 如何实现中间件:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>func Wrapper(h http.Handler) http.Handler {</span></span>
<span class="line"><span>	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {</span></span>
<span class="line"><span>		w.Write([]byte(&quot;before wrap\\n&quot;))</span></span>
<span class="line"><span>		h.ServeHTTP(w, r)</span></span>
<span class="line"><span>		w.Write([]byte(&quot;after wrap\\n&quot;))</span></span>
<span class="line"><span>	})</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func wrap1() {</span></span>
<span class="line"><span>	h := myHandler{}</span></span>
<span class="line"><span>	log.Fatalln(http.ListenAndServe(&quot;:8000&quot;, Wrapper(h)))</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func wrap2() {</span></span>
<span class="line"><span>	http.ListenAndServe(&quot;:8000&quot;, Wrapper(http.HandlerFunc(h)))</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,10)]))}const g=s(t,[["render",l]]);export{d as __pageData,g as default};
