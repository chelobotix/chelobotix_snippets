# Soda Pop Migrations

https://gobuffalo.io/documentation/database/pop/

```shell
# DATABASE.YML
development:
  dialect: postgres
  database: booking
  user: x5
  password:
  host: 127.0.0.1
  pool: 5

test:
  url: {{envOr "TEST_DATABASE_URL" "postgres://postgres:postgres@127.0.0.1:5432/myapp_test"}}

production:
  url: {{envOr "DATABASE_URL" "postgres://postgres:postgres@127.0.0.1:5432/myapp_production"}}

```

```shell
# CREATE MIGRATION (Singular)
soda generate fizz CreateUserTable
```

```shell
# RUN MIGRATION
# soda migrate
```

```shell
# DOWN
# soda migrate down => puedes poner asi para borrar la ultima tabla que creaste sql("DROP TABLE users") o drop_table("rooms")
```

```shell
# MIGRATION EXAMPLE
create_table("users") {
  t.Column("id", "integer", {primary:true}
  t.Column("first_name", "string", {default: ""})
  t.Column("last_name", "string", {default: ""})
  t.Column("email", "string", {})
  t.Column("password", "string", {"size": 60})
  t.Column("access_level", "integer", {"default": 1})
}

```



```shell
# FOREIGN_KEY set room_id to reservation table
add_foreign_key("reservations", "room_id", {"rooms": ["id"]}, {
    "on_delete": "cascade",
    "on_update": "cascade",
})

#DOWN
drop_foreign_key("reservations", "reservations_rooms_id_fk")
```


```shell
#INDEX INDICES
add_index("users", "email", {"unique": true})

# down
drop_index("users", "users_email_idx)
```
