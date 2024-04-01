## lambda

## java vs dotnet

比较两者的实现意义不大,在查阅的资料中都会这么描述:"简化匿名函数"

两者的实现中的思路近似一致,不同的是ms对这块的封装更简化一些

| Net              | Java                           |
| ---------------- | ------------------------------ |
| delegate         | FunctionalInterface            |
| Action<in T>     | Consumer<T> ...                |
| Func<in T,out R> | Supplier<T>、Function<T,R> ... |

概括描述就是net以Action、Func的重载概括了必要的lambda形式,java这块提供了间接的

语法上稍有不同包括多播(运算符重载)、方法访问

## 函数式接口

只包含一个抽象方法的接口，称为**函数式接口**

通常@FunctionalInterface注解

### 内置的函数式接口

| 内置核心函数式接口  | 包含的方法            |
| ------------------- | --------------------- |
| Consumer<T>         | void accept(T t)      |
| BiConsumer<T, U>    | void accept(T t, U u) |
| Supplier<T>         | T get()               |
| Function<T,R>       | R apply(T t)          |
| BiFunction<T, U, R> | R apply(T t, U u)     |
| Predicate<T>        | boolen test(T t)      |

### ::语法

| 引用方式     |                              |
| ------------ | ---------------------------- |
| 构造方法     | ClassName:: staticMethodName |
| 静态方法     | ClassName :: new             |
| 任意实例方法 | ClassName :: methodName      |
| 指定实例方法 | instance :: methodName       |



