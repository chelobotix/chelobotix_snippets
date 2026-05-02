# Search - Find in all branchs

```shell
# To search through all branches of a git repo for a string, use:
$ git grep str $(git rev-list --all)
git grep 'def test' $(git rev-list --all)

# To search through all branches ignoring string case:
$ git grep -i str $(git rev-list --all)

# This can also be done with regular expressions:
$ git grep -i RegEx $(git rev-list --all)


# Te saldra una lista con las coincidencias y el commit al que pertence:
02c90459a17a935fbc0fe8e8eb5460c9808e7f1c:app/controllers/settings_controller.rb:        if valid_parameters[:role] == 'warehouse_manager'

# Ahora buscas a que branch pertenece:
git branch --contains 02c90459a17a935fbc0fe8e8eb5460c9808e7f1c


# Gracias Torvalds!
```
