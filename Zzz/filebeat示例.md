#### filebeat 日志接入

```
filebeat.inputs：指定要收集的日志文件列表。
type: log：指定输入类型为日志。
enabled: true：启用该输入。

multiline.pattern：正则表达式，匹配日志行开始的日期格式 （根据自己实际情况而定）
multiline.negate： # true，不匹配 pattern 的行合并到上一行；false，匹配 pattern 的行合并到上一行。默认为 false
multiline.match：取值为after或before，表示匹配到的这一行日志是合并到上一条日志还是下一条日志，若为after，这将匹配到当行日志合并到上一行日志后面作为一条日志；若为before，这合并到下一行日志前面作为一条日志
paths：指定要收集的日志文件路径列表。

fields：指定自定义字段。
service_name：指定服务名称（根据自己的项目名称确定，如果你的项目名称叫ttp 即写tpp）
output.kafka：指定将日志发送到Kafka的配置
hosts：指定Kafka的主机列表。
topic：指定要发送到的Kafka主题
```

单项目日志接入 ：以mes_interface项目为例（根据自己项目实际情况而定）：

```
filebeat.inputs:
- type: log
  enabled: true
  multiline.pattern: '\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}.\d{3}'
  multiline.negate: true
  multiline.match: after
  paths:
    - /app/logs/xxx/*info.log
    - /app/logs/xxx/*info.log
  fields:
    service_name: mes_interface
output.kafka:
  hosts: [""]
  topic: 'xxxxx'
```



多项目日志接入：以mes_interface和mes_operation为例（根据自己项目实际情况而定）：

```
filebeat.inputs:
- type: log
  enabled: true
  multiline.pattern: '\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}.\d{3}'
  multiline.negate: true
  multiline.match: after
  paths:
    - /app/logs/xxx/*info.log
    - /app/logs/xxx/*info.log
  fields:
    service_name: xxx
- type: log
  enabled: true
  paths:
    - /app/logs/xxx/*info.log
    - /app/logs/xxx/*info.log
  fields:
    service_name: xxx
output.kafka:
  hosts:
  topic: 
```