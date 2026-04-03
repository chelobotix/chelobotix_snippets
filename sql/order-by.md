# ORDER BY

```sql
-- Ordena primero por author_id y luego por año de publicacion
SELECT title, year_published, author_id
FROM books
ORDER BY author_id, year_published


-- Ordena en base a los resultados de la funcion
SELECT title, length(title)
FROM books
ORDER BY length(title)

-- Ordena aleatoriamente
SELECT first_name
FROM authors
ORDER BY random()
LIMIT 1
```
