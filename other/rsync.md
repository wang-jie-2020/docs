cwrsync 在windows上的NULL SID问题:

​	挂载FTP -> 中转机 -> 挂载FTP

尝试了rsync参数(--no-perms --no-owner --no-group)无效, 目标转向怀疑cygwin(unix兼容), 最终添加/etc/fstab

![image-20251111102149854](https://raw.gitcode.com/qq_36179938/images/raw/main/image-20251111102149854.png)

![img](https://raw.gitcode.com/qq_36179938/images/raw/main/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_17627643044092.png)





https://www.itefix.net/cwrsync/client/faqs

![image-20251111102659907](https://raw.gitcode.com/qq_36179938/images/raw/main/image-20251111102659907.png)