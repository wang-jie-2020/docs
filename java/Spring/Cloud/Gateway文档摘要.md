# Gateway

https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#gateway-starter



- 路由：网关的基本构建块。它由 ID、目标 URI、谓词集合和筛选器集合定义。如果聚合谓词为 true，则匹配路由。
- 谓词：这是一个 Java 8 函数谓词。输入类型是 Spring Framework `ServerWebExchange` 。这使您可以匹配 HTTP 请求中的任何内容，例如标头或参数。
- 过滤器：这些是使用特定工厂构造的实例 `GatewayFilter` 。在这里，您可以在发送下游请求之前或之后修改请求和响应。



## Filters

*太多，只登记个名字：*

​	*AddRequestHeader*、*AddRequestParameter*、*AddResponseHeader*

​	*CircuitBreaker*

​	*FallbackHeaders*

​	*JSONToGRPCFilter*

​	*MapRequestHeader*

​	*ModifyRequestBody*

​	*ModifyResponseBody*

​	*PreserveHostHeader*

​	*RedirectTo*

​	*RemoveRequestHeader*、*RemoveRequestParameter*、*RemoveResponseHeader*

​	*RequestHeaderSize*

​	*RequestRateLimiter*	-> 和Redis结合 限流

​	*RewriteLocationResponseHeader*

​	*RewritePath*

​	*RewriteRequestParameter*、*RewriteResponseHeader*

​	*SaveSession*

​	*SecureHeaders*

​	*SetPath*

​	*SetRequestHeader*

​	*SetResponseHeader*

​	*SetStatus*

​	*Retry*

​	*RequestSize*

​	*SetRequestHostHeader*

​	*TokenRelay*

### CacheRequestBody

在某些情况下，需要读取请求正文。由于请求只能读取一次，因此我们需要缓存请求正文。

您可以使用 `CacheRequestBody` 过滤器缓存请求正文，然后再将其发送到下游并从属性获取 `exchange` 正文。



### PrefixPath

```yml
spring:
  cloud:
    gateway:
      routes:
      - id: prefixpath_route
        uri: https://example.org
        filters:
        - PrefixPath=/mypath
```

这会前缀到 `/mypath` 所有匹配请求的路径。因此，将请求 `/hello` 发送到 `/mypath/hello` 。



### RemoveJsonAttributesResponseBody

提供了一种通过删除 JSON 正文内容中的属性来对 JSON 正文内容应用转换的便捷方法。

```yml
spring:
  cloud:
    gateway:
      routes:
      - id: removejsonattributes_route
        uri: https://example.org
        filters:
        - RemoveJsonAttributesResponseBody=id,color
```

这会从根级别的 JSON 内容正文中删除属性“id”和“color”。

```yml
pring:
  cloud:
    gateway:
      routes:
      - id: removejsonattributes_recursively_route
        uri: https://example.org
        predicates:
        - Path=/red/{segment}
        filters:
        - RemoveJsonAttributesResponseBody=id,color,true
```

这会从任何级别的 JSON 内容正文中删除属性“id”和“color”。

### StripPrefix

工厂采用 `StripPrefix` `GatewayFilter` 一个参数 `parts` 。该 `parts` 参数指示在向下游发送请求之前要从请求中剥离的路径中的部分数。

```yml
spring:
  cloud:
    gateway:
      routes:
      - id: nameRoot
        uri: https://nameservice
        predicates:
        - Path=/name/**
        filters:
        - StripPrefix=2
```

当通过网关发出请求时 `/name/blue/red` ，发出的请求 `nameservice` 类似于 `nameservice/red` 。



## Http超时

全局超时：

```yml
spring:
  cloud:
    gateway:
      httpclient:
        connect-timeout: 1000
        response-timeout: 5s
```

每路由超时：

```yml
- id: per_route_timeouts
  uri: https://example.org
  predicates:
    - name: Path
      args:
        pattern: /delay/{timeout}
  metadata:
    response-timeout: 200
    connect-timeout: 200
```



## CORS配置

全局：

```yml
spring:
  cloud:
    gateway:
      globalcors:
        cors-configurations:
          '[/**]':
            allowedOrigins: "https://docs.spring.io"
            allowedMethods:
            - GET
```

路由：

```yml
spring:
  cloud:
    gateway:
      routes:
      - id: cors_route
        uri: https://example.org
        predicates:
        - Path=/service/**
        metadata:
          cors
            allowedOrigins: '*'
            allowedMethods:
              - GET
              - POST
            allowedHeaders: '*'
            maxAge: 30
```



## 自定义

### 自定义路由谓词

```java
@Component
public class MyRoutePredicateFactory extends AbstractRoutePredicateFactory<MyRoutePredicateFactory.Config> {

    public MyRoutePredicateFactory() {
        super(Config.class);
    }

    @Override
    public Predicate<ServerWebExchange> apply(Config config) {
        // grab configuration from Config object
        return exchange -> {
            //grab the request
            ServerHttpRequest request = exchange.getRequest();
            //take information from the request to see if it
            //matches configuration.
            return matches(config, request);
        };
    }

    public static class Config {
        //Put the configuration properties for your filter here
    }

}


```

### 自定义过滤器工厂

```java
@Component
public class PreGatewayFilterFactory extends AbstractGatewayFilterFactory<PreGatewayFilterFactory.Config> {

    public PreGatewayFilterFactory() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        // grab configuration from Config object
        return (exchange, chain) -> {
            //If you want to build a "pre" filter you need to manipulate the
            //request before calling chain.filter
            ServerHttpRequest.Builder builder = exchange.getRequest().mutate();
            //use builder to manipulate the request
            return chain.filter(exchange.mutate().request(builder.build()).build());
        };
    }

    public static class Config {
        //Put the configuration properties for your filter here
    }

}
```

### 自定义全局过滤器

```java
@Bean
public GlobalFilter customGlobalFilter() {
    return (exchange, chain) -> exchange.getPrincipal()
        .map(Principal::getName)
        .defaultIfEmpty("Default User")
        .map(userName -> {
          //adds header to proxied request
          exchange.getRequest().mutate().header("CUSTOM-REQUEST-HEADER", userName).build();
          return exchange;
        })
        .flatMap(chain::filter);
}

@Bean
public GlobalFilter customGlobalPostFilter() {
    return (exchange, chain) -> chain.filter(exchange)
        .then(Mono.just(exchange))
        .map(serverWebExchange -> {
          //adds header to response
          serverWebExchange.getResponse().getHeaders().set("CUSTOM-RESPONSE-HEADER",
              HttpStatus.OK.equals(serverWebExchange.getResponse().getStatusCode()) ? "It worked": "It did not work");
          return serverWebExchange;
        })
        .then();
}
```



