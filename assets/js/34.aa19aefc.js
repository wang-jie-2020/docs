(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{366:function(s,t,a){"use strict";a.r(t);var n=a(4),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"协程-goroutine"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#协程-goroutine"}},[s._v("#")]),s._v(" 协程 (goroutine)")]),s._v(" "),t("p",[t("em",[s._v("概念内容有点难懂,中文翻译的问题?")])]),s._v(" "),t("h2",{attrs:{id:"信道"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#信道"}},[s._v("#")]),s._v(" 信道")]),s._v(" "),t("p",[s._v("*通道（channel）*负责协程之间的通信")]),s._v(" "),t("h3",{attrs:{id:"通信操作符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#通信操作符"}},[s._v("#")]),s._v(" 通信操作符 <-")]),s._v(" "),t("p",[s._v("ch <- int1")]),s._v(" "),t("p",[s._v("int2 = <- ch")]),s._v(" "),t("p",[s._v("<- ch 可以单独调用获取通道的（下一个）值，当前值会被丢弃")]),s._v(" "),t("p",[s._v("通道的发送和接收都是"),t("strong",[s._v("原子")]),s._v("操作")]),s._v(" "),t("h3",{attrs:{id:"通道阻塞"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#通道阻塞"}},[s._v("#")]),s._v(" 通道阻塞")]),s._v(" "),t("blockquote",[t("p",[s._v("1）对于同一个通道，发送操作（协程或者函数中的），在接收者准备好之前是阻塞的：如果 "),t("code",[s._v("ch")]),s._v(" 中的数据无人接收，就无法再给通道传入其他数据：新的输入无法在通道非空的情况下传入。所以发送操作会等待 "),t("code",[s._v("ch")]),s._v(" 再次变为可用状态：就是通道值被接收时（可以传入变量）。")]),s._v(" "),t("p",[s._v("2）对于同一个通道，接收操作是阻塞的（协程或函数中的），直到发送者可用：如果通道中没有数据，接收者就阻塞了。")])]),s._v(" "),t("p",[s._v("两个协程在通道中某刻同步交换数据")]),s._v(" "),t("ul",[t("li",[s._v("在通道两端互相阻塞对方--\x3e死锁")])]),s._v(" "),t("div",{staticClass:"language-go line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-go"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("f1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("in "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("chan")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tfmt"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Println")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v("in"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//deadlock")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("main")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tout "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("chan")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\tout "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n\t"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("go")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("f1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("out"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("div",{staticClass:"language-go line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-go"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("f1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("in "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("chan")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tfmt"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Println")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v("in"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("main")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tout "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("chan")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("go")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("f1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("out"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\tout "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("ul",[t("li",[s._v("信号量模式")])]),s._v(" "),t("div",{staticClass:"language-go line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-go"}},[t("code",[s._v("ch "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("chan")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("go")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// doSomething")]),s._v("\n\tch "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Send a signal; value does not matter")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("doSomethingElseForAWhile")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v(" ch\t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Wait for goroutine to finish; discard sent value.")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("h3",{attrs:{id:"带缓冲的信道"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#带缓冲的信道"}},[s._v("#")]),s._v(" 带缓冲的信道")]),s._v(" "),t("p",[s._v("一个无缓冲的通道只能包含1个元素,带缓冲的通道:")]),s._v(" "),t("div",{staticClass:"language-go line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-go"}},[t("code",[s._v("buf "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),s._v("\nch1 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("chan")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" buf"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("在缓冲满载（缓冲被全部使用）之前，给一个带缓冲的通道发送数据是不会阻塞的，而从通道读取数据也不会阻塞，直到缓冲空了。")]),s._v(" "),t("p",[s._v("ch := make(chan type, value)")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("value == 0 -> synchronous")]),s._v(", unbuffered （阻塞）")])]),s._v(" "),t("ul",[t("li",[t("code",[s._v("value > 0 -> asynchronous")]),s._v(", buffered（非阻塞）取决于 "),t("code",[s._v("value")]),s._v(" 元素")])]),s._v(" "),t("h3",{attrs:{id:"通道的方向"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#通道的方向"}},[s._v("#")]),s._v(" 通道的方向")]),s._v(" "),t("p",[s._v("通道类型可以用注解来表示它只发送或者只接收：")]),s._v(" "),t("div",{staticClass:"language-go line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-go"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" send_only "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("chan")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int")]),s._v(" \t\t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// channel can only receive data")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" recv_only "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("chan")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int")]),s._v("\t\t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// channel can only send data")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h3",{attrs:{id:"关闭通道"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关闭通道"}},[s._v("#")]),s._v(" 关闭通道")]),s._v(" "),t("div",{staticClass:"language-go line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-go"}},[t("code",[s._v("ch "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("chan")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("float64")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("defer")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("close")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ch"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\t\t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//将通道标记为无法通过发送操作 <- 接受更多的值")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("检测通道是否关闭")]),s._v(" "),t("div",{staticClass:"language-go line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-go"}},[t("code",[s._v("v"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" ok "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v("ch  \t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ok is true if v received value")]),s._v("\n\nv"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" ok "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v("ch\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("ok "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("break")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("process")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("v"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("ul",[t("li",[s._v("在 "),t("code",[s._v("for")]),s._v(" 循环的 "),t("code",[s._v("getData()")]),s._v(" 中，在每次接收通道的数据之前都使用 "),t("code",[s._v("if !open")]),s._v(" 来检测：")]),s._v(" "),t("li",[s._v("使用 for-range 语句来读取通道是更好的办法，因为这会自动检测通道是否关闭：")])]),s._v(" "),t("h3",{attrs:{id:"使用-select-切换协程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用-select-切换协程"}},[s._v("#")]),s._v(" 使用 select 切换协程")]),s._v(" "),t("div",{staticClass:"language-go line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-go"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("select")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("case")]),s._v(" u"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v(" ch1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("case")]),s._v(" v"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v(" ch2"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// no value ready to be received")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("p",[t("code",[s._v("default")]),s._v(" 语句是可选的；"),t("code",[s._v("fallthrough")]),s._v(" 行为，和普通的 "),t("code",[s._v("switch")]),s._v(" 相似，是不允许的。在任何一个 "),t("code",[s._v("case")]),s._v(" 中执行 "),t("code",[s._v("break")]),s._v(" 或者 "),t("code",[s._v("return")]),s._v("，select 就结束了。")]),s._v(" "),t("p",[t("code",[s._v("select")]),s._v(" 做的就是：选择处理列出的多个通信情况中的一个。")]),s._v(" "),t("ul",[t("li",[s._v("如果都阻塞了，会等待直到其中一个可以处理")]),s._v(" "),t("li",[s._v("如果多个可以处理，随机选择一个")]),s._v(" "),t("li",[s._v("如果没有通道操作可以处理并且写了 "),t("code",[s._v("default")]),s._v(" 语句，它就会执行："),t("code",[s._v("default")]),s._v(" 永远是可运行的（这就是准备好了，可以执行）。")])]),s._v(" "),t("p",[s._v("在 "),t("code",[s._v("select")]),s._v(" 中使用发送操作并且有 "),t("code",[s._v("default")]),s._v(" 可以确保发送不被阻塞！如果没有 "),t("code",[s._v("default")]),s._v("，"),t("code",[s._v("select")]),s._v(" 就会一直阻塞。")]),s._v(" "),t("p",[t("code",[s._v("select")]),s._v(" 语句实现了一种监听模式，通常用在（无限）循环中；在某种情况下，通过 "),t("code",[s._v("break")]),s._v(" 语句使循环退出。")]),s._v(" "),t("h3",{attrs:{id:"通道、超时和计时器-ticker"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#通道、超时和计时器-ticker"}},[s._v("#")]),s._v(" 通道、超时和计时器（Ticker）")]),s._v(" "),t("p",[t("code",[s._v("time.Ticker")]),s._v(" 结构体")]),s._v(" "),t("div",{staticClass:"language-go line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-go"}},[t("code",[s._v("ticker "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" time"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("NewTicker")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("updateInterval"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("defer")]),s._v(" ticker"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Stop")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("select")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("case")]),s._v(" u"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v("ch1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("case")]),s._v(" v"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v("ch2"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("case")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v("ticker"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("C"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("logState")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("status"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// call some logging function logState")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// no value ready to be received")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br")])]),t("p",[s._v("定时器 ("),t("code",[s._v("Timer")]),s._v(") 结构体看上去和计时器 ("),t("code",[s._v("Ticker")]),s._v(") 结构体的确很像（构造为 "),t("code",[s._v("NewTimer(d Duration)")]),s._v("），但是它只发送一次时间，在 "),t("code",[s._v("Dration d")]),s._v(" 之后。"),t("code",[s._v("time.After(d)")]),s._v(" 函数")]),s._v(" "),t("h3",{attrs:{id:"协程和恢复"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#协程和恢复"}},[s._v("#")]),s._v(" 协程和恢复")]),s._v(" "),t("p",[s._v("最佳实践是通过闭包")]),s._v(" "),t("div",{staticClass:"language-go line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-go"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("defer")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" err "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("recover")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" err "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("nil")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        log"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Printf")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Work failed with %s in %v"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" err"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" work"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("p",[s._v("Q:")]),s._v(" "),t("p",[s._v("线程协程")]),s._v(" "),t("p",[s._v("多个协程是按照顺序执行的吗?")]),s._v(" "),t("p",[s._v("信道的阻塞,发接配套")])])}),[],!1,null,null,null);t.default=e.exports}}]);