---
title: "golang http demo"
hidemeta: true
---
```
package main

import (
	"fmt"
	"io"
	"net"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/webhook", webhook)
	l, _ := net.Listen("tcp4", ":80")
	err := http.Serve(l, mux)
	if err != nil {
		fmt.Printf("%v\n", err)
	}
}

func webhook(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("%v\n", r.Header)
	fmt.Printf("%v\n", "Body:")
	all, _ := io.ReadAll(r.Body)
	fmt.Printf("%v\n", all)
	fmt.Printf("%v\n", r.URL.Path)
	fmt.Printf("%v\n", r.URL.Query())
	w.Write([]byte(fmt.Sprintf("%v\n", "Header:")))
	w.Write([]byte(fmt.Sprintf("%v\n\n\n", r.Header)))
	w.Write([]byte(fmt.Sprintf("%v\n", "Body:")))
	w.Write([]byte(fmt.Sprintf("%v\n\n\n", all)))
	w.Write([]byte(fmt.Sprintf("%v\n", "Query:")))
	w.Write([]byte(fmt.Sprintf("%v\n\n\n", r.RequestURI)))

}

```

