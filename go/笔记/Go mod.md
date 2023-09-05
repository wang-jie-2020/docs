# Go modules



## GOPATH

+ bin：存储所编译生成的二进制文件。
+ pkg：存储预编译的目标文件，以加快程序的后续编译速度。
+ src：存储所有.go文件或源代码

需要将代码存放在固定的`$GOPATH/src`目录下，在编写 Go 应用程序，程序包和库时，一般会以`$GOPATH/src/github.com/foo/bar`的路径进行存放。

如果执行`go get`来拉取外部依赖会自动下载并安装到`$GOPATH`目录下。

​	**A.无版本控制概念**

​	**B.无法同步一致第三方版本号**

​	**C.无法指定当前项目引用的第三方版本号**



## Go modules

GOPROXY:

```bash
go env -w GOPROXY=https://goproxy.cn,https://mirrors.aliyun.com/goproxy/,direct
```

GOPRIVATE:

私有的库(不能通过Proxy拉到的)

```bash
go env -w GOPRIVATE="*.example.com"
```



| 命令            | 作用                             |
| --------------- | -------------------------------- |
| go mod init     | 生成 go.mod 文件                 |
| go mod download | 下载 go.mod 文件中指明的所有依赖 |
| go mod tidy     | 整理现有的依赖                   |
| go mod graph    | 查看现有的依赖结构               |
| go mod edit     | 编辑 go.mod 文件                 |
| go mod vendor   | 导出项目所有的依赖到vendor目录   |
| go mod verify   | 校验一个模块是否被篡改过         |
| go mod why      | 查看为什么需要依赖某模块         |

```bash
# 1.指定当前项目module
go mod init github.com/xxxx/yyyy

# 2.Get其他包
go get github.com/aaaa/bbbb

# 3.替换包
go mod edit -replace=zinx@v1=zxin@v2
```

一个前提知识是很多Go的包都是在github上的

mod init 模块名也是基于这个逻辑做的,实际上虽然自定义module以github.com开头实际上仍然指向的当前本地的module

mod get 拉包,在1.20的环境包的实际下载路径是$GOPATH,和教程中的有点不一样







