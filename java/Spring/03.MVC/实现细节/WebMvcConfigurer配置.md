**`WebMvcConfigurer` 实现是怎么影响 Spring MVC 配置的**



**`WebMvcConfigurationSupport` 类中定义了所有与 `WebMvcConfigurer` 接口完全相同的 `protected` 方法，但是又没有实现接口的关系，容易造成迷惑**



`DelegatingWebMvcConfiguration` 继承 `WebMvcConfigurationSupport` 类，并包含字段 `WebMvcConfigurerComposite configurers` ，将这两者联系起来了。



`WebMvcConfigurerComposite` 包含字段 `List delegates` ，用来组合容器中所有的 `WebMvcConfigurer` 实现。



`WebMvcConfigurationSupport` 类中定义的 `@Bean` 方法会调用与 `WebMvcConfigurer` 接口完全相同的 `protected` 方法进行配置，`DelegatingWebMvcConfiguration` 继承这些 `protected` 方法，并委托给 `WebMvcConfigurerComposite configurers` ，所以容器中定义的 `WebMvcConfigurer` 实现会参与到 `WebMvcConfigurationSupport` 类中定义的 `@Bean` 方法定义，从而影响 Spring MVC 配置

Spring Boot 自动配置默认提供了 1 个 `WebMvcConfigurer` 实现

+ `WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter`

将 `WebMvcConfigurer` 接口的实现类放入 `DelegatingWebMvcConfiguration#configurers` 的时机

+ 实例化配置类 `WebMvcAutoConfiguration.EnableWebMvcConfiguration` 时
+ 继承了配置类 `DelegatingWebMvcConfiguration`
+ 属性赋值 `DelegatingWebMvcConfiguration#setConfigurers` ，将 `WebMvcConfigurer` 接口的实现类添加到 `WebMvcConfigurerComposite configurers`