# web

## net/tcp

### tcp server

```go
listener, err := net.Listen("tcp", "localhost:50000")
for {
	conn, err := listener.Accept()
    go doServerStuff(conn)
}

func doServerStuff(conn net.Conn) {
    for {
        buf := make([]byte, 512)
		len, err := conn.Read(buf)
    }
}
```

### tcp client

```go
conn, err := net.Dial("tcp", "localhost:50000")

_, err = conn.Write([]byte("hello"))
```

### socket

```go
con, err := net.Dial("tcp", remote)	//remote = host + ":" + port
for read {
		count, err = con.Read(data)
		read = (err == nil)
		fmt.Printf(string(data[0:count]))
}
con.Close()
```

## net/http

```go
func HelloServer(w http.ResponseWriter, req *http.Request) {
	...
}

func main() {
    http.HandleFunc("/", HelloServer)	
	err := http.ListenAndServe("localhost:8080", nil)
	
    //或者这么写
   	err := http.ListenAndServe(":8080", http.HandlerFunc(HelloServer))
}
```

![image-20230822174610913](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/image-20230822174610913.png)

![image-20230822174627735](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/image-20230822174627735.png)

除了上述的函数式对象,也就是一个实现了ServeHTTP方式的对象,也就是

```go
http.Handle("/", obj)	//obj实现了Handler 接口
```

Q:如果存在多个路由要求,难道写多个Handler?



web的panic和recover

```go
func logPanics(function HandleFnc) HandleFnc {
	return func(writer http.ResponseWriter, request *http.Request) {
		defer func() {
			if x := recover(); x != nil {
				log.Printf("[%v] caught panic: %v", request.RemoteAddr, x)
			}
		}()
		function(writer, request)
	}
}
```

## template

pass...

## net/rpc

pass...

## websocket

有些类似http



