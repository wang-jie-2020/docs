# Feign



**@EnableFeignClients** 用于在启动时加载我们定义的所有使用注解 **@FeignClient** 定义的**feign**客户端，并把**feign**客户端注册到 **IOC** 容器中。

**@EnableFeignClients**注解中的**basePackages**用于配置扫描哪些包下来的类。



[官网](https://cloud.spring.io/spring-cloud-openfeign/reference/html/)



```java
public @interface FeignClient {
    @AliasFor("name")
    String value() default "";

    String contextId() default "";

    @AliasFor("value")
    String name() default "";

    String qualifier() default "";

    String url() default "";

    boolean decode404() default false;

    Class<?>[] configuration() default {};

    Class<?> fallback() default void.class;

    Class<?> fallbackFactory() default void.class;

    String path() default "";

    boolean primary() default true;
}
```

>value、name
> value和name的作用一样，如果没有配置url那么配置的值将作为服务名称，用于服务发现。反之只是一个名称。
>
>
>
>contextId
> 我们不想将所有的调用接口都定义在一个类中，有一种解决方案就是为每个Client手动指定不同的contextId，这样就不会冲突了。
>
>
>
>url
> url用于配置指定服务的地址，相当于直接请求这个服务，不经过Ribbon的服务选择。像调试等场景可以使用。
>
>
>
>decode404
> 当调用请求发生404错误时，decode404的值为true，那么会执行decoder解码，否则抛出异常。
>
>
>
>configuration
> configuration是配置Feign配置类，在配置类中可以自定义Feign的Encoder、Decoder、LogLevel、Contract等。
>
>
>
>fallback
> 定义容错的处理类，也就是回退逻辑，fallback的类必须实现Feign Client的接口，无法知道熔断的异常信息。
>
>
>
>fallbackFactory
> 也是容错的处理，可以知道熔断的异常信息。
>
>
>
>path
> path定义当前FeignClient访问接口时的统一前缀，比如接口地址是/user/get, 如果你定义了前缀是user, 那么具体方法上的路径就只需要写/get 即可。
>
>
>
>primary
> primary对应的是@Primary注解，默认为true，官方这样设置也是有原因的。当我们的Feign实现了fallback后，也就意味着Feign Client有多个相同的Bean在Spring容器中，当我们在使用@Autowired进行注入的时候，不知道注入哪个，所以我们需要设置一个优先级高的，@Primary注解就是干这件事情的。
>
>
>
>qualifier
> qualifier对应的是@Qualifier注解，使用场景跟上面的primary关系很淡，一般场景直接@Autowired直接注入就可以了。