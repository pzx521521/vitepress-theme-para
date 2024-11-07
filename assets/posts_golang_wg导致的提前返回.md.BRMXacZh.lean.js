import{_ as s,c as a,a0 as p,o as t}from"./chunks/framework.DADtiyJ8.js";const m=JSON.parse('{"title":"wg导致的提前返回","description":"","frontmatter":{"title":"wg导致的提前返回","hidemeta":true},"headers":[],"relativePath":"posts/golang/wg导致的提前返回.md","filePath":"posts/golang/wg导致的提前返回.md"}'),e={name:"posts/golang/wg导致的提前返回.md"};function l(i,n,c,o,r,d){return t(),a("div",null,n[0]||(n[0]=[p(`<h1 id="wg的坑-提前返回值" tabindex="-1">wg的坑, 提前返回值 <a class="header-anchor" href="#wg的坑-提前返回值" aria-label="Permalink to &quot;wg的坑, 提前返回值&quot;">​</a></h1><h4 id="逻辑描述" tabindex="-1">逻辑描述: <a class="header-anchor" href="#逻辑描述" aria-label="Permalink to &quot;逻辑描述:&quot;">​</a></h4><p>给定一个int数组, 返回一个map, 该map包含该数组及对该数组数字的处理</p><h4 id="看一下有问题的代码" tabindex="-1">看一下有问题的代码: <a class="header-anchor" href="#看一下有问题的代码" aria-label="Permalink to &quot;看一下有问题的代码:&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>func sq_map2() map[int]int {</span></span>
<span class="line"><span>	nums := []int{1, 2, 3, 4, 5}</span></span>
<span class="line"><span>	out := make(chan Sq_Record)</span></span>
<span class="line"><span>	m := make(map[int]int)</span></span>
<span class="line"><span>	var wg sync.WaitGroup</span></span>
<span class="line"><span>	wg.Add(len(nums))</span></span>
<span class="line"><span>	for _, i := range nums {</span></span>
<span class="line"><span>		go func(n int) {</span></span>
<span class="line"><span>			out &lt;- Sq_Record{n, n * n}</span></span>
<span class="line"><span>			wg.Done()</span></span>
<span class="line"><span>		}(i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	go func() {</span></span>
<span class="line"><span>		for record := range out {</span></span>
<span class="line"><span>			m[record.num] = record.sq</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}()</span></span>
<span class="line"><span>	wg.Wait()</span></span>
<span class="line"><span>	close(out)</span></span>
<span class="line"><span>	return m</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	for i := 0; i &lt; 1000; i++ {</span></span>
<span class="line"><span>		out2 := sq_map2()</span></span>
<span class="line"><span>		time.Sleep(time.Millisecond)</span></span>
<span class="line"><span>		fmt.Printf(&quot;%v\\n&quot;, len(out2))</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>1000次测试中, map的长度, 大概有一半的情况下会出现为4</p><h4 id="原因" tabindex="-1">原因: <a class="header-anchor" href="#原因" aria-label="Permalink to &quot;原因:&quot;">​</a></h4><p><code>m := make(map[int]int)</code> 因为只有一个线程在操作它, 所以是不存在原子性问题的 m的长度出现4原因是: <strong>提前返回</strong></p><p>在返回m的时候 go func()还在往m里面添加数据, 该gorutine还没有结束的时候, 就去访问m的长度. 导致最后一个map元素在访问长度的时候还没有添加上 验证该原因: 如果改一下测试代码, 结果则全部是5</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>func main() {</span></span>
<span class="line"><span>	for i := 0; i &lt; 1000; i++ {</span></span>
<span class="line"><span>		out2 := sq_map2()</span></span>
<span class="line"><span>		time.Sleep(time.Millisecond)</span></span>
<span class="line"><span>		fmt.Printf(&quot;%v\\n&quot;, len(out2))</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>正确的写法是:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>func sq_map() map[int]int {</span></span>
<span class="line"><span>	nums := []int{1, 2, 3, 4, 5}</span></span>
<span class="line"><span>	out := make(chan Sq_Record)</span></span>
<span class="line"><span>	m := make(map[int]int)</span></span>
<span class="line"><span>	var wg sync.WaitGroup</span></span>
<span class="line"><span>	wg.Add(len(nums))</span></span>
<span class="line"><span>	for _, i := range nums {</span></span>
<span class="line"><span>		go func(n int) {</span></span>
<span class="line"><span>			out &lt;- Sq_Record{n, n * n}</span></span>
<span class="line"><span>			wg.Done()</span></span>
<span class="line"><span>		}(i)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	go func() {</span></span>
<span class="line"><span>		wg.Wait()</span></span>
<span class="line"><span>		close(out)</span></span>
<span class="line"><span>	}()</span></span>
<span class="line"><span>	for record := range out {</span></span>
<span class="line"><span>		m[record.num] = record.sq</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return m</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这样是不会提前返回的</p>`,13)]))}const g=s(e,[["render",l]]);export{m as __pageData,g as default};
