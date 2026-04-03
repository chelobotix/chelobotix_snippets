# Routes

```go
// QUERY STRING PARAMS CHI
chi.URLParam(r, "id")
```


```go
// RUTAS VARIABLES
mux.Get("/reservations/{src}/{id}", handlers.Repo.AdminShowReservation)
```

```go
// Query String
r.URL.Query().Get("y")
```
