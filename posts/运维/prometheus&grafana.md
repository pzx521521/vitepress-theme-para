prometheus

```
docker run -p 9090:9090 prom/prometheus
```

```
docker run \
    -p 9090:9090 \
    -v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus
```



grafana

```
docker run -d --name=grafana -p 3000:3000 grafana/grafana-enterprise
```