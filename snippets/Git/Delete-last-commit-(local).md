# Delete last commit (local)

```shell
# Segun el numero de commits que quieras eliminar HEAD~2 para eliminar 2 commits desde el ultimo
git reset --soft HEAD~1


# Si ya esta en remoto
git push origin TU_BRANCH --force


# Si por alguna razon te equivocas asi vuelves:
git reflog # te mostrara una lista y elijes a cual quieres volver
# eliges el head que quieres volver
git reset --hard HEAD@{3}

```
