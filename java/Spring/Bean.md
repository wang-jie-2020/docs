# ioc

## 一、Bean

Bean配置的三种方式:(1)XML (2)JAVA配置 (3)注解

目前的主流方式是（3）+（2）配置

​	注解方式：@Repository、@Service、@Controller、@Component

​	JAVA配置：@Configuration & @Bean

Bean通过注解方式使用:

1、@Autowired是Spring自带的，@Resource是JSR250规范实现的，@Inject是JSR330规范实现的

2、@Autowired、@Inject用法基本一样，不同的是@Inject没有required属性

3、@Autowired、@Inject是默认按照类型匹配的，@Resource是按照名称匹配的

4、@Autowired如果需要按照名称匹配需要和@Qualifier一起使用，@Inject和@Named一起使用，@Resource则通过name进行指定

5、其他注解

​	@Scope	需要在类上使用注解 @Scope，其 value 属性用于指定作用域（singleton、**prototype**、request）

​	@Value	需要在属性上使用注解 @Value，该注解的 value 属性用于指定要注入的值。

​	@PostConstruct	在方法上使用 @PostConstruct 相当于初始化

## 二、上下文和容器

> Spring 配置文件中每一个<bean>节点元素在 Spring 容器里都通过一个 BeanDefinition 对象表示，它描述了 Bean 的配置信息。而 BeanDefinitionRegistry 接口提供了向容器手工注册 BeanDefinition 对象的方法。

**BeanDefinition：各种Bean对象及其相互的关系**

**BeanRegistry： 向IOC容器手工注册 BeanDefinition 对象的方法**

**BeanFactory： 工厂模式定义了IOC容器的基本功能规范**

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/spring-framework-ioc-source-2.png)

> IoC容器的接口类是ApplicationContext，很显然它必然继承BeanFactory对Bean规范（最基本的ioc容器的实现）进行定义。而ApplicationContext表示的是应用的上下文，除了对Bean的管理外，还至少应该包含了
>
>- **访问资源**：对不同方式的Bean配置（即资源）进行加载。(实现ResourcePatternResolver接口)
>- **国际化**: 支持信息源，可以实现国际化。（实现MessageSource接口）
>- **应用事件**: 支持应用事件。(实现ApplicationEventPublisher接口)

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/spring-framework-ioc-source-71.png)

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/spring-framework-ioc-source-51.png)

### 2.1 ApplicationContext

一、ApplicationContext也是一个可注入对象

​	1.直接通过注解注入ApplicationContext类型

​	2.实现ApplicationContextAware

二、一些API

2.1 指定基类型的多个实现

​	<T> Map<String, T> getBeansOfType(@Nullable Class<T> var1);
2.2 Bean上的注解 

​	<A extends Annotation> A findAnnotationOnBean(String var1, Class<A> var2);

## 三、过程详解

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/spring-framework-ioc-source-102.png)

![img](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/5e70bcb4ff1d43b19da823fbc6e2a6d9.png)

3.1 替换Bean的例子

```java
@Component
public class AnotherBeanDefinitionRegistryPostAccessor implements BeanDefinitionRegistryPostProcessor {
    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry beanDefinitionRegistry) throws BeansException {
        String beanName = "someBean";
        if (beanDefinitionRegistry.containsBeanDefinition(beanName)) {

            beanDefinitionRegistry.removeBeanDefinition(beanName);

            GenericBeanDefinition newBean = new GenericBeanDefinition();
            newBean.setBeanClass(AnotherBean.class);
            beanDefinitionRegistry.registerBeanDefinition(beanName, newBean);
        }
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory configurableListableBeanFactory) throws BeansException {

    }
}
```

3.2 Bean实例化后触发执行方法

实现InitializingBean接口并且重写afterPropertiesSet()，且bean要注册到Spring容器中，那么bean在实例化、属性注入后，重写的afterPropertiesSet()就会触发执行。

一个例子是在web项目中*Anonymous**注解允许匿名访问的**url*(参见ruoyi PermitAllUrlProperties)

