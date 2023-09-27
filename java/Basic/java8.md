## lambda

[lambda](./lambda.md)

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

