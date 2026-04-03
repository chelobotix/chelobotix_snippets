# DB Schema


```bash
# Si quieres actualizar el esquema sin ejecutar las migraciones (útil si ya has aplicado las migraciones en la base de datos pero el esquema no está actualizado):

rails db:schema:dump
```

```bash
#Si necesitas recrear la base de datos desde cero basándote en el esquema actual:


rails db:schema:load
```

```bash
# Si quieres asegurarte de que tu base de datos está en sincronía con tus migraciones:

# Este comando te mostrará el estado de cada migración (up o down).

rails db:migrate:status

Status   Migration ID    Migration Name
--------------------------------------------------
   up     20220101000001  Create users table
   up     20220101000002  Add email to users
  down    20220101000003  Add index to users email
```

```bash
# Si necesitas revertir todas las migraciones y luego aplicarlas de nuevo:

rails db:migrate:reset
```

```bash
# Para generar un schema sql (recomendado)
# config/application.rb
config.active_record.schema_format = :sql

# terminal:
rails db:schema:dump
```


