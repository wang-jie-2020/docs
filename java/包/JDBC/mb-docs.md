## 核心对象

### PART1 sqlSession

- mybatis

​	SqlSessionFactoryBuilder Builder对象,重载了不同build(),差异仅在读配置形式

​	DefaultSqlSessionFactory (implements SqlSessionFactory)

​	SqlSessionManager (implements SqlSessionFactory, SqlSession)

​	DefaultSqlSession (implements SqlSession)

- spring

  SqlSessionFactoryBean

  SqlSessionTemplate (implements SqlSession, DisposableBean)

### PART2 exector

​	MapperFactoryBean



## 核心配置

- settings

| name                   | desc                                                         |
| ---------------------- | ------------------------------------------------------------ |
| useGeneratedKeys       | 允许 JDBC 支持自动生成主键，需要数据库驱动支持。如果设置为 true，将强制使用自动生成主键。 |
| jdbcTypeForNull        | 当没有为参数指定特定的 JDBC 类型时，空值的默认 JDBC 类型。 某些数据库驱动需要指定列的 JDBC 类型，多数情况直接用一般类型即可，比如 NULL、VARCHAR 或 OTHER。 |
| defaultEnumTypeHandler | 指定 Enum 使用的默认 `TypeHandler` 。（新增于 3.4.5）        |
| logImpl                | 指定 MyBatis 所用日志的具体实现，未指定时将自动查找。        |
| vfsImpl                | 指定 VFS 的实现                                              |
|                        |                                                              |

- typeAliases
- typeHandlers
- EnumTypeHandler、EnumOrdinalTypeHandler
- objectFactory



```yml
mybatis:
  # 搜索指定包别名
  typeAliasesPackage: com.example.**.domain;com.example.domain
  # 配置mapper的扫描，找到所有的mapper.xml映射文件
  mapperLocations: classpath*:mapper/**/*Mapper.xml
  # 加载全局的配置文件
  configLocation: classpath:mybatis/mybatis-config.xml
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 全局参数 -->
    <settings>
        <!-- 使全局的映射器启用或禁用缓存 -->
        <setting name="cacheEnabled"             value="true"   />
        <!-- 允许JDBC 支持自动生成主键 -->
        <setting name="useGeneratedKeys"         value="true"   />
        <!-- 配置默认的执行器.SIMPLE就是普通执行器;REUSE执行器会重用预处理语句(prepared statements);BATCH执行器将重用语句并执行批量更新 -->
        <setting name="defaultExecutorType"      value="SIMPLE" />
		<!-- 指定 MyBatis 所用日志的具体实现 -->
        <setting name="logImpl"                  value="SLF4J"  />
        <!-- 使用驼峰命名法转换字段 -->
		<!-- <setting name="mapUnderscoreToCamelCase" value="true"/> -->
	</settings>
	
</configuration>

```



## plugins

MyBatis 允许你在映射语句执行过程中的某一点进行拦截调用。默认情况下，MyBatis 允许使用插件来拦截的方法调用包括：

- Executor (update, query, flushStatements, commit, rollback, getTransaction, close, isClosed)
  执行器（update、query、flushStatements、commit、rollback、getTransaction、close、isClosed）
- ParameterHandler (getParameterObject, setParameters)
- ResultSetHandler (handleResultSets, handleOutputParameters)
  ResultSetHandler（处理结果集，处理输出参数）
- StatementHandler (prepare, parameterize, batch, update, query)



## 事务管理器(transactionManager)

在mybatis中有两种类型的事务管理器(type=JDBC|MANAGED)

JDBC-这个配置直接使用了JDBC的提交和回滚功能，它依赖从数据源获得的连接来管理事务的作用域。默认情况下，在关闭连接时启用自动提交

MANAGED-这个配置几乎没做什么。它从不提交或回滚一个连接，而是让容器来管理事务的整个生命周期。默认情况下，它会关闭连接。

在spring+mybatis中，没有必要设置事务管理器，设置了也不会生效，spring会使用自带的事务管理器来覆盖mybatis自己的配置。

## 编程式事务管理

我们也可以使用TransactionTemplate来操作事务，此时可以省略commit和rollback方法的调用

```java
public class UserService {
  private final PlatformTransactionManager transactionManager;
  public UserService(PlatformTransactionManager transactionManager) {
    this.transactionManager = transactionManager;
  }
  public void createUser() {
    TransactionStatus txStatus =
        transactionManager.getTransaction(new DefaultTransactionDefinition());
    try {
      userMapper.insertUser(user);
    } catch (Exception e) {
      transactionManager.rollback(txStatus);
      throw e;
    }
    transactionManager.commit(txStatus);
  }
}
```

在使用 `TransactionTemplate` 的时候，可以省略对 `commit` 和 `rollback` 方法的调用。

```java
public class UserService {
  private final PlatformTransactionManager transactionManager;
  public UserService(PlatformTransactionManager transactionManager) {
    this.transactionManager = transactionManager;
  }
  public void createUser() {
    TransactionTemplate transactionTemplate = new TransactionTemplate(transactionManager);
    transactionTemplate.execute(txStatus -> {
      userMapper.insertUser(user);
      return null;
    });
  }
}
```