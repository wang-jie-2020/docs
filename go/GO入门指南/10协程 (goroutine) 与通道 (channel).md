# 协程 (goroutine) 

*概念内容有点难懂,中文翻译的问题?*

## 信道

*通道（channel）*负责协程之间的通信

### 通信操作符 <-

ch <- int1

int2 = <- ch

<- ch 可以单独调用获取通道的（下一个）值，当前值会被丢弃

通道的发送和接收都是**原子**操作

### 通道阻塞

>1）对于同一个通道，发送操作（协程或者函数中的），在接收者准备好之前是阻塞的：如果 `ch` 中的数据无人接收，就无法再给通道传入其他数据：新的输入无法在通道非空的情况下传入。所以发送操作会等待 `ch` 再次变为可用状态：就是通道值被接收时（可以传入变量）。
>
>
>
>2）对于同一个通道，接收操作是阻塞的（协程或函数中的），直到发送者可用：如果通道中没有数据，接收者就阻塞了。

两个协程在通道中某刻同步交换数据

- 在通道两端互相阻塞对方-->死锁	

```go
func f1(in chan int) {
	fmt.Println(<-in)
}

//deadlock
func main() {
	out := make(chan int)
	out <- 2
	go f1(out)
}
```

```go
func f1(in chan int) {
	fmt.Println(<-in)
}

func main() {
	out := make(chan int)
	go f1(out)
	out <- 2
}
```

- 信号量模式

```go
ch := make(chan int)
go func(){
	// doSomething
	ch <- 1 // Send a signal; value does not matter
}()
doSomethingElseForAWhile()
<- ch	// Wait for goroutine to finish; discard sent value.
```

### 带缓冲的信道

一个无缓冲的通道只能包含1个元素,带缓冲的通道:

```go
buf := 100
ch1 := make(chan string, buf)
```

在缓冲满载（缓冲被全部使用）之前，给一个带缓冲的通道发送数据是不会阻塞的，而从通道读取数据也不会阻塞，直到缓冲空了。

ch := make(chan type, value)

- `value == 0 -> synchronous`, unbuffered （阻塞）

+ `value > 0 -> asynchronous`, buffered（非阻塞）取决于 `value` 元素

### 通道的方向

通道类型可以用注解来表示它只发送或者只接收：

```go
var send_only chan<- int 		// channel can only receive data
var recv_only <-chan int		// channel can only send data
```

### 关闭通道

```go
ch := make(chan float64)
defer close(ch)		//将通道标记为无法通过发送操作 <- 接受更多的值
```

检测通道是否关闭

```go
v, ok := <-ch  	// ok is true if v received value

v, ok := <-ch
if !ok {
  break
}
process(v)
```

+ 在 `for` 循环的 `getData()` 中，在每次接收通道的数据之前都使用 `if !open` 来检测：
+ 使用 for-range 语句来读取通道是更好的办法，因为这会自动检测通道是否关闭：

### 使用 select 切换协程

```go
select {
case u:= <- ch1:
        ...
case v:= <- ch2:
        ...
        ...
default: // no value ready to be received
        ...
}
```

`default` 语句是可选的；`fallthrough` 行为，和普通的 `switch` 相似，是不允许的。在任何一个 `case` 中执行 `break` 或者 `return`，select 就结束了。

`select` 做的就是：选择处理列出的多个通信情况中的一个。

+ 如果都阻塞了，会等待直到其中一个可以处理
+ 如果多个可以处理，随机选择一个
+ 如果没有通道操作可以处理并且写了 `default` 语句，它就会执行：`default` 永远是可运行的（这就是准备好了，可以执行）。

在 `select` 中使用发送操作并且有 `default` 可以确保发送不被阻塞！如果没有 `default`，`select` 就会一直阻塞。

`select` 语句实现了一种监听模式，通常用在（无限）循环中；在某种情况下，通过 `break` 语句使循环退出。

### 通道、超时和计时器（Ticker）

`time.Ticker` 结构体

```go
ticker := time.NewTicker(updateInterval)
defer ticker.Stop()
...
select {
case u:= <-ch1:
    ...
case v:= <-ch2:
    ...
case <-ticker.C:
    logState(status) // call some logging function logState
default: // no value ready to be received
    ...
}
```

定时器 (`Timer`) 结构体看上去和计时器 (`Ticker`) 结构体的确很像（构造为 `NewTimer(d Duration)`），但是它只发送一次时间，在 `Dration d` 之后。`time.After(d)` 函数





































Q:

线程协程

多个协程是按照顺序执行的吗?

信道的阻塞,发接配套