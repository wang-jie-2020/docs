## BASE实现

结合代码模板(注解) 和 泛型Mapper 效率嘎嘎高, 其他的难评.

Wrapper - LambdaQueryWrapper、LambdaUpdateWrapper, chainWrapper?

## Page

`mybatis-plus-jsqlparser`, 注意pageHelper存在冲突

```java
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {

MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2)); // 如果配置多个插件, 切记分页最后添加
return interceptor;
}
```

## AutoFill

1. 自定义实现`MetaObjectHandler`, 需要注册
2. 注解标记
3. 名称、类型一致






