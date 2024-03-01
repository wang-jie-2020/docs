## lambda

[lambda](./lambda.md)

## Thread

[Thread](./threading.md)

## Stream

串行流 ： stream()
并行流 ： parallelStream()

```java
void forEach(Consumer<? super T> action);

<R> Stream<R> map(Function<? super T, ? extends R> mapper);

Stream<T> filter(Predicate<? super T> predicate);

Optional<T> reduce(BinaryOperator<T> accumulator);
List<Integer> numbers = Arrays.asList(-1, -2, 0, -1, 4, 5, 1);
Integer total = numbers.stream().reduce((t, n) -> t + n).get();

 <R, A> R collect(Collector<? super T, A, R> collector);
List<Integer> numbers = Arrays.asList(-1, -2, 0, 4, 5);
List<Integer> abss = numbers.stream().map( n -> Math.abs(n)).collect(Collectors.toList());
```

## Optional

其实类似于Nullable,只不过不提供包装的语法糖

```java
// 1、创建一个包装对象值为空的Optional对象
Optional<String> optStr = Optional.empty();
// 2、创建包装对象值非空的Optional对象
Optional<String> optStr1 = Optional.of("optional");
// 3、创建包装对象值允许为空的Optional对象
Optional<String> optStr2 = Optional.ofNullable(null);
```

## 注解

实现一个自定义注解

```java
@Retention(RetentionPolicy.RUNTIME)	
@Target(ElementType.METHOD)
@Documented
@Inherited
public @interface AopAnnotation {
    boolean flag() default true;
}
```

### 注解与反射

Class ... Type

ClassLoader...



getxxx 与 getDeclaredxxx()	private、public，sub、super。。。 



name.setAccessible(true) 对private字段的操作，关闭访问安全控制

泛型 几乎类似，泛型参数 泛型回执 泛型错误

parameterizedType 比如 Map<string,int>中的string和int



@Deprecated、@override...