# map

`map`声明 `var identimier map[keytype]valuetype`



map是引用类型,未初始化的map的值是nil

​	`var mapLit map[string]int`	`mapLit = map[string]int{"one": 1, "two": 2}`

​	`mapCreated := make(map[string]float32)`



> key 可以是任意可以用 `==` 或者 `!=` 操作符比较的类型，比如 `string`、`int`、`float32(64)`。所以数组、切片和结构体不能作为 key (译者注：含有数组切片的结构体不能作为 key，只包含内建类型的 `struct` 是可以作为 key 的），但是指针和接口类型可以。如果要用结构体作为 key 可以提供 `Key()` 和 `Hash()` 方法，这样可以通过结构体的域计算出唯一的数字或者字符串的 key。
>
> 
>
> value 可以是任意类型的；通过使用空接口类型（详见[第 11.9 节](https://github.com/unknwon/the-way-to-go_ZH_CN/blob/master/eBook/11.9.md)），我们可以存储任意值，但是使用这种类型作为值时需要先做一次类型断言



例8.4 maps_forrange2.go  有疑问



map是无序的