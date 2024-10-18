---
title: "expvar 简单使用"
hidemeta: true
---
# [expvar 简单使用](https://pkg.go.dev/expvar)

> Package expvar provides a standardized interface to public variables, such as operation counters in servers. It exposes these variables via HTTP at **/debug/vars** in JSON format.

> In addition to adding the HTTP handler, this package registers the following variables:

```
cmdline   os.Args
memstats  runtime.Memstats
```

> The package is sometimes only imported for the side effect of registering its HTTP handler and the above variables. To use it this way, link this package into your program:

导入包就是使用了, 会自动添加一个**/debug/vars**的http 服务, 具体实现看源码, 很简单, 

有一个多线程 map读写锁的实现

```
import _ "expvar"
```

# 一个简单的http:

```
package main

import (
	"expvar"
	"net/http"
	"time"
)

func testData() any {
	return "hello expvar"
}

func main() {
	test := expvar.NewMap("Test")
	test.Add("go", 10)
	test.Add("go1", 10)
	aliveOfSeconds := expvar.NewInt("aliveOfSeconds")
	expvar.NewString("TestString").Set("this is a test string")
	expvar.Publish("TestFunc", expvar.Func(testData))
	go http.ListenAndServe(":8080", nil)
	for {
		aliveOfSeconds.Add(1)
		time.Sleep(1 * time.Second)
	}
}


```

