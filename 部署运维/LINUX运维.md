## 常用命令

内存、硬盘: 

​	ps -ef

​	free -h

网络:

​	netstat -ano

​	strace

进程:

​	ps -ef | grep redis

​	ls -l /proc/1234/cwd	# 假设查到的PID是1234

TAR包:

​	打tar -czvf $TAR -C path *

​	解tar -xzvf xx.tar.gz -C path





​	-c：（create）建立打包文件

​	-x：解打包或解压缩的功能，可以搭配-C(大写)在特定目录解开



​	-t ：查看打包文件的内容含有哪些文件

​	-v ：在压缩/解压缩的过程中，将正在处理的文件名显示出来



​	-j ：通过bzip2的支持进行压缩/解压缩，此时文件最好为*.tar.bz2

​	-z ：通过gzip的支持进行压缩/解压缩，此时文件最好为*.tar.gz

​	-f filename：-f 后面跟处理后文件的全名称（路径+文件名+后缀名）

​	-C 目录：这个选项用在解压缩，若要在特定目录解压缩，可以使用这个选项

​	-p：保留备份数据的原本权限与属性，常用于备份(-c)重要的配置文件

​	--exclude=FILE:排除某些文件