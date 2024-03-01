# AOP

@Aspect 标记一个切片类(配合@Component)

@PointCut 切点,在切入点上执行的增强处理主要有五个注解：

​	@Before  在切点方法之前执行

​	@After  在切点方法之后执行

​	@AfterReturning 切点方法返回后执行

​	@AfterThrowing 切点方法抛异常执行

​	@Around 属于环绕增强，能控制切点执行前，执行后



### PointCut

execution执行表达式...

一些例子:

```java
// 任意公共方法的执行：
execution（public * *（..））

// 任何一个名字以“set”开始的方法的执行：
execution（* set*（..））

// AccountService接口定义的任意方法的执行：
execution（* com.xyz.service.AccountService.*（..））

// 在service包中定义的任意方法的执行：
execution（* com.xyz.service.*.*（..））

// 在service包或其子包中定义的任意方法的执行：
execution（* com.xyz.service..*.*（..））

// 在service包中的任意连接点（在Spring AOP中只是方法执行）：
within（com.xyz.service.*）

// 在service包或其子包中的任意连接点（在Spring AOP中只是方法执行）：
within（com.xyz.service..*）

// 实现了AccountService接口的代理对象的任意连接点 （在Spring AOP中只是方法执行）：
this（com.xyz.service.AccountService）// 'this'在绑定表单中更加常用

// 实现AccountService接口的目标对象的任意连接点 （在Spring AOP中只是方法执行）：
target（com.xyz.service.AccountService） // 'target'在绑定表单中更加常用

// 任何一个只接受一个参数，并且运行时所传入的参数是Serializable 接口的连接点（在Spring AOP中只是方法执行）
args（java.io.Serializable） // 'args'在绑定表单中更加常用; 请注意在例子中给出的切入点不同于 execution(* *(java.io.Serializable))： args版本只有在动态运行时候传入参数是Serializable时才匹配，而execution版本在方法签名中声明只有一个 Serializable类型的参数时候匹配。

// 目标对象中有一个 @Transactional 注解的任意连接点 （在Spring AOP中只是方法执行）
@target（org.springframework.transaction.annotation.Transactional）// '@target'在绑定表单中更加常用

// 任何一个目标对象声明的类型有一个 @Transactional 注解的连接点 （在Spring AOP中只是方法执行）：
@within（org.springframework.transaction.annotation.Transactional） // '@within'在绑定表单中更加常用

// 任何一个执行的方法有一个 @Transactional 注解的连接点 （在Spring AOP中只是方法执行）
@annotation（org.springframework.transaction.annotation.Transactional） // '@annotation'在绑定表单中更加常用

// 任何一个只接受一个参数，并且运行时所传入的参数类型具有@Classified 注解的连接点（在Spring AOP中只是方法执行）
@args（com.xyz.security.Classified） // '@args'在绑定表单中更加常用

// 任何一个在名为'tradeService'的Spring bean之上的连接点 （在Spring AOP中只是方法执行）
bean（tradeService）

// 任何一个在名字匹配通配符表达式'*Service'的Spring bean之上的连接点 （在Spring AOP中只是方法执行）
bean（*Service）
```

## 连接点

中继点,包含了切点指向的对象信息,通过proceed()方法继续放行.

```java
 private void explainProceedingJoinPoint(ProceedingJoinPoint point) {

     Object target = point.getTarget();
     System.out.println("target ==>" + target);

     Object[] args = point.getArgs();
     for (Object arg : args) {
         System.out.println("arg ==>" + arg);
     }

     Signature signature = point.getSignature();
     MethodSignature methodSignature = (MethodSignature) signature;
     Method method = methodSignature.getMethod();
     if (method != null) {
         Annotation[] annotations = method.getDeclaredAnnotations();
         for (Annotation annotation : annotations) {
             System.out.println("annotation ==>" + annotation);
         }
     }
 }
```

## 通过注解切入

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface AopAnnotation {
    boolean flag() default true;
}
```

```java
 @Pointcut("@annotation(learn.aop.AopAnnotation)")
public void aopPointCut(){
}

@Around("aopPointCut()")
public Object Around(ProceedingJoinPoint point) throws Throwable {

    //获取注解和注解的值
    AopAnnotation annotation = getAnnotation(point);
    if (annotation != null) {
        boolean flag = annotation.flag();
        System.out.println("注解flags的值:" + flag);
    }

    Object proceed = point.proceed();
    return proceed;
}

public AopAnnotation getAnnotation(ProceedingJoinPoint point) {
    Signature signature = point.getSignature();
    MethodSignature methodSignature = (MethodSignature) signature;
    Method method = methodSignature.getMethod();
    if (method != null){
        return method.getAnnotation(AopAnnotation.class);
    }
    return null;
}
```




