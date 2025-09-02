## 配置

```sql
show variables like "%connection%";
show variables like "%timeout%";
```

### 创建只读账号

```sql
CREATE USER 'readonly'@'%' IDENTIFIED BY 'Qwer1234!@#$';
GRANT SELECT ON *.* TO 'readonly'@'%' ;
FLUSH PRIVILEGES;
```



## 函数

### 时间

有三个时间函数用来获取当前的时间，分别是now()、current_timestamp() 和 sysdate()