# Rebase- Squash

```shell
1. git rebase -i HEAD~5
2. poner fixup o s a los que quieras unir pero dejar el primero sin alterar (si o si, no es el ultimo es el PRIMERO) 
3. esc y luego :wq
4. Opcional, en la proxima ventana que se abra puedes cambiar el nombre del commit que recibira el rebase de todos los otros.
5. de nuevo esc y :wq
6. git push --force origin TU_BRANCH


# ABORT
git rebase --abort

# AUTOMATICO
git rebase -i --autosquash HEAD~5
```
