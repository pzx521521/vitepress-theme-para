golang http 包源码简介(中间件实现原理/函数作为接口):

下面4段代码都可以开启一个http服务,他们有什么区别呢?

```
type myHandler struct {
}

func (h myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "Hello from a HandleFunc #1!\n")
}
func http1() {
	h := myHandler{}
	log.Fatalln(http.ListenAndServe(":8000", h))
}

func http2() {
	h := myHandler{}
	http.Handle("/hello", &h)
	log.Fatalln(http.ListenAndServe(":8000", nil))
}


var h = func(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("hello"))
}

func http3() {
	http.ListenAndServe(":8000", http.HandlerFunc(h))
}

func http4() {
	http.HandleFunc("/hello", h)
	http.ListenAndServe(":8000", nil)
}
```

http2 相对 http1 多了 一个路径解析.



http1 和 http3 是什么区别呢? 

```
type Handler interface {
	ServeHTTP(ResponseWriter, *Request)
}

type HandlerFunc func(ResponseWriter, *Request)

// ServeHTTP calls f(w, r).
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
   f(w, r)
}
```

http1  一个是类(myHandler)实现了接口(Handler).

http3  一个是函数(HandlerFunc)也可以实现接口(Handler).



然后看一下 如何实现中间件:

```
func Wrapper(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("before wrap\n"))
		h.ServeHTTP(w, r)
		w.Write([]byte("after wrap\n"))
	})
}

func wrap1() {
	h := myHandler{}
	log.Fatalln(http.ListenAndServe(":8000", Wrapper(h)))
}

func wrap2() {
	http.ListenAndServe(":8000", Wrapper(http.HandlerFunc(h)))
}

```











