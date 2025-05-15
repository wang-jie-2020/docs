# 对象映射

## Apache Commons BeanUtils

实现原理：

- 反射机制：Apache Commons BeanUtils利用Java的反射API来访问和操作JavaBean的属性。它通过读取类的元信息（如字段、方法等）来动态地获取和设置对象的属性值。

- 属性复制：当使用`copyProperties`方法时，BeanUtils会遍历源对象的所有可读属性（即带有getter方法的属性），并尝试将这些属性的值设置到目标对象的对应属性中。这要求目标对象具有与源对象属性名相匹配的setter方法。

- 类型转换：BeanUtils还提供了类型转换功能，能够自动将一种类型的属性值转换为另一种类型，前提是这种转换是安全的和可接受的。

- ```
   BeanUtils.copyProperties(personDTO, person);
  ```

## Spring BeanUtils

实现原理：

- 反射机制：同样基于Java反射API来实现属性复制。

- 属性匹配：通过比较源对象和目标对象的属性名（以及可能的属性类型），Spring BeanUtils将源对象的属性值复制到目标对象中。

- Spring集成：由于它是Spring框架的一部分，因此可以无缝地与Spring的其他功能（如依赖注入）集成。

- ```
          BeanUtils.copyProperties(person, personDTO);
  ```

## ModelMapper

实现原理：

- 约定优于配置：ModelMapper采用“约定优于配置”的原则，即它试图通过智能匹配源对象和目标对象的属性名来自动建立映射关系。
- 自定义映射：如果自动匹配不满足需求，开发者可以通过注解或编程方式定义自定义的映射规则。
- 类型转换：ModelMapper支持多种类型转换，并允许开发者注册自定义的类型转换器。
- 性能优化：ModelMapper在内部使用缓存和其他优化技术来提高映射性能。

```
        // 使用 ModelMapper 映射对象
        PersonDTO personDTO = modelMapper.map(person, PersonDTO.class);
```

MapStruct

定义：
MapStruct是一个基于约定优于配置原则的Java注解处理器，用于生成类型安全的bean映射类。

实现原理：

- 注解处理器：MapStruct是一个Java注解处理器，它在编译时生成类型安全的映射代码。
- 注解定义：开发者在接口上使用MapStruct提供的注解（如`@Mapper`、`@Mapping`等）来定义映射规则。
- 编译时生成：在编译过程中，MapStruct注解处理器会扫描这些注解，并生成相应的映射实现类。这些实现类包含了将源对象映射到目标对象的具体逻辑。
- 性能优势：由于映射代码是在编译时生成的，因此MapStruct在运行时不依赖于反射，从而提高了映射性能。
- 类型安全：由于是编译时处理，MapStruct能够确保映射过程中的类型安全。