# 多线程

## 实现方式

### 1.继承 **`java.lang.Thread`**，**重写** **`run方法`**

```java
package com.broky.multiThread.exer;

/**
 * @author 13roky
 * @date 2021-04-19 22:43
 */
public class ThreadExerDemo01 {
    public static void main(String[] args) {
        new Thread01().start();
        new Thread02().start();
    }
}

class Thread01 extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if (i % 2 == 0) System.out.println(Thread.currentThread().getName() + ":\t" + i);
        }
    }
}

class Thread02 extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if (i % 2 != 0) System.out.println(Thread.currentThread().getName() + ":\t" + i);
        }
    }
}
```



```java
package com.broky.multiThread;

/**
 * @author 13roky
 * @date 2021-04-19 22:53
 */
public class AnonymousSubClass {
    public static void main(String[] args) {

        new Thread(){
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    if (i % 2 == 0) System.out.println(Thread.currentThread().getName() + ":\t" + i);
                }
            }
        }.start();

    }
}
```

### **2.实现** **`java.lang.Runnable`** 

```java
package com.broky.multiThread;

/**
 * @author 13roky
 * @date 2021-04-20 23:16
 */
public class RunnableThread {
    public static void main(String[] args) {
        //创建实现类的对象
        RunnableThread01 runnableThread01 = new RunnableThread01();
        //创建Thread类的对象,并将实现类的对象当做参数传入构造器
        Thread t1 = new Thread(runnableThread01);
        //使用Thread类的对象去调用Thread类的start()方法:①启动了线程 ②Thread中的run()调用了Runnable中的run()
        t1.start();

        //在创建一个线程时，只需要new一个Thread类就可,不需要new实现类
        Thread t2 = new Thread(runnableThread01);
        t2.start();
    }
}

//RunnableThread01实现Runnable接口的run()抽象方法
class RunnableThread01 implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if (i % 2 == 0) System.out.println(Thread.currentThread().getName() + ":\t" + i);
        }
    }
}
```

### 3.实现`Callable`

1. 相比run()方法，可以有返回值
2. 方法可以抛出异常
3. 支持泛型的返回值
4. 需要借助FutureTask类，比如获取返回结果

```java
package com.broky.multiThread;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

/**
 * 创建线程的方式三：实现Callable接口。 ---JDK5新特性
 * 如何理解Callable比Runnable强大？
 * 1.call()可以有返回值
 * 2.call()可以抛出异常被外面的操作捕获
 * @author 13roky
 * @date 2021-04-22 21:04
 */

//1.创建一个实现Callable的实现类
class NumThread implements Callable<Integer>{
    //2.实现call方法，将此线程需要执行的操作声明在call()中
    @Override
    public Integer call() throws Exception {
        int sum = 0;
        for (int i = 1; i < 100; i++) {
            if(i%2==0){
                System.out.println(i);
                sum += i;
            }
        }
        return sum;
    }
}

public class ThreadNew {
    public static void main(String[] args) {
        //3.创建Callable接口实现类的对象
        NumThread numThread = new NumThread();
        //4.将此Callable接口实现类的对象作为参数传递到FutureTask构造器中，创建FutureTask对象
        FutureTask<Integer> futureTask = new FutureTask(numThread);
        //5.将FutureTask的对象作为参数传递到Thread类的构造器中，创建Thread对象，并调用start()
        new Thread(futureTask).start();

        try {
            //6.获取Callable中Call方法的返回值
            Integer sum = futureTask.get();
            System.out.println("总和为"+sum);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

    }
}
```

## 线程同步

由于ArrayList和HashMap性能好，但是不是线程安全，所以Collections工具类中提供了相应的包装方法将他们包装成相应的线程安全的集合：

```java
List<E> synchronizedList = Collections.sychronizedList(new ArrayList<E>());

Set<E> sychronizedSet = Collections.sychronizedSet(new HashSet<E>());

Map<K, V> synchronizedMap = Collections.sychronizedMap(new HashMap<K, V>());
```


Collections针对每种集合都声明了一个线程安全的包装类，在原集合的基础上添加了锁对象，集合中的每个方法都通过这个锁对象实现同步