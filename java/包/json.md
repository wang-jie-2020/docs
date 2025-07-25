# JSON

## Jackson

```xml
<!-- **jackson-databind** 包含了 **jackson-annotations** **jackson-core** -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

objectMapper.writeValueAsString(user);

objectMapper.readValue(jsonString, User.class)；

**注意**：如果实体的某个字段**没有提供 getter 方法**，则该字段**不会被序列化**



其他常见注解:

​	控制输出:

​		@JsonProperty	

​		@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")

​	控制忽略:

​		@JsonIgnore	

​		@JsonIgnoreProperties

​		@JsonIgnoreType

​	SpringBoot中的定制:

​		1. 通过配置方式可以修改行为

​		2. Jackson2ObjectMapperBuilderCustomizer

```java
// 来自百度
@Configuration
public class JacksonConfig implements Jackson2ObjectMapperBuilderCustomizer {
 
    @Override
    public void customize(Jackson2ObjectMapperBuilder builder) {
        builder.dateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")); // 例如设置日期格式
        builder.serializers(new YourCustomSerializer()); // 添加自定义序列化器
        builder.deserializers(new YourCustomDeserializer()); // 添加自定义反序列化器
        builder.modules(new YourCustomModule()); // 添加自定义模块
    }
}

// 或者

@Bean
public Jackson2ObjectMapperBuilderCustomizer jacksonObjectMapperCustomization()
{
    return jacksonObjectMapperBuilder -> jacksonObjectMapperBuilder.timeZone(TimeZone.getDefault());
}

```

#### 例子:自定义注解控制输出(Sensitive敏感信息脱离)

@JacksonAnnotationsInside  内联标记 --> 标记了@Sensitive 就像直接在那个元素上使用了 @JsonSerialize

@JsonSerialize

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
/**
 * 数据脱敏序列化过滤
 *   有个细节: 已经在需要特殊处理的字段上标注了@JsonSerialize(using = SensitiveJsonSerializer.class),为什么还需要ContextualSerializer?
 *      尝试注释掉接口,一样可以断到..问题在于无法拿到注解
 *
 */
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



## FastJson2

```xml
<dependency>
    <groupId>com.alibaba.fastjson2</groupId>
    <artifactId>fastjson2</artifactId>
</dependency>
```

JSON.toJSONString()

JSON.parse()



其他常见注解:

​	控制输出:

​		@JSONField(name=”resType”) 

​		@JSONField(format=”yyyy-MM-dd”) 

​	控制忽略:

​		@JSONField(serialize = false)

​	定制:

​		toJSONString(Object object, Filter filter, JSONWriter.Feature... features) 函数签名中可以传递Filter

​		比如SimplePropertyPreFilter，允许通过指定属性名来过滤字段。

​		参见 com.ruoyi.common.filter.PropertyPreExcludeFilter



*在Fastjson的早期版本中是会被Jasckson的注解影响的 https://github.com/alibaba/fastjson2/issues/716*