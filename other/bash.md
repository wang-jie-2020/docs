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

```bash
$(date +%Y%m%d%H%M%S)
```
