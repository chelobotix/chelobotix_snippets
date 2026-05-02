# SQL USEFULL QUERIES

```sql
<!-- FIND DUPLICATES IN N COLUMNS -->
select *
from addresses a
where 
	id not in(
		select min(id)
		from addresses a1
		group by a.address1 , a.address2 
	)

```
