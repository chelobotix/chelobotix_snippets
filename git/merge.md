# Merge

```bash
# Comprobar que hay un merge sin concluir
git status # => Unmerged paths:


# La forma estándar de cancelar un merge en progreso
git merge --abort

# En versiones anteriores de Git (antes de 1.7.4)
git reset --merge

# Alternativa que funciona en todas las versiones
git reset --hard HEAD
```
