```java
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
public void DateTransfer() {
    var now = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
    log.info(now.toString());

    now = Date.from(ZonedDateTime.now().toInstant());
    log.info(now.toString());
}

@Test
public void LocalDateTimeTransfer() {
    var now = new Date().toInstant()
        .atZone(ZoneId.systemDefault())
        .toLocalDateTime();
    log.info(now.toString());

    now = ZonedDateTime.now().toLocalDateTime();
    log.info(now.toString());
}
```

