```java
package com.example;

import cn.hutool.core.date.DateTime;
import lombok.experimental.var;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@SpringBootTest
@RunWith(SpringRunner.class)
@Slf4j
public class JavaTimeTest {

    @Test
    public void FormatTime() {
        log.info(new Date().toString());            // Mon Sep 29 13:52:52 CST 2025
        log.info(LocalDateTime.now().toString());   // 2025-09-29T13:52:52.120714900
        log.info(ZonedDateTime.now().toString());   // 2025-09-29T13:52:52.121710100+08:00[Asia/Shanghai]

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        log.info(dateFormat.format(new Date()));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        log.info(LocalDateTime.now().format(formatter));
        log.info(ZonedDateTime.now().format(formatter));
    }

    @Test
    public void DateTrans() {
        var now = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
        log.info(now.toString());

        now = Date.from(ZonedDateTime.now().toInstant());
        log.info(now.toString());
    }

    @Test
    public void LocalDateTimeTrans() {
        var now = new Date().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
        log.info(now.toString());

        now = ZonedDateTime.now().toLocalDateTime();
        log.info(now.toString());
    }
}
```

