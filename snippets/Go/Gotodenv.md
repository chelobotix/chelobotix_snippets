# Gotodenv

```go
// godotenv
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}

dbName := os.Getenv("DB_NAME")


// .env
DB_NAME=movies_go
```


```go
// LAZY MODE
import _ "github.com/joho/godotenv/autoload"
```

> go get github.com/joho/godotenv/cmd/godotenv
go get github.com/joho/godotenv/autoload
