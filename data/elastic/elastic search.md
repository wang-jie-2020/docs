# elastic search

## 概念摘要

1. 总体结构

   -- indices	索引

   ​	|-- types	类型,逐步弃用,默认_document

   ​		|-- document	内容

   ​			|-- fields	字段

   ​	|-- mappings	结构

   ​		|-- 语法略

2. REST风格

| **method**       | **url**                           | **desc**               |
| ---------------- | --------------------------------- | ---------------------- |
| PUT（创建,修改） | /索引名称/类型名称/文档id         | 创建文档（指定文档id） |
| POST（创建）     | /索引名称/类型名称                | 创建文档（随机文档id） |
| POST（修改）     | /索引名称/类型名称/文档id/_update | 修改文档               |
| DELETE（删除）   | /索引名称/类型名称/文档id         | 删除文档               |
| GET（查询）      | /索引名称/类型名称/文档id         | 查询文档通过文档ID     |
| POST（查询）     | /索引名称/类型名称/文档id/_search | 查询所有数据           |

3. 字段类型

   text、keyword

   - text：支持分词，全文检索,支持模糊、精确查询,不支持聚合,排序操作;text类型的最大支持的字符长度无限制,适合大字段存储;

   - keyword：不进行分词，直接索引、支持模糊、支持精确匹配，支持聚合、排序操作。keyword类型的最大支持的长度为——32766个UTF-8类型的字符,可以通过设置ignore_above指定自持字符长度，超过给定长度后的数据将不被索引，无法通过term精确匹配检索返回结果;


