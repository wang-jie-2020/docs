## PageHelper

```java
public class PageUtils {
    public static void startPage() {

        Integer pageNum = Integer.parseInt(getParameter("pageNum"));
        Integer pageSize = Integer.parseInt(getParameter("pageSize"));
        String orderBy = getParameter("orderByColumn");
        String asc = getParameter("isAsc");

        if(orderBy == null || "".equals(orderBy)) {
            orderBy = "";
        }

        PageHelper.startPage(pageNum, pageSize, orderBy.toLowerCase() + " " + asc).setReasonable(true);
    }

    public static String getParameter(String name)
    {
        return getRequest().getParameter(name);
    }

    public static HttpServletRequest getRequest()
    {
        return getRequestAttributes().getRequest();
    }

    public static ServletRequestAttributes getRequestAttributes()
    {
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        return (ServletRequestAttributes) attributes;
    }
}
```

Reasonable参数表示是否修正传入的页码和实际页码



**注意**

1. 每个查询都需要单独调用一次 `startPage()`，PageHelper 只对 **第一个查询生效**
2. 如果查询接口中有DTO转换，Count 字段要重新赋值








