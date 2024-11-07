import{_ as a,c as n,a0 as p,o as e}from"./chunks/framework.DADtiyJ8.js";const u=JSON.parse('{"title":"常用访问工具","description":"","frontmatter":{},"headers":[],"relativePath":"posts/Linux/云原生的前世今生/云原生.md","filePath":"posts/Linux/云原生的前世今生/云原生.md"}'),l={name:"posts/Linux/云原生的前世今生/云原生.md"};function i(t,s,r,o,c,h){return e(),n("div",null,s[0]||(s[0]=[p(`<h1 id="常用访问工具" tabindex="-1">常用访问工具 <a class="header-anchor" href="#常用访问工具" aria-label="Permalink to &quot;常用访问工具&quot;">​</a></h1><p>xshell</p><p><s>ftp</s>~</p><p>sftp</p><h1 id="nginx-web-server-5w" tabindex="-1">Nginx(web server)5W <a class="header-anchor" href="#nginx-web-server-5w" aria-label="Permalink to &quot;Nginx(web server)5W&quot;">​</a></h1><p>Nginx/weibo</p><p>openresty/csdn/qq</p><p>Tengine/Aserver/taobao</p><p>BWS/1.1</p><p>GWS/1.1</p><h3 id="why-not-apache-1w-5w" tabindex="-1">why not Apache 1w 5w <a class="header-anchor" href="#why-not-apache-1w-5w" aria-label="Permalink to &quot;why not Apache 1w 5w&quot;">​</a></h3><h3 id="_5w-lvs-硬件" tabindex="-1">5w+? -&gt;lvs/硬件 <a class="header-anchor" href="#_5w-lvs-硬件" aria-label="Permalink to &quot;5w+? -&gt;lvs/硬件&quot;">​</a></h3><ul><li>4层与7层/下一跳</li><li>硬件/路由/网关/交换机</li></ul><h2 id="why-openresty-tengine" tabindex="-1">Why openresty/Tengine <a class="header-anchor" href="#why-openresty-tengine" aria-label="Permalink to &quot;Why openresty/Tengine&quot;">​</a></h2><p>kong</p><p>envoy</p><h2 id="yum-brew-apt" tabindex="-1">yum/brew/apt <a class="header-anchor" href="#yum-brew-apt" aria-label="Permalink to &quot;yum/brew/apt&quot;">​</a></h2><p>墙:</p><p><a href="https://developer.aliyun.com/mirror/" target="_blank" rel="noreferrer">https://developer.aliyun.com/mirror/</a></p><p><a href="http://mirrors.ustc.edu.cn/" target="_blank" rel="noreferrer">http://mirrors.ustc.edu.cn/</a></p><h2 id="where" tabindex="-1">where <a class="header-anchor" href="#where" aria-label="Permalink to &quot;where&quot;">​</a></h2><p>/bin，/sbin(only root)，/usr/bin，/usr/sbin</p><p>/etc/</p><p>whereis nginx (where in windows)</p><p>/usr/sbin/nginx</p><p>etc/nginx/</p><h2 id="how-to-as-a-service" tabindex="-1">how to as a service <a class="header-anchor" href="#how-to-as-a-service" aria-label="Permalink to &quot;how to as a service&quot;">​</a></h2><p>systemctl enable nginx</p><p>systemctl start nginx</p><p>/usr/lib/systemd/system/nginx.service</p><p>\`\`\`systemctl daemon-reload\`\`</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ExecStartPre=/usr/bin/rm -f /run/nginx.pid</span></span>
<span class="line"><span>ExecStartPre=/usr/sbin/nginx -t </span></span>
<span class="line"><span>ExecStart=/usr/sbin/nginx  </span></span>
<span class="line"><span>ExecReload=/usr/sbin/nginx -s reload</span></span>
<span class="line"><span>ExecStop=/usr/sbin/nginx -s stop</span></span>
<span class="line"><span>ExecQuit=/usr/sbin/nginx -s quit</span></span>
<span class="line"><span>KillSignal=SIGQUIT</span></span>
<span class="line"><span>TimeoutStopSec=5</span></span>
<span class="line"><span>KillMode=process</span></span>
<span class="line"><span>PrivateTmp=true</span></span></code></pre></div><h2 id="config-in-nginx" tabindex="-1">config in nginx <a class="header-anchor" href="#config-in-nginx" aria-label="Permalink to &quot;config in nginx&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># user  www www;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>worker_processes auto;</span></span>
<span class="line"><span>worker_cpu_affinity auto;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>error_log  /alidata/www/wwwlogs/nginx_error.log  crit;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#pid        /usr/local/nginx/logs/nginx.pid;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#Specifies the value for maximum file descriptors that can be opened by this process.</span></span>
<span class="line"><span>worker_rlimit_nofile 51200;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>events</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        use epoll;</span></span>
<span class="line"><span>        worker_connections 51200;</span></span>
<span class="line"><span>        multi_accept off;</span></span>
<span class="line"><span>        accept_mutex off;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>http</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        include       mime.types;</span></span>
<span class="line"><span>        default_type  application/octet-stream;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        server_names_hash_bucket_size 128;</span></span>
<span class="line"><span>        client_header_buffer_size 32k;</span></span>
<span class="line"><span>        large_client_header_buffers 4 32k;</span></span>
<span class="line"><span>        client_max_body_size 50m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        sendfile on;</span></span>
<span class="line"><span>        sendfile_max_chunk 512k;</span></span>
<span class="line"><span>        tcp_nopush on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        keepalive_timeout 60;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        tcp_nodelay on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        fastcgi_connect_timeout 300;</span></span>
<span class="line"><span>        fastcgi_send_timeout 300;</span></span>
<span class="line"><span>        fastcgi_read_timeout 300;</span></span>
<span class="line"><span>        fastcgi_buffer_size 64k;</span></span>
<span class="line"><span>        fastcgi_buffers 4 64k;</span></span>
<span class="line"><span>        fastcgi_busy_buffers_size 128k;</span></span>
<span class="line"><span>        fastcgi_temp_file_write_size 256k;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        gzip on;</span></span>
<span class="line"><span>        gzip_min_length  1k;</span></span>
<span class="line"><span>        gzip_buffers     4 16k;</span></span>
<span class="line"><span>        gzip_http_version 1.1;</span></span>
<span class="line"><span>        gzip_comp_level 2;</span></span>
<span class="line"><span>        gzip_types     text/plain application/javascript application/x-javascript text/javascript text/css application/xml application/xml+rss;</span></span>
<span class="line"><span>        gzip_vary on;</span></span>
<span class="line"><span>        gzip_proxied   expired no-cache no-store private auth;</span></span>
<span class="line"><span>        gzip_disable   &quot;MSIE [1-6]\\.&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #limit_conn_zone $binary_remote_addr zone=perip:10m;</span></span>
<span class="line"><span>        ##If enable limit_conn_zone,add &quot;limit_conn perip 10;&quot; to server section.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        server_tokens off;</span></span>
<span class="line"><span>        access_log off;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        listen 80 default_server reuseport;</span></span>
<span class="line"><span>		listen 443 ssl http2;</span></span>
<span class="line"><span>		ssl_certificate /etc/letsencrypt/live/hangye.pinming.cn/fullchain.pem;</span></span>
<span class="line"><span>		ssl_certificate_key /etc/letsencrypt/live/hangye.pinming.cn/privkey.pem;</span></span>
<span class="line"><span>		ssl_protocols TLSv1.1 TLSv1.2;</span></span>
<span class="line"><span>		ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;</span></span>
<span class="line"><span>		ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span>		ssl_session_cache shared:SSL:10m;</span></span>
<span class="line"><span>		ssl_session_timeout 10m;	</span></span>
<span class="line"><span>        #listen [::]:80 default_server ipv6only=on;</span></span>
<span class="line"><span>        server_name _;</span></span>
<span class="line"><span>        index index.html index.htm index.php;</span></span>
<span class="line"><span>        root  /alidata/www/wwwroot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #error_page   404   /404.html;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # Deny access to PHP files in specific directory</span></span>
<span class="line"><span>        #location ~ /(wp-content|uploads|wp-includes|images)/.*\\.php$ { deny all; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #include enable-php.conf;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location /nginx_status</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            stub_status on;</span></span>
<span class="line"><span>            access_log   off;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        location /Report/ {</span></span>
<span class="line"><span>			auth_basic &quot;User Authentication&quot;;</span></span>
<span class="line"><span>			auth_basic_user_file /usr/local/nginx/conf/pass.db;</span></span>
<span class="line"><span>        }		</span></span>
<span class="line"><span>        location /java/ {</span></span>
<span class="line"><span>            proxy_pass     http://127.0.0.1:8080/;</span></span>
<span class="line"><span>			proxy_redirect default;</span></span>
<span class="line"><span>            proxy_set_header   X-Real-IP $remote_addr;</span></span>
<span class="line"><span>			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>	    location /python/ {</span></span>
<span class="line"><span>            proxy_pass     http://127.0.0.1:5000/;</span></span>
<span class="line"><span>			proxy_redirect default;</span></span>
<span class="line"><span>            proxy_set_header   X-Real-IP $remote_addr;</span></span>
<span class="line"><span>			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>        }	</span></span>
<span class="line"><span>	    location /crm/ {</span></span>
<span class="line"><span>            proxy_pass     http://127.0.0.1:50001/;</span></span>
<span class="line"><span>			proxy_redirect default;</span></span>
<span class="line"><span>            proxy_set_header   X-Real-IP $remote_addr;</span></span>
<span class="line"><span>			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>        }			</span></span>
<span class="line"><span>	    location /go/ {</span></span>
<span class="line"><span>            proxy_pass     http://127.0.0.1:4000/;</span></span>
<span class="line"><span>			proxy_redirect default;</span></span>
<span class="line"><span>            proxy_set_header   X-Real-IP $remote_addr;</span></span>
<span class="line"><span>			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>        }		</span></span>
<span class="line"><span>        location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            expires      30d;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location ~ .*\\.(js|css)?$</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            expires      12h;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location ~ /.well-known {</span></span>
<span class="line"><span>            allow all;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location ~ /\\.</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            deny all;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        access_log  /alidata/www/wwwlogs/access.log;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>include vhost/*.conf;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="worker-processes" tabindex="-1">worker_processes <a class="header-anchor" href="#worker-processes" aria-label="Permalink to &quot;worker_processes&quot;">​</a></h3><h3 id="epoll-linux2-4-2-6" tabindex="-1">epoll /linux2.4/2.6 <a class="header-anchor" href="#epoll-linux2-4-2-6" aria-label="Permalink to &quot;epoll /linux2.4/2.6&quot;">​</a></h3><h3 id="worker-connections" tabindex="-1">worker_connections <a class="header-anchor" href="#worker-connections" aria-label="Permalink to &quot;worker_connections&quot;">​</a></h3><h3 id="gzip" tabindex="-1">gzip <a class="header-anchor" href="#gzip" aria-label="Permalink to &quot;gzip&quot;">​</a></h3><h3 id="error-log-access-log" tabindex="-1">error_log/access_log <a class="header-anchor" href="#error-log-access-log" aria-label="Permalink to &quot;error_log/access_log&quot;">​</a></h3><h3 id="https-ssl-openssl-pem-cert" tabindex="-1">https/ssl/openssl/pem/cert <a class="header-anchor" href="#https-ssl-openssl-pem-cert" aria-label="Permalink to &quot;https/ssl/openssl/pem/cert&quot;">​</a></h3><h2 id="why-lnmp-or-not" tabindex="-1">Why LNMP or Not <a class="header-anchor" href="#why-lnmp-or-not" aria-label="Permalink to &quot;Why LNMP or Not&quot;">​</a></h2><h1 id="数据库mysql" tabindex="-1">数据库Mysql <a class="header-anchor" href="#数据库mysql" aria-label="Permalink to &quot;数据库Mysql&quot;">​</a></h1><h2 id="外部访问" tabindex="-1">外部访问 <a class="header-anchor" href="#外部访问" aria-label="Permalink to &quot;外部访问&quot;">​</a></h2><p>Navicat-Premium</p><h2 id="内部部访问" tabindex="-1">内部部访问 <a class="header-anchor" href="#内部部访问" aria-label="Permalink to &quot;内部部访问&quot;">​</a></h2><p>mysql -uroot -p***</p><h2 id="数据库迁移" tabindex="-1">数据库迁移 <a class="header-anchor" href="#数据库迁移" aria-label="Permalink to &quot;数据库迁移&quot;">​</a></h2><p>/data</p><p>binlog/redis(basave) -&gt; AOF(append of file)</p><h2 id="安装by-docker" tabindex="-1">安装by docker <a class="header-anchor" href="#安装by-docker" aria-label="Permalink to &quot;安装by docker&quot;">​</a></h2><p>mysql:</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">docker run --name some-mysql -v /alidata/mysql/:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=pinming@1024 -p 3306:3306 -d mysql</span></span></code></pre></div><h1 id="如何创建一个远程服务及访问方式-演示一个简单的案例" tabindex="-1">如何创建一个远程服务及访问方式 演示一个简单的案例 <a class="header-anchor" href="#如何创建一个远程服务及访问方式-演示一个简单的案例" aria-label="Permalink to &quot;如何创建一个远程服务及访问方式 演示一个简单的案例&quot;">​</a></h1><h2 id="java" tabindex="-1">java <a class="header-anchor" href="#java" aria-label="Permalink to &quot;java&quot;">​</a></h2><p>yum install java (openjdk / jdk)</p><p>java -jar a.jar</p><h2 id="python" tabindex="-1">python <a class="header-anchor" href="#python" aria-label="Permalink to &quot;python&quot;">​</a></h2><p>​ yum install python3</p><p>​ pip install -i <a href="https://pypi.tuna.tsinghua.edu.cn/simple" target="_blank" rel="noreferrer">https://pypi.tuna.tsinghua.edu.cn/simple</a></p><p>​ pip install gunicorn</p><p>​ pip install -r requirements.txt</p><p>​ gunicorn crm_flask:app -c guconfig.py</p><h2 id="go" tabindex="-1">go <a class="header-anchor" href="#go" aria-label="Permalink to &quot;go&quot;">​</a></h2><p>​ yum install golang</p><p>​ go run main.go</p><h2 id="why-proxy-by-nginx" tabindex="-1">why proxy by nginx? <a class="header-anchor" href="#why-proxy-by-nginx" aria-label="Permalink to &quot;why proxy by nginx?&quot;">​</a></h2><ul><li>port</li><li><strong>ajax</strong><ul><li>前后端分离</li><li>CDN(OSS自定义域名)</li></ul></li></ul><h2 id="screen-docker" tabindex="-1">screen &amp; docker <a class="header-anchor" href="#screen-docker" aria-label="Permalink to &quot;screen &amp; docker&quot;">​</a></h2><ul><li>muti-app</li></ul><h2 id="why-docker-云原生-k8s-ci-cd-jinkins-云函数" tabindex="-1">why docker? 云原生/k8s/CI/CD/jinkins/云函数/ <a class="header-anchor" href="#why-docker-云原生-k8s-ci-cd-jinkins-云函数" aria-label="Permalink to &quot;why docker? 云原生/k8s/CI/CD/jinkins/云函数/&quot;">​</a></h2><p><a href="https://docs.github.com/en/actions/examples/using-scripts-to-test-your-code-on-a-runner" target="_blank" rel="noreferrer">https://docs.github.com/en/actions/examples/using-scripts-to-test-your-code-on-a-runner</a></p><p>微服务(服务发现+服务熔断+负载均衡+身份认证+鉴权)-&gt;Service Mesh</p>`,72)]))}const _=a(l,[["render",i]]);export{u as __pageData,_ as default};
