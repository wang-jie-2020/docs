# Oracle

```SQL

SELECT * FROM V$SESSION;

-- 允许最大进程数、连接数
select name,value from v$parameter where name in('processes' ,'sessions');
-- 当前进程数、连接数
select count(1) from v$session;
select count(1) from v$process;


/*
IDLE_TIME：限制每个会话所允许的最长连续空闲时间，超过这个时间会话将自动断开。（参数值是一个整数，单位是分钟，UNLIMITED 不限制）
CONNECT_TIME：限制指定会话的总运行时间限制，超过这个时间会话将自动断开。（参数值是一个整数，单位是分钟，UNLIMITED 不限制）
*/
SELECT resource_name,resource_type,LIMIT FROM dba_profiles WHERE resource_Name IN ( 'IDLE_TIME', 'CONNECT_TIME' ) AND PROFILE='DEFAULT' ;

-- 修改空闲超时时间10分钟
ALTER PROFILE DEFAULT LIMIT IDLE_TIME 10;

```

