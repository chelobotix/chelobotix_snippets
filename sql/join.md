# JOIN

## Fragment 1: Fragment

```sql
-- Basic
SELECT books.*, authors.*
FROM books
JOIN public.authors  ON authors.id = books.author_id


-----------------
SELECT  title, count(*) AS total
FROM books b
JOIN book_orders bo ON b.id  = bo.id 
GROUP BY title
HAVING count(*) > 1



___________________
SELECT DISTINCT books.title, authors.first_name, r.raiting
FROM books
JOIN public.authors  ON authors.id = books.author_id
Join public.reviews r ON books.id = r.book_id
WHERE r.raiting = 10





-------------------Where
SELECT *
FROM users u 
JOIN users_roles ur ON u.id = ur.user_id	
WHERE account_id = 6

```

## Fragment 2: Fragment 2


