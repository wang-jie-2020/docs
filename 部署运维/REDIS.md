[toc]



linux-release: https://download.redis.io/releases/*

## TAR包部署

### (1) 编译依赖安装(也许需要)

```bash
# 更新软件包列表（可选，但推荐）
sudo yum update
# 安装gcc编译器、c++库及tcl（用于Redis测试）
sudo yum install gcc gcc-c++ tcl
```

### (2) 获取并解压Redis源码包

```bash
# 使用wget下载（以Redis 6.0.20为例，请替换为所需版本）
wget http://download.redis.io/releases/redis-6.0.20.tar.gz
# 解压源码包
tar -xzvf redis-6.0.20.tar.gz	# tar -xzf filename.tar.gz -C /path/to/target/directory
# 进入解压后的目录
cd redis-6.0.20
```

### (3) 编译与安装Redis

```bash
sudo make install	# 安装到默认路径（通常是 /usr/local/bin）

make PREFIX=/usr/local/redis-6.0.20 install	# 安装到自定义目录 /usr/local/redis-6.0.20
```

使用自定义目录时，后续操作中需要使用该目录下的二进制文件完整路径，例如 `/usr/local/redis-6.0.20/bin/redis-server` 

### (4) 配置运行

```bash
# 假设当前仍在redis源码目录中
sudo mkdir /etc/redis 
sudo cp redis.conf /etc/redis/redis.conf 
```



**设置为守护进程**：daemonize yes

```
redis-server /etc/redis/redis.conf

redis-cli -a 'password'	# ping -> pong
```



### (5) 生产环境进阶设置 (可选)

对于生产环境，你可能还需要考虑：

- **配置为系统服务**：可以参考 `redis-x.x.x/utils` 目录下的 `redis_init_script`，将其修改后放入 `/etc/init.d/` 并设置为开机自启 。

### (6) 通过进程信息查找

```bash
ps -ef | grep redis

ls -l /proc/1234/cwd
```

Redis进程**当前的工作目录**。`/proc`文件系统也会提供其他进程信息，例如`exe`符号链接指向执行程序的**绝对路径**。

- 要查找**正在运行的Redis进程的当前目录**，最直接的方法是结合`ps`和`/proc/cwd`。
- 要查找**Redis的数据目录**，使用`redis-cli CONFIG GET dir`命令通常最准确



## 迁移

RDB或AOF迁移, rdb、aof cp到新目录再起即可

### 在线数据还原(不停服务)

注意 -> 未尝试 !!!

```bash
# 如果备份是RDB格式，可以启动一个临时Redis实例
# 启动临时实例
redis-server --port 6380 --dbfilename temp.rdb

# 在另一个终端连接并导出数据
redis-cli -p 6380 --pipe < /path/to/backup/dump.rdb

# 或者使用BGSAVE创建新的RDB文件
redis-cli -p 6380 BGSAVE
```





