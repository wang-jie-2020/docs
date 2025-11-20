























## PageHelper

```java
public class PageUtils {
    public static void startPage() {

        Integer pageNum = Integer.parseInt(getParameter("pageNum"));
        Integer pageSize = Integer.parseInt(getParameter("pageSize"));
        String orderBy = getParameter("orderByColumn");
        String asc = getParameter("isAsc");

        if(orderBy == null || "".equals(orderBy)) {
            orderBy = "";
        }

        PageHelper.startPage(pageNum, pageSize, orderBy.toLowerCase() + " " + asc).setReasonable(true);
    }

    public static String getParameter(String name)
    {
        return getRequest().getParameter(name);
    }

    public static HttpServletRequest getRequest()
    {
        return getRequestAttributes().getRequest();
    }

    public static ServletRequestAttributes getRequestAttributes()
    {
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        return (ServletRequestAttributes) attributes;
    }
}
```

Reasonable参数表示是否修正传入的页码和实际页码



**注意**

1. 每个查询都需要单独调用一次 `startPage()`，PageHelper 只对 **第一个查询生效**
2. 如果查询接口中有DTO转换，Count 字段要重新赋值







### SqlSession的生命周期疑问

>每个线程都应该有自己的 SqlSession 实例。SqlSession 的实例不共享，并且不是线程安全的。因此，最佳作用域是请求或方法作用域。永远不要在静态字段甚至类的实例字段中保留对 SqlSession 实例的引用。永远不要在任何类型的托管作用域中保留对 SqlSession 的引用，例如 Servlet 框架的 HttpSession。如果您使用的是任何类型的 Web 框架，请考虑 SqlSession 遵循与 HTTP 请求类似的范围。换句话说，在收到 HTTP 请求时，您可以打开一个 SqlSession，然后在返回响应后，您可以关闭它。

在未实践时的理解类似于请求内单例, 比如线程Local中空-创建-返回的模式. 包括在查找的资料中也是一笔带过的. 但仔细想想其中有问题, 比如在事务中这样干似乎不合适. 浅写了代码得到的结果是从不同方式注入的SqlSession是一样的, 但这不代表上述理解完全错误, 在Spring下实际注入的类型是SqlSessionTemplate似乎仍旧保持了单例模式, 通过不同的拦截要求自动处理了SqlSession的创建和释放

```java
public class SqlSessionTemplate implements SqlSession, DisposableBean {

    public SqlSessionTemplate(SqlSessionFactory sqlSessionFactory,
                              ExecutorType executorType, 
                              PersistenceExceptionTranslator exceptionTranslator) {

        this.sqlSessionFactory = sqlSessionFactory;
        this.executorType = executorType;
        this.exceptionTranslator = exceptionTranslator;
        
        // here
        this.sqlSessionProxy = (SqlSession)Proxy.newProxyInstance(SqlSessionFactory.class.getClassLoader(), new Class[]{SqlSession.class}, new SqlSessionInterceptor());
    }
}
```

