# bean

XML、JAVA、Annotation

@Autowired

@Qualifier

@Resource

@Inject.@Named



![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/spring-framework-ioc-source-2.png)

+ **BeanFactory： 工厂模式定义了IOC容器的基本功能规范**
+ **BeanRegistry： 向IOC容器手工注册 BeanDefinition 对象的方法**

此处延申替换bean的一种方式,比如在引入jar包时源未引入重写配置,那么可以通过实现BeanDefinitionRegistryPostProcessor的方式替换重写bean



![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/spring-framework-ioc-source-71.png)



![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/spring-framework-ioc-source-51.png)
