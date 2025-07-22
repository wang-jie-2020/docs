## 函数

1. 函数参数
   1. 位置参数
      1. 默认参数中，L=[] 的结果有些奇特，在其他语言中不曾遇到
   2. *args 常见....
   3. **kw  莫名其妙...
      1. *，关键字参数

2. 装饰器

   @decorator 等价于 func = decorator(func)，参照aop理解其概念和执行顺序

   函数签名 wrapper(*args,**kw) 是个约定？

   ```python
   def log(text):
       def decorator(func):
           @functools.wraps(func)
           def wrapper(*args, **kw):
               return func(*args, **kw)
   
           return wrapper
   
       return decorator
   ```

3. 偏函数

   类似static extentions



## OOP

1. 实例并不像静态语言那样'继承'类属性，比如在静态语言中类必须实例化才有对象的概念，非静态的成员是无法被直接访问的，但在python中更像一种copy
   个人理解：
   (1)继承实际上就是绑定了一个当前实例的dict -> 类的dict
   (2)如果实例新增或重写属性那么就新增实例的dict中的属性，否则就直接链向类的dict



2. 封装

   (1) 由于按照约定命名的设置可访问性，`_`以及`__` 会有各自不用含义，通常来说表示私有是`_`，特殊用途`__`

   (2) 构造控制 和 属性控制

   ​	`__init__(self,a,b)`  参构造理解,必须是如此形式,self 指向实例对象
   ​	`__slots__` 有点类似于编译检查,看起来很像是约束类实例的属性(注意仅当前类),更深入的解释是为了节省内存 --> 内部的__dict__ 转向了 tuple；

   (3) @property 以及 @xxx.setter 相比而言更偏向于按照C#的字段&属性去理解，虽然形式上更类似于字段+方法；这么说是因为它切换平滑性很像，比如name属性初始无要求，后续有校验要求，那么在外部代码其实上不需要改成getName()这种形式，没错就是在吐槽java。

   我觉得可以这么去理解`__slots__`和@property的使用场景：
   	`__slots__` 就是一个封装概念，即关注此就可以，其他的是封装细节属性不必管；子类中 `__slots__=()` 也许是个好习惯?
   	@property 主要描述的是一种校验（私有属性通过方法传播出去不是目的）
   这两者中应用的属性范围是不一致的，保留`__slots__`按照规范不该定义_name而应该定义name，因为_name在习惯上认为是私有的
   同样的道理，@property的方法名应该是name，return _name



3. 继承

   Python的“file-like object“就是一种鸭子类型。

   多重继承 和 单一继承 对‘继承’的概念理解并无二致，大概率自己写代码用到它也不会冲突。

   多重继承的顺序性见：https://www.jianshu.com/p/c9a0b055947b



|                                      |                                                              |                                                              |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `__new__（）`                        |                                                              |                                                              |
| `__init__（）`                       | 构造器                                                       |                                                              |
|                                      |                                                              |                                                              |
| `__slots__`                          | 限制实例的属性<br />1.限制当前类而非子类<br />2.子类若延续限制也必须定义,实际参数或直接() | `__slots__`= ()                                              |
| `__str__()` <br />`__repr__()`       | 相当于toString()方法                                         |                                                              |
| `__iter__()`<br />`__next__()`       | 迭代器                                                       |                                                              |
| `__getitem__()`<br />`__setitem__()` | 索引器                                                       |                                                              |
|                                      |                                                              |                                                              |
| `__getattr__()`                      | 动态情况(链式调用?)                                          | Chain().status.user.timeline.list <br />-> '/status/user/timeline/list' |
| `__call__()`                         | 大概如同func{}()？                                           |                                                              |
|                                      |                                                              |                                                              |
| `@property`                          | 让get方法支持属性访问,注意命名上和属性区分                   | ![image-20250716184051520](C:\Users\jie.wang21\AppData\Roaming\Typora\typora-user-images\image-20250716184051520.png) |
| `@score.setter`                      | 让set方法支持属性访问,注意命名上和属性区分                   | ![image-20250716184044103](https://raw.gitcode.com/qq_36179938/images/raw/main/image-20250716184044103.png) |
