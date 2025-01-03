```sql
WITH SRC AS (
	SELECT  * FROM SPM_WORKFLOW sw WHERE 
	1 = 1
--	AND CREATETIME > TO_DATE('2024-05-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss') 
--	AND CREATETIME < TO_DATE('2024-11-01 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
	ORDER BY APPLYID ,CREATETIME 
),
VM AS (
	SELECT 
	APPLYID,
	CREATETIME,
	REMARK,
	APPLYFLOWSTATUS,
    LEAD(SRC.CREATETIME, 1, null) OVER(PARTITION BY SRC.APPLYID ORDER BY SRC.CREATETIME) AS NEXT_CREATETIME,
    LEAD(SRC.CREATETIME, 1, SYSDATE) OVER(PARTITION BY SRC.APPLYID ORDER BY SRC.CREATETIME) AS NEXTORNOW,
	LEAD(SRC.APPLYFLOWSTATUS, 1, NULL) OVER(PARTITION BY SRC.APPLYID ORDER BY SRC.CREATETIME) AS NEXT_APPLYFLOWSTATUS
	FROM SRC
),
FILTER AS (
	SELECT 
		VM.*,
		(VM.NEXTORNOW - VM.CREATETIME) AS ElapsedTime
	FROM VM
	WHERE VM.APPLYFLOWSTATUS = 5 AND (VM.NEXT_APPLYFLOWSTATUS = 6 OR VM.NEXT_APPLYFLOWSTATUS = 9 OR VM.NEXT_APPLYFLOWSTATUS IS NULL )
)

-- SELECT * FROM FILTER

SELECT 
	APPLYID,
	MIN(CREATETIME) AS StartTime,
	(SELECT MAX(NEXT_CREATETIME) FROM FILTER c WHERE c.APPLYID = FILTER.APPLYID AND c.NEXT_APPLYFLOWSTATUS = 9) AS EndTime,
	SUM(ElapsedTime) AS SumedElapsedTime
FROM FILTER 
WHERE APPLYID IN ( '0005E725E3C446578BC89CBDF239A801','001B08834EA3462FA47FCCC32F22F26D')
GROUP BY APPLYID

SELECT 
    APPLYID,
    MIN(CREATETIME) AS StartTime,
    -- 使用条件聚合来获取EndTime
    MAX(CASE WHEN NEXT_APPLYFLOWSTATUS = 9 THEN NEXT_CREATETIME ELSE NULL END) AS EndTime,
    -- 使用条件聚合来设置istrue
    MAX(CASE WHEN NEXT_APPLYFLOWSTATUS = 9 THEN 1 ELSE 0 END) AS istrue,
    SUM(ElapsedTime) AS SummedElapsedTime
FROM FILTER
WHERE APPLYID IN ( '0005E725E3C446578BC89CBDF239A801','001B08834EA3462FA47FCCC32F22F26D')
GROUP BY APPLYID;
```

