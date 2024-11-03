# 用hysteria2做ip池
+ 起因爬虫做了ip的并发限制，大量爬取之后ip被封，所以想用hysteria2做ip池.
+ 为什么用hysteria2也是因为目前来看hysteria2用的比ss多
+ hysteria2/clash/ss 这些本身编译好的程序都是不支持 访问同一个网站的时候使用不同ip的.唯一方案是开启多个客户端,但是很麻烦.
+ ip池本身使用的是clash的配置文件
+ 这种pr官方肯定不会接受... 放一下魔改了的源码
### 结果
```bash
2024-11-04T00:30:38+08:00       INFO    HTTP proxy server listening     {"addr": "127.0.0.1:8080"}
2024-11-04T00:30:38+08:00       INFO    HTTP proxy server listening     {"addr": "127.0.0.1:8088"}
2024-11-04T00:30:38+08:00       INFO    HTTP proxy server listening     {"addr": "127.0.0.1:8085"}
2024-11-04T00:30:38+08:00       INFO    HTTP proxy server listening     {"addr": "127.0.0.1:8086"}
2024-11-04T00:30:38+08:00       INFO    HTTP proxy server listening     {"addr": "127.0.0.1:8089"}
2024-11-04T00:30:38+08:00       INFO    HTTP proxy server listening     {"addr": "127.0.0.1:8081"}
2024-11-04T00:30:38+08:00       INFO    HTTP proxy server listening     {"addr": "127.0.0.1:8084"}
2024-11-04T00:30:38+08:00       INFO    HTTP proxy server listening     {"addr": "127.0.0.1:8082"}
2024-11-04T00:30:38+08:00       INFO    HTTP proxy server listening     {"addr": "127.0.0.1:8087"}
2024-11-04T00:30:38+08:00       INFO    HTTP proxy server listening     {"addr": "127.0.0.1:8083"}
```
负载均衡什么的自己做就好了,用nginx反代也是可以的
### 修改 添加文件 `app/cmd/myclient.go`
### 用test 运行,或者在`app/main.go`中添加
```go
package main

import "github.com/apernet/hysteria/app/v2/cmd"

func main() {
	cmd.MyClientRun()
}

```

`app/cmd/myclient.go`

```go
package cmd

import (
	"fmt"
	"github.com/apernet/hysteria/core/v2/client"
	"go.uber.org/zap"
	"gopkg.in/yaml.v3"
	"net"
	"os"
	"os/signal"
	"sort"
	"strconv"
	"syscall"
	"time"
)

// CONFIGFILEDIR 是配置文件目录的常量
const CONFIGFILEDIR = "/Users/parapeng/Library/Application Support/io.github.clash-verge-rev.clash-verge-rev/profiles/"

// configFiles 是配置文件列表，包含多个配置文件路径
var configFiles = []string{
	CONFIGFILEDIR + "ROO5OxI3HLEr.yaml", //新狮云
	CONFIGFILEDIR + "RkXrhCTvpx4T.yaml", //宝可梦
}

// Proxy 代表clash配置部分
type Proxy struct {
	Name           string `yaml:"name"`
	Server         string `yaml:"server"`
	Port           int    `yaml:"port"`
	Ports          string `yaml:"ports"`
	MPort          string `yaml:"mport"`
	UDP            bool   `yaml:"udp"`
	SkipCertVerify bool   `yaml:"skip-cert-verify"`
	SNI            string `yaml:"sni"`
	Type           string `yaml:"type"`
	Password       string `yaml:"password"`
	Obfs           string `yaml:"obfs"`
	ObfsPassword   string `yaml:"obfs-password"`
	PingLatency    time.Duration
}

// clashConfig 是Clash配置结构体，包含多个代理配置
type clashConfig struct {
	Proxies []Proxy `yaml:"proxies"`
}

// h2clientConfig 将Clash配置转换为Hysteria2客户端配置
func (c *clashConfig) h2clientConfig() []*clientConfig {
	var ret []*clientConfig
	for _, proxy := range c.Proxies {
		cc := clientConfig{
			Server: fmt.Sprintf("%s:%d", proxy.Server, proxy.Port),
			Auth:   proxy.Password,
		}
		if proxy.Obfs != "" && proxy.ObfsPassword != "" {
			cc.Obfs = clientConfigObfs{
				proxy.Obfs,
				clientConfigObfsSalamander{
					Password: proxy.ObfsPassword,
				},
			}
		}
		ret = append(ret, &cc)
	}
	return ret
}

// parseConfig 解析配置文件，返回解析后的Clash配置
func parseConfig(files []string, max int) (*clashConfig, error) {
	serverMap := make(map[string]Proxy)
	for _, file := range files {
		data, err := os.ReadFile(file)
		if err != nil {
			return nil, fmt.Errorf("failed to read config file %s: %w", file, err)
		}
		var config clashConfig
		if err = yaml.Unmarshal(data, &config); err != nil {
			return nil, fmt.Errorf("failed to unmarshal YAML in %s: %w", file, err)
		}
		for _, proxy := range config.Proxies {
			if proxy.Type != "hysteria2" {
				continue
			}
			if _, ok := serverMap[proxy.Server]; ok {
				continue
			}
			serverMap[proxy.Server] = proxy
		}
	}

	// 按照延迟排序，取前 max 个
	proxies := make([]Proxy, 0, len(serverMap))
	for _, proxy := range serverMap {
		// 获取 proxy.Server 的“延迟”值
		latency, err := getPingLatency(proxy.Server, proxy.Port)
		if err != nil {
			logger.Warn("failed to measure latency for server", zap.String("server", proxy.Server), zap.Error(err))
			continue
		}
		proxy.PingLatency = latency
		proxies = append(proxies, proxy)
	}
	sort.Slice(proxies, func(i, j int) bool {
		return proxies[i].PingLatency < proxies[j].PingLatency
	})
	if len(proxies) > max {
		proxies = proxies[:max]
	}

	return &clashConfig{proxies}, nil
}

// getPingLatency 测量服务器的延迟
func getPingLatency(server string, port int) (time.Duration, error) {
	address := fmt.Sprintf("%s:%d", server, port)
	start := time.Now()
	conn, err := net.DialTimeout("udp", address, time.Second*5)
	if err != nil {
		return 0, fmt.Errorf("failed to connect to server %s: %w", address, err)
	}
	defer conn.Close()
	return time.Since(start), nil // 返回连接所花费的时间
}

// MyClientRun 是客户端运行的主函数
func MyClientRun() {
	initLogger()
	clashConfig, err := parseConfig(configFiles, 10)
	if err != nil {
		logger.Fatal("failed to parse config", zap.Error(err))
	}
	configs := clashConfig.h2clientConfig()
	clients := map[string]client.Client{}
	var runner clientModeRunner

	// 初始化所有客户端
	err = initClients(configs, &runner, clients)
	if err != nil {
		logger.Fatal("failed to initialize clients", zap.Error(err))
	}
	// 运行客户端模式
	runClientMode(&runner, clients)
}

// initClients 初始化客户端并将其添加到 runner 中
func initClients(configs []*clientConfig, runner *clientModeRunner, clients map[string]client.Client) error {
	for i, config := range configs {
		hc := httpConfig{
			Listen: fmt.Sprintf("127.0.0.1:808%d", i),
		}
		logger.Info("config:", zap.String("addr", hc.Listen), zap.String("Server", config.Server))
		cli, err := client.NewReconnectableClient(
			config.Config,
			func(c client.Client, info *client.HandshakeInfo, count int) {
				logger.Info("connected to server",
					zap.Bool("udpEnabled", info.UDPEnabled),
					zap.Uint64("tx", info.Tx),
					zap.Int("count", count))
			},
			true,
		)
		if err != nil {
			return fmt.Errorf("failed to initialize client for server %s: %w", config.Server, err)
		}

		clients[config.Server] = cli
		runner.Add("HTTP proxy server"+strconv.Itoa(i), func() error {
			return clientHTTP(hc, cli)
		})
	}
	return nil
}

// runClientMode 运行客户端模式并监听结果
func runClientMode(runner *clientModeRunner, clients map[string]client.Client) {
	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan, os.Interrupt, syscall.SIGTERM)
	runnerChan := make(chan clientModeRunnerResult, 1)
	go func() {
		runnerChan <- runner.Run()
	}()

	select {
	case r := <-runnerChan:
		if r.OK {
			logger.Info(r.Msg)
		} else {
			for cli := range clients {
				clients[cli].Close()
			}
			if r.Err != nil {
				logger.Fatal(r.Msg, zap.Error(r.Err))
			} else {
				logger.Fatal(r.Msg)
			}
		}
	case <-signalChan:
		logger.Info("received signal, shutting down gracefully")
		for key, cli := range clients {
			cli.Close()
			logger.Info(key + ":Closed")
		}
		signal.Stop(signalChan)
		logger.Info("signal:Closed")
	}

}

```
成果是一个[壁纸网站](https://paral.us.kg/):