## portainer图形界面

```bash
docker run -p 9000:9000 -p 8000:8000 --name portainer \
--restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /mydata/portainer/data:/data \
-d portainer/portainer
```

admin/123123123123

agent 语句在网站上会输出

## onlyoffice

https://blog.csdn.net/cjh16606260986/article/details/134327936

```bash

docker run -i -t -p 8084:80 --restart=always -e JWT_SECRET=my_jwt_secret -e JWT_ENABLED=false onlyoffice-documentserver:8.0.1

```

ip访问问题:

![image.png](https://cdn.jsdelivr.net/gh/wang-jie-2020/images/20250326171658.png)


docker cp onlyoffice:/etc/onlyoffice/documentserver/default.json ./
vim default.json
docker cp ./default.json onlyoffice:/etc/onlyoffice/documentserver/default.json

supervisorctl restart all