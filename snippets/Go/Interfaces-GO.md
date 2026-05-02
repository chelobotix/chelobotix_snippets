# Interfaces GO

```go
// BASIC: SE PASA EL PUNTERO
// Es para que una struct pueda compartir el uso de un metodo 
package main

import "fmt"

type Animal interface {
	Says() string
}

type Dog struct {
	name string
	age  int
}

type Gorilla struct {
	name string
	age  int
}

func main() {
	dog := Dog{
		name: "Pompeyo",
	}

	gorilla := Gorilla{
		name: "King Kong",
	}

	printInfo(&dog)
	printInfo(&gorilla)
}

func (d *Dog) Says() string {
	return "wow wow!"
}

func (g *Gorilla) Says() string {
	return "Uuuuu!"
}

// Aca usas la interface para poder pasar cualquiera que la cumpla
func printInfo(a Animal) {
	fmt.Println(a.Says())
}
```
