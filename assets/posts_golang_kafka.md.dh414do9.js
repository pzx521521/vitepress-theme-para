import{_ as s,c as n,a2 as p,o as e}from"./chunks/framework.D_NaTb9t.js";const h=JSON.parse('{"title":"Kafka入门","description":"","frontmatter":{"title":"Kafka入门","hidemeta":true},"headers":[],"relativePath":"posts/golang/kafka.md","filePath":"posts/golang/kafka.md"}'),t={name:"posts/golang/kafka.md"};function i(l,a,r,o,c,d){return e(),n("div",null,a[0]||(a[0]=[p(`<h1 id="kafka入门" tabindex="-1">Kafka入门 <a class="header-anchor" href="#kafka入门" aria-label="Permalink to &quot;Kafka入门&quot;">​</a></h1><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><h4 id="step-1-create-a-network" tabindex="-1">Step 1: Create a network <a class="header-anchor" href="#step-1-create-a-network" aria-label="Permalink to &quot;Step 1: Create a network&quot;">​</a></h4><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ docker network create app-tier --driver bridge</span></span></code></pre></div><h4 id="step-2-launch-the-zookeeper-server-instance" tabindex="-1">Step 2: Launch the Zookeeper server instance <a class="header-anchor" href="#step-2-launch-the-zookeeper-server-instance" aria-label="Permalink to &quot;Step 2: Launch the Zookeeper server instance&quot;">​</a></h4><p>Use the <code>--network app-tier</code> argument to the <code>docker run</code> command to attach the Zookeeper container to the <code>app-tier</code> network.</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ docker run -d --name zookeeper-server \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --network app-tier \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -e ALLOW_ANONYMOUS_LOGIN=yes \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    bitnami/zookeeper:latest</span></span></code></pre></div><h4 id="step-3-test-in-docker" tabindex="-1">Step 3: Test in docker : <a class="header-anchor" href="#step-3-test-in-docker" aria-label="Permalink to &quot;Step 3: Test in docker :&quot;">​</a></h4><p>list topic:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ docker exec -it ea bash</span></span>
<span class="line"><span>$ kafka-topics.sh --list  --bootstrap-server kafka-server:9092</span></span></code></pre></div><p>Create a topic:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kafka-topics.sh --create --bootstrap-server kafka-server:9092 --replication-factor 1 --partitions 1 --topic test</span></span></code></pre></div><p>producer:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kafka-console-producer.sh --broker-list localhost:9092 --topic test</span></span></code></pre></div><p>consumer:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning</span></span></code></pre></div><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h59l5zc56dj30ux0kd4av.jpg" alt="image.png"></p><h2 id="golang" tabindex="-1">golang: <a class="header-anchor" href="#golang" aria-label="Permalink to &quot;golang:&quot;">​</a></h2><p>使用包:</p><p>github.com/Shopify/sarama</p><p>代码如下: config.go</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package kafka</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;github.com/Shopify/sarama&quot;</span></span>
<span class="line"><span>	&quot;sync&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var (</span></span>
<span class="line"><span>	CST_Addr  = []string{&quot;192.168.56.101:9092&quot;}</span></span>
<span class="line"><span>	CST_Topic = &quot;test&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type Mykafka struct {</span></span>
<span class="line"><span>	Producer   sarama.SyncProducer</span></span>
<span class="line"><span>	Consumer   sarama.Consumer</span></span>
<span class="line"><span>	Partitions []int32</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func NewMykafka() *Mykafka {</span></span>
<span class="line"><span>	mykafka := Mykafka{}</span></span>
<span class="line"><span>	config := sarama.NewConfig()</span></span>
<span class="line"><span>	config.Producer.RequiredAcks = sarama.WaitForAll          // 发送完数据需要leader和follower都确认</span></span>
<span class="line"><span>	config.Producer.Partitioner = sarama.NewRandomPartitioner //写到随机分区中，我们默认设置32个分区</span></span>
<span class="line"><span>	config.Producer.Return.Successes = true                   // 成功交付的消息将在success channel返回</span></span>
<span class="line"><span>	// 连接kafka</span></span>
<span class="line"><span>	producer, err := sarama.NewSyncProducer(CST_Addr, config)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		fmt.Println(&quot;Producer closed, err:&quot;, err)</span></span>
<span class="line"><span>		return &amp;mykafka</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	mykafka.Producer = producer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	consumer, err := sarama.NewConsumer(CST_Addr, nil)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		fmt.Printf(&quot;Failed to start consumer: %v&quot;, err)</span></span>
<span class="line"><span>		return &amp;mykafka</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	mykafka.Consumer = consumer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	mykafka.Partitions = mykafka.GetConsumerPartitions()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return &amp;mykafka</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func (m *Mykafka) ProducerMsg() {</span></span>
<span class="line"><span>	// 构造一个消息</span></span>
<span class="line"><span>	msg := &amp;sarama.ProducerMessage{}</span></span>
<span class="line"><span>	msg.Topic = CST_Topic</span></span>
<span class="line"><span>	msg.Value = sarama.StringEncoder(&quot;producer kafka messages...&quot;)</span></span>
<span class="line"><span>	// 发送消息</span></span>
<span class="line"><span>	pid, offset, err := m.Producer.SendMessage(msg)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		fmt.Println(&quot;send msg failed, err:&quot;, err)</span></span>
<span class="line"><span>		return</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	fmt.Printf(&quot;pid:%v offset:%v\\n&quot;, pid, offset)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func (m *Mykafka) GetConsumerPartitions() []int32 {</span></span>
<span class="line"><span>	partitionList, err := m.Consumer.Partitions(CST_Topic) // 通过topic获取到所有的分区</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		fmt.Println(&quot;Failed to get the list of partition: &quot;, err)</span></span>
<span class="line"><span>		return []int32{}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return partitionList</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func (m *Mykafka) ConsumerMsg() {</span></span>
<span class="line"><span>	var wg sync.WaitGroup</span></span>
<span class="line"><span>	for partition := range m.Partitions { // 遍历所有的分区</span></span>
<span class="line"><span>		pc, err := m.Consumer.ConsumePartition(CST_Topic, int32(partition), sarama.OffsetNewest) // 针对每个分区创建一个分区消费者</span></span>
<span class="line"><span>		if err != nil {</span></span>
<span class="line"><span>			fmt.Printf(&quot;Failed to start consumer for partition %d: %v\\n&quot;, partition, err)</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		wg.Add(1)</span></span>
<span class="line"><span>		go func(sarama.PartitionConsumer) { // 为每个分区开一个go协程取值</span></span>
<span class="line"><span>			for msg := range pc.Messages() { // 阻塞直到有值发送过来，然后再继续等待</span></span>
<span class="line"><span>				fmt.Printf(&quot;Partition:%d, Offset:%d, key:%s, value:%s\\n&quot;, msg.Partition, msg.Offset, string(msg.Key), string(msg.Value))</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>			defer pc.AsyncClose()</span></span>
<span class="line"><span>			wg.Done()</span></span>
<span class="line"><span>		}(pc)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	wg.Wait()</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>kafka_test.go</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package kafka</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &quot;testing&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func TestKafka(t *testing.T) {</span></span>
<span class="line"><span>	mykafka := NewMykafka()</span></span>
<span class="line"><span>	//mykafka.ProducerMsg()</span></span>
<span class="line"><span>	mykafka.ConsumerMsg()</span></span>
<span class="line"><span>	mykafka.Producer.Close()</span></span>
<span class="line"><span>	mykafka.Consumer.Close()</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>运行会出现报错:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Failed to start consumer for partition 0: dial tcp: lookup ea5fbd7e61bb: no such host</span></span></code></pre></div><p>在 hosts 中添加</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>192.168.56.101 ea5fbd7e61bb</span></span></code></pre></div><p>可以解决问题</p><p><img src="https://tva1.sinaimg.cn/large/006ulzy2ly1h59l8ax4muj30v30ki19l.jpg" alt="image.png"></p><h2 id="看一下为什么host-会变为-ea5fbd7e61bb" tabindex="-1">看一下为什么host 会变为 ea5fbd7e61bb <a class="header-anchor" href="#看一下为什么host-会变为-ea5fbd7e61bb" aria-label="Permalink to &quot;看一下为什么host 会变为 ea5fbd7e61bb&quot;">​</a></h2><p>stack 如下:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sarama.(*Broker).GetMetadata (broker.go:358) github.com/Shopify/sarama</span></span>
<span class="line"><span>sarama.(*client).tryRefreshMetadata (client.go:921) github.com/Shopify/sarama</span></span>
<span class="line"><span>sarama.(*client).RefreshMetadata (client.go:499) github.com/Shopify/sarama</span></span>
<span class="line"><span>sarama.(*client).Leader (client.go:442) github.com/Shopify/sarama</span></span>
<span class="line"><span>sarama.(*client).getOffset (client.go:792) github.com/Shopify/sarama</span></span>
<span class="line"><span>sarama.(*client).GetOffset (client.go:507) github.com/Shopify/sarama</span></span>
<span class="line"><span>sarama.(*partitionConsumer).chooseStartingOffset (consumer.go:501) github.com/Shopify/sarama</span></span>
<span class="line"><span>sarama.(*consumer).ConsumePartition (consumer.go:171) github.com/Shopify/sarama</span></span>
<span class="line"><span>kafka.(*Mykafka).ConsumerMsg (config.go:71) learn/kafka</span></span></code></pre></div><p>在 <code>tryRefreshMetadata </code>中会 <code>updateMetadata</code>, 在<code>updateMetadata </code> broker 是没有的, 而在<code>updateMetadata </code>之后, broker会通过 GetMetadata中的数据, 给broker 一个值, 此值就是ea5fbd7e61bb</p><p>总的来说:</p><p><code>m.Consumer.ConsumePartition</code>时会刷新broker的Addr,</p><p>这个Addr是从docker 里面kafka中获取的</p><h3 id="那么ea5fbd7e61bb-是哪里来的呢" tabindex="-1">那么ea5fbd7e61bb 是哪里来的呢? <a class="header-anchor" href="#那么ea5fbd7e61bb-是哪里来的呢" aria-label="Permalink to &quot;那么ea5fbd7e61bb 是哪里来的呢?&quot;">​</a></h3><p>其实就是docker 容器的ID (CONTAINER ID), 在app-tier网络中是可以访问到的</p><p>这就涉及到了zookeeper 里面的东西</p><p>kafka 分broker时是有一个broker.id的, 不同broker是通过不同ip来进行访问的, 每个broker都对应的有一个ip, 可能是不同的, 为了区分这些broker, 会向kafka刷新Metadata信息.</p><p>看下来, 如果没有跑在app-tier网络中 还是添加hosts来解析方便一些</p><p>测试代码如下:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>func TestBroker(t *testing.T) {</span></span>
<span class="line"><span>	broker := sarama.NewBroker(&quot;192.168.56.101:9092&quot;)</span></span>
<span class="line"><span>	err := broker.Open(nil)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		panic(err)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	request := sarama.MetadataRequest{Topics: []string{&quot;test&quot;}}</span></span>
<span class="line"><span>	response, err := broker.GetMetadata(&amp;request)</span></span>
<span class="line"><span>	if err != nil {</span></span>
<span class="line"><span>		_ = broker.Close()</span></span>
<span class="line"><span>		panic(err)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	fmt.Println(&quot;There are&quot;, len(response.Topics), &quot;topics active in the cluster.&quot;)</span></span>
<span class="line"><span>	fmt.Println(&quot;There are&quot;, len(response.Brokers), &quot;Brokers active in the cluster.&quot;)</span></span>
<span class="line"><span>	for i, b := range response.Brokers {</span></span>
<span class="line"><span>		fmt.Printf(&quot;NO.%v broker&#39;s Addr is:%v \\n&quot;, i, b.Addr())</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	if err = broker.Close(); err != nil {</span></span>
<span class="line"><span>		panic(err)</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="kakfa-web-ui" tabindex="-1">Kakfa web UI <a class="header-anchor" href="#kakfa-web-ui" aria-label="Permalink to &quot;Kakfa web UI&quot;">​</a></h1><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 9000:9000</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --network</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> app-tier</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> KAFKA_BROKERCONNECT=localhost:9092</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> JVM_OPTS=&quot;-Xms32M -Xmx64M&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SERVER_SERVLET_CONTEXTPATH=&quot;/&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    obsidiandynamics/kafdrop:latest</span></span></code></pre></div>`,46)]))}const u=s(t,[["render",i]]);export{h as __pageData,u as default};
