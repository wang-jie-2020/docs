# JSON

### Jackson

```xml
<!-- **jackson-databind** 包含了 **jackson-annotations** **jackson-core** -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

#### **ObjectMapper**

​	objectMapper.writeValueAsString(user);

​	objectMapper.readValue(jsonString, User.class)；

**注意**：如果实体的某个字段**没有提供 getter 方法**，则该字段**不会被序列化**



#### 注解

@JsonProperty	控制输出

@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")



@JsonIgnore		控制忽略(一个 多个 类型)

@JsonIgnoreProperties

@JsonIgnoreType



#### 自定义

​	@JacksonAnnotationsInside

​	@JsonSerialize

参见 com.ruoyi.common.annotation.Sensitive, com.ruoyi.common.config.serializer.SensitiveJsonSerializer

```java
Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@JacksonAnnotationsInside
@JsonSerialize(using = SensitiveJsonSerializer.class)
public @interface Sensitive
{
    // 枚举
    DesensitizedType desensitizedType();
}
```

```java
public class SensitiveJsonSerializer extends JsonSerializer<String> implements ContextualSerializer
{
    private DesensitizedType desensitizedType;

    @Override
    public void serialize(String value, JsonGenerator gen, SerializerProvider serializers) throws IOException
    {
        // s -> func(s)
        gen.writeString(desensitizedType.desensitizer().apply(value));
    }

    @Override
    public JsonSerializer<?> createContextual(SerializerProvider prov, BeanProperty property)
            throws JsonMappingException
    {
        Sensitive annotation = property.getAnnotation(Sensitive.class);
        if (Objects.nonNull(annotation) && Objects.equals(String.class, property.getType().getRawClass()))
        {
            this.desensitizedType = annotation.desensitizedType();
            return this;
        }
        return prov.findValueSerializer(property.getType(), property);
    }
}
```



Jackson2ObjectMapperBuilderCustomizer 定制序列化行为

```java
@Bean
public Jackson2ObjectMapperBuilderCustomizer jacksonObjectMapperCustomization()
{
    return jacksonObjectMapperBuilder -> jacksonObjectMapperBuilder.timeZone(TimeZone.getDefault());
}
```



### FastJson

```xml
<dependency>
    <groupId>com.alibaba.fastjson2</groupId>
    <artifactId>fastjson2</artifactId>
</dependency>
```

JSON.toJSONString()

JSON.parse()

#### 注解

@JSONField(name=”resType”) 

@JSONField(format=”yyyy-MM-dd”) 

在Fastjson的早期版本中是会被Jasckson的注解影响的 https://github.com/alibaba/fastjson2/issues/716



FastJson提供了`SimplePropertyPreFilter`类，允许通过指定属性名来过滤字段。

参见 com.ruoyi.common.filter.PropertyPreExcludeFilter