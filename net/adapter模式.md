

# adapter

适配模式,指的是新的接口通过适配器访问原有接口,保持尽可能少的修改变更.

业务场景中很少尝试,原因是大多数情况对api的调用封装只会考虑到一层,例如以api包装或者helper处理,但实际上这两类方式不一定完全符合设计约束,或者说基本不符合程序设计思路

可参考的实例是基于autofac-castle-dynamicProxy的castle-core-asyncInterceptor的abp封装,这里主要梳理逻辑而不是代码示例.

按示例代码逻辑梳理出来的调用过程:

1. adapter 入口

   继承或实现组件接口,实现泛型注入(通常为构造函数继承重写)

2. adapter 调用

   在入口组件中对核心调用过程重构.通过1个或多个适配器组织参数或者方法调用,同时注入自己的逻辑处理和自己的逻辑参数,替换或者追加

3. adapter 参数

   如非必要,简单类型参数还是尽量包装,非简单类型的参数还是通过适配过程更合适

   在适配过程中甚至可以插入新的代码逻辑函数委托



最终过程是以原组件注册-触发->进入重写的入口实现->进入adapter中的新逻辑和方法,同时传递原接口必要信息->调用adapter方法





















