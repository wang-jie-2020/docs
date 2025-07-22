- ### pip换源
  ```bash
  pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
  ```

  

  <font style="color:rgb(79, 79, 79);">常用的pip源地址</font>

  ```bash
  清华大学（清华镜像源）
  https://pypi.tuna.tsinghua.edu.cn/simple
  
  阿里云镜像源
  https://mirrors.aliyun.com/pypi/simple/
  
  华为云镜像源
  https://repo.huaweicloud.com/repository/pypi/simple
  
  中国科技大学镜像源
  https://pypi.mirrors.ustc.edu.cn/simple/
  
  华中理工大学镜像源
  https://pypi.hustunique.com/
  
  山东理工大学镜像源
  https://pypi.sdutlinux.org/
  
  豆瓣镜像源
  https://pypi.douban.com/simple/
  ```

  通过将上述代码中的网址替换即可
  换完源后可通过`pip config get global.index-url`命令来查询

  