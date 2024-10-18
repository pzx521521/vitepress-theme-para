---
title: "nginx ssi入门"
hidemeta: true
---

## nginx ssi入门

修改nginx.conf

```
        location /ssi {
			ssi on;
			ssi_silent_errors on;
			ssi_types text/shtml;
			root   html;
        }	
```

添加 `html/ssi/ssi.html`
```
<!--#include file="header.html"-->
<div> this is content by ssi </div>
<!--#include file="footer.html"-->
```
添加 `html/ssi/header.html`
```
<div>this is header</div>
```
添加 `html/ssi/footer.html`
```
<div>this is footer</div>
```

# 注意事项

+ 1 可以用相对路径

`file="header.html"` 

也可以用绝对路径

`file="/ssi/header.html"`

+ 2 他是实时刷新的