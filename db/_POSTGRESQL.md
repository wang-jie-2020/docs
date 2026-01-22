## 1. **查看单个表的大小**

```sql
-- 查看表大小（包括索引）
SELECT pg_size_pretty(pg_total_relation_size('schema_name.table_name')) AS total_size;

-- 查看表数据大小（不包括索引）
SELECT pg_size_pretty(pg_table_size('schema_name.table_name')) AS table_size;

-- 查看索引大小
SELECT pg_size_pretty(pg_indexes_size('schema_name.table_name')) AS index_size;
```



## 2. **查看所有表的大小（按大小排序）**

```sql
SELECT 
    schemaname AS schema_name,
    tablename AS table_name,
    pg_size_pretty(pg_total_relation_size(schemaname || '.' || tablename)) AS total_size,
    pg_size_pretty(pg_table_size(schemaname || '.' || tablename)) AS table_size,
    pg_size_pretty(pg_indexes_size(schemaname || '.' || tablename)) AS index_size,
    pg_size_pretty(pg_total_relation_size(schemaname || '.' || tablename) - pg_table_size(schemaname || '.' || tablename)) AS external_size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname || '.' || tablename) DESC;
```



## 3. **更详细的表空间信息**

```sql
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname || '.' || tablename)) AS "总大小",
    pg_size_pretty(pg_table_size(schemaname || '.' || tablename)) AS "表大小",
    pg_size_pretty(pg_indexes_size(schemaname || '.' || tablename)) AS "索引大小",
    pg_size_pretty(pg_total_relation_size(schemaname || '.' || tablename) - pg_table_size(schemaname || '.' || tablename)) AS "外部大小",
    (SELECT reltuples FROM pg_class WHERE oid = (schemaname || '.' || tablename)::regclass) AS "行数"
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname || '.' || tablename) DESC;
```



## 4. **查看特定模式下的表大小**

```sql
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size('public.' || tablename)) AS total_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size('public.' || tablename) DESC;
```



## 5. **使用 pg_stat_user_tables 视图**

sql

```sql
SELECT 
    schemaname,
    relname,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
    n_live_tup AS rows,
    n_dead_tup AS dead_rows
FROM pg_stat_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
```



## 6. **查看表和索引的详细存储信息**

sql

```sql
SELECT
    relname AS "表名",
    CASE 
        WHEN relkind = 'r' THEN '普通表'
        WHEN relkind = 'i' THEN '索引'
        WHEN relkind = 't' THEN 'TOAST表'
        WHEN relkind = 'm' THEN '物化视图'
    END AS "类型",
    pg_size_pretty(pg_relation_size(oid)) AS "大小",
    pg_size_pretty(pg_total_relation_size(oid)) AS "总大小（含索引）",
    reltuples::bigint AS "估算行数"
FROM pg_class
WHERE relkind IN ('r', 'i', 't', 'm')
    AND relnamespace NOT IN (
        SELECT oid FROM pg_namespace 
        WHERE nspname IN ('pg_catalog', 'information_schema', 'pg_toast')
    )
ORDER BY pg_total_relation_size(oid) DESC;
```



## 7. **查看数据库总大小**

sql

```sql
-- 查看当前数据库大小
SELECT pg_size_pretty(pg_database_size(current_database()));

-- 查看所有数据库大小
SELECT 
    datname AS database_name,
    pg_size_pretty(pg_database_size(datname)) AS size
FROM pg_database
ORDER BY pg_database_size(datname) DESC;
```



## 8. **创建常用函数**

```sql
-- 创建查看表大小的函数
CREATE OR REPLACE FUNCTION get_table_sizes(schema_name text DEFAULT 'public')
RETURNS TABLE (
    table_name text,
    total_size text,
    table_data_size text,
    index_size text,
    row_count bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.table_name::text,
        pg_size_pretty(pg_total_relation_size(schema_name || '.' || t.table_name))::text,
        pg_size_pretty(pg_table_size(schema_name || '.' || t.table_name))::text,
        pg_size_pretty(pg_indexes_size(schema_name || '.' || t.table_name))::text,
        (SELECT reltuples::bigint 
         FROM pg_class 
         WHERE relname = t.table_name 
           AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = schema_name)
        ) AS row_count
    FROM information_schema.tables t
    WHERE t.table_schema = schema_name
      AND t.table_type = 'BASE TABLE'
    ORDER BY pg_total_relation_size(schema_name || '.' || t.table_name) DESC;
END;
$$ LANGUAGE plpgsql;

-- 使用函数
SELECT * FROM get_table_sizes('public');
```



## 常用函数说明：

- **`pg_total_relation_size(relation)`** - 表的总大小（包括索引、TOAST数据）
- **`pg_table_size(relation)`** - 表数据大小（不包括索引，包括TOAST数据）
- **`pg_relation_size(relation)`** - 表的主数据文件大小
- **`pg_indexes_size(relation)`** - 表的所有索引大小
- **`pg_size_pretty(bytes)`** - 将字节数转换为易读格式（KB、MB、GB）



## 缩减空间







