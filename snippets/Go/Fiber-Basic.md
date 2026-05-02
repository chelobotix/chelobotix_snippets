# Fiber Basic

```go
// BASIC
func main() {
	//create instance of fiber
	app := fiber.New()

	//listen on port
	err := app.Listen(":3000")
	if err != nil {
		return 
	}
}
```


```go
// ROUTE PARSER c *fiber.Ctx
err := c.BodyParser(&celebrity)

```


```go
// PANIC RECOVER
 app := fiber.New()
  
 app.Use(recover.New())

 panic("This panic is caught by fiber")

```

```go
// ERROR

// Si quieres poner un codigo de http response
fiber.NewError(fiber.StatusBadRequest, "On vacation!")

```

```go
// LOGS
log.Info("Hello, World!")
log.Debug("Are you OK?")
log.Info("42 is the answer to life, the universe, and everything")
log.Warn("We are under attack!")
log.Error("Houston, we have a problem.")
log.Panic("The system is down.")
log.Fatal("So Long, and Thanks for All the Fislog.") // Esto tumba el server

// Puedes interpolar
bebu := "Bebi"
log.Debugf("Hello %s", bebu)

```


```go
// FIBER MAP (Para respuestas JSON)
fiber.Map{
    "name": "John",
    "age":  30,
}

```

```go
// ENDPOINT
app.Get("/", func(c *fiber.Ctx) error {
    data := fiber.Map{
        "error":   "Bad Request",
        "message": "Invalid input",
    }
    err := c.Status(fiber.StatusBadRequest).JSON(data)
	  if err != nil {
		  return err
	  } // Código 400 y datos JSON
	  
	  return nil
})
```

> go get github.com/gofiber/fiber/v2



```go
// ACORDATE COMO ESTABAS EN NOVIEMBRE 2024 Y COMO ESTAS AHORA. EL CAMINO ES OSCURO PERO SALDREMOS SOLOS A LA LUZ
// MAIN cmd/main
func main() {
	var appConfig config.AppConfig
	appConfig.Production = false

	//create instance of fiber
	app := fiber.New()

	// connect to DB
	db, err := database.NewConnection()
	if err != nil {
		fmt.Println(err)
	}

	// routes
	routes.SetupRoutes(app, db)

	// migrate DB
	err = migrations.Migrate(db)
	if err != nil {
		fmt.Println(err)
	}

	//listen on port
	err = app.Listen(":3000")
	if err != nil {
		fmt.Println(err)
	}
}
```

```go
// DB db/postgresConnection.go
func NewConnection() (*gorm.DB, error) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}

	dbName := os.Getenv("DB_NAME")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")

	// Connect to DB
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=UTC", dbHost, dbUser, dbPassword, dbName)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	log.Println("Connected to DB...")

	return db, nil
}

```

```go
// MODEL internal/models/celebrity.go
func NewConnection() (*gorm.DB, error) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}

	dbName := os.Getenv("DB_NAME")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")

	// Connect to DB
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=UTC", dbHost, dbUser, dbPassword, dbName)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	log.Println("Connected to DB...")

	return db, nil
}

```


```go
// REPOSITORY repositories/celebrity_repo.go

// Este es el agrupador de todas las funciones CRUD
type CelebrityRepository interface {
	Create(celebrity models.Celebrity) error
}

// Este es el repo que se usara para coenctarse a la BD e implementa la iterface CelebrityRepository
type celebrityRepository struct {
	DB *gorm.DB
	// es como si aca estviera escondido el metodo Create
}

func NewCelebrityRepository(db *gorm.DB) CelebrityRepository {
  // Como celebrityRepository tiene tiene el metodo Create de la interface CelebrityRepository entonces es valido y se retorna 
	return &celebrityRepository{
		DB: db,
	}
}

func (r *celebrityRepository) Create(celebrity models.Celebrity) error {
	err := r.DB.Create(&celebrity).Error
	if err != nil {
		return err
	}

	return nil
}
```


```go
// HANDLERS internal/handlers/celebrity_handler.go
type CelebrityHandler struct {
	CelebrityRepo repositories.CelebrityRepository
}

func (h *CelebrityHandler) Create(c *fiber.Ctx) error {
	celebrity := models.Celebrity{}

	err := c.BodyParser(&celebrity) //deserialize json to model
	if err != nil {
		c.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"})
		return err
	}

	err = h.CelebrityRepo.Create(celebrity)
	if err != nil {
		c.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create celebrity"})
		return err
	}

	c.Status(http.StatusCreated).JSON(
		&fiber.Map{"message": "celebrity added"})

	return nil
}

```


```go
// ROUTES routes/routes.go
func SetupRoutes(app *fiber.App, db *gorm.DB) {
	celebrityRepo := repositories.NewCelebrityRepository(db)
	celebrityHandler := handlers.CelebrityHandler{CelebrityRepo: celebrityRepo}

	api := app.Group("/api/v1")
	api.Post("/celebrities", celebrityHandler.Create)

}
```
