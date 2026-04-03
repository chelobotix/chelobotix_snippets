# Redis Golang

go mod init github.com/my/repo

```go
// BASIC
rdb := redis.NewClient(&redis.Options{
    Addr:     "localhost:6379",
    Password: "", // sin password
    DB:       0,  // usar DB default
})
```


```go
// EXISTS
ctx := context.Background()
exists, err := b.redisDB.Exists(ctx, "blacklist:"+tokenString).Result()
```

```go
// SET
ctx := context.Background()

// Método 1: SET básico
err := rdb.Set(ctx, "key", "value", 0).Err()
if err != nil {
    panic(err)
}

// Método 2: SET con expiración
err = rdb.Set(ctx, "key-with-expiration", "value", 24*time.Hour).Err()
if err != nil {
    panic(err)
}

// Método 3: SET condicional (solo si no existe)
err = rdb.SetNX(ctx, "conditional-key", "value", 0).Err()
if err != nil {
    panic(err)
}
```
