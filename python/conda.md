# Conda

## Linux安装MiniConda

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-py39_4.12.0-Linux-x86_64.sh
chmod +x Miniconda3-py39_4.12.0-Linux-x86_64.sh
./Miniconda3-py39_4.12.0-Linux-x86_64.sh
```



```bash
export PATH=$HOME/miniconda3/bin:$PATH
source ~/.bashrc
```

## Conda 环境管理

### 创建Conda环境

```bash
# 语法
conda create -name <env_name> python=<version> [package_name1] [package_name2] [ .]

# 样例 创建一个名为 learn 的环境，python 版本为3.10
conda create -name learn python=3.10 # -name 可以简写为 -n
```

### 切换Conda环境

```bash
# 语法
conda activate env_name

# 样例 切换到 learn 环境
conda activate learn

# 退出当前环境
conda deactivate
```

### 管理Conda环境

```bash
# 查看当前电脑上所有的conda环境
conda env list

# 语法
conda (env) remove -name <env_name> -all
# 样例
conda (env) remove -name learn -all

# 克隆环境
# 语法
conda create -name <new_evn_name> -clone <old_env_name>
# 样例
conda create -name myclone -clone myenv
```

### <font style="color:rgb(77, 77, 77);">通道</font>

**conda config --show channels**

**conda config --remove channels channel-name**

**conda config --remove-key channels**

临时使用特定通道 **conda install package-name -c conda-forge**

## 镜像

方法一：通过命令行配置

```bash
 conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/ 
 conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
 conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
 conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/mambaforge/
```

方法二：通过文件配置略



