# 笔记

## 函数

- init

![image-20230825154442125](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/image-20230825154442125.png)

- main

- defer

  在return之前执行

  LIFO

  recover

## 切片SLICE

make([]T, length, capacity) 

s := make([]int,len,cap)

s := arr[startIndex:endIndex]	startIndex -> endIndex-1

append()、copy()

## Map

等于HashMap或者Dictionary

var map1 = make(map[int]string, 10)	

## 结构和方法

### 结构

继承:匿名字段、内嵌结构体,隐式的方法继承

```
type innerS struct {
	in1 int
	in2 int
}

type outerS struct {
	b    int
	c    float32
	int  // anonymous field
	innerS //anonymous field
}

func main() {
	outer := new(outerS)
	outer.b = 6
	outer.c = 7.5
	outer.int = 60	
	outer.in1 = 5
	outer.in2 = 10
}
```

### 接口、空接口、类型断言

多态:一个接口可以被多个类型实现,空接口可以视作object

#### 类型断言

```
// 逗号ok 模式   值.(类型)
if value, ok := vIntf.(T); ok {
    // do what you need with 'value'	
}

// type-switch 模式
switch t := vIntf.(type) {
    case *Square:
        ...
    case *Circle:
        ...
    case nil:
        ...
    default:
        ...
}
```

### 结构的方法集 与 接口方法集 

```
func (t T) method1()	--> T 或者 & T 可以

func (t *T) method2()	--> T 或者 & T 可以

--------------------------------------------------------

type Ter interface {
	method3()
	method4()
}

func (t T) method3()

func (t *T) method4()	--> 这会限制 ter不能是T,而必须&T

var ter Ter
ter = t		--> 报错!
ter = &t	--> 正确!
ter.method3()
ter.method4()
```

## 反射reflect

每个interface变量都有一个对应pair，pair中记录了实际变量的值和类型，故即使是转换为空接口也是具有相同的pair

```
tty, err := os.OpenFile("/dev/tty", os.O_RDWR, 0)

var r io.Reader
r = tty			->  r.pair (tty, *os.File)

var w io.Writer
w = r.(io.Writer)	-> w.pair (tty, *os.File)
```

![image-20230828174304077](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/image-20230828174304077.png)

### TypeOf和ValueOf

v = reflect.ValueOf()  

t = reflect.TypeOf()

v或t都有kind() 方法返回底层类型



v.Interface() 还原值,类型是空接口,可以继续v.Interface().(User) 得到user

NumField() 	字段数量，v、t调用一致

NumMethod()	字段数量，v、t调用一致

通过遍历字段和方法，可以继续向下执行

​	t.Field(i)

​	v.Field(i).Interface()

​	t.Method(i)

#### 通过reflect.Value设置实际变量的值

必须通过指针

```go
 var num float64 = 1.2345
pointer := reflect.ValueOf(&num)
newValue := pointer.Elem()
newValue.SetFloat(77)
```

#### 通过reflect.ValueOf来进行方法的调用

```go
getValue := reflect.ValueOf(user)

methodValue := getValue.MethodByName("ReflectCallFuncHasArgs")
args := []reflect.Value{reflect.ValueOf("wudebao"), reflect.ValueOf(30)}
methodValue.Call(args)

methodValue = getValue.MethodByName("ReflectCallFuncNoArgs")
args = make([]reflect.Value, 0)
methodValue.Call(args)
```

## Go Modules

```bash
$ go env -w GOPROXY=https://goproxy.cn,https://mirrors.aliyun.com/goproxy/,direct
```

其他待补

## Go Routine、channel

> 一个线程中可以有任意多个协程，但某一时刻只能有一个协程在运行，**多个协程分享该线程分配到的计算机资源**

协程(coroutine)本身描述的是一种并行思路,多个协程运行在一个线程上以减少线程切换,线程依次访问协程,如果阻塞就切换到下一个.

Goroutine 有些类似于task,比线程小,有些类似Csharp的线程池以及线程调度综合.

channel 有些类似于BlockingCollection,内部线程安全,缓冲大小可以自定义

channel select

```go
select {
    case <- chan1:
        // 如果chan1成功读到数据，则进行该case处理语句
    case chan2 <- 1:
        // 如果成功向chan2写入数据，则进行该case处理语句
    default:
        // 如果上面都没有成功，则进入default处理流程
}
```



