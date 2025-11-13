JDBC 主要有如下重要对象:

- DriverManager (驱动)
- Connection (包括 DataSource)
- Statement (包括 PreparedStatement, CallableStatement)
- ResultSet

概念上都是比较容易理解的



Spring-JDBC 进行了基础封装, 引入了重用连接池HikariDataSource, 主要改动点还是在重复代码的简化上, 通过jdbcTemplate的访问可以忽略连接打开关闭, 通过关系绑定进行ObjectMapping

```java
// jdbc
String sql = "select * from user";
List<User> userList = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(User.class));
```



Spring-JDBC 基础上延申出了Hibernate(spring-data-jpa), 它的特点是通过注解标记以及语义化的方法名自动进行SQL语句构建

```java
// jpa
@Entity
@Table(name = "user")
@Id
@Column(name = "id")
@Column(name = "name")

public interface IUserDao extends JpaRepository<User01, Integer> {
}

userDao.findAll()
```



也有一些其他工具进行了类似Spring的实现, 比如Apache DBUtils(https://commons.apache.org/proper/commons-dbutils/examples.html)

核心类QueryRunner提供的方法解决了代码重复的问题，通过数据源解决了数据库连接等资源管理的问题。

核心接口RestSetHandler主要是结果集的处理，用户自行定义拓展。

```java
QueryRunner queryRunner = ApacheDBUtils.getQueryRuner();
ResultSetHandler<User> resultSetHandler = new BeanHandler<User>(User.class);

List<User> userList = queryRunner.execute("select * from user where id = ?", resultSetHandler, 101);
```


