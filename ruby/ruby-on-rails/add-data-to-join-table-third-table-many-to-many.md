# Add data to join table third table many to many

```ruby
# desde la tabla articulos anadiremos 2 categoria a la tabla join ArticleCategory ( se manda como un array los ids de la scategorias.)

Article.create!(title: "testdsad", description: "dsadasdasd", user: User.first, category_ids: [1,3])
```
