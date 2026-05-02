# Multiple selection

```ruby
<%=
        f.collection_select(
          :category_ids,
          Category.all,
          :id,
          :name,
          { prompt: 'Select a category' },
          { multiple: true },
        )
      %>
```
