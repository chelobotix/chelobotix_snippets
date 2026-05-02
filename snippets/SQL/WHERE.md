# WHERE

```sql
-- Basic
SELECT *
FROM books
WHERE author_id IN (
    SELECT id
    FROM authors
    WHERE first_name LIKE '%ll%'
    );
```
