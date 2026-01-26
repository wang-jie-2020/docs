# ssh

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

