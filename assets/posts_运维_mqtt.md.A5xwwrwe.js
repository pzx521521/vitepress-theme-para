import{_ as s,c as a,a2 as p,o as t}from"./chunks/framework.DDqBDuc9.js";const g=JSON.parse('{"title":"MQTT入门","description":"","frontmatter":{"title":"MQTT入门","hidemeta":true},"headers":[],"relativePath":"posts/运维/mqtt.md","filePath":"posts/运维/mqtt.md"}'),e={name:"posts/运维/mqtt.md"};function l(i,n,c,o,r,m){return t(),a("div",null,n[0]||(n[0]=[p(`<h1 id="mqtt入门" tabindex="-1">MQTT入门 <a class="header-anchor" href="#mqtt入门" aria-label="Permalink to &quot;MQTT入门&quot;">​</a></h1><h2 id="服务端" tabindex="-1">服务端: <a class="header-anchor" href="#服务端" aria-label="Permalink to &quot;服务端:&quot;">​</a></h2><h3 id="使用阿里云" tabindex="-1">使用<a href="https://www.aliyun.com/search?scene=all&amp;k=mqtt" target="_blank" rel="noreferrer">阿里云</a> <a class="header-anchor" href="#使用阿里云" aria-label="Permalink to &quot;使用[阿里云](https://www.aliyun.com/search?scene=all&amp;k=mqtt)&quot;">​</a></h3><p>有点贵</p><h3 id="使用rabbitmq搭建mqtt服务" tabindex="-1"><a href="https://www.cnblogs.com/motion/p/14974024.html" target="_blank" rel="noreferrer">使用RabbitMQ搭建MQTT服务</a> <a class="header-anchor" href="#使用rabbitmq搭建mqtt服务" aria-label="Permalink to &quot;[使用RabbitMQ搭建MQTT服务](https://www.cnblogs.com/motion/p/14974024.html)&quot;">​</a></h3><p><strong>本次使用的是docker 搭建RabbitMQ 提供 MQTT服务</strong></p><p>如需各种配置请参考 <a href="https://hub.docker.com/_/rabbitmq" target="_blank" rel="noreferrer">dockerhub地址</a>,</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run -d --hostname my-rabbit --name rabbitmq -p 15672:15672 -p 5672:5672 -p 1883:1883 -p 15675:15675 rabbitmq:3-management</span></span></code></pre></div><p>port:15672 用于提供websocket服务</p><p>port:1883 用于提供mqtt服务</p><p>port:5672 用于提供amqp服务</p><p>port:5672 用于提供amqp服务</p><p>:3-management 指的是 版本号, 3表示是V3 management 默认开启15672提供web服务,</p><ul><li>mqtt服务 默认是不开启的, 需要手动开启, 先进入docker中的rabbitMQ 容器, 然后执行命令:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker exec -it $container_id bash</span></span>
<span class="line"><span>rabbitmq-plugins enable rabbitmq_mqtt</span></span></code></pre></div><ul><li>mqtt web (ws://)</li></ul><p><code>rabbitmq-plugins enable rabbitmq_web_mqtt</code></p><p>开启服务后, 打开 web管理界面 <code> http://localhost:15672/</code><img src="https://img2020.cnblogs.com/blog/1177441/202107/1177441-20210705193842514-16511572.png" alt="在web管理中可以看到"></p><ul><li>使用rabbit 作为MQTT服务的话，需要创建 topic类型的交换机。交换机名作为订阅和发布消息的Topic</li></ul><p><code>localhost:15672/#/exchanges</code></p><p><img src="https://img2020.cnblogs.com/blog/1177441/202107/1177441-20210705194126510-1878084303.png" alt=""></p><h3 id="使用emqx搭建mqtt服务" tabindex="-1"><a href="https://www.emqx.com/en" target="_blank" rel="noreferrer">使用emqx搭建MQTT服务</a> <a class="header-anchor" href="#使用emqx搭建mqtt服务" aria-label="Permalink to &quot;[使用emqx搭建MQTT服务](https://www.emqx.com/en)&quot;">​</a></h3><h2 id="客户端" tabindex="-1">客户端: <a class="header-anchor" href="#客户端" aria-label="Permalink to &quot;客户端:&quot;">​</a></h2><h3 id="使用mqttx测试" tabindex="-1">使用<a href="https://mqttx.app/" target="_blank" rel="noreferrer">mqttx</a>测试 <a class="header-anchor" href="#使用mqttx测试" aria-label="Permalink to &quot;使用[mqttx](https://mqttx.app/)测试&quot;">​</a></h3><p>Connections 指的是发布端</p><p>Subscription 指的是订阅端</p><h4 id="新建connection" tabindex="-1">新建Connection: <a class="header-anchor" href="#新建connection" aria-label="Permalink to &quot;新建Connection:&quot;">​</a></h4><p>注意如果服务端是RabbitMQ Advanced中的MQTTVersion 不能选5, 因为RabbitMQ不支持5, 填5的话会一直连接失败</p><p>账号密码就是Rabbit的登录账号密码，其余参数默认就可以连接。</p><h5 id="使用mqtt-tcp-进行连接" tabindex="-1">使用MQTT(TCP)进行连接 <a class="header-anchor" href="#使用mqtt-tcp-进行连接" aria-label="Permalink to &quot;使用MQTT(TCP)进行连接&quot;">​</a></h5><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h59hqcvqvaj30ig0k9whx.jpg" alt=""></p><h5 id="使用mqtt-websocket-进行连接" tabindex="-1">使用MQTT(websocket)进行连接 <a class="header-anchor" href="#使用mqtt-websocket-进行连接" aria-label="Permalink to &quot;使用MQTT(websocket)进行连接&quot;">​</a></h5><p><strong>注意端口号是15675 后缀是 /ws</strong></p><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h5bsu8k6epj30n20kiwi0.jpg" alt="image.png"></p><h4 id="发布消息" tabindex="-1">发布消息 <a class="header-anchor" href="#发布消息" aria-label="Permalink to &quot;发布消息&quot;">​</a></h4><p>连接成功后就可以发送消息了。 法送消息时记得填写交换机名我这里交换机名为MQTT</p><p><img src="https://img2020.cnblogs.com/blog/1177441/202107/1177441-20210705194604939-1820703370.png" alt=""></p><h4 id="接收消息" tabindex="-1">接收消息 <a class="header-anchor" href="#接收消息" aria-label="Permalink to &quot;接收消息&quot;">​</a></h4><p>点击New Subscription 就可以开启一个订阅消息客户端</p><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h59i3gnf8vj30jf0ml0wg.jpg" alt="image.png"></p><h3 id="在golang-中使用-mqtt" tabindex="-1">在golang 中使用 MQTT <a class="header-anchor" href="#在golang-中使用-mqtt" aria-label="Permalink to &quot;在golang 中使用 MQTT&quot;">​</a></h3><p>本项目使用 <a href="https://github.com/eclipse/paho.mqtt.golang" target="_blank" rel="noreferrer">paho.mqtt.golang</a> 作为 MQTT 客户端库，安装：</p><p><code>go get github.com/eclipse/paho.mqtt.golang</code></p><p>整体代码如下:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	mqtt &quot;github.com/eclipse/paho.mqtt.golang&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const (</span></span>
<span class="line"><span>	ADDRESS   = &quot;tcp://127.0.0.1:1883&quot;</span></span>
<span class="line"><span>	USER_NAME = &quot;guest&quot;</span></span>
<span class="line"><span>	PASSWORD  = &quot;guest&quot;</span></span>
<span class="line"><span>	TOPIC     = &quot;MQTT&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// initMqtt</span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> *  @Description: 初始化MQTT</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>func newMqtt() mqtt.Client {</span></span>
<span class="line"><span>	opts := mqtt.NewClientOptions()</span></span>
<span class="line"><span>	// 添加代理</span></span>
<span class="line"><span>	opts.AddBroker(ADDRESS)</span></span>
<span class="line"><span>	// 设置用户名</span></span>
<span class="line"><span>	opts.SetUsername(USER_NAME)</span></span>
<span class="line"><span>	// 设置密码</span></span>
<span class="line"><span>	opts.SetPassword(PASSWORD)</span></span>
<span class="line"><span>	// 使用连接信息进行连接</span></span>
<span class="line"><span>	MqttClient := mqtt.NewClient(opts)</span></span>
<span class="line"><span>	if token := MqttClient.Connect(); token.Wait() &amp;&amp; token.Error() != nil {</span></span>
<span class="line"><span>		fmt.Println(&quot;订阅 MQTT 失败&quot;)</span></span>
<span class="line"><span>		panic(token.Error())</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return MqttClient</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const (</span></span>
<span class="line"><span>	QoS0 = 0 // 至多一次</span></span>
<span class="line"><span>	QoS1 = 1 // 至少一次</span></span>
<span class="line"><span>	QoS2 = 2 // 确保只有一次</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func Publish(client mqtt.Client, msg string) {</span></span>
<span class="line"><span>	client.Publish(TOPIC, QoS2, true, msg)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func Subscribe(client mqtt.Client) {</span></span>
<span class="line"><span>	client.Subscribe(TOPIC, QoS2, subCallBackFunc)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func subCallBackFunc(client mqtt.Client, msg mqtt.Message) {</span></span>
<span class="line"><span>	fmt.Printf(&quot;订阅: 当前话题是 [%s]; 信息是 [%s] \\n&quot;, msg.Topic(), string(msg.Payload()))</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	c := newMqtt()</span></span>
<span class="line"><span>	c2 := newMqtt()</span></span>
<span class="line"><span>	Subscribe(c)</span></span>
<span class="line"><span>	Subscribe(c2)</span></span>
<span class="line"><span>	select {}</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>打开web管理端</p><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h59ieibod3j30r30bt0x7.jpg" alt="image.png"></p><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h59ifuy0ifj30z50d5dme.jpg" alt="image.png"></p><p>可以看到有3个connections 6个Channels</p><p>上面两个是golang 的 还有一个是mqttx的, 每一个connection都可以订阅/发布, 所以是6个通道</p><h3 id="在js-中使用-mqtt" tabindex="-1">在js 中使用 MQTT <a class="header-anchor" href="#在js-中使用-mqtt" aria-label="Permalink to &quot;在js 中使用 MQTT&quot;">​</a></h3><p>首先开通 ws 的服务, 因为是js 是没有办法用mqtt(tcp)的</p><p><code>rabbitmq-plugins enable rabbitmq_web_mqtt</code></p><p>默认端口为:15675</p><p>下面使用2种js来通过websockect 进行MQTT通信:</p><p>思路都是一样的:</p><p>先进行带参数连接, 连接成功后可以订阅/发布消息</p><p>订阅的消息通过事件去处理, demo 如下:</p><h4 id="mqtt-js" tabindex="-1"><a href="https://github.com/mqttjs/MQTT.js" target="_blank" rel="noreferrer">mqtt.js</a> <a class="header-anchor" href="#mqtt-js" aria-label="Permalink to &quot;[mqtt.js](https://github.com/mqttjs/MQTT.js)&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;MQTTDemo&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script src=&quot;https://cdn.bootcdn.net/ajax/libs/mqtt/4.1.0/mqtt.min.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>    options = {</span></span>
<span class="line"><span>        protocolId: &#39;MQIsdp&#39;,</span></span>
<span class="line"><span>        protocolVersion: 3,</span></span>
<span class="line"><span>        username:&#39;guest&#39;,</span></span>
<span class="line"><span>        password:&#39;guest&#39;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    let client  = mqtt.connect(&#39;mqtt://192.168.56.101:15675/ws&#39;, options)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    client.on(&#39;connect&#39;, function () {</span></span>
<span class="line"><span>        client.subscribe(&#39;MQTT&#39;, { qos: 0 }, function (error, granted) {</span></span>
<span class="line"><span>            console.log(error)</span></span>
<span class="line"><span>            if (error) {</span></span>
<span class="line"><span>                console.log(error)</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                console.log(&#39;subscrib MQTT&#39;)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    client.on(&#39;message&#39;, function (topic, message) {</span></span>
<span class="line"><span>        // message is Buffer</span></span>
<span class="line"><span>        console.log(message.toString())</span></span>
<span class="line"><span>        //client.end()</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><h4 id="paho-mqtt-javascript" tabindex="-1"><a href="https://github.com/eclipse/paho.mqtt.javascript" target="_blank" rel="noreferrer">paho.mqtt.javascript</a> <a class="header-anchor" href="#paho-mqtt-javascript" aria-label="Permalink to &quot;[paho.mqtt.javascript](https://github.com/eclipse/paho.mqtt.javascript)&quot;">​</a></h4><p>应该是好久没有更新了, 导致官方给的例子都跑不起来, 要\`\`\`\`Paho.MQTT.Client<code>-&gt;</code>Paho.Client\`\`\`</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;paho-mqtt&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>&lt;div id=&quot;count&quot;&gt;0&lt;/div&gt;</span></span>
<span class="line"><span>&lt;div id=&quot;arrivedDiv&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;script src=&quot;paho-mqtt.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span>    function $(id){ return document.getElementById(id);}</span></span>
<span class="line"><span>    // mqtt协议rabbitmq服务</span></span>
<span class="line"><span>    var brokerIp = &#39;192.168.56.101&#39;;</span></span>
<span class="line"><span>    // mqtt协议端口号</span></span>
<span class="line"><span>    var port = 15675;</span></span>
<span class="line"><span>    // 接受推送消息的主题</span></span>
<span class="line"><span>    var topic = &quot;MQTT&quot;;</span></span>
<span class="line"><span>    // mqtt连接</span></span>
<span class="line"><span>    client = new Paho.Client(brokerIp, port, &quot;/ws&quot;, &quot;clientId_&quot; + parseInt(Math.random() * 100, 10));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    var options = {</span></span>
<span class="line"><span>        userName :&#39;guest&#39;,</span></span>
<span class="line"><span>        password :&#39;guest&#39;,</span></span>
<span class="line"><span>        onSuccess:onConnect</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    client.connect(options);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // called when the client connects</span></span>
<span class="line"><span>    function onConnect() {</span></span>
<span class="line"><span>        // Once a connection has been made, make a subscription and send a message.</span></span>
<span class="line"><span>        console.log((&quot;已经连接到&quot; + brokerIp + &quot;:&quot; + port));</span></span>
<span class="line"><span>        client.subscribe(topic);</span></span>
<span class="line"><span>        console.log((&quot;订阅了topic:&quot;+ topic));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 连接断开事件</span></span>
<span class="line"><span>    client.onConnectionLost = function (responseObject) {</span></span>
<span class="line"><span>        console.log(&quot;失去连接 - &quot; + responseObject.errorMessage);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 接收消息事件</span></span>
<span class="line"><span>    client.onMessageArrived = function (message) {</span></span>
<span class="line"><span>        console.log(&quot;接受主题： &quot; + message.destinationName + &quot;的消息： &quot; + message.payloadString);</span></span>
<span class="line"><span>        $(&quot;arrivedDiv&quot;).append(message.payloadString + &#39;\\r&#39;);</span></span>
<span class="line"><span>        var count = $(&quot;count&quot;).innerHTML;</span></span>
<span class="line"><span>        count = Number(count) + 1;</span></span>
<span class="line"><span>        $(&quot;count&quot;).innerHTML = count;</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 推送给指定主题</span></span>
<span class="line"><span>    function sendMessage() {</span></span>
<span class="line"><span>        var a = $(&quot;#message&quot;).val();</span></span>
<span class="line"><span>        if (client.isConnected()) {</span></span>
<span class="line"><span>            var message = new Paho.MQTT.Message(a);</span></span>
<span class="line"><span>            message.destinationName = topic;</span></span>
<span class="line"><span>            client.send(message);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div>`,63)]))}const u=s(e,[["render",l]]);export{g as __pageData,u as default};
