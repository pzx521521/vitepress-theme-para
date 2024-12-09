import{_ as s,c as n,a2 as e,o as t}from"./chunks/framework.D_NaTb9t.js";const h=JSON.parse('{"title":"expvar 简单使用","description":"","frontmatter":{"title":"expvar 简单使用","hidemeta":true},"headers":[],"relativePath":"posts/golang/expvar.md","filePath":"posts/golang/expvar.md"}'),p={name:"posts/golang/expvar.md"};function i(o,a,l,r,c,d){return t(),n("div",null,a[0]||(a[0]=[e(`<h1 id="expvar-简单使用" tabindex="-1"><a href="https://pkg.go.dev/expvar" target="_blank" rel="noreferrer">expvar 简单使用</a> <a class="header-anchor" href="#expvar-简单使用" aria-label="Permalink to &quot;[expvar 简单使用](https://pkg.go.dev/expvar)&quot;">​</a></h1><blockquote><p>Package expvar provides a standardized interface to public variables, such as operation counters in servers. It exposes these variables via HTTP at <strong>/debug/vars</strong> in JSON format.</p></blockquote><blockquote><p>In addition to adding the HTTP handler, this package registers the following variables:</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cmdline   os.Args</span></span>
<span class="line"><span>memstats  runtime.Memstats</span></span></code></pre></div><blockquote><p>The package is sometimes only imported for the side effect of registering its HTTP handler and the above variables. To use it this way, link this package into your program:</p></blockquote><p>导入包就是使用了, 会自动添加一个**/debug/vars**的http 服务, 具体实现看源码, 很简单,</p><p>有一个多线程 map读写锁的实现</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import _ &quot;expvar&quot;</span></span></code></pre></div><h1 id="一个简单的http" tabindex="-1">一个简单的http: <a class="header-anchor" href="#一个简单的http" aria-label="Permalink to &quot;一个简单的http:&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;expvar&quot;</span></span>
<span class="line"><span>	&quot;net/http&quot;</span></span>
<span class="line"><span>	&quot;time&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func testData() any {</span></span>
<span class="line"><span>	return &quot;hello expvar&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	test := expvar.NewMap(&quot;Test&quot;)</span></span>
<span class="line"><span>	test.Add(&quot;go&quot;, 10)</span></span>
<span class="line"><span>	test.Add(&quot;go1&quot;, 10)</span></span>
<span class="line"><span>	aliveOfSeconds := expvar.NewInt(&quot;aliveOfSeconds&quot;)</span></span>
<span class="line"><span>	expvar.NewString(&quot;TestString&quot;).Set(&quot;this is a test string&quot;)</span></span>
<span class="line"><span>	expvar.Publish(&quot;TestFunc&quot;, expvar.Func(testData))</span></span>
<span class="line"><span>	go http.ListenAndServe(&quot;:8080&quot;, nil)</span></span>
<span class="line"><span>	for {</span></span>
<span class="line"><span>		aliveOfSeconds.Add(1)</span></span>
<span class="line"><span>		time.Sleep(1 * time.Second)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,10)]))}const v=s(p,[["render",i]]);export{h as __pageData,v as default};
