# auth

springboot 下考虑 spring.security

ssh或ssm 下考虑shiro

## SpringSecurity

(难度中等,细节太多)

1. 代理Security过滤器链,在Servlet过滤器链中Adapte SpringContext

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/v2-e8db1153feba42975920dc7d1c33661f_720w.webp)

2. 路径匹配过Security过滤器链

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/v2-700d7fdce90099c6f2d4c9873eaa5259_720w.webp)

(一个示例,感觉不是非常匹配)

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/a9c87d1851a94259ac2c603e75c39b2c.png)

### AuthenticationManager

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/a7013f51aa6d4cc88468e4d1ab93c888.png)

### SecurityContextHolder & SecurityContextHolderStrategy

在认证成功后，`AbstractAuthenticationProcessingFilter` 会将认证成功的`Authentication` 放到`SecurityContext`当中。

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

### @preAuthorize 

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