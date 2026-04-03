# Fiber Middleware

```go
// BASIC
func main() {
	app := fiber.New()

	app.Use(middlewares.Middleware1)
	app.Use(middlewares.Middleware2)
}

func Middleware1(c *fiber.Ctx) error {
	log.Info("Middleware 1 fired")

	err := c.Next()

	log.Info("After Middleware 2")

	return err
}

func Middleware2(c *fiber.Ctx) error {
	log.Info("Middleware 2 fired")

	err := c.Next()

	log.Info("After Controller")

	return err
}





//
```


```go
// CORS

app.Use(cors.New(cors.Config{
		Next:             nil,                     //aca puedes poner una condicion para ver si se ejecuta o no
		AllowOrigins:     "https://*.example.com", //acepta todos los subdiminios
		AllowMethods:     "GET, POST, HEAD, PUT, PATCH, DELETE",
		AllowHeaders:     "",
		AllowCredentials: true, // permite cookies o cabeceras de autenticación
		ExposeHeaders:    "",
		MaxAge:           3600, //can avoid Preflight verification for 1 hour
	}))






//
```


```go
// Cookie
//c *fiber.Ctx

c.Cookie(&fiber.Cookie{
		Name:     "cookicita",                    
		Value:    "123456789",                    
		Path:     "/",                            
		Expires:  time.Now().Add(24 * time.Hour), // Expira en 24 horas
		HTTPOnly: true,                           
		Secure:   true,                           
		SameSite: "Strict",   
		Domain = ".test.com"                    
	})
```


