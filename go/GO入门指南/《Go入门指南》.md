https://github.com/unknwon/the-way-to-go_ZH_CN

# 基本结构和要素

### 函数-func

```go
func functionName(parameter_list) (return_value_list) {
   …
}
```

其中：

+ `parameter_list` 的形式为 `(param1 type1, param2 type2, …)`

+ `return_value_list` 的形式为 `(ret1 type1, ret2 type2, …)`---**函数可以拥有多个返回值**

  

### 类型

#### 基本类型

`iota`:**每遇到一次 const 关键字，`iota` 就重置为 0**;每当`iota`在新的一行被使用时，它的值都会自动加 1

```go
// 赋值一个常量时，之后没赋值的常量都会应用上一行的赋值表达式
const (
	a = iota  // a = 0
	b         // b = 1
	c         // c = 2
	d = 5     // d = 5   
	e         // e = 5
)

// 赋值两个常量，iota 只会增长一次，而不会因为使用了两次就增长两次
const (
	Apple, Banana = iota + 1, iota + 2 // Apple=1 Banana=2
	Cherimoya, Durian                  // Cherimoya=2 Durian=3
	Elderberry, Fig                    // Elderberry=3, Fig=4

)

// 使用 iota 结合 位运算 表示资源状态的使用案例
const (
	Open = 1 << iota  // 0001
	Close             // 0010
	Pending           // 0100
)

const (
	_           = iota             // 使用 _ 忽略不需要的 iota
	KB = 1 << (10 * iota)          // 1 << (10*1)
	MB                             // 1 << (10*2)
	GB                             // 1 << (10*3)
	TB                             // 1 << (10*4)
	PB                             // 1 << (10*5)
	EB                             // 1 << (10*6)
	ZB                             // 1 << (10*7)
	YB                             // 1 << (10*8)
)
```

#### 自定义类型

```go
type (
   IZ int
   FZ float64
   STR string
)
```

#### 类型转换

不存在隐式类型转换，因此所有的转换都必须显式说明

```go
valueOfTypeB = typeB(valueOfTypeA)

a := 5.0
b := int(a)
```

#### 变量

`var identifier type`

```go
var a, b, c int

a, b, c := 5, 7, "abc"	//:= 函数内的简短声明
```

### 一般结构

- 在完成包的 import 之后，开始对常量、变量和类型的定义或声明。
- 如果存在 init() 函数的话，则对该函数进行定义（这是一个特殊的函数，每个含有该函数的包都会首先执行这个函数）。
- 如果当前包是 main 包，则定义 main() 函数。
- 然后定义其余的函数，首先是类型的方法，接着是按照 main() 函数中先后调用的顺序来定义相关函数，如果有很多函数，则可以按照字母顺序来进行排序。



TIME

​	这东西一目了然？？？

![image-20230529152240040](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/image-20230529152240040.png)



指针

var p *type

​	Go 语言的取地址符是 `&`

```
var intP *int
```



然后使用 `intP = &i1` 是合法的，此时 `intP` 指向 `i1`。

（指针的格式化标识符为 `%p`）



slice 类型











关键字 `defer` 允许我们推迟到函数返回之前（或任意位置执行 `return` 语句之后）一刻才执行某个语句或函数（为什么要在返回之后才执行这些语句？因为 `return` 语句同样可以包含一些操作，而不是单纯地返回某个值）。

关键字 `defer` 的用法类似于面向对象编程语言 Java 和 C# 的 finally 语句块，它一般用于释放某些已分配的资源。

当有多个 `defer` 行为被注册时，它们会以逆序执行（类似栈，即后进先出）



`for key, value := range map1 `



![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/67133a9330384e76b96a938eaaed3a24.png)



