import{_ as t,c as e,a0 as i,o as r}from"./chunks/framework.DADtiyJ8.js";const c=JSON.parse('{"title":"ESP8266-NodeMCU","description":"","frontmatter":{"title":"ESP8266-NodeMCU","hidemeta":true},"headers":[],"relativePath":"posts/单片机/MCU/ESP8266-NodeMCU.md","filePath":"posts/单片机/MCU/ESP8266-NodeMCU.md"}'),l={name:"posts/单片机/MCU/ESP8266-NodeMCU.md"};function o(d,a,h,n,p,s){return r(),e("div",null,a[0]||(a[0]=[i('<h1 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h1><p>我是小白,对智能家居很感兴趣,之前wifi/物联网太贵了,学习成本太高了.发现ESP8266太便宜了,还带wifi.想用ESP8266做一个简单的智能插座.基本就是整个学习过程</p><h2 id="学习建议" tabindex="-1">学习建议 <a class="header-anchor" href="#学习建议" aria-label="Permalink to &quot;学习建议&quot;">​</a></h2><p>纯新人入门的话, ESP8266 的资料较少, 推荐先学一下 Arduino, 了解一下最基本的东西, 如上下拉电阻, io操作等等</p><p>因为有wokwi这个在线模拟, 所以还是很好学的</p><p><a href="https://www.arduino.cc/" target="_blank" rel="noreferrer">Arduino官网</a></p><p><a href="https://www.arduino.cc/en/Guide" target="_blank" rel="noreferrer">Arduino 指引</a></p><p><a href="https://wokwi.com/" target="_blank" rel="noreferrer">wokwi-Arduino在线模拟</a></p><p>wokwi 如果运行不起来, 需要学会怎么上github, 可以翻墙, 可以cdn加速, 因为wsa在github上</p><h2 id="esp-01-s和esp8266-的关系" tabindex="-1">ESP-01/S和ESP8266 的关系 <a class="header-anchor" href="#esp-01-s和esp8266-的关系" aria-label="Permalink to &quot;ESP-01/S和ESP8266 的关系&quot;">​</a></h2><p>ESP8266 是一个SCM(Single chip micro computer) 就是一个芯片</p><p>根据ESP8266 芯片做出了电路板:ESP-01/S,</p><p>举个不太恰当的例子:</p><p>ESP8266 相当于发动机, ESP-01/S 相当于普通汽车, ESP-12F/E 相当于豪华汽车</p><p>要确定你买到的是什么东西</p><p><a href="#_173">相关的关联详见</a></p><h2 id="espxx类型介绍" tabindex="-1">ESPXX类型介绍 <a class="header-anchor" href="#espxx类型介绍" aria-label="Permalink to &quot;ESPXX类型介绍&quot;">​</a></h2><p><a href="./www.esp8266.com.html">官网</a></p><p><a href="https://www.esp8266.com/wiki/doku.php?id=esp8266-module-family" target="_blank" rel="noreferrer">各种型号对比, 电路图, 引脚介绍</a></p><ul><li>ESP-01 ESP-01S</li></ul><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5j0r6n3o1j30aw0630ue.jpg" alt="image.png"></p><ul><li>ESP-12F/E</li></ul><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5j0uwzx6oj30bw0bl41k.jpg" alt="image.png"></p><ul><li>带 CP2102 测试版</li></ul><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5j0svl54jj30bq0bjn12.jpg" alt="image.png"></p><ul><li>带 CP340 测试版</li></ul><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5j0xv96ibj30bk0bdgpc.jpg" alt="image.png"></p><ul><li>CH340 烧录器</li></ul><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5j0yts0qnj30bn0bmjuv.jpg" alt="image.png"></p><h2 id="类型分类" tabindex="-1">类型分类 <a class="header-anchor" href="#类型分类" aria-label="Permalink to &quot;类型分类&quot;">​</a></h2><p>分为2类:</p><ul><li>带测试板</li><li>不带测试板</li></ul><p>带测试板 相当于烧录器 + 不带测试板.</p><p>带测试版的话就省一个烧录器, 但是烧录器没办法复用</p><p>从价格上来说, 差别不大</p><ul><li>不带测试板(8RMB) + 烧录器(6RMB) = 14 RMB</li><li>带测试板 13 RMB</li></ul><h2 id="个人选择" tabindex="-1">个人选择 <a class="header-anchor" href="#个人选择" aria-label="Permalink to &quot;个人选择&quot;">​</a></h2><p>因为本来就是玩玩, 没有想着做多个-&gt;所以买的带开发板的</p><h1 id="烧录" tabindex="-1"><a href="https://www.esp8266.com/wiki/doku.php?id=start-with-esp-12-arduino" target="_blank" rel="noreferrer">烧录</a> <a class="header-anchor" href="#烧录" aria-label="Permalink to &quot;[烧录](https://www.esp8266.com/wiki/doku.php?id=start-with-esp-12-arduino)&quot;">​</a></h1><h2 id="烧录器" tabindex="-1">烧录器 <a class="header-anchor" href="#烧录器" aria-label="Permalink to &quot;烧录器&quot;">​</a></h2><p>如果没有带开发板, 那么需要烧录器对MCU的ROM进行烧录, 如果带开发板, 无需烧录器直接就可以烧录. 因为开发板是带了烧录器的</p><p><code>To program the module, you will need a USB-to-serial adapter</code></p><h3 id="要有一个-usb-ttl-烧录器" tabindex="-1">要有一个 USB-TTL 烧录器 <a class="header-anchor" href="#要有一个-usb-ttl-烧录器" aria-label="Permalink to &quot;要有一个 USB-TTL 烧录器&quot;">​</a></h3><p><code>There are many USB to serial adapters - most adapters are identified by the name of the adapter chip</code></p><p>有很多种烧录器, 都是可以使用的:</p><ul><li>CP2102P(4RMB)</li><li>CH340(6RMB)</li><li>L2303HX(2.5RMB)</li></ul><h3 id="烧录器选择" tabindex="-1">烧录器选择 <a class="header-anchor" href="#烧录器选择" aria-label="Permalink to &quot;烧录器选择&quot;">​</a></h3><p><code>The most common USB to Serial chips are the CH340G or various chips from FTDI</code></p><p>官方推荐CH340G</p><h2 id="烧录方法" tabindex="-1">烧录方法 <a class="header-anchor" href="#烧录方法" aria-label="Permalink to &quot;烧录方法&quot;">​</a></h2><h4 id="官方文档" tabindex="-1"><a href="https://www.esp8266.com/wiki/doku.php?id=start-with-esp-12-arduino" target="_blank" rel="noreferrer">官方文档</a> <a class="header-anchor" href="#官方文档" aria-label="Permalink to &quot;[官方文档](https://www.esp8266.com/wiki/doku.php?id=start-with-esp-12-arduino)&quot;">​</a></h4><ul><li>When programming, the GPIO0 pin has to be held low during reset to enable programming mode <ul><li>Some breakout boards include pushbuttons or jumpers <ul><li>For programing mode: While holding the FLASH button down, momentarily press “RESET”, then release the FLASH button</li><li>For normal mode: press RESET without also pressing FLASH</li></ul></li><li>Some USB to Serial adapters allow using two of the serial handshake signals to allow the programming software to reset the module and pulldown GPIO0 during reset so you don&#39;t need to use jumpers or push any buttons during programming.</li><li>You can also manually wire your own jumpers and/or switches for reset and GPIO0</li></ul></li><li>Summary <ul><li>Wire up Reset and GPIO0 Programming switch <ul><li>If you are using a programming switch and reset switch from the adapter, connect these from the adapter to the ESP12E.</li></ul></li><li>RXD from adapter to TX on ESP12E</li><li>TXD from adapter to RX on ESP12E</li><li>GND from adapter to GND on ESP12E</li><li>VCC 3.3V from adapter to VCC 3.3V of ESP-12E (or the external 3.3V supply powering the ESP-12E module)</li></ul></li></ul><h4 id="关于电压" tabindex="-1">关于电压 <a class="header-anchor" href="#关于电压" aria-label="Permalink to &quot;关于电压&quot;">​</a></h4><p>无论开发板还是烧录器都有5V-3.3V的电压转换</p><h4 id="实际操作" tabindex="-1">实际操作: <a class="header-anchor" href="#实际操作" aria-label="Permalink to &quot;实际操作:&quot;">​</a></h4><h5 id="如果是开发板" tabindex="-1">如果是开发板 <a class="header-anchor" href="#如果是开发板" aria-label="Permalink to &quot;如果是开发板&quot;">​</a></h5><ul><li><p>烧录: 按住FLASH按钮的同时 短暂按一下Reset, 然后松开FLASH, 就开始烧录了</p></li><li><p>运行: 按一下 Reset</p></li></ul><h5 id="专门设计的8角ch340-cp2102" tabindex="-1">专门设计的8角CH340/CP2102 <a class="header-anchor" href="#专门设计的8角ch340-cp2102" aria-label="Permalink to &quot;专门设计的8角CH340/CP2102&quot;">​</a></h5><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5jx5aecw6j30ar0a9gna.jpg" alt="image.png"></p><p>, 直接插就好了, 按一下按钮(Reset) 开始下载</p><h5 id="如果是通用的ch340-cp2102-l2303hx" tabindex="-1">如果是通用的CH340/CP2102/L2303HX <a class="header-anchor" href="#如果是通用的ch340-cp2102-l2303hx" aria-label="Permalink to &quot;如果是通用的CH340/CP2102/L2303HX&quot;">​</a></h5><ul><li>烧录: <strong>IO0管脚接地为烧录模式</strong></li><li>运行: 代码烧录完成后<strong>需要IO0断开重新上电</strong>程序才能运行</li></ul><h5 id="通用的ch340-cp2102-l2303hx-接线模式" tabindex="-1">通用的CH340/CP2102/L2303HX 接线模式 <a class="header-anchor" href="#通用的ch340-cp2102-l2303hx-接线模式" aria-label="Permalink to &quot;通用的CH340/CP2102/L2303HX 接线模式&quot;">​</a></h5><ul><li>CH340 示例图</li></ul><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5j3ihw9nqj30l70fewo0.jpg" alt="image.png"></p><ul><li>ESP-01s</li></ul><table tabindex="0"><thead><tr><th>esp-01s</th><th>usb-ttl</th></tr></thead><tbody><tr><td>3V3</td><td>3V3</td></tr><tr><td>RX</td><td>TXD</td></tr><tr><td>TX</td><td>RXD</td></tr><tr><td>GND</td><td>GND</td></tr></tbody></table><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5jyf240suj306205f3z2.jpg" alt="image.png"></p><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5j2ztpic7j30f607p76w.jpg" alt="image.png"></p><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5jxjn6b5vj30g40jmtei.jpg" alt=""></p><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5jxlhdy5xj30eh0ibq7n.jpg" alt=""></p><h5 id="电路图解释" tabindex="-1">电路图解释 <a class="header-anchor" href="#电路图解释" aria-label="Permalink to &quot;电路图解释&quot;">​</a></h5><p>以ESP01为例:</p><p>ESP01/S 其实只有两个IO口就是IO0, IO2</p><p>ESP8266 实际上有</p><h1 id="程序开发" tabindex="-1">程序开发 <a class="header-anchor" href="#程序开发" aria-label="Permalink to &quot;程序开发&quot;">​</a></h1><p><a href="http://bbs.espressif.com/download/file.php?id=253" target="_blank" rel="noreferrer">文档</a></p><h2 id="编译器设置和使用-ide" tabindex="-1">编译器设置和使用(IDE) <a class="header-anchor" href="#编译器设置和使用-ide" aria-label="Permalink to &quot;编译器设置和使用(IDE)&quot;">​</a></h2><ul><li><a href="https://www.esp8266.com/wiki/doku.php?id=windows_setup-windows-compiler-esp8266" target="_blank" rel="noreferrer">Arduino IDE</a></li><li><a href="https://www.esp8266.com/wiki/doku.php?id=setup-windows-compiler-esp8266" target="_blank" rel="noreferrer">Visual Studio IDE</a></li><li><a href="https://www.esp8266.com/wiki/doku.php?id=setup-osx-compiler-esp8266" target="_blank" rel="noreferrer">OSX</a></li></ul><h1 id="getting-started-实际操作" tabindex="-1">Getting Started(实际操作) <a class="header-anchor" href="#getting-started-实际操作" aria-label="Permalink to &quot;Getting Started(实际操作)&quot;">​</a></h1><ul><li><h2 id="start-with-the-esp8266-12e-and-the-arduino-tools" tabindex="-1"><a href="https://www.esp8266.com/wiki/doku.php?id=start-with-esp-12-arduino" target="_blank" rel="noreferrer">Start with the ESP8266-12E and the Arduino tools</a> <a class="header-anchor" href="#start-with-the-esp8266-12e-and-the-arduino-tools" aria-label="Permalink to &quot;[Start with the ESP8266-12E and the Arduino tools](https://www.esp8266.com/wiki/doku.php?id=start-with-esp-12-arduino)&quot;">​</a></h2><p>请参考文档</p></li><li><h2 id="nodemcu-development-board" tabindex="-1"><a href="https://www.esp8266.com/wiki/doku.php?id=getting-started-with-the-nodemcu_development_board" target="_blank" rel="noreferrer">NodeMCU development board</a> <a class="header-anchor" href="#nodemcu-development-board" aria-label="Permalink to &quot;[NodeMCU development board](https://www.esp8266.com/wiki/doku.php?id=getting-started-with-the-nodemcu_development_board)&quot;">​</a></h2><h3 id="我这里直接买的开发板-淘宝-9-9rmb-3rmb运费" tabindex="-1">我这里直接买的开发板 淘宝(9.9rmb + 3rmb运费) <a class="header-anchor" href="#我这里直接买的开发板-淘宝-9-9rmb-3rmb运费" aria-label="Permalink to &quot;我这里直接买的开发板 淘宝(9.9rmb + 3rmb运费)&quot;">​</a></h3></li><li><h2 id="over-the-air-information-ota" tabindex="-1"><a href="https://www.esp8266.com/wiki/doku.php?id=ota-over-the-air-esp8266" target="_blank" rel="noreferrer">Over the Air information (OTA)</a> <a class="header-anchor" href="#over-the-air-information-ota" aria-label="Permalink to &quot;[Over the Air information (OTA)](https://www.esp8266.com/wiki/doku.php?id=ota-over-the-air-esp8266)&quot;">​</a></h2><p>请参考文档</p></li></ul><h1 id="flash-rs232-串口流控原理" tabindex="-1"><a href="https://blog.csdn.net/EAyayaya/article/details/112801769" target="_blank" rel="noreferrer">Flash/RS232/串口流控原理</a>: <a class="header-anchor" href="#flash-rs232-串口流控原理" aria-label="Permalink to &quot;[Flash/RS232/串口流控原理](https://blog.csdn.net/EAyayaya/article/details/112801769):&quot;">​</a></h1><p><img src="https://img-blog.csdnimg.cn/20210121102429138.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0VBeWF5YXlh,size_16,color_FFFFFF,t_70#pic_center" alt="img"></p><h5 id="引脚介绍" tabindex="-1">引脚介绍 <a class="header-anchor" href="#引脚介绍" aria-label="Permalink to &quot;引脚介绍&quot;">​</a></h5><ul><li><p>RTS:（Request To Send 请求发送） 模组的RTS是给mcu说准备好了,低电平，如果模组没有准备好，MCU给模组发数据，可能会丢包</p></li><li><p>CTS:（Clear To Send 清除发送，允许发送） 模组的cts必须要外部的mcu给低电平，模组才能发送数据，</p></li><li><p>RXD: （Receive Data 接收数据） 接收数据</p></li><li><p>TXD:（ Transmit Data 发送数据） 发送数据</p></li></ul><h1 id="集成电路发展史" tabindex="-1"><a href="https://baijiahao.baidu.com/s?id=1704133753207266151&amp;wfr=spider&amp;for=pc" target="_blank" rel="noreferrer">集成电路发展史</a> <a class="header-anchor" href="#集成电路发展史" aria-label="Permalink to &quot;[集成电路发展史](https://baijiahao.baidu.com/s?id=1704133753207266151&amp;wfr=spider&amp;for=pc)&quot;">​</a></h1><h2 id="指令集的发展" tabindex="-1">指令集的发展 <a class="header-anchor" href="#指令集的发展" aria-label="Permalink to &quot;指令集的发展&quot;">​</a></h2><ol><li><p>芯片的本质是二极管, 为了在芯片上跑程序, 出现了指令集(ISA)这个东西.</p></li><li><p>指令集分两大流派: 复杂指令集（CISC）精简指令集（RISC)</p></li></ol><table tabindex="0"><thead><tr><th>指令集ISA</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td>复杂指令集CISC(Complex Instruction Set Computing)</td><td>一条指令中完成更多的工作, 最大限度榨干硬件</td><td>日趋庞杂的指令芯片不但不易实现，而且还可能降低系统性能</td></tr><tr><td>精简指令集RISC(Reduced Instruction Set Computer)</td><td>芯片容易实现</td><td>多条指令才能完成一个任务, 造成硬件的浪费</td></tr></tbody></table><h3 id="比较主流的指令集" tabindex="-1">比较主流的指令集 <a class="header-anchor" href="#比较主流的指令集" aria-label="Permalink to &quot;比较主流的指令集&quot;">​</a></h3><ol><li>CISC 发展出了 <ul><li>X86</li><li>8051</li></ul></li><li>RISC百花齐放, <ul><li>ARM(Acorn RISC Machine)</li><li>MIPS(Microprocessor without interlocked pipelined stages 无内部互锁流水级的微处理器)</li><li><a href="https://zh.wikipedia.org/wiki/RISC-V" target="_blank" rel="noreferrer">RISC-V</a>(开源BSD)</li><li>AVR</li><li>PIC</li><li>PowerPC</li></ul></li><li>还有一些专门针对某些运算出来的指令集, 这些并不能用上面两个标准区分如: <ul><li>DSP</li><li>FPGA</li><li>EPSXX</li></ul></li></ol><h3 id="为什么有这么多isa" tabindex="-1"><a href="https://zhuanlan.zhihu.com/p/64199775" target="_blank" rel="noreferrer">为什么有这么多ISA</a>? <a class="header-anchor" href="#为什么有这么多isa" aria-label="Permalink to &quot;[为什么有这么多ISA](https://zhuanlan.zhihu.com/p/64199775)?&quot;">​</a></h3><ul><li><p>X86和ARM指令集的实现方式都是闭源的</p></li><li><p>x86架构由于授权问题只有几家可以生产，包括现在的Intel、AMD</p></li><li><p><a href="https://zh.wikipedia.org/wiki/ARM%E6%9E%B6%E6%A7%8B#ARM%E6%8E%88%E6%AC%8A%E6%96%B9%E5%BC%8F" target="_blank" rel="noreferrer">但是ARM有多种授权方式</a></p><ul><li>ARM公司本身并不靠自有的设计来制造或出售CPU，而是将处理器架构授权给有兴趣的厂家。</li><li>如苹果M1,M2.海思部分麒麟处理器就是采用这种方式生产出来的。</li><li>x86是占了先手的, ARM<a href="https://zh.wikipedia.org/wiki/ARM%E6%9E%B6%E6%A7%8B" target="_blank" rel="noreferrer">1983</a>年才开始设计,但是授权方式的原因ARM也抢了很多市场.</li><li>从2020年英伟达强势宣布将以400亿美元的价格收购英国ARM公司的事件,可以看出, ARM这种不生成CPU的方式并没有X86这种和intel牢牢绑定的方式赚钱.</li><li>一旦英伟达收购ARM,很难说新的授权方式,因此包括苹果,华为等都开始威胁要拥抱RISC-V</li></ul></li><li><p><a href="https://zh.wikipedia.org/wiki/RISC-V" target="_blank" rel="noreferrer">RISC-V</a> 是开源的(<a href="https://zh.wikipedia.org/wiki/BSD%E8%AE%B8%E5%8F%AF%E8%AF%81" target="_blank" rel="noreferrer">BSD</a>)</p></li></ul><p>如今,复杂指令集和精简指令集界限日渐模糊, 都在吸取别人的优点.在性能和易实现之间做权衡</p><h3 id="x86和arm的优劣势" tabindex="-1">X86和ARM的优劣势 <a class="header-anchor" href="#x86和arm的优劣势" aria-label="Permalink to &quot;X86和ARM的优劣势&quot;">​</a></h3><p>X86结构的电脑采用“桥”的方式与扩展设备（如：硬盘、内存等）进行连接，而且x86结构的电脑出现了近30年，其配套扩展的设备种类多、价格也比较便宜，所以x86结构的电脑能很容易进行性能扩展，如增加内存、硬盘等。</p><p>ARM结构的电脑是通过专用的数据接口使CPU与数据存储设备进行连接，所以ARM的存储、内存等性能扩展难以进行（一般在产品设计时已经定好其内存及数据存储的容量），所以采用ARM结构的系统，一般不考虑扩展。基本奉行“够用就好”的原则。这就是为什么现在苹果电脑不留出多个硬盘/内存接口的原因之一.</p><h3 id="指令集之间是可以转换的" tabindex="-1">指令集之间是可以转换的 <a class="header-anchor" href="#指令集之间是可以转换的" aria-label="Permalink to &quot;指令集之间是可以转换的&quot;">​</a></h3><p>同时还可以软件兼容, M1跑intel芯片的程序, M1不能识别x86的指令苹果就开发了一个叫做<a href="https://zh.wikipedia.org/wiki/Rosetta" target="_blank" rel="noreferrer">Rosetta 2</a> 的转译机制,把x86的复杂指令翻译成ARM的精简指令, 显然这中间必定有效率的问题.</p><h2 id="指令集-isa-与架构与芯片之间的关系" tabindex="-1">指令集(ISA)与架构与芯片之间的关系 <a class="header-anchor" href="#指令集-isa-与架构与芯片之间的关系" aria-label="Permalink to &quot;指令集(ISA)与架构与芯片之间的关系&quot;">​</a></h2><h3 id="什么是架构" tabindex="-1">什么是架构 <a class="header-anchor" href="#什么是架构" aria-label="Permalink to &quot;什么是架构&quot;">​</a></h3><p><a href="https://www.zhihu.com/question/22464046/answer/21450143" target="_blank" rel="noreferrer">架构 architecture：是一个抽象的概念</a></p><p>比如我们常说的计算机处理器有486、Ivy Bridge、Pentium M……这就是架构的不同(但其都从属于<a href="https://link.zhihu.com/?target=http%3A//zh.wikipedia.org/wiki/X86" target="_blank" rel="noreferrer">x86</a>架构)</p><p>ARMv1~ARMv8到STM32这些名称都属于ARM架构</p><h3 id="六个经典单片机种类介绍" tabindex="-1"><a href="https://baijiahao.baidu.com/s?id=1690664375387238551&amp;wfr=spider&amp;for=pc" target="_blank" rel="noreferrer">六个经典单片机种类介绍</a> <a class="header-anchor" href="#六个经典单片机种类介绍" aria-label="Permalink to &quot;[六个经典单片机种类介绍](https://baijiahao.baidu.com/s?id=1690664375387238551&amp;wfr=spider&amp;for=pc)&quot;">​</a></h3><h4 id="_51单片机" tabindex="-1">51单片机 <a class="header-anchor" href="#_51单片机" aria-label="Permalink to &quot;51单片机&quot;">​</a></h4><p>51单片机是对所有兼容Intel8051指令系统的单片机的统称, 如</p><ul><li>Intel（<a href="https://baike.baidu.com/item/%E8%8B%B1%E7%89%B9%E5%B0%94/305730" target="_blank" rel="noreferrer">英特尔</a>）：80C31、<a href="https://baike.baidu.com/item/80C51/4200558" target="_blank" rel="noreferrer">80C51</a>、87C51，80C32、80C52、87C52等；</li><li><a href="https://baike.baidu.com/item/Atmel/8207336" target="_blank" rel="noreferrer">Atmel</a>（艾特梅尔）：89C51、89C52、89C2051，89S51(RC)，89S52(RC)等；</li><li>Philips（<a href="https://baike.baidu.com/item/%E9%A3%9E%E5%88%A9%E6%B5%A6/14316" target="_blank" rel="noreferrer">飞利浦</a>）、华邦、Dallas（达拉斯）、Siemens（<a href="https://baike.baidu.com/item/%E8%A5%BF%E9%97%A8%E5%AD%90/25878" target="_blank" rel="noreferrer">西门子</a>）等公司的许多产品；</li><li>STC（宏晶）：STC89C51、STC90C51、STC11系列、STC15系列、STC8, STC16系列等。</li><li>等</li></ul><p>他们并不都是8位的: 如STC16是个32位的8051, 阉割为了16位</p><p>51单片机泛滥的原因:</p><ul><li>intel看不上看不上这块肉了, 同时要和其他人竞争, 就开放了授权</li><li>入场早,前面学习的人都是用的这个</li></ul><h4 id="avr-pic-powerpc-mips" tabindex="-1">AVR/PIC/PowerPC/MIPS <a class="header-anchor" href="#avr-pic-powerpc-mips" aria-label="Permalink to &quot;AVR/PIC/PowerPC/MIPS&quot;">​</a></h4><ul><li><p>PIC芯片示例:</p><ul><li>PIC16C5X，PIC12C6XX, PIC17CXX</li></ul></li><li><p>AVR芯片示例: 比较典型的就是Altera、Lattice、Xilinx世界三大权威公司</p><ul><li>AlteraEPM7128S(PLCC84)、LatticeLC4128V(TQFP100)、XilinxXC95108(PLCC84)</li></ul></li><li><p>MIPS是卖得最好的RISCCPU</p><ul><li>MIPS324Kc, MIPS645Kc</li><li>如Sony，Nintendo的游戏机，Cisco的路由器和SGI超级计算机</li></ul></li><li><p>PowerPC</p><ul><li>任天堂Gamecube</li></ul></li></ul><p>都是跟8051单片机的机构不同的位单片机，因为结构不同，所以他的汇编指令也不同，并且他们都是使用的RISC指令集，只有几十条指令，大部分的还都是单周期的指令，所以在相同的晶振频率下，比8051速度要快.但是他们不属于ARM架构, 算是和ARM同时期发展出来的RISC指令集.</p><h4 id="arm" tabindex="-1">ARM <a class="header-anchor" href="#arm" aria-label="Permalink to &quot;ARM&quot;">​</a></h4><ul><li><p>手机芯片,任天堂游戏机, iPod:</p><p>GameBoyAdvance，NintendoDS，iPodARM9TDMIArmadillo，GP32，GP2X（第一颗内核）,TapwaveZodiac（Motorolai.MX1）；GP2X（第二颗内核）ARM9ENintendoDS，NokiaN-GageConexant802.11chips；STM32, STMicroSTR91xF，ARM11NokiaN93，Zune，NokiaN800，NOKIAE72CortexTexasInstrumentsOMAP3；Broadcomisauser；LuminaryMicro</p></li></ul><p>他的内部资源（寄存器和外设功能）较8051、AVR和PIC都要多的多，基本上接近于计算机的CPU了</p><h4 id="dsp-fpga" tabindex="-1">DSP/FPGA <a class="header-anchor" href="#dsp-fpga" aria-label="Permalink to &quot;DSP/FPGA&quot;">​</a></h4><p>DSP其实也是一种特殊的单片机，他从8bit到32bit的都有，他专门是用来计算数字信号的，在某些计算公式上，他甚至比现在的家用计算机的最快CPU还要快，比如说一个32bit的DSP能在一个指令周期内完成一个32bit数乘以32bit数再加上一个32bit数的计算。不好定义属于CISC还是RISC</p><h1 id="单片机的各种编程语言" tabindex="-1">单片机的各种编程语言 <a class="header-anchor" href="#单片机的各种编程语言" aria-label="Permalink to &quot;单片机的各种编程语言&quot;">​</a></h1><h2 id="汇编语言" tabindex="-1">汇编语言 <a class="header-anchor" href="#汇编语言" aria-label="Permalink to &quot;汇编语言&quot;">​</a></h2><p>汇编不是编程语言，他只是机器指令和一些宏的组合。</p><p>为了用人类看得懂的语言来描述指令集, 就有了汇编语言, 不同架构的汇编语言是不一样的,ARM的汇编语言与Intel X86的就不同。</p><h2 id="汇编语言编译器" tabindex="-1">汇编语言编译器 <a class="header-anchor" href="#汇编语言编译器" aria-label="Permalink to &quot;汇编语言编译器&quot;">​</a></h2><ul><li>AVR Studio</li></ul><h2 id="高级语言" tabindex="-1">高级语言 <a class="header-anchor" href="#高级语言" aria-label="Permalink to &quot;高级语言&quot;">​</a></h2><p>虽然汇编语言读起来方便了，但也有缺陷。首先汇编语言操作起来还是挺麻烦的。其次汇编语言对应一条条指令集，所以当指令集改变时，就得修改相应汇编语言，导致其可移植性很差，不能跨平台使用，这时人们就想开发一种更方便操作，超越指令集的语言，于是有了C，C++等<strong>高级语言</strong>.</p><h3 id="c-c-语言" tabindex="-1">C/C++语言 <a class="header-anchor" href="#c-c-语言" aria-label="Permalink to &quot;C/C++语言&quot;">​</a></h3><ul><li><p>大部分单片机支持C语言编译出来的二进制文件, 但是像FPGA就不支持C语言<a href="https://www.elecfans.com/tags/verilog/" target="_blank" rel="noreferrer">verilog</a>和VHDL语言或者C语言无法编译出FPGA需要的二进制文件,因为C语言是先出现的.</p></li><li><p>至于C++, 要看编译器支不支持, 把C++编译为对应指令集2进制的东西, 理论上来说C++是可以用C的代码复写的,但是这个事情太庞大了, C++是一直更新的现在都C++20了.如Keil支持STL库</p><ul><li><p>但是C++对运行效率有很大的影响, CPU速率大于100MHz不用考虑C++语言本身对程序运行效率的影响</p></li><li><p>C++编译出来的东西比C大很多, 各种库使用都会增大体积, Flash一般要大于100K</p></li><li><p>C++的编译器要针对 在针对8位MCU, 32位MCU做不一样的处理(地址长度都不一样)</p></li><li><p>C++的各种库不一定对单片机支持: 如STL标准库</p></li><li><p>C++11、C++14和C++17还是有不小区别的。不能有换编译器的需求</p></li><li><p>C++ 并没有比C写起来快很多</p><p>But mind you, writing complex code in C can give you nightmares.</p><p>But then debugging C++ code can give you nightmares as well.</p></li><li><p>C++写的时候有时候要 提前分配存储空间，而不是自动分配.否则会有小概率情况会出问题</p></li></ul><h3 id="c-c编译器" tabindex="-1">C++/C编译器: <a class="header-anchor" href="#c-c编译器" aria-label="Permalink to &quot;C++/C编译器:&quot;">​</a></h3><h4 id="keil" tabindex="-1">Keil <a class="header-anchor" href="#keil" aria-label="Permalink to &quot;Keil&quot;">​</a></h4><p>Keil公司2005年由ARM公司收购。现在已经迭代到 Keil μVision5,</p><p>支持ARM, 51单片机</p><h4 id="iar-stvd-iccavr" tabindex="-1">IAR/STVD/ICCAVR <a class="header-anchor" href="#iar-stvd-iccavr" aria-label="Permalink to &quot;IAR/STVD/ICCAVR&quot;">​</a></h4><p>ST系列芯片用STVD</p><p>IAR,ICCAVR用于AVR</p><h4 id="arduinoide" tabindex="-1"><a href="https://www.arduino.cc/" target="_blank" rel="noreferrer">ArduinoIDE</a> <a class="header-anchor" href="#arduinoide" aria-label="Permalink to &quot;[ArduinoIDE](https://www.arduino.cc/)&quot;">​</a></h4><p>Arduino2005 才开始出现, 有人嫌弃学一个单片机开发太麻烦了, 要先写代码, 然后读手册,烧录.</p><p>学几天都学不会.然后出了一套电路板,给学生学习,同时出了ArduinoIDE用于敲代码和烧录.</p><p>然后大家发现都很好用, 由于是开源的, 有人做了<a href="https://wokwi.com/" target="_blank" rel="noreferrer">wokwi-Arduino在线模拟</a></p><p>有人做了对各种开发板的支持.发展到现在云平台也做.</p><h4 id="其他编译器" tabindex="-1">其他编译器 <a class="header-anchor" href="#其他编译器" aria-label="Permalink to &quot;其他编译器&quot;">​</a></h4><p>基本一个芯片就有一个编译器, 毕竟不太复杂, 要么编译器支持你,要么你自己写一个编译器, 编译器在工作量和兼容更多的芯片之间做出选择, 厂家在学习成本/对客户吸引力和对编译器支持的力度做出选择, 开发者也会对学习成本和芯片价格做出选择.三方是互相影响的</p></li></ul><p>其他语言</p><h4 id="micropython" tabindex="-1">micropython <a class="header-anchor" href="#micropython" aria-label="Permalink to &quot;micropython&quot;">​</a></h4><ul><li>支持部分芯片的部分功能</li></ul><h4 id="tinygo" tabindex="-1">tinygo <a class="header-anchor" href="#tinygo" aria-label="Permalink to &quot;tinygo&quot;">​</a></h4><ul><li>支持部分芯片的部分功能</li></ul><h4 id="nodemcu" tabindex="-1">nodemcu <a class="header-anchor" href="#nodemcu" aria-label="Permalink to &quot;nodemcu&quot;">​</a></h4><ul><li>好像是专门为了esp系列出的一套系统</li></ul><h2 id="espxxxx属于哪一类" tabindex="-1">ESPXXXX属于哪一类? <a class="header-anchor" href="#espxxxx属于哪一类" aria-label="Permalink to &quot;ESPXXXX属于哪一类?&quot;">​</a></h2><ul><li><p>ESP8266处理器是Teensilica L106的RISC内核</p></li><li><p>ESP32处理器是Xtensa Dual-Core 32-bit LX6</p></li></ul><p>ESPXXXX 每一个型号用的CPU都不一样, 这些CPU属于不同的指令集, 和DSP一样, 不好定义它属于精简指令集还是复杂指令集</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>都是钱的问题,谁都知道开源发展快, 但是就会没有钱.</p><p>各种芯片的选择也是,那个芯片便宜用哪个.不会用?要么学怎么用,要么找一个会用的人.</p><h3 id="关于学习入门时arduino与51与树莓派" tabindex="-1">关于学习入门时Arduino与51与树莓派 <a class="header-anchor" href="#关于学习入门时arduino与51与树莓派" aria-label="Permalink to &quot;关于学习入门时Arduino与51与树莓派&quot;">​</a></h3><h4 id="定位-芯片不一样" tabindex="-1">定位/芯片不一样 <a class="header-anchor" href="#定位-芯片不一样" aria-label="Permalink to &quot;定位/芯片不一样&quot;">​</a></h4><ul><li><p>这是一个发展的毕竟阶段 51-&gt;Arduino-&gt;树莓派 是一个硬件要求越来越高的过程</p></li><li><p>由于硬件成本要压缩,所以能用51不用, 能用Arduino不用树莓派,能用Arduino不用树莓派</p></li><li><p>51用一个51单片机就可以了</p></li><li><p>Arduino 要用 AVR单片机</p></li><li><p>树莓派更像一个小型计算机</p></li></ul><h4 id="学习难度-学到的东西不一样" tabindex="-1">学习难度/学到的东西不一样 <a class="header-anchor" href="#学习难度-学到的东西不一样" aria-label="Permalink to &quot;学习难度/学到的东西不一样&quot;">​</a></h4><ul><li><p>51可以完整清晰地讲明白单片机的基础内部工作原理, 包括串口通信,内存、寄存器，GPIO口功能，定时器，单片机汇编语句等。另外两个不行,因为都是封装好的,你搞好了,但是原理你并不明白</p></li><li><p>Arduino 相当于在C/C++语言的基础上封装了一个库你不用了解底层是是如何对IO读写数值,你不用了解TCP的各种协议,封闭了你对底层的了解,优点是开发快,不用学那么多东西,</p></li><li><p>简单来说就是，想学技术就玩单片机，不想学技术，只想快速做出产品就学arduino。</p></li></ul><h4 id="对比表" tabindex="-1">对比表 <a class="header-anchor" href="#对比表" aria-label="Permalink to &quot;对比表&quot;">​</a></h4><table tabindex="0"><thead><tr><th></th><th>51</th><th>Arduino</th><th>树莓派</th></tr></thead><tbody><tr><td>学习成本 传感器开发板套装</td><td>50靠上</td><td>淘宝一搜 一个套装 50靠上</td><td>上千</td></tr><tr><td>生产成本</td><td>STM8芯片1w个2块钱</td><td>最便宜的</td><td>上千</td></tr><tr><td>实现功能</td><td>少</td><td>较多</td><td>相当于小型计算机</td></tr><tr><td>尺寸</td><td>STM8贴片就可以</td><td>能让你看出来那是一个芯片</td><td>相当于小型计算机</td></tr><tr><td>芯片数量不一样</td><td>很多</td><td>没有51多不在一个数量级</td><td>没有Arduino 多不在一个数量级</td></tr><tr><td>发展阶段</td><td>初期</td><td>中期</td><td>计算机期</td></tr><tr><td>功能</td><td>用于不需要太多功能的工业生产</td><td>自娱自乐</td><td>服务器做的东西</td></tr><tr><td>在线模拟器</td><td>没有</td><td>wokwi</td><td>普通Linux系统</td></tr><tr><td>图形化编程</td><td>有</td><td>有</td><td>你都是电脑要什么自行车没有</td></tr></tbody></table><h4 id="未来发展" tabindex="-1">未来发展 <a class="header-anchor" href="#未来发展" aria-label="Permalink to &quot;未来发展&quot;">​</a></h4><p>就像在服务器软件开发,java/python/golang 侵蚀了C/C++的市场,但是C/C++在需要效率的地方还得用,适用性广.</p><p>都有各自的缺点,他们出现的原因都是为了解决各自的痛点,没有好坏,还得看适不适合你</p><p>如果自娱自乐做个小车,飞行器, 可以用STM32(51), 也可以用Arduino,</p><p>如果做智能家居用ESP8226(可以用Arduino), 便宜, 支持Arduino</p><p>如果找个工作 51</p><h4 id="最后总结" tabindex="-1">最后总结 <a class="header-anchor" href="#最后总结" aria-label="Permalink to &quot;最后总结&quot;">​</a></h4><p>个人认为学习还得51, 但是如果你仅仅想做一个联网的小东西,ESP8226就够了.</p><p>仅仅为了 一个 ESP8226 学一个Arduino比学51学习成本低,我学Arduino了.因为有wokwi这个模拟的,学习成本又省去了.我是为了减少学习成本学的Arduino.即使这样使我少学了很多东西.</p><p>Arduino支持ESP8226的编译是一个很出色的表现, 官方提供了nodemcu, micropython也提供了支持. 还有原生的C/C++编译可以支持(这意味记事本就可以keil带代码提示就更可以了).</p><p>个人很看好ESP8226(而非Arduino, 只是ESP8226选择了可以用Arduino编程, 同时也可以用NONOS来编),未来所有需要联网的地方有可能不需要学习51及其CPU基础原理, 因为ESP8226是买wifi送芯片 手动狗头</p><h1 id="wifi-zigbee-bluetooth" tabindex="-1">Wifi zigbee bluetooth <a class="header-anchor" href="#wifi-zigbee-bluetooth" aria-label="Permalink to &quot;Wifi zigbee bluetooth&quot;">​</a></h1><ul><li><table tabindex="0"><thead><tr><th></th><th>NB-IOT</th><th>LoRa</th><th>Zigbee</th></tr></thead><tbody><tr><td>组网方式</td><td>基于现有蜂窝组网</td><td>基于LoRa网关</td><td>基于Zigbee网关</td></tr><tr><td>网络部署方式</td><td>节点</td><td>节点 + 网关（网关部署位置要求较高，需要考虑因素多）</td><td>节点 + 网关</td></tr><tr><td>传输距离</td><td>远距离（可达十几公里，一般情况下10KM以上）</td><td>远距离（可达十几公里，城市1~2公里,郊区可达20km）</td><td>短距离（10米~百米级别）</td></tr><tr><td>单网接入节点容量</td><td>约20万</td><td>约6万，实际受网关信道数量，节点发包频率，数据包大小等有关。一般有500~5000个不等</td><td>理论6万多个，一般情况200~500个</td></tr><tr><td>电池续航</td><td>理论约10年/AA电池</td><td>理论约10年/AA电池</td><td>理论约2年/AA电池</td></tr><tr><td>成本</td><td>模块5-10$，未来目标降到1$</td><td></td><td>1.4rmb</td></tr><tr><td>频段</td><td>License频段，运营商频段</td><td>unlicense频段，Sub-GHZ(433、868、915 MHz等)</td><td>unlicense频段2.4G</td></tr><tr><td>传输速度</td><td>理论160kbp ~ 250Kbps，实际一般小于100kbps，受限低速通信接口UART</td><td>0.3~50kbps</td><td>理论250kps，实际一般小于100kbps，受限低速通信接口UART</td></tr><tr><td>网络时延</td><td>6s -10s</td><td>TBD</td><td>不到1S</td></tr><tr><td>适合领域</td><td>户外场景，LPWAN大面积传感器应用</td><td>户外场景，LPWAN，大面积传感器应用可搭私有网网络，蜂窝网络覆盖不到地方</td><td>常见于户内场景，户外也有,LPLAN小范围传感器应用可搭建私有网网络。</td></tr></tbody></table></li></ul>',162)]))}const m=t(l,[["render",o]]);export{c as __pageData,m as default};
