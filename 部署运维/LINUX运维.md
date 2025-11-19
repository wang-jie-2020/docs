## bash

### 编码问题

通常都会注意到行分隔符的问题,即windows的crlf与unix的lf。但很容易忽略脚本编码,utf8和utf8bom,表现是bash的首行 `#!/usr/bin/bash`即报找不到路径

通过cat -A可以查看

bash参数，一些常见的bash判断

```
$# 是传给脚本的参数个数
$``0` `是脚本本身的名字
$``1` `是传递给该shell脚本的第一个参数
$``2` `是传递给该shell脚本的第二个参数
$@ 是传给脚本的所有参数的列表
$* 是以一个单字符串显示所有向脚本传递的参数，与位置变量不同，参数可超过``9``个
$$ 是脚本运行的当前进程ID号
$? 是显示最后命令的退出状态，``0``表示没有错误，其他表示有错误
```

```bash
# 当前路径
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"	

# 获取参数
while [[ $# -gt 0 ]]; do
    opt="$(echo "${1/#--/-}" | awk '{print tolower($0)}')"
    case "$opt" in
        -\?|-h|-help)
            __usage --no-exit
            exit 0
            ;;
        -tar|-t)
            shift
            tar_name="${1:-}"
            [ -z "$tar_name" ] && __error "Missing value for parameter --tar" && __usage
            ;;
        -build|-b)
            run_build=true
            ;;
        *)
            other_args[${#other_args[*]}]="$1"
            ;;
    esac
    shift
done

# 循环执行数组
  while [ $index -lt ${#target_machine[*]} ]
  do
    scp $image_tar ${target_machine_username[$index]}@${target_machine[$index]}:${target_machine_dir[$index]}
    "
    let index+=1
  done

# 是否为空
if [ -z $tar_name ]; then
  __error "Missing value for parameter --tar" && __usage
fi

if [ "$run_build" = true ]; then
fi
```

字符串处理，bash脚本的字符串是直接不含运算符拼接的

```bash
#  %和#表示方向
identifier=${tar_name%%.*}			从右边,最后一个.以及之后的不要
identifier=${identifier%-lims}		从右边,第一个-lims不要
identifier=${identifier#lims-}		从左边,第一个lims-不要

build_image_tag=${build_tar_name%%.*}		右边最后一个.之后的不要
build_image_tag=${build_image_tag##*-}		坐标最后一个-之前的不要
```

### 时间戳

```bash
$(date +%Y%m%d%H%M%S)
```

### 网络查询

```功能
netstat -ano

strace
```

## ssh

### windows上的ssh

个人版中通过store可以下载适配于windows的ssh.exe或者直接作为可选功能在程序管理中启用.

server版安装离线包或者安装git

### SSH远程执行的坑

场景:通过机器A远程机器B,执行A中的脚本(**前提:机器B未作任何配置,非root**)

问题:执行sudo命令'[sudo: no tty present and no askpass program specified]'

查询资料的理解是当SSH远程执行时默认不分配模拟终端,通过-t以及-tt可以强制分配



不能执行的写法:

```bash
# 不行
    ssh -t name@ip << EOF
      echo $para
      sudo docker ps
EOF

# 不行,注意此种方式需要传递参数
	ssh -t name@ip 'sudo bash -s' < ./deploy_build.sh para1 para2
```

可以执行的写法

```bash
# 可以
    ssh -t name@ip "
      echo $para
      sudo docker ps
    "
```

### sudo免密切换

1. 切换目录到*etc*下

2. 查看*sudoers*权限

3. 修改*sudoers*权限,加入可写权限

4. 打开修改文件配置

   `xx      ALL=(ALL) NOPASSWD: ALL`

5. 修改*sudoers*权限删除可写权限

   ```bash
   cd /etc
   ls -l sudoers
   sudo chmod +w sudoers
   sudo vi sudoers
   ...
   sudo chmod -w sudoers
   ```

### ssh免密登录

sshpass这种还是不考虑,正统的方式是写公钥

```bash
ssh-keygen -o
ssh-copy-id -i ~/.ssh/id_rsa.pub user@server.com
```

## tar

### tar options

-c：（create）建立打包文件

-x：解打包或解压缩的功能，可以搭配-C(大写)在特定目录解开



-t ：查看打包文件的内容含有哪些文件

-v ：在压缩/解压缩的过程中，将正在处理的文件名显示出来



-j ：通过bzip2的支持进行压缩/解压缩，此时文件最好为*.tar.bz2

-z ：通过gzip的支持进行压缩/解压缩，此时文件最好为*.tar.gz



-f filename：-f 后面跟处理后文件的全名称（路径+文件名+后缀名）

-C 目录：这个选项用在解压缩，若要在特定目录解压缩，可以使用这个选项

-p：保留备份数据的原本权限与属性，常用于备份(-c)重要的配置文件

--exclude=FILE:排除某些文件

### FAQ

打tar包时指定相对路径或绝对路径的问题,按照期望打包结果通常是相对路径

```bash
$DST = Get-Date -Format "yyyyMMddhhmmss"
$TAR = -join ("lims", "-", $DST,".tar.gz")
tar -czvf $TAR -C .\outputs\result *
```



## 管理

ps -ef

free -h

```bash
# https://download.redis.io/releases/
ps -ef | grep redis

ls -l /proc/1234/cwd	# 假设查到的PID是1234
```



# bash

## 编码问题

通常都会注意到行分隔符的问题,即windows的crlf与unix的lf

很容易忽略的是脚本的编码,utf8和utf8bom,表现是bash的首行 `#!/usr/bin/bash`即报找不到路径

通过cat -A可以查看

## bash参数

```
$# 是传给脚本的参数个数
$``0` `是脚本本身的名字
$``1` `是传递给该shell脚本的第一个参数
$``2` `是传递给该shell脚本的第二个参数
$@ 是传给脚本的所有参数的列表
$* 是以一个单字符串显示所有向脚本传递的参数，与位置变量不同，参数可超过``9``个
$$ 是脚本运行的当前进程ID号
$? 是显示最后命令的退出状态，``0``表示没有错误，其他表示有错误
```

一些常见的bash判断

```bash
# 当前路径
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"	

# 获取参数
while [[ $# -gt 0 ]]; do
    opt="$(echo "${1/#--/-}" | awk '{print tolower($0)}')"
    case "$opt" in
        -\?|-h|-help)
            __usage --no-exit
            exit 0
            ;;
        -tar|-t)
            shift
            tar_name="${1:-}"
            [ -z "$tar_name" ] && __error "Missing value for parameter --tar" && __usage
            ;;
        -build|-b)
            run_build=true
            ;;
        *)
            other_args[${#other_args[*]}]="$1"
            ;;
    esac
    shift
done

# 循环执行数组
  while [ $index -lt ${#target_machine[*]} ]
  do
    scp $image_tar ${target_machine_username[$index]}@${target_machine[$index]}:${target_machine_dir[$index]}
    "
    let index+=1
  done

# 是否为空
if [ -z $tar_name ]; then
  __error "Missing value for parameter --tar" && __usage
fi

if [ "$run_build" = true ]; then
fi
```

## 字符串处理

bash脚本的字符串是直接不含运算符拼接的

```bash
#  %和#表示方向
identifier=${tar_name%%.*}			从右边,最后一个.以及之后的不要
identifier=${identifier%-lims}		从右边,第一个-lims不要
identifier=${identifier#lims-}		从左边,第一个lims-不要

build_image_tag=${build_tar_name%%.*}		右边最后一个.之后的不要
build_image_tag=${build_image_tag##*-}		坐标最后一个-之前的不要
```

## 时间戳

```bash
$(date +%Y%m%d%H%M%S)
```

netstat -ano

strace



# ssh

## windows上的ssh

个人版中通过store可以下载适配于windows的ssh.exe或者直接作为可选功能在程序管理中启用.

server版安装离线包或者安装git

## SSH远程执行的坑

场景:通过机器A远程机器B,执行A中的脚本(**前提:机器B未作任何配置,非root**)

问题:执行sudo命令'[sudo: no tty present and no askpass program specified]'

查询资料的理解是当SSH远程执行时默认不分配模拟终端,通过-t以及-tt可以强制分配



不能执行的写法:

```bash
# 不行
    ssh -t name@ip << EOF
      echo $para
      sudo docker ps
EOF

# 不行,注意此种方式需要传递参数
	ssh -t name@ip 'sudo bash -s' < ./deploy_build.sh para1 para2
```

可以执行的写法

```bash
# 可以
    ssh -t name@ip "
      echo $para
      sudo docker ps
    "
```

## sudo免密切换

1. 切换目录到*etc*下

2. 查看*sudoers*权限

3. 修改*sudoers*权限,加入可写权限

4. 打开修改文件配置

   `xx      ALL=(ALL) NOPASSWD: ALL`

5. 修改*sudoers*权限删除可写权限

   ```bash
   cd /etc
   ls -l sudoers
   sudo chmod +w sudoers
   sudo vi sudoers
   ...
   sudo chmod -w sudoers
   ```

## ssh免密登录

sshpass这种还是不考虑,正统的方式是写公钥

```bash
ssh-keygen -o
ssh-copy-id -i ~/.ssh/id_rsa.pub user@server.com
```



# tar

## tar options

-c：（create）建立打包文件

-x：解打包或解压缩的功能，可以搭配-C(大写)在特定目录解开



-t ：查看打包文件的内容含有哪些文件

-v ：在压缩/解压缩的过程中，将正在处理的文件名显示出来



-j ：通过bzip2的支持进行压缩/解压缩，此时文件最好为*.tar.bz2

-z ：通过gzip的支持进行压缩/解压缩，此时文件最好为*.tar.gz



-f filename：-f 后面跟处理后文件的全名称（路径+文件名+后缀名）

-C 目录：这个选项用在解压缩，若要在特定目录解压缩，可以使用这个选项

-p：保留备份数据的原本权限与属性，常用于备份(-c)重要的配置文件

--exclude=FILE:排除某些文件

## FAQ

打tar包时指定相对路径或绝对路径的问题,按照期望打包结果通常是相对路径

```bash
$DST = Get-Date -Format "yyyyMMddhhmmss"
$TAR = -join ("lims", "-", $DST,".tar.gz")
tar -czvf $TAR -C .\outputs\result *
```

