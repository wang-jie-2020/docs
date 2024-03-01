# 多线程

*阅读了一些仓库源码,似乎对这块内容封装以及描述都很少,咨询了一下最好不要作为重点考虑*

*java的多线程语法显得臃肿,但其内部含义和思路实际上是一致的*

*ThreadLocal内容偶尔能看见,但AsyncLocal内容找不见*

## 线程和执行器

通过Thread指定一个新的线程:

- extends Thread 
- implements Runnable
- implements Callable

通过匿名或者Lambda表达式指定Thread任务:

```csharp
new Thread(new Runnable() {
    @Override
    public void run() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("runnable method");
    }
}).start();
```



通过Executos指定线程池复用线程:

- 方法签名

  ```java
  public interface Executor {
      void execute(Runnable command);
  }
  ```

  ```java
  public interface ExecutorService extends Executor {
      <T> Future<T> submit(Callable<T> task);
  
      <T> Future<T> submit(Runnable task, T result);
  
      Future<?> submit(Runnable task);
  
      <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks)
          throws InterruptedException;
  
      <T> T invokeAny(Collection<? extends Callable<T>> tasks)
          throws InterruptedException, ExecutionException;
  
      <T> T invokeAny(Collection<? extends Callable<T>> tasks,
                      long timeout, TimeUnit unit)
          throws InterruptedException, ExecutionException, TimeoutException;
  }
  ```

- Callable和Future

  Future类似于C#中的AsyncState或者Task,Future.get()将会产生阻塞

- executor

  Executors必须显式的停止-否则它们将持续监听新的任务

  ```java
  try {
      executor.shutdown();
      executor.awaitTermination(5, TimeUnit.SECONDS);
  } catch (InterruptedException e) {
      
  } finally {
      if (!executor.isTerminated()) {
          
      }
      executor.shutdownNow();
  }
  ```

```java
ExecutorService executor = Executors.newFixedThreadPool(1);
    
//Future<?> submit(Runnable task);
executor.submit(() -> {

});

//<T> Future<T> submit(Callable<T> task);
Future<Integer> future = executor.submit(() -> {
    return 1;
});

//<T> Future<T> submit(Runnable task, T result);
Future<Integer> future2 = executor.submit(() -> {
},1);

futrue.get()
executor.shutdown();
```

## 线程同步

juc ... java.utils.concurrnet 

**synchronized** 关键字,修饰方法或代码块,但注意实际的lock对象是this

**ReentrantLock** 互斥锁

**ReadWriteLock** 读写锁

Wait、Notify	Object方法，类似于ManualResetEvent，信号模式



原子操作和集合包装

**AtomicInteger**

**Collections.sychronizedList()**


