# Validations GO VALIDATOR

https://github.com/go-playground/validator?tab=readme-ov-file

```go
// Validations
FirstName      string           `validate:"required"`
Age            uint8            `validate:"gte=0,lte=130"`
Email          string           `validate:"required,email"`
Gender         string           `validate:"oneof=male female prefer_not_to"`
UserId         uint             `validate:"nonzero"` // puedes usar en cadenas y numeros es para evitar el default
Age            uint             `validate:"min=18"`
Interest       decimalDecimal   `validate:"dgte=0"`  // esto es con la libreria validator decimal
```

```go
// Donde quieras Validar
var validate = validator.New()

if err := validate.Struct(figure); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
```

```go
// CUSTOM VALIDATION
// El struct
type interestCalculationInput struct {
	EndDate string `json:"end_date" validate:"required,date_format=2006-01-02"`
}

// Añadir la validacion a validator
_ = validate.RegisterValidation("date_format", validateDateFormat)


// Crear la funcion
func validateDateFormat(fl validator.FieldLevel) bool {
	date := fl.Field().String()
	layout := fl.Param() // Obtiene el formato de la etiqueta, en este caso: "2006-01-02"
	_, err := time.Parse(layout, date)
	return err == nil
}


```
