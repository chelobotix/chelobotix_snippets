# Usar Multiples SSH

```shell
# Paso 1 — Crear segunda clave SSH
ssh-keygen -t ed25519 -f ~/.ssh/id_github_company -C "email_empresa"
```

```shell
# Paso 2 — Configurar ~/.ssh/config

nano ~/.ssh/config

Host github-company
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_github_company
  IdentitiesOnly yes
```

```shell
# Paso 3 — Agregar la clave al ssh-agent

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_github_company
```

```shell
# Paso 4 — Agregar la clave pública a GitHub

cat ~/.ssh/id_github_company.pub

# Ir a: GitHub → Settings → SSH and GPG Keys → New SSH Key
```

```shell
# Paso 5 — Clonar usando el alias

git clone git@github-company:empresa/repo.git
```


```shell
# Paso 6 para no mezclar cuentas
git config user.name "Tu Nombre Trabajo"
git config user.email "email_empresa"
```
