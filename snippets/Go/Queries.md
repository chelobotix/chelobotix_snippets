# Queries

```go
// Consulta única fila
QueryRowContext
QueryRow 
row := db.QueryRowContext(ctx, "SELECT name FROM users WHERE id = ?", userID)
var name string
err := row.Scan(&name)
```

```go
// devuelve múltiples filas
rows, err := db.QueryContext(ctx, "SELECT id, name FROM users")

defer rows.Close()

for rows.Next() {
    var id int
    var name string
    err := rows.Scan(&id, &name) // devuelve en el orden en que el query solicita la data
}
```

```go
// No retorna filas
ExecContext
Exec
```


