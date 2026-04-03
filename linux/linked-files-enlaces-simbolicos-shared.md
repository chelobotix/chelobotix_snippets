# Linked files - Enlaces Simbolicos shared

```bash
1. En production deploy.rb
append :linked_files, 'config/database.yml', 'config/secrets.yml', 'config/credentials.yml.enc'

# para ver si el archivo es un enlace simbolico
ls -l ruta_completa_al_archivo

# para ver su verdadero contenido
readlink -f ruta_completa_al_archivo
```
