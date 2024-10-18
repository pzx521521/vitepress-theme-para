---
title: "MQTT入门"
hidemeta: true
---

# MQTT入门

## 服务端:

### 使用[阿里云](https://www.aliyun.com/search?scene=all&k=mqtt)

有点贵

### [使用RabbitMQ搭建MQTT服务](https://www.cnblogs.com/motion/p/14974024.html)

**本次使用的是docker 搭建RabbitMQ 提供  MQTT服务**

如需各种配置请参考 [dockerhub地址](https://hub.docker.com/_/rabbitmq), 

```
docker run -d --hostname my-rabbit --name rabbitmq -p 15672:15672 -p 5672:5672 -p 1883:1883 -p 15675:15675 rabbitmq:3-management
```

port:15672 用于提供websocket服务

port:1883 用于提供mqtt服务

port:5672 用于提供amqp服务

port:5672 用于提供amqp服务

:3-management 指的是 版本号, 3表示是V3  management 默认开启15672提供web服务,

+ mqtt服务 默认是不开启的, 需要手动开启, 先进入docker中的rabbitMQ 容器, 然后执行命令:

```
docker exec -it $container_id bash
rabbitmq-plugins enable rabbitmq_mqtt
```

+ mqtt web (ws://)

```rabbitmq-plugins enable rabbitmq_web_mqtt```

开启服务后, 打开 web管理界面 ` http://localhost:15672/`![在web管理中可以看到](https://img2020.cnblogs.com/blog/1177441/202107/1177441-20210705193842514-16511572.png)

+ 使用rabbit 作为MQTT服务的话，需要创建 topic类型的交换机。交换机名作为订阅和发布消息的Topic

`localhost:15672/#/exchanges`

![](https://img2020.cnblogs.com/blog/1177441/202107/1177441-20210705194126510-1878084303.png)

### [使用emqx搭建MQTT服务](https://www.emqx.com/en)

## 客户端:

### 使用[mqttx](https://mqttx.app/)测试

Connections 指的是发布端

Subscription 指的是订阅端

#### 新建Connection: 

注意如果服务端是RabbitMQ Advanced中的MQTTVersion 不能选5, 因为RabbitMQ不支持5, 填5的话会一直连接失败

账号密码就是Rabbit的登录账号密码，其余参数默认就可以连接。

##### 使用MQTT(TCP)进行连接

![](https://tva1.sinaimg.cn/large/006ulzy2ly1h59hqcvqvaj30ig0k9whx.jpg)

##### 使用MQTT(websocket)进行连接

**注意端口号是15675 后缀是 /ws**

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h5bsu8k6epj30n20kiwi0.jpg)

#### 发布消息

连接成功后就可以发送消息了。 法送消息时记得填写交换机名我这里交换机名为MQTT

![](https://img2020.cnblogs.com/blog/1177441/202107/1177441-20210705194604939-1820703370.png)

#### 接收消息

点击New Subscription  就可以开启一个订阅消息客户端

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h59i3gnf8vj30jf0ml0wg.jpg)

### 在golang 中使用 MQTT

本项目使用 [paho.mqtt.golang](https://github.com/eclipse/paho.mqtt.golang) 作为 MQTT 客户端库，安装：

`go get github.com/eclipse/paho.mqtt.golang`

整体代码如下:

```
package main

import (
	"fmt"
	mqtt "github.com/eclipse/paho.mqtt.golang"
)

const (
	ADDRESS   = "tcp://127.0.0.1:1883"
	USER_NAME = "guest"
	PASSWORD  = "guest"
	TOPIC     = "MQTT"
)

// initMqtt
/**
 *  @Description: 初始化MQTT
 */
func newMqtt() mqtt.Client {
	opts := mqtt.NewClientOptions()
	// 添加代理
	opts.AddBroker(ADDRESS)
	// 设置用户名
	opts.SetUsername(USER_NAME)
	// 设置密码
	opts.SetPassword(PASSWORD)
	// 使用连接信息进行连接
	MqttClient := mqtt.NewClient(opts)
	if token := MqttClient.Connect(); token.Wait() && token.Error() != nil {
		fmt.Println("订阅 MQTT 失败")
		panic(token.Error())
	}
	return MqttClient
}

const (
	QoS0 = 0 // 至多一次
	QoS1 = 1 // 至少一次
	QoS2 = 2 // 确保只有一次
)

func Publish(client mqtt.Client, msg string) {
	client.Publish(TOPIC, QoS2, true, msg)
}

func Subscribe(client mqtt.Client) {
	client.Subscribe(TOPIC, QoS2, subCallBackFunc)
}

func subCallBackFunc(client mqtt.Client, msg mqtt.Message) {
	fmt.Printf("订阅: 当前话题是 [%s]; 信息是 [%s] \n", msg.Topic(), string(msg.Payload()))
}

func main() {
	c := newMqtt()
	c2 := newMqtt()
	Subscribe(c)
	Subscribe(c2)
	select {}
}

```

打开web管理端

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h59ieibod3j30r30bt0x7.jpg)

![image.png](https://tva1.sinaimg.cn/large/006ulzy2ly1h59ifuy0ifj30z50d5dme.jpg)

可以看到有3个connections  6个Channels

上面两个是golang 的  还有一个是mqttx的, 每一个connection都可以订阅/发布, 所以是6个通道

### 在js 中使用 MQTT

首先开通  ws 的服务, 因为是js 是没有办法用mqtt(tcp)的

```rabbitmq-plugins enable rabbitmq_web_mqtt```

默认端口为:15675

下面使用2种js来通过websockect 进行MQTT通信:

思路都是一样的:

先进行带参数连接, 连接成功后可以订阅/发布消息

订阅的消息通过事件去处理, demo 如下:

#### [mqtt.js](https://github.com/mqttjs/MQTT.js)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MQTTDemo</title>
</head>
<body>



<script src="https://cdn.bootcdn.net/ajax/libs/mqtt/4.1.0/mqtt.min.js"></script>
<script>
    options = {
        protocolId: 'MQIsdp',
        protocolVersion: 3,
        username:'guest',
        password:'guest',
    }
    let client  = mqtt.connect('mqtt://192.168.56.101:15675/ws', options)

    client.on('connect', function () {
        client.subscribe('MQTT', { qos: 0 }, function (error, granted) {
            console.log(error)
            if (error) {
                console.log(error)
            } else {
                console.log('subscrib MQTT')
            }
        })
    })
    client.on('message', function (topic, message) {
        // message is Buffer
        console.log(message.toString())
        //client.end()
    })
</script>
</body>
</html>
```

#### [paho.mqtt.javascript](https://github.com/eclipse/paho.mqtt.javascript)

应该是好久没有更新了, 导致官方给的例子都跑不起来, 要````Paho.MQTT.Client``` -> ```Paho.Client```

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>paho-mqtt</title>
</head>
<body>
<div id="count">0</div>
<div id="arrivedDiv"></div>
<script src="paho-mqtt.js"></script>
<script type="text/javascript">
    function $(id){ return document.getElementById(id);}
    // mqtt协议rabbitmq服务
    var brokerIp = '192.168.56.101';
    // mqtt协议端口号
    var port = 15675;
    // 接受推送消息的主题
    var topic = "MQTT";
    // mqtt连接
    client = new Paho.Client(brokerIp, port, "/ws", "clientId_" + parseInt(Math.random() * 100, 10));

    var options = {
        userName :'guest',
        password :'guest',
        onSuccess:onConnect
    };
    client.connect(options);

    // called when the client connects
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log(("已经连接到" + brokerIp + ":" + port));
        client.subscribe(topic);
        console.log(("订阅了topic:"+ topic));
    }

    // 连接断开事件
    client.onConnectionLost = function (responseObject) {
        console.log("失去连接 - " + responseObject.errorMessage);
    };

    // 接收消息事件
    client.onMessageArrived = function (message) {
        console.log("接受主题： " + message.destinationName + "的消息： " + message.payloadString);
        $("arrivedDiv").append(message.payloadString + '\r');
        var count = $("count").innerHTML;
        count = Number(count) + 1;
        $("count").innerHTML = count;
    };

    // 推送给指定主题
    function sendMessage() {
        var a = $("#message").val();
        if (client.isConnected()) {
            var message = new Paho.MQTT.Message(a);
            message.destinationName = topic;
            client.send(message);
        }
    }
</script>
</body>
</html>
```

