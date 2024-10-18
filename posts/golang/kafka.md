---
title: "Kafka入门"
hidemeta: true
---
# Kafka入门

## 安装

#### Step 1: Create a network

```console
$ docker network create app-tier --driver bridge
```

#### Step 2: Launch the Zookeeper server instance

Use the `--network app-tier` argument to the `docker run` command to attach the Zookeeper container to the `app-tier` network.

```console
$ docker run -d --name zookeeper-server \
    --network app-tier \
    -e ALLOW_ANONYMOUS_LOGIN=yes \
    bitnami/zookeeper:latest
```

#### Step 3: Test in docker :

list topic:

```
$ docker exec -it ea bash
$ kafka-topics.sh --list  --bootstrap-server kafka-server:9092
```

Create a topic:

```
kafka-topics.sh --create --bootstrap-server kafka-server:9092 --replication-factor 1 --partitions 1 --topic test
```

producer:

```text
kafka-console-producer.sh --broker-list localhost:9092 --topic test
```

consumer:

```text
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning
```

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h59l5zc56dj30ux0kd4av.jpg)

## golang:

使用包:

github.com/Shopify/sarama

代码如下: config.go

```
package kafka

import (
	"fmt"
	"github.com/Shopify/sarama"
	"sync"
)

var (
	CST_Addr  = []string{"192.168.56.101:9092"}
	CST_Topic = "test"
)

type Mykafka struct {
	Producer   sarama.SyncProducer
	Consumer   sarama.Consumer
	Partitions []int32
}

func NewMykafka() *Mykafka {
	mykafka := Mykafka{}
	config := sarama.NewConfig()
	config.Producer.RequiredAcks = sarama.WaitForAll          // 发送完数据需要leader和follower都确认
	config.Producer.Partitioner = sarama.NewRandomPartitioner //写到随机分区中，我们默认设置32个分区
	config.Producer.Return.Successes = true                   // 成功交付的消息将在success channel返回
	// 连接kafka
	producer, err := sarama.NewSyncProducer(CST_Addr, config)
	if err != nil {
		fmt.Println("Producer closed, err:", err)
		return &mykafka
	}
	mykafka.Producer = producer

	consumer, err := sarama.NewConsumer(CST_Addr, nil)
	if err != nil {
		fmt.Printf("Failed to start consumer: %v", err)
		return &mykafka
	}
	mykafka.Consumer = consumer

	mykafka.Partitions = mykafka.GetConsumerPartitions()

	return &mykafka
}

func (m *Mykafka) ProducerMsg() {
	// 构造一个消息
	msg := &sarama.ProducerMessage{}
	msg.Topic = CST_Topic
	msg.Value = sarama.StringEncoder("producer kafka messages...")
	// 发送消息
	pid, offset, err := m.Producer.SendMessage(msg)
	if err != nil {
		fmt.Println("send msg failed, err:", err)
		return
	}
	fmt.Printf("pid:%v offset:%v\n", pid, offset)
}

func (m *Mykafka) GetConsumerPartitions() []int32 {
	partitionList, err := m.Consumer.Partitions(CST_Topic) // 通过topic获取到所有的分区
	if err != nil {
		fmt.Println("Failed to get the list of partition: ", err)
		return []int32{}
	}
	return partitionList
}

func (m *Mykafka) ConsumerMsg() {
	var wg sync.WaitGroup
	for partition := range m.Partitions { // 遍历所有的分区
		pc, err := m.Consumer.ConsumePartition(CST_Topic, int32(partition), sarama.OffsetNewest) // 针对每个分区创建一个分区消费者
		if err != nil {
			fmt.Printf("Failed to start consumer for partition %d: %v\n", partition, err)
		}
		wg.Add(1)
		go func(sarama.PartitionConsumer) { // 为每个分区开一个go协程取值
			for msg := range pc.Messages() { // 阻塞直到有值发送过来，然后再继续等待
				fmt.Printf("Partition:%d, Offset:%d, key:%s, value:%s\n", msg.Partition, msg.Offset, string(msg.Key), string(msg.Value))
			}
			defer pc.AsyncClose()
			wg.Done()
		}(pc)
	}
	wg.Wait()
}

```

kafka_test.go

```
package kafka

import "testing"

func TestKafka(t *testing.T) {
	mykafka := NewMykafka()
	//mykafka.ProducerMsg()
	mykafka.ConsumerMsg()
	mykafka.Producer.Close()
	mykafka.Consumer.Close()
}
```

运行会出现报错:

```
Failed to start consumer for partition 0: dial tcp: lookup ea5fbd7e61bb: no such host
```

在 hosts 中添加

```
192.168.56.101 ea5fbd7e61bb
```

可以解决问题

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h59l8ax4muj30v30ki19l.jpg)

## 看一下为什么host 会变为 ea5fbd7e61bb

stack 如下:

```
sarama.(*Broker).GetMetadata (broker.go:358) github.com/Shopify/sarama
sarama.(*client).tryRefreshMetadata (client.go:921) github.com/Shopify/sarama
sarama.(*client).RefreshMetadata (client.go:499) github.com/Shopify/sarama
sarama.(*client).Leader (client.go:442) github.com/Shopify/sarama
sarama.(*client).getOffset (client.go:792) github.com/Shopify/sarama
sarama.(*client).GetOffset (client.go:507) github.com/Shopify/sarama
sarama.(*partitionConsumer).chooseStartingOffset (consumer.go:501) github.com/Shopify/sarama
sarama.(*consumer).ConsumePartition (consumer.go:171) github.com/Shopify/sarama
kafka.(*Mykafka).ConsumerMsg (config.go:71) learn/kafka
```

在 `tryRefreshMetadata `中会 `updateMetadata`, 在`updateMetadata ` broker 是没有的, 而在`updateMetadata `之后, broker会通过 GetMetadata中的数据, 给broker 一个值, 此值就是ea5fbd7e61bb

总的来说:

`m.Consumer.ConsumePartition`时会刷新broker的Addr, 

这个Addr是从docker 里面kafka中获取的 

### 那么ea5fbd7e61bb 是哪里来的呢?

其实就是docker 容器的ID (CONTAINER ID), 在app-tier网络中是可以访问到的

这就涉及到了zookeeper 里面的东西

 kafka 分broker时是有一个broker.id的, 不同broker是通过不同ip来进行访问的, 每个broker都对应的有一个ip, 可能是不同的, 为了区分这些broker, 会向kafka刷新Metadata信息.

看下来, 如果没有跑在app-tier网络中 还是添加hosts来解析方便一些 

测试代码如下:

```
func TestBroker(t *testing.T) {
	broker := sarama.NewBroker("192.168.56.101:9092")
	err := broker.Open(nil)
	if err != nil {
		panic(err)
	}

	request := sarama.MetadataRequest{Topics: []string{"test"}}
	response, err := broker.GetMetadata(&request)
	if err != nil {
		_ = broker.Close()
		panic(err)
	}

	fmt.Println("There are", len(response.Topics), "topics active in the cluster.")
	fmt.Println("There are", len(response.Brokers), "Brokers active in the cluster.")
	for i, b := range response.Brokers {
		fmt.Printf("NO.%v broker's Addr is:%v \n", i, b.Addr())
	}
	if err = broker.Close(); err != nil {
		panic(err)
	}
}
```



# Kakfa web UI

```sh
docker run -d  -p 9000:9000 \
    --network app-tier \
    -e KAFKA_BROKERCONNECT=localhost:9092 \
    -e JVM_OPTS="-Xms32M -Xmx64M" \
    -e SERVER_SERVLET_CONTEXTPATH="/" \
    obsidiandynamics/kafdrop:latest
```