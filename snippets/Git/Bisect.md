# Bisect

```shell
git bisect start
git bisect bad
git bisect good c8e74b4dcfba60f6d1e33947f2ae2d755 //este es el commit que funciona

comenzar con good o bad dependiendo del resultado ej git bisect good o git bisect bad

Cuando lo encuentres puedes ver lo que se aumento o se quito asi:
git show commit_del_problema
git diff commit_anterior^ commit_del_problema
```
