import{_ as s,c as n,a2 as p,o as e}from"./chunks/framework.D_NaTb9t.js";const u=JSON.parse('{"title":"上拉电阻和下拉电阻的模拟","description":"","frontmatter":{"title":"上拉电阻和下拉电阻的模拟","hidemeta":true},"headers":[],"relativePath":"posts/单片机/MCU/wokwi-UNO.md","filePath":"posts/单片机/MCU/wokwi-UNO.md"}'),i={name:"posts/单片机/MCU/wokwi-UNO.md"};function l(t,a,c,o,d,r){return e(),n("div",null,a[0]||(a[0]=[p(`<h1 id="wokwi-运行不了解决办法" tabindex="-1">wokwi 运行不了解决办法: <a class="header-anchor" href="#wokwi-运行不了解决办法" aria-label="Permalink to &quot;wokwi 运行不了解决办法:&quot;">​</a></h1><p>因为引用了github里面的asm, 所以github必须通, 可以翻墙/其他方法 解决</p><p>看控制台就知道了</p><h1 id="上拉电阻和下拉电阻的模拟" tabindex="-1"><a href="https://www.bilibili.com/video/BV1H5411d7tr/" target="_blank" rel="noreferrer">上拉电阻和下拉电阻的模拟</a> <a class="header-anchor" href="#上拉电阻和下拉电阻的模拟" aria-label="Permalink to &quot;[上拉电阻和下拉电阻的模拟](https://www.bilibili.com/video/BV1H5411d7tr/)&quot;">​</a></h1><h2 id="为什么需要上拉和下拉电阻" tabindex="-1">为什么需要上拉和下拉电阻: <a class="header-anchor" href="#为什么需要上拉和下拉电阻" aria-label="Permalink to &quot;为什么需要上拉和下拉电阻:&quot;">​</a></h2><p>开关在断开的情况下, 因为有板载电压, 所以电压是不稳定的</p><h2 id="电压不稳定试验" tabindex="-1">电压不稳定试验: <a class="header-anchor" href="#电压不稳定试验" aria-label="Permalink to &quot;电压不稳定试验:&quot;">​</a></h2><p>因为MCU本身是有电阻的, 对于正常的引脚, 其 电压不是固定的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void setup() {</span></span>
<span class="line"><span>  Serial.begin(9600);</span></span>
<span class="line"><span>  pinMode(3, INPUT);</span></span>
<span class="line"><span>  pinMode(A0, INPUT);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void loop() {</span></span>
<span class="line"><span>  //3口的数字电路(0/1)</span></span>
<span class="line"><span>  Serial.print(&quot;3 B:&quot;);</span></span>
<span class="line"><span>  Serial.println(digitalRead(3));</span></span>
<span class="line"><span>  //0-255</span></span>
<span class="line"><span>  //analogWrite(A0, 150);</span></span>
<span class="line"><span>  //A0口的数字电路(0/1)</span></span>
<span class="line"><span>  Serial.println(digitalRead(A0));</span></span>
<span class="line"><span>  //A0口的模拟电路(0-1023)</span></span>
<span class="line"><span>  //此函数返回0到1023之间的数字，表示0到5伏特之间的电压。例如，如果施加到编号0的引脚的电压为2.5V，则analogRead(0)返回512。</span></span>
<span class="line"><span>  Serial.print(&quot;A0 v-num:&quot;);</span></span>
<span class="line"><span>  Serial.println( + analogRead(A0));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  delay(1000);</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>Simulation</span></span>
<span class="line"><span>3 B:0</span></span>
<span class="line"><span>A0 B:0</span></span>
<span class="line"><span>A0 v-num:762</span></span>
<span class="line"><span>3 B:0</span></span>
<span class="line"><span>A0 B:0</span></span>
<span class="line"><span>A0 v-num:782</span></span>
<span class="line"><span>3 B:0</span></span>
<span class="line"><span>A0 B:0</span></span>
<span class="line"><span>A0 v-num:757</span></span></code></pre></div><p>可以看到 A0的电压是不稳定的</p><h2 id="上拉电阻" tabindex="-1">上拉电阻: <a class="header-anchor" href="#上拉电阻" aria-label="Permalink to &quot;上拉电阻:&quot;">​</a></h2><p>电路图:</p><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5iybm6qvaj30jc0c275k.jpg" alt="image.png"></p><p>在A0上做试验: 一端接A0, 一端接VCC</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>3 B:0</span></span>
<span class="line"><span>A0 B:1</span></span>
<span class="line"><span>A0 v-num:1023</span></span></code></pre></div><p>添加上述电路图:</p><p>按下按钮后</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>3 B:0</span></span>
<span class="line"><span>A0 B:0</span></span>
<span class="line"><span>A0 v-num:0</span></span></code></pre></div><h2 id="下拉电阻" tabindex="-1">下拉电阻: <a class="header-anchor" href="#下拉电阻" aria-label="Permalink to &quot;下拉电阻:&quot;">​</a></h2><p>电路图把VCC 和GND 换位置即可</p><p>在A0上做试验: 一端接A0, 一端接地(GND)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>3 B:0</span></span>
<span class="line"><span>A0 B:0</span></span>
<span class="line"><span>A0 v-num:0</span></span></code></pre></div><p>添加开关, 并按下开关后</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>3 B:0</span></span>
<span class="line"><span>A0 B:1</span></span>
<span class="line"><span>A0 v-num:1023</span></span></code></pre></div>`,25)]))}const g=s(i,[["render",l]]);export{u as __pageData,g as default};
