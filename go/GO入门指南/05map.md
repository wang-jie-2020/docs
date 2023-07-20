# map



map参照HashMap或者Dictionary,动态增长度的引用类型,它是无序的

```go
var map1 map[keytype]valuetype
var map1 map[string]int
var map1 = make(map[keytype]valuetype)
```



> key 可以是任意可以用 `==` 或者 `!=` 操作符比较的类型，比如 `string`、`int`、`float32(64)`。所以数组、切片和结构体不能作为 key (译者注：含有数组切片的结构体不能作为 key，只包含内建类型的 `struct` 是可以作为 key 的），但是指针和接口类型可以。如果要用结构体作为 key 可以提供 `Key()` 和 `Hash()` 方法，这样可以通过结构体的域计算出唯一的数字或者字符串的 key。
>
> 
>
> value 可以是任意类型的；通过使用空接口类型（详见[第 11.9 节](https://github.com/unknwon/the-way-to-go_ZH_CN/blob/master/eBook/11.9.md)），我们可以存储任意值，但是使用这种类型作为值时需要先做一次类型断言



> 令 `v := map1[key1]` 可以将 `key1` 对应的值赋值给 `v`；如果 `map` 中没有 `key1` 存在，那么 `v` 将被赋值为 `map1` 的值类型的空值。

注意以上说明因map操作时不会返回错误,需测试是否存在时用 `val1, isPresent = map1[key1]`

## map 类型的切片

> 假设我们想获取一个 `map` 类型的切片，我们必须使用两次 `make()` 函数，第一次分配切片，第二次分配切片中每个 `map` 元素.

```go
package main
import "fmt"

func main() {
	// Version A:
	items := make([]map[int]int, 5)
	for i:= range items {
		items[i] = make(map[int]int, 1)
		items[i][1] = 2
	}
	fmt.Printf("Version A: Value of items: %v\n", items)

	// Version B: NOT GOOD!
	items2 := make([]map[int]int, 5)
	for _, item := range items2 {
		item = make(map[int]int, 1) // item is only a copy of the slice element.
		item[1] = 2 // This 'item' will be lost on the next iteration.
	}
	fmt.Printf("Version B: Value of items: %v\n", items2)
}
```

*结合示例,实际上的问题难道不是在foreach始终是值的拷贝?*