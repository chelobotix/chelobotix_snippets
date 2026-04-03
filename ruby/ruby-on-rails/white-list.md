# White list

```ruby
# un articulo puede tener varias categorias que iran dentro del array [3,7], category_ids: []
def article_params
    params.require(:article).permit(:title, :description, category_ids: [])
end
```
