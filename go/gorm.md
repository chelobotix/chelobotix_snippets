# Gorm

go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres

```go
// CONNECT POSTGRESS DB
var DB *gorm.DB

func main() {
	// godotenv
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
		panic(err)
	}

	DB = db
	fmt.Println("DB connected")

	//crate instance of fiber
	app := fiber.New()
	}
```


```go
// AUTO MIGRATE
func AutoMigrate(db *gorm.DB) error {
	err := db.AutoMigrate(
		&models.Bank{},
	)
	if err != nil {
		return err
	}

	return nil
}

```

```go
// FIXTURE
func LoadFixtures(db *gorm.DB) error {
	var count int64
	db.Model(&models.EconomyIndexer{}).Count(&count)
	if count > 0 {
		log.Println("Skipping fixture loading: economy_indexers already exists.")
		return nil
	}

	economyIndexers := []models.EconomyIndexer{
		{Name: "CDI", Value: decimal.Zero},
		{Name: "SELIC", Value: decimal.Zero},
		{Name: "IPCA", Value: decimal.Zero},
		{Name: "IGP-M", Value: decimal.Zero},
	}

	if err := db.Create(&economyIndexers).Error; err != nil {
		return err
	}

	return nil
}
```

```go
// QUERY

// FIND (si no encuentra no devuelve nada o sea nil)
err := db.Find(&user, 1).Error
err := db.Find(&users, "age > ?", 20)

// FIRST (Luego de que se hace verificas si se encontro)
result := r.DB.First(&user, "email = ?", email)
    
if result.Error != nil {
    if errors.Is(result.Error, gorm.ErrRecordNotFound) {
        return user, fmt.Errorf("usuario no encontrado con email %s", email)
    }
    return user, result.Error
}


// CREATE
err = r.DB.Create(&user).Error // models.User{}

// WHERE
result := r.DB.Where("email = ?", email).First(&user)
if result != nil {
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	return nil, r.ErrorHandler.SetError(errors.New("error finding user"), "errDB")
}

// Preload
`gorm:"preload:true" // debes indicar en el modelo que la relacion se puede eager laoding
err := r.DB.Preload("YearOfBirth").Preload("OtraTabla").Find(&figure)
err := r.DB.Preload(clause.Associations).Find(&figure) // Esto cargará todas las asociaciones
```

```go
// MODEL
`gorm:"not null"`
`gorm:"unique"`
`gorm:"preload:true"`
`gorm:"default:true"`
decimal.Decimal `gorm:"type:decimal(10,2);not null"` // Se guardara en la BD como decimal 10 enteros, 2 decimales
`gorm:"constraint:OnDelete:CASCADE;"` // Configura eliminación en cascada
ResultData       json.RawMessage `json:"result_data" gorm:"type:json;not null"`  // JSON tambien puede ser jsonb

`json:"country,omitempty"` // El campo no se incluirá en la salida JSON n si es ull
`json:"-"` // El campo nunca se incluirá en la salida JSON


type Celebrity struct {
	gorm.Model //esto incluye los modelos bases de gorm
	Id        uint64 `gorm:"primary_key;autoIncrement" json:"id"`
	FirstName string `gorm:"unique" json:"first_name"`
	LastName  string `json:"last_name"`
	YearOfBirth   YearOfBirth `gorm:"foreignKey:YearOfBirthID"`
	YearOfBirthID uint `json:"-"` // este se va a omitir de la serializacion
	
```

```go
// MANY TO MANY
// Author representa un autor
type Author struct {
    gorm.Model
    Name  string  `gorm:"not null" json:"name"`
    Books []Book  `gorm:"many2many:author_books;" json:"books"`
}

// Book representa un libro
type Book struct {
    gorm.Model
    Title   string   `gorm:"not null" json:"title"`
    Authors []Author `gorm:"many2many:author_books;" json:"authors"`
}

// AuthorBooks representa la tabla intermedia para la relación muchos a muchos
type AuthorBooks struct {
    AuthorID uint `gorm:"primaryKey"`
    BookID   uint `gorm:"primaryKey"`
}

```

```go
// NULL FOREIGN KEY
// Solo le añades *a la clave foranea. 
type Product struct {
	ID         uint    `gorm:"primaryKey"`
	Name       string  `gorm:"not null"`
	Category
	CategoryID *uint   `json:"category_id"` // Clave foránea opcional		
```

```go
// TRANSACTION
// Debes pasar tx para que funcione
err := s.DB.Transaction(func(tx *gorm.DB) error {
  yearOfBirth, err := s.YearRepository.GetByYear(ctx, tx, fmi.YearOfBirth)
	if err != nil {
		return nil, err //rollback automatico
	}

	yearOfDeath, err := s.YearRepository.GetByYear(ctx, tx, fmi.YearOfDeath)
	if err != nil {
		return nil, err //rollback automatico
	}
	
	return nil
})
```
