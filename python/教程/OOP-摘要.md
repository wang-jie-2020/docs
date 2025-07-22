## 类（Class）和实例（Instance）

继承、多态性

types、isinstance	对象类型

dir()	获得一个对象的所有属性和方法

​	仅仅把属性和方法列出来是不够的，配合`getattr()`、`setattr()`以及`hasattr()`，我们可以直接操作一个对象的状态：	

```pyt
>>> hasattr(obj, 'x') # 有属性'x'吗？
True
>>> obj.x
9
>>> hasattr(obj, 'y') # 有属性'y'吗？
False
>>> setattr(obj, 'y', 19) # 设置一个属性'y'
>>> hasattr(obj, 'y') # 有属性'y'吗？
True
>>> getattr(obj, 'y') # 获取属性'y'
19
>>> obj.y # 获取属性'y'
19
```



动态语言,实例属性 > 类属性(但两者都存在)...



### __slots__

限制实例的属性,注意`__slots__`定义的属性仅对当前类实例起作用，对继承的子类是不起作用的：



### @property

Python内置的`@property`装饰器就是负责把一个方法变成属性调用的...

把一个getter方法变成属性，只需要加上`@property`就可以了，此时，`@property`本身又创建了另一个装饰器`@score.setter`，负责把一个setter方法变成属性赋值

注意：属性的方法名不要和实例变量重名。栈溢出报错。



### 继承

`__str__` `__repr__()`   = toString()...

`__iter__` 迭代器

`__getitem__()` this[...] 像list那样按照下标取出元素,与之对应的是`__setitem__()`方法，把对象视作list或dict来对集合赋值。最后，还有一个`__delitem__()`方法，用于删除某个元素。

```python
class Fib(object):
    def __getitem__(self, n):
        if isinstance(n, int): # n是索引
            a, b = 1, 1
            for x in range(n):
                a, b = b, a + b
            return a
        if isinstance(n, slice): # n是切片
            start = n.start
            stop = n.stop
            if start is None:
                start = 0
            a, b = 1, 1
            L = []
            for x in range(stop):
                if x >= start:
                    L.append(a)
                a, b = b, a + b
            return L
```



`__getattr__`  一言难尽

```python
class Chain(object):
    def __init__(self, path=''):
        self._path = path

    def __getattr__(self, path):
        return Chain('%s/%s' % (self._path, path))

    def __str__(self):
        return self._path

    __repr__ = __str__
```

```plain
>>> Chain().status.user.timeline.list
'/status/user/timeline/list'
```

还有些REST API会把参数放到URL中，比如GitHub的API：

```plain
GET /users/:user/repos
```

调用时，需要把`:user`替换为实际用户名。如果我们能写出这样的链式调用：

```plain
Chain().users('michael').repos
```



`__call__` 直接对实例进行调用

 		def __call__(self):	

​	s = Student('Michael')

​	s()

​	实现单例模式...



`__new__` 和 `__init__` 的区别

**调用顺序**：*__new__* 在 *__init__* 之前被调用，用于创建实例；*__init__* 则用于初始化实例。**返回值**：*__new__* 必须返回一个实例对象，否则 *__init__* 不会被调用。**用途**：*__new__* 适合用于控制实例的创建过程，比如实现单例模式或修改不可变对象（如 *int*、*str* 等）的行为。



## 枚举类

```python
from enum import Enum

Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))

for name, member in Month.__members__.items():
    print(name, '=>', member, ',', member.value)
```



```python
from enum import Enum, unique

@unique	# @unique装饰器可以帮助我们检查保证没有重复值。
class Weekday(Enum):
    Sun = 0 # Sun的value被设定为0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6
```



## 元类

```python
# 创建一个实例：
u = User(id=12345, name='Michael', email='test@orm.org', password='my-pwd')
# 保存到数据库：
u.save()
```