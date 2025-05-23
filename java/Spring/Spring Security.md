# **Spring Security**

springboot 下考虑 spring.security

ssh或ssm 下考虑shiro

## SpringSecurity

1. Security代理过滤链,在Servlet过滤器链中Adapte(注入SpringContext的过程值得再花时间研究)

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/v2-e8db1153feba42975920dc7d1c33661f_720w.webp)

2. 按配置匹配Security链,执行认证过程

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/v2-700d7fdce90099c6f2d4c9873eaa5259_720w.webp)

(一个示例,感觉不是非常匹配)

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/a9c87d1851a94259ac2c603e75c39b2c.png)

### AuthenticationManager

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/a7013f51aa6d4cc88468e4d1ab93c888.png)

### SecurityContextHolder & SecurityContextHolderStrategy

SecurityContextHolder -> getSecurityContext()

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/v2-ccd782380492892f01fcdca08a5eebd7_720w.webp)

`SecurityContextHolderStrategy`：

​	MODE_THREADLOCAL				默认

​	MODE_INHERITABLETHREADLOCAL	 可继承

​	MODE_GLOBAL					 全局

### SecurityContextHolderFilter & SecurityContextRepository

SecurityContextHolderFilter

​	SecurityContextRepository

​		HttpSessionSecurityContextRepository

​		RequestAttributeSecurityContextRepository

​		NullSecurityContextRepository	<-- jwt

## Authentication

### Authentication

认证结果,类似于Identity,最终存于`SecurityContextHolder`

```java
public interface Authentication extends Principal, Serializable {
    Collection<? extends GrantedAuthority> getAuthorities();

    Object getCredentials();

    Object getDetails();

    Object getPrincipal();

    boolean isAuthenticated();

    void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException;
}
```

在jwt的场景下,authorization header中的token实际上通过UsernamePasswordAuthenticationToken包装塞到SecurityContext中即可,需要取用则通过静态方法获取

```java
Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
Identity identity = (Identity) authentication.getPrincipal();
```

### UserDetails & UserDetailsService

类似于认证结果,类似于Identity.UserManager,是一种基于场景的调用过程,实际上并非强制或必要,通过会在UserController中通过

```java
authenticationToken = new UsernamePasswordAuthenticationToken(name, password);
Authentication authentication = authenticationManager.authenticate(authenticationToken);
	//实际上上一句的效果就是调用UerDetailsService的实现来进行认证
UerDetailsService.loadUserByUsername()
```

## Authorization

通常考虑的是方法级的认证,通过注解启用@preAuthorize

@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)

### Anonymous

```java
httpSecurity
    // 过滤请求
    .authorizeRequests()
    // 对于登录login 注册register 验证码captchaImage 允许匿名访问
    .antMatchers("/login", "/register", "/captchaImage").permitAll()
    // 除上面外的所有请求全部需要鉴权认证
    .anyRequest().authenticated();
```

以上是一个示例,在这种示例下不能通过@preAuthorize标注的形式授权匿名访问,而必须通过`.authorizeRequests()`包含的ExpressionUrlAuthorizationConfigurer.getRegistry()允许匿名.

1. 增加匿名注解

```java
package learn.auth.properties;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 匿名访问不鉴权注解
 *
 * @author ruoyi
 */
@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Anonymous
{
}

```



2.Bean注册拦截

```java
package learn.auth.properties;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Pattern;

import org.apache.commons.lang3.RegExUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

/**
 * 设置Anonymous注解允许匿名访问的url
 *
 *  todo 了解此处代码
 * @author ruoyi
 */
@Configuration
public class PermitAllUrlProperties implements InitializingBean, ApplicationContextAware
{
    private static final Pattern PATTERN = Pattern.compile("\\{(.*?)\\}");

    private ApplicationContext applicationContext;

    private List<String> urls = new ArrayList<>();

    public String ASTERISK = "*";

    @Override
    public void afterPropertiesSet()
    {
        RequestMappingHandlerMapping mapping = applicationContext.getBean(RequestMappingHandlerMapping.class);
        Map<RequestMappingInfo, HandlerMethod> map = mapping.getHandlerMethods();

        map.keySet().forEach(info -> {
            HandlerMethod handlerMethod = map.get(info);

            // 获取方法上边的注解 替代path variable 为 *
            Anonymous method = AnnotationUtils.findAnnotation(handlerMethod.getMethod(), Anonymous.class);
            Optional.ofNullable(method).ifPresent(anonymous -> Objects.requireNonNull(info.getPatternsCondition().getPatterns())
                    .forEach(url -> urls.add(RegExUtils.replaceAll(url, PATTERN, ASTERISK))));

            // 获取类上边的注解, 替代path variable 为 *
            Anonymous controller = AnnotationUtils.findAnnotation(handlerMethod.getBeanType(), Anonymous.class);
            Optional.ofNullable(controller).ifPresent(anonymous -> Objects.requireNonNull(info.getPatternsCondition().getPatterns())
                    .forEach(url -> urls.add(RegExUtils.replaceAll(url, PATTERN, ASTERISK))));
        });
    }

    @Override
    public void setApplicationContext(ApplicationContext context) throws BeansException
    {
        this.applicationContext = context;
    }

    public List<String> getUrls()
    {
        return urls;
    }

    public void setUrls(List<String> urls)
    {
        this.urls = urls;
    }
}

```



3.向registry注册

```java
// 注解标记允许匿名访问的url
ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry = httpSecurity.authorizeRequests();
permitAllUrl.getUrls().forEach(url -> registry.antMatchers(url).permitAll());
```

### @preAuthorize

![image-20230925140657233](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/image-20230925140657233.png)

| **表达式**                     | **描述**                                                     |
| ------------------------------ | ------------------------------------------------------------ |
| hasRole([role])                | 当前用户是否拥有指定角色。                                   |
| hasAnyRole([role1,role2])      | 多个角色是一个以逗号进行分隔的字符串。如果当前用户拥有指定角色中的任意一个则返回true。 |
| hasAuthority([auth])           | 等同于hasRole                                                |
| hasAnyAuthority([auth1,auth2]) | 等同于hasAnyRole                                             |
| Principle                      | 代表当前用户的principle对象                                  |
| authentication                 | 直接从SecurityContext获取的当前Authentication对象            |
| permitAll                      | 总是返回true，表示允许所有的                                 |
| denyAll                        | 总是返回false，表示拒绝所有的                                |
| isAnonymous()                  | 当前用户是否是一个匿名用户                                   |
| isRememberMe()                 | 表示当前用户是否是通过Remember-Me自动登录的                  |
| isAuthenticated()              | 表示当前用户是否已经登录认证成功了。                         |
| isFullyAuthenticated()         | 如果当前用户既不是一个匿名用户，同时又不是通过Remember-Me自动登录的，则返回true。 |

实际项目直接基于Role的鉴权结构比较少,通常都是限定权限常量是否包含在授权列表中(更细节一些).

hasAuthority、hasPermission实际上都是从Authentication中的Authorities中判断

一种更偏项目的写法是 @PreAuthorize("@ss.hasPermi('system:menu:list')")

```java
@Service("ss")
public class PermissionService {
    ....
}
```





