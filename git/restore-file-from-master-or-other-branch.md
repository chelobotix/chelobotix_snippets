# Restore file from MASTER or other Branch

```ruby
git show master:app/views/home/index.haml > app/views/home/index.haml
#or
git checkout master -- app/views/home/index.haml
```
