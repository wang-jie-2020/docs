# Annotation

## 注解

概念略

```java
@Retention(RetentionPolicy.RUNTIME)	
@Target(ElementType.METHOD)
@Documented
@Inherited
public @interface AopAnnotation {
    boolean flag() default true;
}
```

## 注解与反射

Class ... Type

ClassLoader...



getxxx 与 getDeclaredxxx()	private、public，sub、super。。。 



name.setAccessible(true) 对private字段的操作，关闭访问安全控制

泛型 几乎类似，泛型参数 泛型回执 泛型错误

parameterizedType 比如 Map<string,int>中的string和int



@Deprecated、@override...