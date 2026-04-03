# ECHO FRAMEWORK

## Fragment 1: Fragment

```go
// RETURNS
// JSON
c.Response().Header().Set("Authorization", "Bearer "+jwtToken)
return c.JSON(http.StatusOK, map[string]any{
		"state": "token generated",
		})

```

```go
// REQUEST

//Headers
userAgent := c.Request().Header.Get("User-Agent")
```


```go
//PARAMS

// URL QUEARY PARAMS ?poro=lolo
c.QueryParams()
// Param
id := c.Param("id") // /banks/:id
err := c.Bind(&newBank) // JSON
```

```go
// READ BODY
body, err := io.ReadAll(c.Request().Body)

// Restaurar para leer de nuevo
c.Request().Body = io.NopCloser(bytes.NewBuffer(body))
err = c.Bind(&bank)
```


```go
// RENDER ERROR
return echo.NewHTTPError(http.StatusBadRequest, "Invalid JSON").SetInternal(err)
```


```go
// ROUTES

g := e.Group("/api/v1")
g.GET("/banks", bankHandler.List)
g.GET("/banks/:id", bankHandler.GetByID)


// Middleware
protected := e.Group("")


// Nested Groups
protected = e.Group("")
g := protected.Group("/auth")
g.GET("/check-token", authHandler.CheckToken) // => /auth/check-token 

```

```go
// MIDDLEWARE
func (b *blacklist) Validate(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		userToken, ok := c.Get("user").(*jwt.Token)
		if !ok || !userToken.Valid {
			return echo.NewHTTPError(401, "token inválido")
		}
		
		return next(c)
	}
}

```

## Fragment 2: JWT

```go
package main

import (
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"net/http"

	"time"
)

type User struct {
	Name string
	Age  int
}

type Claims struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
	jwt.RegisteredClaims
}

var secretKey = []byte("secret")

func generateToken(user *User) (string, error) {
	claims := Claims{
		Name: user.Name,
		Age:  user.Age,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "your-app",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", nil
	}

	return tokenString, nil
}

func main() {
	e := echo.New()

	user := User{
		Name: "Natish",
		Age:  6,
	}

	token, err := generateToken(&user)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(token)
	
	// Grupo de rutas sin proteccion
	unprotected := e.Group("")
	unprotected.GET("/sss", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "pocollossss")
	})
	
  // Grupo de rutas con proteccion
	protected := e.Group("")
	protected.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey: secretKey,
		ErrorHandler: func(e echo.Context, err error) error {
			return echo.NewHTTPError(http.StatusUnauthorized, "invalid token")
		},
	}))

	protected.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, "pocollo")
	})
	e.Logger.Fatal(e.Start(":1323"))
}

```
