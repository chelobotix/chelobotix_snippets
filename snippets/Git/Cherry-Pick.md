# Cherry Pick

```bash
# 1. Asegúrate de estar en la rama donde quieres aplicar los cambios
git checkout rama-destino

# 2. Identifica el hash del commit que deseas cherry-pick
git log rama-origen

# 3. Aplica el commit específico a tu rama actual
git cherry-pick <hash-del-commit>

# Si necesitas traer varios commits consecutivos, puedes especificar un rango
git cherry-pick <hash-inicial-mas-nuevo>...<hash-final-mas-antiguo>

# Si quieres traer un solo commit sin crear un nuevo commit (solo cambios)
git cherry-pick -n <hash-del-commit>
```



```shell
opciones:
git cherry-pick --continue
git cherry-pick --abort


```
