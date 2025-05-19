# JSON

### Jackson

**jackson-databind** 包含了 **jackson-annotations** **jackson-core** 

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

**ObjectMapper** 核心类,**注意**：如果实体的某个字段**没有提供 getter 方法**，则该字段**不会被序列化**

objectMapper.writeValueAsString(user);

objectMapper.readValue(jsonString, User.class)；

@JsonProperty

@JsonIgnore

@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")

### FastJson

```xml
<dependency>
    <groupId>com.alibaba.fastjson2</groupId>
    <artifactId>fastjson2</artifactId>
</dependency>
```

DateTime

在Fastjson的早期版本中是会被Jasckson的注解影响的 https://github.com/alibaba/fastjson2/issues/716

JSON.toJSONString()

JSON.parse()