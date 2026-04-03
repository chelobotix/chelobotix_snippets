# Redirect

```ruby
redirect_to(@article)
redirect_to 'http://www.example.com'
redirect_to root_path
redirect_to action: :show, id: 5
redirect_to controller: :items, action: :index
redirect_to items_path, status: :moved_permanently

#pagina anterior
redirect_to :back

#redirigir a la anterior pagina y sino esta presente al fallback
redirect_back(fallback_location: root_path)

#redirigir mas anchor
redirect_to(items_path, anchor: "post_#{@post.id}")

#VERIFICAR SI ES VALIDA

```
