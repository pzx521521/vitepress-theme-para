import{_ as a,c as s,a2 as p,o as i}from"./chunks/framework.D_NaTb9t.js";const h=JSON.parse('{"title":"ESP8266开发板的使用","description":"","frontmatter":{"title":"ESP8266开发板的使用","hidemeta":true},"headers":[],"relativePath":"posts/单片机/MCU/ESP8266_CP340.md","filePath":"posts/单片机/MCU/ESP8266_CP340.md"}'),l={name:"posts/单片机/MCU/ESP8266_CP340.md"};function e(t,n,o,r,c,d){return i(),s("div",null,n[0]||(n[0]=[p(`<h1 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h1><p><strong>纯新手程序员</strong>, 想体验一下物联网,打算做一个联网控制的开关.</p><p>搜了一下最便宜的就是ESP8226,教程也多.</p><p>有服务器,打算自己搭建MQTT(by RabiitMQ)来控制, 不好搞就http/tcp来控制</p><p>用游戏引擎Godot开发跨平台程序, 不好搞就android原生开发或者网页开发</p><p>下面是单片机相关的开发的学习过程</p><h2 id="价格" tabindex="-1">价格 <a class="header-anchor" href="#价格" aria-label="Permalink to &quot;价格&quot;">​</a></h2><p>ESP8266开发板的使用过程, 长这个样子,是ESP-12E加上<strong>CH340</strong>之后加电压转换等模块后的一个开发板, 在淘宝的大树聚买的,9.9板子的费用+3块钱的运费</p><p><img src="http://www.taichi-maker.com/wp-content/uploads/2017/12/NodeMCU2.jpg" alt="图片如下"></p><h2 id="参考教程" tabindex="-1">参考教程 <a class="header-anchor" href="#参考教程" aria-label="Permalink to &quot;参考教程&quot;">​</a></h2><p>参考的是<a href="http://www.taichi-maker.com/" target="_blank" rel="noreferrer">太极创客</a>的教程, 用的是<strong>Arduino</strong>(C++)开发的.</p><p>bilibili<a href="https://www.bilibili.com/video/BV1L7411c7jw?p=5" target="_blank" rel="noreferrer">视频链接</a></p><p>ps: 他开发板卖的是真的贵</p><h2 id="主流开发方式如" tabindex="-1">主流开发方式如: <a class="header-anchor" href="#主流开发方式如" aria-label="Permalink to &quot;主流开发方式如:&quot;">​</a></h2><p>我们要知道想在单片机上跑程序,要把代码编译为2进制程序(.bin/.hex)给单片机用,你可以用汇编编译.</p><p>也可以用其他的高级语言编译, 下面是一些编译方式, 具体用每一个编译器开发过程不再这里讲述,大概说一下他们之间的区别</p><ul><li><p>RTOS</p><p>RTOS是一个单片机系统,实现了多用户管理, 官方给了一套SDK(C/C++语言),可以调用SDK里面的接口实现控制单片机的目的,SDK中还用cmake给官方的编译器说了怎么编译,使用该套SDK编译出来的程序可以在RTOS中跑.</p><p>注意RTOS的SDK不支持AT</p></li><li><p>NonOS</p><p>NonOS是none os 没有系统的意思, 官方给了另外一套SDK(C/C++语言),可以调用SDK里面的接口实现控制单片机的目的,无需安装任何单片机系统.SDK中使用makefile指导编译器怎么编译.使用使用该套SDK编译出来的程序可以在RTOS中跑.</p><p>我买的默认刷的固件就是这个.可以直接使用AT.什么是AT:可以理解为用串口通信控制wifi的一些指令.用于其他芯片使用8226作为wifi模块,对wifi的控制</p></li><li><p>MircroPython</p><p>python针对单片机的编译器,支持了8226,据说支持了该芯片大部分操作</p></li><li><p>Arduino</p><p>是一个C/C++编译器,有一个老师嫌弃学生学一个单片机开发太麻烦了, 要先写代码, 然后读手册,烧录.</p><p>学几天都学不会.然后出了一套电路板,给学生学习,同时出了ArduinoIDE用于敲代码和烧录.</p><p>然后大家发现都很好用, 由于是开源的, 有人做了<a href="https://wokwi.com/" target="_blank" rel="noreferrer">wokwi-Arduino在线模拟</a></p><p>有人做了对各种开发板的支持.发展到现在云平台也做.</p><p>对8226做了支持,应该也支持了该芯片的所有功能</p></li><li><p>NodeMcu</p><p>是一个Lua编译器,8226是一家叫乐鑫的公司生产的,他们单独开发了一个Lua编译器</p></li><li><p>AliOS</p><p>同RTOS, 阿里出的</p></li><li><p>tinygo</p><p>同MircroPython, 是一个golang的编译器,仅支持芯片的部分功能,如wifi都不支持!</p></li></ul><h2 id="开发板每一个针脚的作用" tabindex="-1">开发板每一个针脚的作用 <a class="header-anchor" href="#开发板每一个针脚的作用" aria-label="Permalink to &quot;开发板每一个针脚的作用&quot;">​</a></h2><p>视频第2章讲了开发板的,及其对ESP-12E的封装看一下, 了解一下每一个针脚的意思和作用:</p><p><img src="http://www.taichi-maker.com/wp-content/uploads/2016/12/esp8266_devkit_horizontal-01.png" alt=""></p><ul><li><p>灰色中的数字代表对应ESP芯片上的端口的Number.</p><ul><li><p>敲代码的时候可以用过该ID来区分是引脚, 在Arduino也可以通过板子上的名称来控制.</p></li><li><p>如digitalWrite(D2, HIGH)和或digitalWrite(19, HIGH)效果是一样的, 实现就是定义一个变量const D2=19</p></li><li><p>有一个注意点,不能对板子的口子上接5V的电压,要3.3V的,否则板子会烧掉</p></li></ul></li><li><p>深蓝色是对应ESP芯片上端口的名称</p><ul><li>GPIO(general-purpose input/output),通用输入输出接口,可以读取/写入高电平和低电平(就是01)</li><li>Pwm 数值范围是0-1023</li></ul></li><li><p>浅蓝色指的是实现某可以具体功能的接口</p><ul><li>U0/1TXD | U0/1RXD. <ul><li>TXD(Transmit Data 发送数据) RXD: (Receive Data 接收数据), 有2对4个用于向开发板中刷数据,尽量不要用</li></ul></li><li>SPIxxx 用于SPI串口通信</li></ul></li><li><p>绿色的ADC是一个模拟引脚,</p><ul><li>其他的都是数字引脚,模拟引脚就是可以读取具体电压的数值,数字引脚就是只能读出来01.</li><li>读出电压值有什么用?比如一个温度器传感器,其实就是一个热敏电阻,温度改变,阻值也改变,通过电压变化就可以知道对应的温度.</li><li>注意只能输入0-1V的电压,高了会烧掉</li></ul></li><li><p>红色vin图上写了是电源, 可以不通过USB供电</p><ul><li>和PGIO一样不要输入3.3V以上的电压</li></ul></li></ul><h1 id="使用arduino开发esp8226" tabindex="-1">使用Arduino开发ESP8226 <a class="header-anchor" href="#使用arduino开发esp8226" aria-label="Permalink to &quot;使用Arduino开发ESP8226&quot;">​</a></h1><p>因为烧录程序需要一个USB转TTL的工具,有几个芯片可以实现这个功能, 根据芯片型号进行区分: CH340, CP210X</p><p>开发板把这个工具集成到开发板中了,但是从外表也看不出来他是什么芯片,就下了CP210X, 下完后看了一下居然是CH340的.他们是兼容的?暂时不做研究.</p><h2 id="下载并安装驱动" tabindex="-1">下载并安装驱动 <a class="header-anchor" href="#下载并安装驱动" aria-label="Permalink to &quot;下载并安装驱动&quot;">​</a></h2><h3 id="ch210x" tabindex="-1">CH210X <a class="header-anchor" href="#ch210x" aria-label="Permalink to &quot;CH210X&quot;">​</a></h3><p><a href="https://cn.silabs.com/developers/usb-to-uart-bridge-vcp-drivers" target="_blank" rel="noreferrer">官方驱动网址</a></p><p>各种版本的都有windows下的版本很多, macos, linux 都很好理解</p><p>解释几个windows驱动的区别:</p><ul><li>CP210x Universal Windows Driver <ul><li>windows UWD, 就是win8及以上的系统用这个</li><li>根据自己的系统选择64/32位,是一个.sys文件,放在C:\\Windows\\System32\\drivers下即可</li><li>正常来说要regsvr32注册一下的,和注册dll一样</li><li>用按WIN+R组合键，在运行框中输入：regsvr32 .sys文件所在全路径，注意有空格</li></ul></li><li>CP210x Windows Drivers <ul><li>这个就是win7及以下的,根据自己的系统选择64/32位exe, 双击安装即可</li></ul></li></ul><h3 id="ch340" tabindex="-1">CH340 <a class="header-anchor" href="#ch340" aria-label="Permalink to &quot;CH340&quot;">​</a></h3><p><a href="https://www.wch.cn/search?t=all&amp;q=ch340" target="_blank" rel="noreferrer">官方驱动网址</a></p><p>在 驱动&amp;工具 中找 CH340/CH341的USB转串口, 有MacOS, Linux, windows, android.</p><h2 id="测试驱动有没有安装成功" tabindex="-1">测试驱动有没有安装成功 <a class="header-anchor" href="#测试驱动有没有安装成功" aria-label="Permalink to &quot;测试驱动有没有安装成功&quot;">​</a></h2><h3 id="注意数据线" tabindex="-1">注意数据线 <a class="header-anchor" href="#注意数据线" aria-label="Permalink to &quot;注意数据线&quot;">​</a></h3><p>插上开发板, 注意不要用仅2电源线的USB线.带数据传输的USB线插上开发板LED会闪一下,电源线不会</p><h4 id="windows" tabindex="-1">windows <a class="header-anchor" href="#windows" aria-label="Permalink to &quot;windows&quot;">​</a></h4><p>windows下载设备管理器的</p><p>端口(COM和LPT)中可以看到多了一个设备, COM3就是串口号</p><h4 id="macos" tabindex="-1">MacOS <a class="header-anchor" href="#macos" aria-label="Permalink to &quot;MacOS&quot;">​</a></h4><p>控制台输入</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ls /dev/tty.wchusbser*</span></span></code></pre></div><p>提示</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/dev/tty.wchusbserial1420</span></span></code></pre></div><p>这个1420就是串口号</p><h2 id="为esp8266-nodemcu搭建arduino-ide开发环境" tabindex="-1"><a href="http://www.taichi-maker.com/homepage/esp8266-nodemcu-iot/iot-c/nodemcu-arduino-ide/" target="_blank" rel="noreferrer">为ESP8266-NodeMCU搭建Arduino IDE开发环境</a> <a class="header-anchor" href="#为esp8266-nodemcu搭建arduino-ide开发环境" aria-label="Permalink to &quot;[为ESP8266-NodeMCU搭建Arduino IDE开发环境](http://www.taichi-maker.com/homepage/esp8266-nodemcu-iot/iot-c/nodemcu-arduino-ide/)&quot;">​</a></h2><h3 id="下载arduino-ide" tabindex="-1">下载Arduino IDE <a class="header-anchor" href="#下载arduino-ide" aria-label="Permalink to &quot;下载Arduino IDE&quot;">​</a></h3><p><a href="https://www.arduino.cc/en/software" target="_blank" rel="noreferrer">地址在这</a></p><p>没有代码提示,编译超慢</p><h3 id="添加esp8226的源" tabindex="-1">添加ESP8226的源 <a class="header-anchor" href="#添加esp8226的源" aria-label="Permalink to &quot;添加ESP8226的源&quot;">​</a></h3><p>因为默认不支持ESP8226, 在<strong>Arduino IDE 首选项</strong>中的<strong>附加开发板管理网址</strong>输入, 并点击确定:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http://arduino.esp8266.com/stable/package_esp8266com_index.json</span></span></code></pre></div><h3 id="添加开发板模版" tabindex="-1">添加开发板模版 <a class="header-anchor" href="#添加开发板模版" aria-label="Permalink to &quot;添加开发板模版&quot;">​</a></h3><p>Arduino IDE-&gt;工具-&gt;开发板-&gt;开发板管理器</p><p>搜索esp8266, 安装即可, 这个其实就相当于makefile,里面还有很多示例</p><p>windows下没有碰到问题</p><p>mac下github有可能不通导致安装失败, 翻墙/改DNS即可</p><h3 id="测试程序和自动烧录烧录" tabindex="-1">测试程序和自动烧录烧录 <a class="header-anchor" href="#测试程序和自动烧录烧录" aria-label="Permalink to &quot;测试程序和自动烧录烧录&quot;">​</a></h3><h4 id="选择测试程序" tabindex="-1">选择测试程序 <a class="header-anchor" href="#选择测试程序" aria-label="Permalink to &quot;选择测试程序&quot;">​</a></h4><p>Arduino IDE-&gt;文件-&gt;示例-&gt;01.Basic-&gt;Blink</p><p>看下代码很简单的代码, 开发板等1s一闪</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>void setup() {</span></span>
<span class="line"><span>  // initialize digital pin LED_BUILTIN as an output.</span></span>
<span class="line"><span>  pinMode(LED_BUILTIN, OUTPUT);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// the loop function runs over and over again forever</span></span>
<span class="line"><span>void loop() {</span></span>
<span class="line"><span>  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)</span></span>
<span class="line"><span>  delay(1000);                       // wait for a second</span></span>
<span class="line"><span>  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW</span></span>
<span class="line"><span>  delay(1000);                       // wait for a second</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="选择开发板和串口号以供自动烧录" tabindex="-1">选择开发板和串口号以供自动烧录 <a class="header-anchor" href="#选择开发板和串口号以供自动烧录" aria-label="Permalink to &quot;选择开发板和串口号以供自动烧录&quot;">​</a></h4><p>Arduino IDE-&gt;工具-&gt;端口 选择刚才看到的串口号</p><p>Arduino IDE-&gt;工具-&gt;开发板-&gt;esp8226-&gt;NodeMCU1.0(ESP-12E)</p><h4 id="编译并上传到开发板" tabindex="-1">编译并上传到开发板 <a class="header-anchor" href="#编译并上传到开发板" aria-label="Permalink to &quot;编译并上传到开发板&quot;">​</a></h4><p>Arduino IDE-&gt;点击编译(验证)/上传</p><p>点击编译(验证) 会编译程序</p><p>点击上传 如果没有编译会先编译再上传</p><h2 id="网络相关" tabindex="-1">网络相关 <a class="header-anchor" href="#网络相关" aria-label="Permalink to &quot;网络相关&quot;">​</a></h2><p>ESP8226可以AP(WirelessAccessPoint)模式,接入点模式, 建立一个网络, 当做服务器来使用. 就是所谓的组网/网关</p><p>也可以STA(Station))终端模式, 加入其他的网络</p><p>也可以同时存在</p><p><a href="https://github.com/esp8266/Arduino" target="_blank" rel="noreferrer">代码在这</a></p><p><a href="https://arduino-esp8266.readthedocs.io/en/latest/" target="_blank" rel="noreferrer">文档在这</a></p><h3 id="ap模式" tabindex="-1">AP模式 <a class="header-anchor" href="#ap模式" aria-label="Permalink to &quot;AP模式&quot;">​</a></h3><h4 id="最简单的示例" tabindex="-1">最简单的示例 <a class="header-anchor" href="#最简单的示例" aria-label="Permalink to &quot;最简单的示例&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;ESP8266WiFi.h&gt;  </span></span>
<span class="line"><span>const char *ssid = &quot;ESP8226&quot;; // 这里定义将要建立的WiFi名称。此处以&quot;taichi-maker&quot;为示例</span></span>
<span class="line"><span>                                   // 您可以将自己想要建立的WiFi名称填写入此处的双引号中</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>const char *password = &quot;12345678&quot;;  // 这里定义将要建立的WiFi密码。此处以12345678为示例</span></span>
<span class="line"><span>                                    // 您可以将自己想要使用的WiFi密码放入引号内</span></span>
<span class="line"><span>                                    // 如果建立的WiFi不要密码，则在双引号内不要填入任何信息</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>void setup() {</span></span>
<span class="line"><span>  Serial.begin(9600);              // 启动串口通讯</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  WiFi.softAP(ssid, password);     // 此语句是重点。WiFi.softAP用于启动NodeMCU的AP模式。</span></span>
<span class="line"><span>                                   // 括号中有两个参数，ssid是WiFi名。password是WiFi密码。</span></span>
<span class="line"><span>                                   // 这两个参数具体内容在setup函数之前的位置进行定义。</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Serial.print(&quot;Access Point: &quot;);    // 通过串口监视器输出信息</span></span>
<span class="line"><span>  Serial.println(ssid);              // 告知用户NodeMCU所建立的WiFi名</span></span>
<span class="line"><span>  Serial.print(&quot;IP address: &quot;);      // 以及NodeMCU的IP地址</span></span>
<span class="line"><span>  Serial.println(WiFi.softAPIP());   // 通过调用WiFi.softAPIP()可以得到NodeMCU的IP地址</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>void loop() { </span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="如何获取到print数据" tabindex="-1">如何获取到print数据 <a class="header-anchor" href="#如何获取到print数据" aria-label="Permalink to &quot;如何获取到print数据&quot;">​</a></h4><p>打开Arduino IDE-&gt;串口监视器</p><p>因为此时程序已经启动过了,打印过了. 所以没有任何东西,要手动在开发板上按一下reset, 重新启动.就会出现了</p><h3 id="无线终端模式-station" tabindex="-1">无线终端模式(Station) <a class="header-anchor" href="#无线终端模式-station" aria-label="Permalink to &quot;无线终端模式(Station)&quot;">​</a></h3><h4 id="连接wifi" tabindex="-1"><strong>连接WiFI</strong> <a class="header-anchor" href="#连接wifi" aria-label="Permalink to &quot;**连接WiFI**&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/*</span></span>
<span class="line"><span>NodeMCU无线终端模式连接WiFi</span></span>
<span class="line"><span>By 太极创客（http://www.taichi-maker.com）</span></span>
<span class="line"><span>2019-03-11</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>本示例程序用于演示如何使用NodeMCU无线终端模式连接WiFi</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>如需获得更多关于如何使用NodeMCU开发物联网的教程和资料信息</span></span>
<span class="line"><span>请参考太极创客网站（http://www.taichi-maker.com）</span></span>
<span class="line"><span>并在首页搜索栏中搜索关键字：物联网</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>#include &lt;ESP8266WiFi.h&gt;        // 本程序使用ESP8266WiFi库</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>const char* ssid     = &quot;taichi-maker&quot;;      // 连接WiFi名（此处使用taichi-maker为示例）</span></span>
<span class="line"><span>                                            // 请将您需要连接的WiFi名填入引号中</span></span>
<span class="line"><span>const char* password = &quot;12345678&quot;;          // 连接WiFi密码（此处使用12345678为示例）</span></span>
<span class="line"><span>                                            // 请将您需要连接的WiFi密码填入引号中</span></span>
<span class="line"><span>                                            </span></span>
<span class="line"><span>void setup() {</span></span>
<span class="line"><span>  Serial.begin(9600);         // 启动串口通讯</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  WiFi.begin(ssid, password);                  // 启动网络连接</span></span>
<span class="line"><span>  Serial.print(&quot;Connecting to &quot;);              // 串口监视器输出网络连接信息</span></span>
<span class="line"><span>  Serial.print(ssid); Serial.println(&quot; ...&quot;);  // 告知用户NodeMCU正在尝试WiFi连接</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  int i = 0;                                   // 这一段程序语句用于检查WiFi是否连接成功</span></span>
<span class="line"><span>  while (WiFi.status() != WL_CONNECTED) {      // WiFi.status()函数的返回值是由NodeMCU的WiFi连接状态所决定的。 </span></span>
<span class="line"><span>    delay(1000);                               // 如果WiFi连接成功则返回值为WL_CONNECTED                       </span></span>
<span class="line"><span>    Serial.print(i++); Serial.print(&#39; &#39;);      // 此处通过While循环让NodeMCU每隔一秒钟检查一次WiFi.status()函数返回值</span></span>
<span class="line"><span>  }                                            // 同时NodeMCU将通过串口监视器输出连接时长读秒。</span></span>
<span class="line"><span>                                               // 这个读秒是通过变量i每隔一秒自加1来实现的。</span></span>
<span class="line"><span>                                               </span></span>
<span class="line"><span>  Serial.println(&quot;&quot;);                          // WiFi连接成功后</span></span>
<span class="line"><span>  Serial.println(&quot;Connection established!&quot;);   // NodeMCU将通过串口监视器输出&quot;连接成功&quot;信息。</span></span>
<span class="line"><span>  Serial.print(&quot;IP address:    &quot;);             // 同时还将输出NodeMCU的IP地址。这一功能是通过调用</span></span>
<span class="line"><span>  Serial.println(WiFi.localIP());              // WiFi.localIP()函数来实现的。该函数的返回值即NodeMCU的IP地址。</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>void loop() {                                   </span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="自动连接最强信号wifi网络" tabindex="-1"><strong>自动连接最强信号WiFi网络</strong> <a class="header-anchor" href="#自动连接最强信号wifi网络" aria-label="Permalink to &quot;**自动连接最强信号WiFi网络**&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/*</span></span>
<span class="line"><span>NodeMCU无线终端模式连接WiFi-2</span></span>
<span class="line"><span>By 太极创客（http://www.taichi-maker.com）</span></span>
<span class="line"><span>2019-03-11</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>此程序将会控制NodeMCU在当前的网络环境里搜索预先存储好的WiFi。</span></span>
<span class="line"><span>一旦找到预存的WiFi名称，NodeMCU将会使用预存的密码信息尝试连接该WiFi。</span></span>
<span class="line"><span>如果同时找到多个预存WiFi，NodeMCU将会尝试连接信号最强的WiFi。</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>如需获得更多关于如何使用NodeMCU开发物联网的教程和资料信息</span></span>
<span class="line"><span>请参考太极创客网站（http://www.taichi-maker.com）</span></span>
<span class="line"><span>并在首页搜索栏中搜索关键字：物联网</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>#include &lt;ESP8266WiFi.h&gt;          // 本程序使用ESP8266WiFi库</span></span>
<span class="line"><span>#include &lt;ESP8266WiFiMulti.h&gt;   // 本程序使用ESP8266WiFiMulti库</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>ESP8266WiFiMulti wifiMulti;     // 建立ESP8266WiFiMulti对象,对象名称是&#39;wifiMulti&#39;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>void setup() {</span></span>
<span class="line"><span>  Serial.begin(9600);            // 启动串口通讯</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>//通过addAp函数存储  WiFi名称       WiFi密码</span></span>
<span class="line"><span>  wifiMulti.addAP(&quot;taichi-maker&quot;, &quot;12345678&quot;);  // 这三条语句通过调用函数addAP来记录3个不同的WiFi网络信息。</span></span>
<span class="line"><span>  wifiMulti.addAP(&quot;taichi-maker2&quot;, &quot;87654321&quot;); // 这3个WiFi网络名称分别是taichi-maker, taichi-maker2, taichi-maker3。</span></span>
<span class="line"><span>  wifiMulti.addAP(&quot;taichi-maker3&quot;, &quot;13572468&quot;); // 这3个网络的密码分别是123456789，87654321，13572468。</span></span>
<span class="line"><span>                                                // 此处WiFi信息只是示例，请在使用时将需要连接的WiFi信息填入相应位置。</span></span>
<span class="line"><span>                                                // 另外这里只存储了3个WiFi信息，您可以存储更多的WiFi信息在此处。</span></span>
<span class="line"><span>                                                </span></span>
<span class="line"><span>  Serial.println(&quot;Connecting ...&quot;);         // 通过串口监视器输出信息告知用户NodeMCU正在尝试连接WiFi</span></span>
<span class="line"><span>  int i = 0;                                 </span></span>
<span class="line"><span>  while (wifiMulti.run() != WL_CONNECTED) {  // 此处的wifiMulti.run()是重点。通过wifiMulti.run()，NodeMCU将会在当前</span></span>
<span class="line"><span>    delay(1000);                             // 环境中搜索addAP函数所存储的WiFi。如果搜到多个存储的WiFi那么NodeMCU</span></span>
<span class="line"><span>    Serial.print(&#39;.&#39;);                       // 将会连接信号最强的那一个WiFi信号。</span></span>
<span class="line"><span>  }                                           // 一旦连接WiFI成功，wifiMulti.run()将会返回“WL_CONNECTED”。这也是</span></span>
<span class="line"><span>                                              // 此处while循环判断是否跳出循环的条件。</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Serial.println(&#39;\\n&#39;);                     // WiFi连接成功后</span></span>
<span class="line"><span>  Serial.print(&quot;Connected to &quot;);            // NodeMCU将通过串口监视器输出。</span></span>
<span class="line"><span>  Serial.println(WiFi.SSID());              // 连接的WiFI名称</span></span>
<span class="line"><span>  Serial.print(&quot;IP address:\\t&quot;);            // 以及</span></span>
<span class="line"><span>  Serial.println(WiFi.localIP());           // NodeMCU的IP地址</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>void loop() { </span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="web-server" tabindex="-1">Web server <a class="header-anchor" href="#web-server" aria-label="Permalink to &quot;Web server&quot;">​</a></h2><h3 id="simple" tabindex="-1">simple <a class="header-anchor" href="#simple" aria-label="Permalink to &quot;simple&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/**********************************************************************</span></span>
<span class="line"><span>项目名称/Project          : 零基础入门学用物联网</span></span>
<span class="line"><span>程序名称/Program name     : 3_2_1_First_Web_Server</span></span>
<span class="line"><span>团队/Team                : 太极创客团队 / Taichi-Maker (www.taichi-maker.com)</span></span>
<span class="line"><span>作者/Author              : CYNO朔</span></span>
<span class="line"><span>日期/Date（YYYYMMDD）     : 20191107</span></span>
<span class="line"><span>程序目的/Purpose          : 使用NodeMCU建立基本服务器。用户可通过浏览器使用8266的IP地址</span></span>
<span class="line"><span>                           访问8266所建立的基本网页（Hello from ESP8266）</span></span>
<span class="line"><span>-----------------------------------------------------------------------</span></span>
<span class="line"><span>修订历史/Revision History  </span></span>
<span class="line"><span>日期/Date    作者/Author      参考号/Ref    修订说明/Revision Description</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>***********************************************************************/</span></span>
<span class="line"><span>#include &lt;ESP8266WiFi.h&gt;        // 本程序使用 ESP8266WiFi库</span></span>
<span class="line"><span>#include &lt;ESP8266WiFiMulti.h&gt;   //  ESP8266WiFiMulti库</span></span>
<span class="line"><span>#include &lt;ESP8266WebServer.h&gt;   //  ESP8266WebServer库</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>ESP8266WiFiMulti wifiMulti;     // 建立ESP8266WiFiMulti对象,对象名称是&#39;wifiMulti&#39;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>ESP8266WebServer esp8266_server(80);// 建立ESP8266WebServer对象，对象名称为esp8266_server</span></span>
<span class="line"><span>                                    // 括号中的数字是网路服务器响应http请求的端口号</span></span>
<span class="line"><span>                                    // 网络服务器标准http端口号为80，因此这里使用80为端口号</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>void setup(void){</span></span>
<span class="line"><span>  Serial.begin(9600);          // 启动串口通讯</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  //通过addAp函数存储  WiFi名称       WiFi密码</span></span>
<span class="line"><span>  wifiMulti.addAP(&quot;Xiaomi_66E1&quot;, &quot;53130000&quot;);  // 这三条语句通过调用函数addAP来记录3个不同的WiFi网络信息。</span></span>
<span class="line"><span>  int i = 0;                                 </span></span>
<span class="line"><span>  while (wifiMulti.run() != WL_CONNECTED) {  // 此处的wifiMulti.run()是重点。通过wifiMulti.run()，NodeMCU将会在当前</span></span>
<span class="line"><span>    delay(1000);                             // 环境中搜索addAP函数所存储的WiFi。如果搜到多个存储的WiFi那么NodeMCU</span></span>
<span class="line"><span>    Serial.print(i++); Serial.print(&#39; &#39;);    // 将会连接信号最强的那一个WiFi信号。</span></span>
<span class="line"><span>  }                                          // 一旦连接WiFI成功，wifiMulti.run()将会返回“WL_CONNECTED”。这也是</span></span>
<span class="line"><span>                                             // 此处while循环判断是否跳出循环的条件。</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  // WiFi连接成功后将通过串口监视器输出连接成功信息 </span></span>
<span class="line"><span>  Serial.println(&#39;\\n&#39;);                     // WiFi连接成功后</span></span>
<span class="line"><span>  Serial.print(&quot;Connected to &quot;);            // NodeMCU将通过串口监视器输出。</span></span>
<span class="line"><span>  Serial.println(WiFi.SSID());              // 连接的WiFI名称</span></span>
<span class="line"><span>  Serial.print(&quot;IP address:\\t&quot;);            // 以及</span></span>
<span class="line"><span>  Serial.println(WiFi.localIP());           // NodeMCU的IP地址</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>//--------&quot;启动网络服务功能&quot;程序部分开始-------- //  此部分为程序为本示例程序重点1</span></span>
<span class="line"><span>  esp8266_server.begin();                   //  详细讲解请参见太极创客网站《零基础入门学用物联网》</span></span>
<span class="line"><span>  esp8266_server.on(&quot;/&quot;, handleRoot);       //  第3章-第2节 ESP8266-NodeMCU网络服务器-1</span></span>
<span class="line"><span>  esp8266_server.onNotFound(handleNotFound);        </span></span>
<span class="line"><span>//--------&quot;启动网络服务功能&quot;程序部分结束--------</span></span>
<span class="line"><span>  Serial.println(&quot;HTTP esp8266_server started&quot;);//  告知用户ESP8266网络服务功能已经启动</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>/* 以下函数语句为本示例程序重点3</span></span>
<span class="line"><span>详细讲解请参见太极创客网站《零基础入门学用物联网》</span></span>
<span class="line"><span>第3章-第2节 3_2_1_First_Web_Server 的说明讲解*/  </span></span>
<span class="line"><span>void loop(void){</span></span>
<span class="line"><span>  esp8266_server.handleClient();     // 处理http服务器访问</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>/* 以下两个函数为本示例程序重点2</span></span>
<span class="line"><span>详细讲解请参见太极创客网站《零基础入门学用物联网》</span></span>
<span class="line"><span>第3章-第2节 3_2_1_First_Web_Server 的说明讲解*/                                                                            </span></span>
<span class="line"><span>void handleRoot() {   //处理网站根目录“/”的访问请求 </span></span>
<span class="line"><span>  esp8266_server.send(200, &quot;text/plain&quot;, &quot;Hello from ESP8266&quot;);   // NodeMCU将调用此函数。</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>// 设置处理404情况的函数&#39;handleNotFound&#39;</span></span>
<span class="line"><span>void handleNotFound(){                                        // 当浏览器请求的网络资源无法在服务器找到时，</span></span>
<span class="line"><span>  esp8266_server.send(404, &quot;text/plain&quot;, &quot;404: Not found&quot;);   // NodeMCU将调用此函数。</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="通过网络服务将开发板引脚状态显示在网页中" tabindex="-1">通过网络服务将开发板引脚状态显示在网页中 <a class="header-anchor" href="#通过网络服务将开发板引脚状态显示在网页中" aria-label="Permalink to &quot;通过网络服务将开发板引脚状态显示在网页中&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/**********************************************************************</span></span>
<span class="line"><span>项目名称/Project          : 零基础入门学用物联网</span></span>
<span class="line"><span>程序名称/Program name     : 3_2_4_Pin_State_Display_Auto_Refresh</span></span>
<span class="line"><span>团队/Team                : 太极创客团队 / Taichi-Maker (www.taichi-maker.com)</span></span>
<span class="line"><span>作者/Author              : CYNO朔</span></span>
<span class="line"><span>日期/Date（YYYYMMDD）     : 20200128</span></span>
<span class="line"><span>程序目的/Purpose          : 使用NodeMCU建立基本服务器。该网页将显示引脚D3状态。同时状态会</span></span>
<span class="line"><span>                           每隔5秒钟更新一次。</span></span>
<span class="line"><span>-----------------------------------------------------------------------</span></span>
<span class="line"><span>修订历史/Revision History  </span></span>
<span class="line"><span>日期/Date    作者/Author      参考号/Ref    修订说明/Revision Description</span></span>
<span class="line"><span></span></span>
<span class="line"><span>***********************************************************************/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#include &lt;ESP8266WiFi.h&gt;        // 本程序使用 ESP8266WiFi库</span></span>
<span class="line"><span>#include &lt;ESP8266WiFiMulti.h&gt;   //  ESP8266WiFiMulti库</span></span>
<span class="line"><span>#include &lt;ESP8266WebServer.h&gt;   //  ESP8266WebServer库</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define buttonPin D3            // 按钮引脚D3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ESP8266WiFiMulti wifiMulti;     // 建立ESP8266WiFiMulti对象,对象名称是&#39;wifiMulti&#39;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>ESP8266WebServer esp8266_server(80);// 建立网络服务器对象，该对象用于响应HTTP请求。监听端口（80）</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>bool pinState;                      // 存储引脚状态用变量</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void setup(){</span></span>
<span class="line"><span>  Serial.begin(9600);          // 启动串口通讯</span></span>
<span class="line"><span>  delay(10);</span></span>
<span class="line"><span>  Serial.println(&quot;&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  pinMode(buttonPin, INPUT_PULLUP); // 将按键引脚设置为输入上拉模式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  wifiMulti.addAP(&quot;ssid_from_AP_1&quot;, &quot;your_password_for_AP_1&quot;); // 将需要连接的一系列WiFi ID和密码输入这里</span></span>
<span class="line"><span>  wifiMulti.addAP(&quot;ssid_from_AP_2&quot;, &quot;your_password_for_AP_2&quot;); // ESP8266-NodeMCU在启动后会扫描当前网络</span></span>
<span class="line"><span>  wifiMulti.addAP(&quot;ssid_from_AP_3&quot;, &quot;your_password_for_AP_3&quot;); // 环境查找是否有这里列出的WiFi ID。如果有</span></span>
<span class="line"><span>  Serial.println(&quot;Connecting ...&quot;);                            // 则尝试使用此处存储的密码进行连接。</span></span>
<span class="line"><span>                                                               // 另外这里只存储了3个WiFi信息，您可以存储更多</span></span>
<span class="line"><span>                                                               // 的WiFi信息在此处。</span></span>
<span class="line"><span>  int i = 0;                                 </span></span>
<span class="line"><span>  while (wifiMulti.run() != WL_CONNECTED) {  // 此处的wifiMulti.run()是重点。通过wifiMulti.run()，NodeMCU将会在当前</span></span>
<span class="line"><span>    delay(1000);                             // 环境中搜索addAP函数所存储的WiFi。如果搜到多个存储的WiFi那么NodeMCU</span></span>
<span class="line"><span>    Serial.print(i++); Serial.print(&#39; &#39;);    // 将会连接信号最强的那一个WiFi信号。</span></span>
<span class="line"><span>  }                                          // 一旦连接WiFI成功，wifiMulti.run()将会返回“WL_CONNECTED”。这也是</span></span>
<span class="line"><span>                                             // 此处while循环判断是否跳出循环的条件。</span></span>
<span class="line"><span>  // WiFi连接成功后将通过串口监视器输出连接成功信息 </span></span>
<span class="line"><span>  Serial.println(&#39;\\n&#39;);                     // WiFi连接成功后</span></span>
<span class="line"><span>  Serial.print(&quot;Connected to &quot;);            // NodeMCU将通过串口监视器输出。</span></span>
<span class="line"><span>  Serial.println(WiFi.SSID());              // 连接的WiFI名称</span></span>
<span class="line"><span>  Serial.print(&quot;IP address:\\t&quot;);            // 以及</span></span>
<span class="line"><span>  Serial.println(WiFi.localIP());           // NodeMCU的IP地址</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  esp8266_server.begin();                  </span></span>
<span class="line"><span>  esp8266_server.on(&quot;/&quot;, handleRoot);      </span></span>
<span class="line"><span>  esp8266_server.onNotFound(handleNotFound);        </span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Serial.println(&quot;HTTP esp8266_server started&quot;);//  告知用户ESP8266网络服务功能已经启动</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void loop(){</span></span>
<span class="line"><span>  esp8266_server.handleClient();     // 处理http服务器访问</span></span>
<span class="line"><span>  pinState = digitalRead(buttonPin); // 获取引脚状态</span></span>
<span class="line"><span>}                                                                   </span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* 以下函数处理网站首页的访问请求。此函数为本示例程序重点1</span></span>
<span class="line"><span>详细讲解请参见太极创客网站《零基础入门学用物联网》</span></span>
<span class="line"><span>第3章-第2节“通过网络服务将开发板引脚状态显示在网页中”的说明讲解。*/    </span></span>
<span class="line"><span>void handleRoot() {   //处理网站目录“/”的访问请求 </span></span>
<span class="line"><span>  esp8266_server.send(200, &quot;text/html&quot;, sendHTML(pinState));  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/*</span></span>
<span class="line"><span>建立用于发送给客户端浏览器的HTML代码。此代码将会每隔5秒刷新页面。</span></span>
<span class="line"><span>通过页面刷新，引脚的最新状态也会显示于页面中</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>String sendHTML(bool buttonState){</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  String htmlCode = &quot;&lt;!DOCTYPE html&gt; &lt;html&gt;\\n&quot;;</span></span>
<span class="line"><span>  htmlCode +=&quot;&lt;head&gt;&lt;meta http-equiv=&#39;refresh&#39; content=&#39;5&#39;/&gt;\\n&quot;;</span></span>
<span class="line"><span>  htmlCode +=&quot;&lt;title&gt;ESP8266 Butoon State&lt;/title&gt;\\n&quot;;</span></span>
<span class="line"><span>  htmlCode +=&quot;&lt;style&gt;html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}\\n&quot;;</span></span>
<span class="line"><span>  htmlCode +=&quot;body{margin-top: 50px;} h1 {color: #444444;margin: 50px auto 30px;} h3 {color: #444444;margin-bottom: 50px;}\\n&quot;;</span></span>
<span class="line"><span>  htmlCode +=&quot;&lt;/style&gt;\\n&quot;;</span></span>
<span class="line"><span>  htmlCode +=&quot;&lt;/head&gt;\\n&quot;;</span></span>
<span class="line"><span>  htmlCode +=&quot;&lt;body&gt;\\n&quot;;</span></span>
<span class="line"><span>  htmlCode +=&quot;&lt;h1&gt;ESP8266 BUTTON STATE&lt;/h1&gt;\\n&quot;;</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if(buttonState)</span></span>
<span class="line"><span>    {htmlCode +=&quot;&lt;p&gt;Button Status: HIGH&lt;/p&gt;\\n&quot;;}</span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>    {htmlCode +=&quot;&lt;p&gt;Button Status: LOW&lt;/p&gt;\\n&quot;;}</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>  htmlCode +=&quot;&lt;/body&gt;\\n&quot;;</span></span>
<span class="line"><span>  htmlCode +=&quot;&lt;/html&gt;\\n&quot;;</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  return htmlCode;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 设置处理404情况的函数&#39;handleNotFound&#39;</span></span>
<span class="line"><span>void handleNotFound(){                                        // 当浏览器请求的网络资源无法在服务器找到时，</span></span>
<span class="line"><span>  esp8266_server.send(404, &quot;text/plain&quot;, &quot;404: Not found&quot;);   // NodeMCU将调用此函数。</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="按钮切换led状态" tabindex="-1">按钮切换led状态 <a class="header-anchor" href="#按钮切换led状态" aria-label="Permalink to &quot;按钮切换led状态&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#include &lt;ESP8266WiFi.h&gt;        // 本程序使用 ESP8266WiFi库</span></span>
<span class="line"><span>#include &lt;ESP8266WiFiMulti.h&gt;   //  ESP8266WiFiMulti库</span></span>
<span class="line"><span>#include &lt;ESP8266WebServer.h&gt;   //  ESP8266WebServer库</span></span>
<span class="line"><span>ESP8266WiFiMulti wifiMulti;     // 建立ESP8266WiFiMulti对象,对象名称是 &#39;wifiMulti&#39;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>ESP8266WebServer esp8266_server(80);// 建立网络服务器对象，该对象用于响应HTTP请求。监听端口（80）</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>void setup(void){</span></span>
<span class="line"><span>  Serial.begin(9600);   // 启动串口通讯</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  pinMode(LED_BUILTIN, OUTPUT); //设置内置LED引脚为输出模式以便控制LED</span></span>
<span class="line"><span>  digitalWrite(LED_BUILTIN, HIGH);</span></span>
<span class="line"><span>  wifiMulti.addAP(&quot;Xiaomi_66E1&quot;, &quot;53130000&quot;); // 将需要连接的一系列WiFi ID和密码输入这里</span></span>
<span class="line"><span>  Serial.println(&quot;Connecting ...&quot;);                            // 则尝试使用此处存储的密码进行连接。</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  int i = 0;                                 </span></span>
<span class="line"><span>  while (wifiMulti.run() != WL_CONNECTED) {  // 此处的wifiMulti.run()是重点。通过wifiMulti.run()，NodeMCU将会在当前</span></span>
<span class="line"><span>    delay(1000);                             // 环境中搜索addAP函数所存储的WiFi。如果搜到多个存储的WiFi那么NodeMCU</span></span>
<span class="line"><span>    Serial.print(i++); Serial.print(&#39; &#39;);    // 将会连接信号最强的那一个WiFi信号。</span></span>
<span class="line"><span>  }                                          // 一旦连接WiFI成功，wifiMulti.run()将会返回“WL_CONNECTED”。这也是</span></span>
<span class="line"><span>                                             // 此处while循环判断是否跳出循环的条件。</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // WiFi连接成功后将通过串口监视器输出连接成功信息 </span></span>
<span class="line"><span>  Serial.println(&#39;\\n&#39;);</span></span>
<span class="line"><span>  Serial.print(&quot;Connected to &quot;);</span></span>
<span class="line"><span>  Serial.println(WiFi.SSID());              // 通过串口监视器输出连接的WiFi名称</span></span>
<span class="line"><span>  Serial.print(&quot;IP address:\\t&quot;);</span></span>
<span class="line"><span>  Serial.println(WiFi.localIP());           // 通过串口监视器输出ESP8266-NodeMCU的IP</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  esp8266_server.begin();                           // 启动网站服务</span></span>
<span class="line"><span>  esp8266_server.on(&quot;/&quot;, HTTP_GET, handleRoot);     // 设置服务器根目录即&#39;/&#39;的函数&#39;handleRoot&#39;</span></span>
<span class="line"><span>  esp8266_server.on(&quot;/LED&quot;, HTTP_POST, handleLED);  // 设置处理LED控制请求的函数&#39;handleLED&#39;</span></span>
<span class="line"><span>  esp8266_server.onNotFound(handleNotFound);        // 设置处理404情况的函数&#39;handleNotFound&#39;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  Serial.println(&quot;HTTP esp8266_server started&quot;);//  告知用户ESP8266网络服务功能已经启动</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>void loop(void){</span></span>
<span class="line"><span>  esp8266_server.handleClient();                     // 检查http服务器访问</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>/*设置服务器根目录即&#39;/&#39;的函数&#39;handleRoot&#39;</span></span>
<span class="line"><span>  该函数的作用是每当有客户端访问NodeMCU服务器根目录时，</span></span>
<span class="line"><span>  NodeMCU都会向访问设备发送 HTTP 状态 200 (Ok) 这是send函数的第一个参数。</span></span>
<span class="line"><span>  同时NodeMCU还会向浏览器发送HTML代码，以下示例中send函数中第三个参数，</span></span>
<span class="line"><span>  也就是双引号中的内容就是NodeMCU发送的HTML代码。该代码可在网页中产生LED控制按钮。 </span></span>
<span class="line"><span>  当用户按下按钮时，浏览器将会向NodeMCU的/LED页面发送HTTP请求，请求方式为POST。</span></span>
<span class="line"><span>  NodeMCU接收到此请求后将会执行handleLED函数内容*/</span></span>
<span class="line"><span>void handleRoot() {       </span></span>
<span class="line"><span>  bool pinState;  // 存储引脚状态用变量</span></span>
<span class="line"><span>  pinState = !digitalRead(LED_BUILTIN);                 // 获取引脚状态</span></span>
<span class="line"><span>  String displayPinState;                   // 存储按键状态的字符串变量</span></span>
<span class="line"><span>  Serial.println(pinState);  </span></span>
<span class="line"><span>  if(pinState == HIGH){                     // 当按键引脚D3为高电平</span></span>
<span class="line"><span>    displayPinState = &quot;HIGH&quot;; // 字符串赋值高电平信息</span></span>
<span class="line"><span>  } else {                                  // 当按键引脚D3为低电平</span></span>
<span class="line"><span>    displayPinState = &quot;LOW&quot;;  // 字符串赋值低电平信息</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  esp8266_server.send(200, &quot;text/html&quot;, &quot;&lt;form action=\\&quot;/LED\\&quot; method=\\&quot;POST\\&quot;&gt;Button State: &lt;input type=\\&quot;submit\\&quot; value=\\&quot;&quot;+displayPinState+&quot;\\&quot;&gt;&lt;/form&gt;&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>//处理LED控制请求的函数&#39;handleLED&#39;</span></span>
<span class="line"><span>void handleLED() {                          </span></span>
<span class="line"><span>  digitalWrite(LED_BUILTIN,!digitalRead(LED_BUILTIN));// 改变LED的点亮或者熄灭状态</span></span>
<span class="line"><span>  esp8266_server.sendHeader(&quot;Location&quot;,&quot;/&quot;);          // 跳转回页面根目录</span></span>
<span class="line"><span>  esp8266_server.send(303);                           // 发送Http相应代码303 跳转  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>// 设置处理404情况的函数&#39;handleNotFound&#39;</span></span>
<span class="line"><span>void handleNotFound(){</span></span>
<span class="line"><span>  esp8266_server.send(404, &quot;text/plain&quot;, &quot;404: Not found&quot;); // 发送 HTTP 状态 404 (未找到页面) 并向浏览器发送文字 &quot;404: Not found&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="通过flash-d3-上拉输入控制led" tabindex="-1">通过flash D3 上拉输入控制led <a class="header-anchor" href="#通过flash-d3-上拉输入控制led" aria-label="Permalink to &quot;通过flash D3 上拉输入控制led&quot;">​</a></h3><h2 id="闪存文件系统" tabindex="-1">闪存文件系统 <a class="header-anchor" href="#闪存文件系统" aria-label="Permalink to &quot;闪存文件系统&quot;">​</a></h2><h3 id="初始化" tabindex="-1">初始化 <a class="header-anchor" href="#初始化" aria-label="Permalink to &quot;初始化&quot;">​</a></h3><p>Arduino IDE-&gt;工具-&gt;Flash seize-&gt;3MB</p><p>在上传程序的时候会初始化文件闪存系统</p><h3 id="插件安装" tabindex="-1">插件安装 <a class="header-anchor" href="#插件安装" aria-label="Permalink to &quot;插件安装&quot;">​</a></h3><p>在当前项目目录下新建tool, 整个插件文件夹放在里面</p><h2 id="碰到的问题" tabindex="-1">碰到的问题 <a class="header-anchor" href="#碰到的问题" aria-label="Permalink to &quot;碰到的问题&quot;">​</a></h2><h3 id="编译器不会检查返回值有没有被初始化" tabindex="-1">编译器不会检查返回值有没有被初始化 <a class="header-anchor" href="#编译器不会检查返回值有没有被初始化" aria-label="Permalink to &quot;编译器不会检查返回值有没有被初始化&quot;">​</a></h3><p>如果定义了返回值,但是没有返回的话</p><p>编译的过去,但是报错,然后单片机重启, 找了很长时间</p><h3 id="上传文件和控制台不能同时开" tabindex="-1">上传文件和控制台不能同时开 <a class="header-anchor" href="#上传文件和控制台不能同时开" aria-label="Permalink to &quot;上传文件和控制台不能同时开&quot;">​</a></h3><p>因为他们都是用的串口通信</p><h3 id="板载led是低电平的时候亮" tabindex="-1">板载LED是低电平的时候亮 <a class="header-anchor" href="#板载led是低电平的时候亮" aria-label="Permalink to &quot;板载LED是低电平的时候亮&quot;">​</a></h3><p>为什么因为电路图这样设计的,这样设计的原因是:</p><p>详情了解灌电流和拉电流的概念</p><h3 id="编译提示重复定义" tabindex="-1">编译提示重复定义 <a class="header-anchor" href="#编译提示重复定义" aria-label="Permalink to &quot;编译提示重复定义&quot;">​</a></h3><p>编译的时候会搜索整个文件夹-&gt;如果有2个重复的文件,在同一个文件中找了半天找不到第二个重复名称的函数,太不智能了啊.</p><h3 id="吐槽arduino" tabindex="-1">吐槽Arduino <a class="header-anchor" href="#吐槽arduino" aria-label="Permalink to &quot;吐槽Arduino&quot;">​</a></h3><ul><li><p>没有代码提示,这是人干的事儿么. 非8226代码支持的贼棒</p></li><li><p>ctrl不能跳转.h文件,要看自己去找源码看, 太麻烦了</p></li><li><p>编译太慢了,一个几十k的程序,你他妈要编10s以上,离谱了</p></li><li><p>没有错误检查机制,要自己编译检查,编译又慢的一批,效率太低了</p></li><li><p>没有行号, 报错多少行,很难找</p></li><li><p>用记事本编辑后不会自动同步到IDE</p></li><li><p>字体不能修改, )} 等等很像,看了半天没看出来</p></li><li><p>乱报错, 明明是一个函数漏写了,报的是{什么的</p></li><li><p>定位错误,编译器报的行数和定位的行数不一样</p></li><li><p>报错信息不太对,明明是漏写了小括号,提示函数没有定义</p></li><li><p>编译过了还能运行报错,没有抓错机制, 一报错就单片机重启</p></li></ul>`,113)]))}const q=a(l,[["render",e]]);export{h as __pageData,q as default};
