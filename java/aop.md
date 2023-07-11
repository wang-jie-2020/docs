# Aop

引入包`spring-boot-starter-web`或者`spring-boot-starter-aop`



@Aspect 标记一个切片类(配合@Component)

​	@PointCut 切点

​	在切入点上执行的增强处理主要有五个注解：

​		@Before  在切点方法之前执行

​		@After  在切点方法之后执行

​		@AfterReturning 切点方法返回后执行

​		@AfterThrowing 切点方法抛异常执行

​		@Around 属于环绕增强，能控制切点执行前，执行后

​	JoinPoint 连接点对象,获取参数

```java
@Aspect
@Component
//设置注解执行的顺序
@Order(2)
public class AnnotationAspectTest {
    /**
     * 定义切点,切点为添加了注解的方法
     */
    @Pointcut("@annotation(com.example.zcs.Aop.annotation.TestAnnotation)")
    public void aopPointCut(){
    }
 
    @Around("aopPointCut()")
    public Object Around(ProceedingJoinPoint point) throws Throwable {
        System.out.println("AnnotationAspectTest Around start ");
        //获取注解和注解的值
        TestAnnotation annotation = getAnnotation(point);
       if (annotation != null) {
           boolean flag = annotation.flag();
           System.out.println("注解flags的值:" + flag);
       }
 
        //获取参数
        Object[] args = point.getArgs();
 
        for (Object arg : args) {
            System.out.println("arg ==>" + arg);
        }
 
        //去调用被拦截的方法
        Object proceed = point.proceed();
 
        return proceed;
    }
 
    //获取注解
    public TestAnnotation getAnnotation(ProceedingJoinPoint point) {
        Signature signature = point.getSignature();
        MethodSignature methodSignature = (MethodSignature) signature;
        Method method = methodSignature.getMethod();
        if (method != null){
            return method.getAnnotation(TestAnnotation.class);
        }
        return null;
    }
}
```





```java

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface TestAnnotation {
    boolean flag() default true;
}
```





```java
@Controller
@RequestMapping("aop")
public class AopController {
 
    @RequestMapping("test")
    @ResponseBody
    public String aopTest(User user) {
       // System.out.println(user);
        System.out.println("aop测试");
        return "success";
 
    }
 
    @TestAnnotation(flag = false)
    @RequestMapping("aopAnnotationTest")
    @ResponseBody
    public String aopAnnotationTest(User user) {
        // System.out.println(user);
        System.out.println("aopAnnotationTest");
        return "success";
 
    }
 
}
```