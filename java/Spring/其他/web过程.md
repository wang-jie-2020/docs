# java-web

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/spring-springframework-mvc-8.png)



**核心架构的具体流程步骤**如下：

1. **首先用户发送请求——>DispatcherServlet**，前端控制器收到请求后自己不进行处理，而是委托给其他的解析器进行 处理，作为统一访问点，进行全局的流程控制；
2. **DispatcherServlet——>HandlerMapping**， HandlerMapping 将会把请求映射为 HandlerExecutionChain 对象（包含一 个Handler 处理器（页面控制器）对象、多个HandlerInterceptor 拦截器）对象，通过这种策略模式，很容易添加新 的映射策略；
3. **DispatcherServlet——>HandlerAdapter**，HandlerAdapter 将会把处理器包装为适配器，从而支持多种类型的处理器， 即适配器设计模式的应用，从而很容易支持很多类型的处理器；
4. **HandlerAdapter——>处理器功能处理方法的调用**，HandlerAdapter 将会根据适配的结果调用真正的处理器的功能处 理方法，完成功能处理；并返回一个ModelAndView 对象（包含模型数据、逻辑视图名）；
5. **ModelAndView 的逻辑视图名——> ViewResolver**，ViewResolver 将把逻辑视图名解析为具体的View，通过这种策 略模式，很容易更换其他视图技术；
6. **View——>渲染**，View 会根据传进来的Model 模型数据进行渲染，此处的Model 实际是一个Map 数据结构，因此 很容易支持其他视图技术；
7. **返回控制权给DispatcherServlet**，由DispatcherServlet 返回响应给用户，到此一个流程结束。

## tomcat和servlet

```
Tomcat
	webapps	
		WEB-INF	
			web.xml	核心配置
	conf
		server.xml	Tomcat配置
			Connector 
			Host
```

web.xml配置繁琐,例如:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">

    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring-context*.xml</param-value>
    </context-param>
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <filter>
        <filter-name>encodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <servlet>
        <servlet-name>springServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath*:/spring-mvc*.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

## filter和interceptor

Filter 由 Servlet 标准定义，要求 Filter 需要在Servlet被调用之前调用，作用顾名思义，就是用来过滤请求。在Spring Web应用中，DispatcherServlet就是唯一的Servlet实现。

Interceptor 由 Spring 自己定义，由DispatcherServlet调用，可以定义在Handler调用前后的行为。这里的 Handler，在多数情况下，就是Controller中对应的方法。

![image-20230920135430393](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/image-20230920135430393.png)

![这里写图片描述](https://raw.gitcode.com/qq_36179938/images/raw/main/e85969bbe62a4906e5803225beb350d5.png)

### filter

注意点:

(1) 定义和挂载，init()中的参数来自于预先定义（XML 或者 FilterRegistrationBean）

(2) 可以进行路径选择

(3) 如果对Request的输入流读取（默认只允许读一次），则要考虑继承HttpServletRequestWrapper重播请求流

```java
public class XssFilter implements Filter
{
    /**
     * 排除链接
     */
    public List<String> excludes = new ArrayList<>();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException
    {
        String tempExcludes = filterConfig.getInitParameter("excludes");
        if (StringUtils.isNotEmpty(tempExcludes))
        {
            String[] urls = tempExcludes.split(",");
            for (String url : urls)
            {
                excludes.add(url);
            }
        }
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException
    {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;
        if (handleExcludeURL(req, resp))
        {
            chain.doFilter(request, response);
            return;
        }
        XssHttpServletRequestWrapper xssRequest = new XssHttpServletRequestWrapper((HttpServletRequest) request);
        chain.doFilter(xssRequest, response);
    }

    @Override
    public void destroy()
    {

    }
}
```

```java
@Bean
public FilterRegistrationBean xssFilterRegistration()
{
    FilterRegistrationBean registration = new FilterRegistrationBean();
    registration.setFilter(new XssFilter());
    registration.addUrlPatterns(urlPatterns.split(","));
    registration.setName("xssFilter");
    registration.setOrder(FilterRegistrationBean.HIGHEST_PRECEDENCE);
    Map<String, String> initParameters = new HashMap<String, String>();
    initParameters.put("excludes", excludes);
    registration.setInitParameters(initParameters);
    return registration;
}
```

### interceptor

```java
@Configuration
public class MvcConfig implements WebMvcConfigurer {
    @Autowired
    private XssInterceptor xssInterceptor;

    /**
     * 添加 Spring MVC 生命周期拦截器，用于控制器方法调用和资源处理器请求的预处理和后处理。
     * 可以注册拦截器以应用于所有请求或仅限于 URL 模式的子集。
     */
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(xssInterceptor)
                .addPathPatterns("/interceptor/*");
                //.addPathPatterns("/**");
    }
}
```

