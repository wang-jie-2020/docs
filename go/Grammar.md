# 重点笔记

## 基础语法

1. :=

2. iota

3. if

   if initialization; condition {} 

4. switch

   break ×  

   continue √ 

   return √

   

   switch 任意类型 | 初始化语句; | 省略

   ​	case 一行一值 | 一行多值 | bool表达式(省略时) 

   ​	空case 不执行

   ​	fallthrough 忽略条件流向下一个

5. for

​	for 初始化语句; 条件语句; 修饰语句 {}

​	for ix, val := range list { } 

6. 切片、map、chan是引用类型，通过make函数初始化，不必考虑指针

7. main、init


![image-20230825154442125](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/image-20230825154442125.png)

8. defer

![image-20230831175757536](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/image-20230831175757536.png)

9. panic 和 recover

**数组和切片**

var identifier [len]type	 这是数组,数组是值类型

var identifier []type		这是切片,切片是引用类型



s := arr[startIndex:endIndex]	startIndex -> endIndex-1

​	len() --- 切片的长度

​	cap() --- 切片的容量,切片的长度 + 数组除切片之外的长度

**make() 创建一个切片**

​	make([]T, length, capacity) 

​	make([]int, 50, 100) == new([100]int)[0:50]

append函数、copy函数

**Map**

var identifier map[keytype]valuetype	键值对

**make() 创建一个Map**

​	make(map[int]string, 10),capacity可以省略	

## 结构、方法、接口

对象 = 结构 + 结构方法

结构：普通字段、匿名字段、内嵌结构体---继承

结构方法：接收者类型是结构和结构指针---继承

接口可以被多个类型实现---多态

空接口视作object，类型断言：逗号ok模式、type-switch模式

接口方法：不存在类似结构的自动解指针，必须对应一致

## ★协程和信道

协程与线程的关系是M:N：一组协程运行在一些线程上,类似于C#的Task线程池以及线程调度

go routine

信道的发送和接收都是**原子**操作,操作符<-

​	ch <- int1

​	int2 = <- ch

非缓冲信道要求必须两端存在否则阻塞；若不需阻塞行为则定义带缓冲区的信道

ch := make(chan type, value)



通道的方向可以指定,只读或者只写,它是一个语法而不是新的东西

close() 关闭信道,检查状态使用逗号ok模式 v, ok := <-ch，for-range 语句来读取通道是更好的办法，因为这会自动检测通道是否关闭

select 模式切换协程

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

## 项目结构

标准的结构是：

+ bin：存储所编译生成的二进制文件。
+ pkg：存储预编译的目标文件，以加快程序的后续编译速度。
+ src：存储所有.go文件或源代码

GOPATH模式已经不适合，但拉取外部依赖会自动下载并安装到`$GOPATH`目录下。

Go modules模式

GOPROXY & GOPRIVATE（私有的库不能通过Proxy拉到的）

```bash
go env -w GOPROXY=https://goproxy.cn,https://mirrors.aliyun.com/goproxy/,direct
```

```bash
go env -w GOPRIVATE="*.example.com"
```

一个前提知识是很多Go的包都是在github上，如果不能代理包，direct字会导向源

| 命令            | 作用                             |
| --------------- | -------------------------------- |
| go mod init     | 生成 go.mod 文件                 |
| go mod download | 下载 go.mod 文件中指明的所有依赖 |
| go mod tidy     | 整理现有的依赖                   |
| go mod graph    | 查看现有的依赖结构               |
| go mod edit     | 编辑 go.mod 文件                 |
| go mod vendor   | 导出项目所有的依赖到vendor目录   |
| go mod verify   | 校验一个模块是否被篡改过         |
| go mod why      | 查看为什么需要依赖某模块         |

```bash
# 1.指定当前项目module，虽然自定义module以github.com开头实际上仍然指向的当前本地的module
go mod init github.com/xxxx/yyyy

# 2.go get 包
go get github.com/aaaa/bbbb

# 3.替换包
go mod edit -replace=zinx@v1=zxin@v2
```





