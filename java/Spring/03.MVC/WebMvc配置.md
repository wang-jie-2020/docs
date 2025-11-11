## WebMvcConfigurer

| 方法                                 | 描述                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| `configurePathMatch`                 | 帮助配置 `HandlerMapping` 路径匹配选项，例如是否使用已解析的 `PathPatterns` 或与 `PathMatcher` 匹配的字符串模式，是否匹配尾部斜杠等。 |
| `configureContentNegotiation`        | 配置内容协商选项。                                           |
| `configureAsyncSupport`              | 配置异步请求处理选项。                                       |
| `configureDefaultServletHandling`    | 配置处理器以通过转发到 Servlet 容器的 “default” servlet 来委派未处理的请求。一个常见的用例是当 `DispatcherServlet` 映射到 `""` 从而覆盖 Servlet 容器对静态资源的默认处理时。 |
| `addFormatters`                      | 除了默认注册的 `Converter` 和 `Formatter` 之外，再添加其他的 |
| `addInterceptors`                    | 添加 Spring MVC 生命周期拦截器，用于控制器方法调用和资源处理器请求的预处理和后处理。可以注册拦截器以应用于所有请求或仅限于 URL 模式的子集。 |
| `addResourceHandlers`                | 添加处理器以从 Web 应用程序根目录、类路径等的特定位置提供静态资源，例如图像、js 和 css 文件。 |
| `addCorsMappings`                    | 配置“全局”跨域请求处理。配置的 CORS 映射适用于带注解的控制器、功能端点和静态资源。 带注解的控制器可以通过 `@CrossOrigin` 进一步声明更细粒度的配置。在这种情况下，此处声明的“全局” CORS 配置与控制器方法上定义的本地 CORS 配置相结合。 |
| `addViewControllers`                 | 配置预先配置有响应状态代码或视图的简单自动化控制器以呈现响应正文。这在不需要自定义控制器逻辑的情况下很有用——例如呈现主页、执行简单的站点 URL 重定向、返回带有 HTML 内容的 404 状态、无内容的 204 状态等等。 |
| `configureViewResolvers`             | 配置视图解析器以将从控制器返回的基于字符串的视图名称转换为具体的 `org.springframework.web.servlet.View` 实现以执行渲染。 |
| `addArgumentResolvers`               | 添加解析器以支持自定义控制器方法参数类型。这不会覆盖对解析处理器方法参数的内置支持。要自定义对参数解析的内置支持，请直接配置 `RequestMappingHandlerAdapter` |
| `addReturnValueHandlers`             | 添加处理程序以支持自定义控制器方法返回值类型。使用此选项不会覆盖对处理返回值的内置支持。要自定义处理返回值的内置支持，请直接配置 `RequestMappingHandlerAdapter` |
| `configureMessageConverters`         | 配置 `HttpMessageConverter` 以读取请求正文和写入响应正文。 默认情况下，只要类路径中存在相应的三方库（例如 Jackson JSON、JAXB2 等），就会配置所有内置转换器。 注意使用此方法会关闭默认转换器注册。或者，使用 `extendMessageConverters(List)` 修改该默认转换器列表。 |
| `extendMessageConverters`            | 使用默认列表配置或初始化后，扩展或修改转换器列表。 请注意，转换器注册的顺序很重要。特别是在客户端接受 `org.springframework.http.MediaType.ALL` 的情况下，之前配置的转换器将是首选。 |
| `configureHandlerExceptionResolvers` | 配置异常解析器。 给定的列表开始为空。如果它留空，框架会配置一组默认的解析器，请参阅 `WebMvcConfigurationSupport.addDefaultHandlerExceptionResolvers(List, org.springframework.web.accept.ContentNegotiationManager)` 。或者，如果将任何异常解析器添加到列表中，则应用程序有效地接管并且必须提供完全初始化的异常解析器。 或者，您可以使用 `extendHandlerExceptionResolvers(List)` ，它允许您扩展或修改默认配置的异常解析器列表。 |
| `extendHandlerExceptionResolvers`    | 扩展或修改默认配置的异常解析器列表。这对于插入自定义异常解析器而不干扰默认异常解析器很有用。 |
| `getValidator`                       | 提供自定义验证器，而不是默认创建的验证器。假设 JSR-303 在类路径上，默认实现是：`org.springframework.validation.beanvalidation.OptionalValidatorFactoryBean` 。 将返回值保留为 `null` 以保持默认值。 |
| `getMessageCodesResolver`            | 提供自定义 `MessageCodesResolver` 用于从数据绑定和验证错误代码构建消息代码。 将返回值保留为 `null` 以保持默认值。 |



## **`WebMvcConfigurer` 实现是怎么影响 Spring MVC 配置的**



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

