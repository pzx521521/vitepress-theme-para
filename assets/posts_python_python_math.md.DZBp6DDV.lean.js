import{_ as n,c as a,a2 as p,o as l}from"./chunks/framework.D_NaTb9t.js";const h=JSON.parse('{"title":"python sympy 解方程","description":"","frontmatter":{"title":"python sympy 解方程","hidemeta":true},"headers":[],"relativePath":"posts/python/python_math.md","filePath":"posts/python/python_math.md"}'),e={name:"posts/python/python_math.md"};function i(t,s,c,o,d,x){return l(),a("div",null,s[0]||(s[0]=[p(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from sympy import *</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def test():</span></span>
<span class="line"><span>    x = symbols(&#39;x&#39;)</span></span>
<span class="line"><span>    f = x ** 9</span></span>
<span class="line"><span>    x2 = symbols(&#39;x2&#39;)</span></span>
<span class="line"><span>    g = x2 ** 8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    h = ((f - g) ** 2 + (x - x2) ** 2)</span></span>
<span class="line"><span>    dh = diff(h, x)</span></span>
<span class="line"><span>    dh2 = diff(h, x2)</span></span>
<span class="line"><span>    print(dh)</span></span>
<span class="line"><span>    print(dh2)</span></span>
<span class="line"><span>    s = solve([dh, dh2], [x, x2])</span></span>
<span class="line"><span>    print(s)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def demo1():</span></span>
<span class="line"><span>    # 解方程 有限解</span></span>
<span class="line"><span>    # 定义变量</span></span>
<span class="line"><span>    x = Symbol(&#39;x&#39;)</span></span>
<span class="line"><span>    fx = x * 3 + 9</span></span>
<span class="line"><span>    # 可求解直接给出解向量</span></span>
<span class="line"><span>    print(solve(fx, x))</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def demo2():</span></span>
<span class="line"><span>    # 解方程无穷多解</span></span>
<span class="line"><span>    # 定义变量</span></span>
<span class="line"><span>    x = Symbol(&#39;x&#39;)</span></span>
<span class="line"><span>    y = Symbol(&#39;y&#39;)</span></span>
<span class="line"><span>    fx = x * 3 + y ** 2</span></span>
<span class="line"><span>    # 得到是x与y的关系式，</span></span>
<span class="line"><span>    print(solve(fx, x, y))</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def demo3():</span></span>
<span class="line"><span>    # 解方程组</span></span>
<span class="line"><span>    # 定义变量</span></span>
<span class="line"><span>    x = Symbol(&#39;x&#39;)</span></span>
<span class="line"><span>    y = Symbol(&#39;y&#39;)</span></span>
<span class="line"><span>    f1 = x + y - 3</span></span>
<span class="line"><span>    f2 = x - y + 5</span></span>
<span class="line"><span>    print(solve([f1, f2], [x, y]))</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>test()</span></span></code></pre></div>`,1)]))}const m=n(e,[["render",i]]);export{h as __pageData,m as default};
