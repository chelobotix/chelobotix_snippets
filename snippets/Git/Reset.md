# Reset

```ruby
# Esto lo que hara sera destruir el commit errado y volvera el head al anterior (abc1234 es dodne queires que este el HEAD)
git reset --hard abc1234 #eliminara todos hasta llegar a abc1234
git reset --hard HEAD~1 # elimina el ultimo
git push --force-with-lease origin nombre-de-tu-rama #obligar al repo remoto a actualizar
```
