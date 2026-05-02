# Patterns GO

```go
// **** El patrón Singleton garantiza que una clase tenga una única instancia en toda la aplicación y proporciona un punto global de acceso a esa instancia. ****

// Administrar conexiones a bases de datos.
// Controlar acceso a recursos compartidos (como un archivo de configuración o un logger).
// Mantener el estado global de una aplicación.
```
```go
// SINGLETON
// BASIC
package singleton

type PersonInterface interface {
	IncrementAge()
	GetAge() int
}

type person struct {
	name string
	age  int
}

var p *person

func NewPerson() PersonInterface {
  // IMPORTANT
	if p == nil {
		p = &person{}
	}
	return p
}

func (p *person) IncrementAge() {
	...
}

func (p *person) GetAge() int {
	...
}








//
```





```go
// WITH CONCURRENCY
package singleton

import "sync"

type PersonInterface interface {
	IncrementAge()
	GetAge() int
}

type person struct {
	name string
	age  int
}

var (
	p    *person
	once sync.Once // IMPORTANT
	mux  sync.Mutex // IMPORTANT
)

func NewPerson() PersonInterface {
  // IMPORTANT
	once.Do(func() {
		p = &person{}
	})

	return p
}

func (p *person) IncrementAge() {
	// IMPORTANT
	mux.Lock()
	p.setAge(p.age + 1)
	mux.Unlock()
}
```

```go
// **** Es un patrón de diseño creacional ideal para objetos simples que proporciona una interfaz para crear objetos en una superclase, pero permite que las subclases decidan qué tipo de objeto se instanciará. ****

// Se utiliza para abstraer y centralizar la creación de objetos, evitando exponer directamente la lógica de instanciación y facilitando la extensibilidad del código. Ejemplos típicos incluyen:
// Crear objetos que comparten una misma interfaz o clase base, pero cuyas implementaciones pueden variar.
// Manejar casos donde la lógica de creación es compleja o depende de parámetros específicos.
```


```go
// FACTORY BASIC
package factory

import (
	"errors"
	"fmt"
)

type shape interface {
	Draw() string
}

type circle struct {
}

type square struct {
}

func (c circle) Draw() string {
	return "draw circle"
}

func (s square) Draw() string {
	return "draw square"
}

var shapeRegistry = map[string]func() shape{
	"circle": func() shape { return circle{} }, //esta funcion retorna la interface shape
	"square": func() shape { return square{} },
}

func FactoryShape(shapeType string) (shape, error) {
	switch shapeType {
	case "circle":
		return circle{}, nil
	case "square":
		return square{}, nil
	default:
		return nil, errors.New(fmt.Sprintf("shape %s not found", shapeType))

	}
}






//
```

```go
// FACTORY MAP WITH FUNCTIONS (Esto es cuando ya tienes muchos casos, es mejor usar un map)
package factory

import "errors"

type shape interface {
	Draw() string
}

type circle struct {
}

type square struct {
}

func (c circle) Draw() string {
	return "draw circle"
}

func (s square) Draw() string {
	return "draw square"
}
 // Este es el mapa con las funciones
var shapeRegistry = map[string]func() shape{
	"circle": func() shape { return circle{} }, //esta funcion retorna la interface shape
	"square": func() shape { return square{} },
}

func FactoryShape(shapeType string) (shape, error) {
	newShape, found := shapeRegistry[shapeType]

	if found {
		return newShape(), nil //aca retornas el resultado de la funcion que retorna una interface shape
	}

	return nil, errors.New("shape not found")
}


```

![PastedGraphics](file:///.attachment/47E72F54-502A-4625-B113-69C4CE86A631.png)

```go
// ABAJO HAY UN EJEMPLO FACILITO CON PIZZA

// ****El patrón Builder se utiliza para construir objetos complejos paso a paso. Es ideal cuando un objeto tiene muchas configuraciones posibles o partes opcionales. Permite separar el proceso de construcción (el cómo) de la representación final del objeto (el qué).****



// SE NECESITAN 4 ACTORES:
// - PRODUCT
// - BUILDER
// - CONCRETE BUILDER
// - DIRECTOR

// El Director le da instrucciones al Builder.
// El Builder sigue los pasos para construir partes específicas del Producto. (interface)
// El Concrete Builder implementa los pasos específicos y construye el Producto final. (struct que implementa la interface builder)
// El producto es devuelto al cliente cuando está completo.
```

```go
// MAIN
func main() {
	json := &message.JSONMessageBuilder{}
	xml := &message.XMLMessageBuilder{}
	sender1 := &message.Sender{}
	sender2 := &message.Sender{}

	sender1.SetBuilder(json)
	sender2.SetBuilder(xml)

	response, err := sender1.BuildMessage("Natish", "Te Amo")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(string(response.Body))

	response, err = sender2.BuildMessage("Natish", "Te Amo")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(string(response.Body))

}
```

```go
package message

// PRODUCT
// ES EL PRODUCTO QUE QUEREMOS CREAR Y SU RESULTADO

type Message struct {
	Recipient string `json:"recipient" xml:"recipient"`
	Text      string `json:"text" xml:"text"`
}

type Response struct {
	Body   []byte
	Format string
}
```

```go
package message

// BUILDER
// ES LA INTERFACE QUE TIENEN QUE IMPLEMENTAR LOS CONCRETE BUILDERS

type MsgBuilder interface {
	SetRecipient(recipient string) MsgBuilder
	SetText(recipient string) MsgBuilder
	Build() (*Response, error)
}
```


```go
package message

// CONCRETE BUILDER JSON

import "encoding/json"

type JSONMessageBuilder struct {
	message Message
}

func (b *JSONMessageBuilder) SetRecipient(recipient string) MsgBuilder {
	b.message.Recipient = recipient

	return b
}

func (b *JSONMessageBuilder) SetText(text string) MsgBuilder {
	b.message.Text = text

	return b
}

func (b *JSONMessageBuilder) Build() (*Response, error) {
	data, err := json.Marshal(b.message)
	if err != nil {
		return nil, err
	}

	return &Response{
		Body:   data,
		Format: "JSON",
	}, nil
}

```

```go
package message

// CONCRETE BUILDER XML

import (
	"encoding/xml"
)

type XMLMessageBuilder struct {
	message Message
}

func (b *XMLMessageBuilder) SetRecipient(recipient string) MsgBuilder {
	b.message.Recipient = recipient

	return b
}

func (b *XMLMessageBuilder) SetText(recipient string) MsgBuilder {
	b.message.Recipient = recipient

	return b
}

func (b *XMLMessageBuilder) Build() (*Response, error) {
	data, err := xml.Marshal(b.message)
	if err != nil {
		return nil, err
	}

	return &Response{
		Body:   data,
		Format: "XML",
	}, nil
}

```


```go
package message

// DIRECTOR 
// ES EL QUE SE ENCARGARA DE CREAR LOS PRODUCTOS CON SUS ESPECIFICACIONES

type Sender struct {
	builder MsgBuilder
}

// SetBuilder asigna builder al struct Sender
func (s *Sender) SetBuilder(b MsgBuilder) {
	s.builder = b
}

func (s *Sender) BuildMessage(recipient, text string) (*Response, error) {
	m, err := s.builder.SetRecipient(recipient).SetText(text).Build()
	if err != nil {
		return nil, err
	}

	return m, nil
}







//
```


```go
// PIZZA
package main

import "fmt"

type Pizza struct {
	Size      string
	Crust     string
	Cheese    bool
	Pepperoni bool
	Mushrooms bool
	// other toppings...
}

type PizzaBuilder interface {
	SetSize(size string) PizzaBuilder
	SetCrust(crust string) PizzaBuilder
	AddCheese() PizzaBuilder
	AddPepperoni() PizzaBuilder
	AddMushrooms() PizzaBuilder
	Build() Pizza
}

type ConcretePizzaBuilder struct {
	pizza Pizza
}

func (b *ConcretePizzaBuilder) SetSize(size string) PizzaBuilder {
	b.pizza.Size = size
	return b
}

func (b *ConcretePizzaBuilder) SetCrust(crust string) PizzaBuilder {
	b.pizza.Crust = crust
	return b
}

func (b *ConcretePizzaBuilder) AddCheese() PizzaBuilder {
	b.pizza.Cheese = true
	return b
}

func (b *ConcretePizzaBuilder) AddPepperoni() PizzaBuilder {
	b.pizza.Pepperoni = true
	return b
}

func (b *ConcretePizzaBuilder) AddMushrooms() PizzaBuilder {
	b.pizza.Mushrooms = true
	return b
}

func (b *ConcretePizzaBuilder) Build() Pizza {
	return b.pizza
}

type PizzaDirector struct{}

func (d *PizzaDirector) CreateMargherita(builder PizzaBuilder) Pizza {
	return builder.SetSize("Medium").SetCrust("Thin").AddCheese().Build()
}

// Other predefined pizzas can be added...

func main() {
	builder := &ConcretePizzaBuilder{} // concrete builder
	director := PizzaDirector{} // director

	// Predefined Margherita
	margherita := director.CreateMargherita(builder)
	fmt.Println("Margherita:", margherita)

	// Custom Pizza
	customPizza := builder.SetSize("Large").AddPepperoni().AddMushrooms().Build()
	fmt.Println("Custom Pizza:", customPizza)
}
```





```go
// Patrón creacional que se utiliza para crear nuevos objetos a partir de una copia (o clon) de un objeto existente
package main

import "fmt"

type prototype struct {
	name    string
	age     int
	friends []string
	color   *string
	phones  map[string]string
}


// IMPORTANT
func (p *prototype) Clone() prototype {
	friends := make([]string, len(p.friends), len(p.friends))
	copy(friends, p.friends)

	color := *p.color

	phones := map[string]string{}

	for k, v := range p.phones {
		phones[k] = v
	}

	return prototype{
		name:    p.name,
		age:     p.age,
		friends: friends,
		color:   &color,
		phones:  phones,
	}

}

func main() {
	color := "yellow"
	p1 := prototype{
		name:    "Marce",
		age:     43,
		friends: []string{"Natish", "Allisson", "Roger"},
		color:   &color,
		phones:  map[string]string{"choco": "1234", "payo": "4321"},
	}

	p2 := p1.Clone()
	p2.name = "Natish"
	p2.age = 6
	p2.friends[0] = "Marce"
	p2.phones["choco"] = "567"
	color = "blue"
}

```

```go
// Actúa como intermediario entre un cliente y un objeto real. Se usa para controlar el acceso al objeto original, mejorar su rendimiento o agregar funcionalidades adicionales como control de acceso, logging, cache, lazy initialization.

```

![PastedGraphics](file:///.attachment/8EFE297A-4ABD-4ED5-92D1-FC6201B9CE17.png)

```go
// 1.Definir una interfaz común. Esta interfaz declara los métodos que tanto el objeto real como el proxy deben implementar. Garantiza que el proxy sea intercambiable con el objeto real
type Driven interface {
	Drive() // Este metodo sera implementado por el objeto real y por el proxy
}

// 2. Implementar el objeto real (RealSubject). Crea la clase que contiene la lógica principal. Implementa la interfaz común
type Car struct {
  model string
}

func (c *Car) Drive() string {
	return "Driving " + c.model
}

// 3. Crear el Proxy.Implementa la misma interfaz. Mantiene una referencia al objeto real. Controla el acceso al objeto real. Puede realizar tareas adicionales antes/después

type CarProxy struct {
    car       *Car
    isDriver  bool
}

// 4. Implementar la lógica del Proxy
func NewCarProxy(model string, isDriver bool) *CarProxy {
    return &CarProxy{
        car: &Car{model: model},
        isDriver: isDriver,
    }
}

func (p *CarProxy) Drive() string {
    if !p.isDriver {
        return "Error: No tienes permiso para conducir"
    }
    return p.car.Drive()
}

// 5. Implementar MAIN
func main() {
    carProxy := NewCarProxy("Toyota", false)
    fmt.Println(carProxy.Drive()) // Error: No tienes permiso para conducir

    carProxy = NewCarProxy("Nissan", true)
    fmt.Println(carProxy.Drive()) // Driving Toyota
}

```

```go
// LOCAL - PROXY
package local

import (
	"testo_echo/internal/book"
	"testo_echo/internal/remote"
)

type Local struct {
	Remote *remote.Data // esto es el repositorio que se conecta a la BD
	cache  book.Books
}

func New() Proxy {
	return &Local{
		Remote: remote.New("https://something.com", 8080, "myUser", "password"),
		cache:  make(book.Books, 0),
	}
}

func (l *Local) GetByID(id uint) book.Book {
	for _, item := range l.cache {
		if item.ID == id {
			return item
		}
	}

	foundBook := l.Remote.ByID(id)
	l.cache = append(l.cache, foundBook)
	
	return l.Remote.ByID(id)
}

func (l *Local) GetAll() book.Books {
	return l.Remote.All()
}

```


```go
// OBJECT
package book

type Book struct {
	ID     uint
	Name   string
	Author string
}

type Books []Book
```


```go
// MAIN
package main

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"testo_echo/internal/local"
	"time"
)

var loc local.Proxy

func GetByID(id uint) {
	start := time.Now()
	fmt.Printf("%v\n", loc.GetByID(id))
	elapsed := time.Since(start)
	fmt.Printf("elapsed time: %v\n", elapsed)
}

func GetAll() {
	start := time.Now()
	fmt.Printf("%v\n", loc.GetAll())
	elapsed := time.Since(start)
	fmt.Printf("elapsed time: %v\n", elapsed)
}

func main() {
	e := echo.New()

	loc = local.New()

	GetByID(1)
	GetByID(2)
	GetByID(2)
	GetByID(2)
	GetByID(3)
	GetAll()
}
```

```go
// Permite que objetos incompatibles trabajen juntos. Actúa como un puente. Es como un adaptador de corriente que permite conectar un enchufe americano en un tomacorriente europeo.

```

```go

// 1. Identificar la interfaz incompatible (Bicycle y Car)
// BICYCLE
type Bicycle struct {
	Brand string
	Color string
}

func (b *Bicycle) Run() {
	fmt.Println("running...")
}

// CAR
package car

import "fmt"

type Car struct {
	Brand  string
	Model  string
	Engine bool
}

func (c *Car) TurnOn() {
	if c.Engine {
		fmt.Println("it is already turn on")
	} else {
		c.Engine = true
		fmt.Println("turned on")
	}
}

func (c *Car) Accelerate() {
	fmt.Println("accelerating...")
}




//
```

```go
// 2. Crear la interfaz objetivo (Adapter)
package adapter

type Adapter interface {
	Move() // este es el metodo que llamara a los objetos incompatibles
}

// 3. Crear el Adapter que implementa la interfaz objetivo
// BICYCLE
package adapter

import (
	"testo_echo/internal/bicycle"
)

type BicycleAdapter struct {
	Bicycle *bicycle.Bicycle
}

func (c *BicycleAdapter) Move() {
	c.Bicycle.Run()
}

//CAR
package adapter

import "testo_echo/internal/car"

type CarAdapter struct {
	Car *car.Car // en el Adapter, mantener una referencia al Adaptee
}

func (c *CarAdapter) Move() {
	c.Car.TurnOn()
	c.Car.Accelerate()
}


// 4. Implementar los objetos de la interfaz objetivo usando un Factory
package adapter

import (
	"testo_echo/internal/bicycle"
	"testo_echo/internal/car"
)

func Factory(s string) Adapter {
	switch s {
	case "bicycle":
		newBicycle := bicycle.Bicycle{}
		return &BicycleAdapter{Bicycle: &newBicycle}
	case "car":
		newCar := car.Car{}
		return &CarAdapter{Car: &newCar}
	}

	return nil
}



//
```

```go
// 5. El cliente interactúa con el Adapter usando la interfaz objetivo
bicycle := adapter.Factory("bicycle")
bicycle.Move()

car := adapter.Factory("car")
car.Move()
```

```go
//El patrón Facade (Fachada) es un patrón estructural que proporciona una interfaz simplificada a un conjunto complejo de subsistemas. Sus principales características son:

// * Oculta la complejidad del sistema
// * Proporciona un punto único de entrada a un subsistema
// * Reduce el acoplamiento entre cliente y subsistemas
// * Promueve el principio de menor conocimiento
```
![PastedGraphics](file:///.attachment/97CBDA1B-699A-43AF-8179-ACBFD4CDCE0B.png)

```go
// Subsistemas complejos
type CPU struct{}
func (c *CPU) Start() { fmt.Println("CPU starting") }

type Memory struct{}
func (m *Memory) Load() { fmt.Println("Memory loading") }

type HardDrive struct{}
func (h *HardDrive) Read() { fmt.Println("HardDrive reading") }

// Facade
type ComputerFacade struct {
    cpu       *CPU
    memory    *Memory
    hardDrive *HardDrive
}

func NewComputerFacade() *ComputerFacade {
    return &ComputerFacade{
        cpu:       &CPU{},
        memory:    &Memory{},
        hardDrive: &HardDrive{},
    }
}

// Método simplificado para el cliente
func (c *ComputerFacade) Start() {
    c.cpu.Start()
    c.memory.Load()
    c.hardDrive.Read()
}

// Cliente
func main() {
    computer := NewComputerFacade()
    computer.Start()  // Una única llamada simple
}
```

```go
// Separa una abstracción(clase que maneja al logica) de su representacion o implementacion(clase que muestra la logica), permitiendo que ambas evolucionen independientemente. Se usa para evitar el problema de la herencia rígida, ofreciendo una alternativa flexible mediante la composición.

```


```go
// 1. Primero creas la abstraccion (parte que maneja la logica)

package todo

import "testo_echo/internal/list"

type ToDo interface {
	SetList(l list.List)
	Add(name string)
	Print()
}
```

```go
package todo

import "testo_echo/internal/list"

// Implementation of TODO list

type Any struct {
	rendering list.List
	todos     []string
}

func NewAny() *Any {
	return &Any{}
}

func (a *Any) SetList(l list.List) {
	a.rendering = l
}

func (a *Any) Add(name string) {
	a.todos = append(a.todos, name)
}

func (a *Any) Print() {
	a.rendering.Print(a.todos)
}
```

```go
package todo

import "testo_echo/internal/list"

type Unique struct {
	rendering list.List
	todos     []string
}

func NewUnique() *Unique {
	return &Unique{}
}

func (a *Unique) SetList(l list.List) {
	a.rendering = l
}

func (a *Unique) Add(name string) {
	for _, todo := range a.todos {
		if todo == name {
			return
		}
	}

	a.todos = append(a.todos, name)
}

func (a *Unique) Print() {
	a.rendering.Print(a.todos)
}
```


```go
// 2. Crear la reprementacion (parte que se ocupara de msotrar el resultado de la logica)
package list

type List interface {
	Print([]string)
}
```

```go
package list

import "fmt"

type PlainRepresentation struct {
}

func NewPlain() *PlainRepresentation {
	return &PlainRepresentation{}
}

func (p *PlainRepresentation) Print(todos []string) {
	for _, todo := range todos {
		fmt.Println("\t", todo)
	}
}
```


```go
package list

import "fmt"

type BulletRepresentation struct {
	bullet rune
}

func NewBullet(b rune) *BulletRepresentation {
	return &BulletRepresentation{
		bullet: b,
	}
}

func (b *BulletRepresentation) Print(todos []string) {
	for _, todo := range todos {
		fmt.Println("\t", string(b.bullet), todo)
	}
}
```


```go
// 3. CLIENT
func factoryToDo(s string) todo.ToDo {
	switch s {
	case "any":
		return todo.NewAny()
	case "unique":
		return todo.NewUnique()
	default:
		return nil
	}
}

func factoryList(s string) list.List {
	switch s {
	case "plain":
		return list.NewPlain()
	case "bullet":
		return list.NewBullet('*')
	default:
		return nil
	}
}

func main() {
	e := echo.New()

	todos := factoryToDo("unique")
	rendering := factoryList("bullet")

	todos.SetList(rendering)

	todos.Add("Task # 1")
	todos.Add("Task # 2")
	todos.Add("Task # 2")
	todos.Add("Task # 3")
	todos.Add("Task # 4")

	todos.Print()

	e.Logger.Fatal(e.Start(":1323"))
}

```













```go
// Util cuando trabajas con estructuras jerárquicas, como árboles, donde tanto los elementos básicos (hojas) como los grupos de elementos (compuestos) deben ser manejados de la misma forma por el código cliente.
// Solo puede usarse cuando el modelo se repite de manera jerarquica. Por ejemplo un modelo Caja que contiene productois pero al mismo tiempo tambien puede contener otra Caja y dentro de esa otra Caja.
```

![PastedGraphics](file:///.attachment/CD544207-A3A2-47EC-A5E4-AE4D178465FB.png)

```go
// 1. Crear la interface
package project

type Item interface {
	Add(Item)
	String() string
	Price() int
}
```

```go
// 2. Crear la estructura de mas bajo nivel
package project

import (
	"fmt"
	"strconv"
	"strings"
)

type SubTask struct {
	Name         string
	SubTaskPrice int
}

func (s *SubTask) Add(i Item) {
	fmt.Println("No sub tasks accepted at this level")
}

func (s *SubTask) String() string {
	sb := strings.Builder{}
	sb.WriteString("\t\t|--")
	sb.WriteString(s.Name)
	sb.WriteString(" $")
	sb.WriteString(strconv.Itoa(s.SubTaskPrice))
	sb.WriteString("\n")

	return sb.String()
}

func (s *SubTask) Price() int {
	return s.SubTaskPrice
}
 
```

```go
// Crear la estructura que le sigue en jerarquia
package project

import (
	"strconv"
	"strings"
)

type Task struct {
	Name        string
	Responsable string
	TaskPrice   int
	SubTask     []Item
}

func (t *Task) Add(i Item) {
	t.SubTask = append(t.SubTask, i)
}

func (t *Task) String() string {
	sb := strings.Builder{}
	sb.WriteString("\t|--")
	sb.WriteString(t.Name)
	sb.WriteString(" - ")
	sb.WriteString(t.Responsable)
	sb.WriteString(" $")
	sb.WriteString(strconv.Itoa(t.Price()))
	sb.WriteString("\n")

	for _, subTask := range t.SubTask {
		sb.WriteString(subTask.String())
	}

	return sb.String()
}

func (t *Task) Price() int {
	price := t.TaskPrice

	for _, subTask := range t.SubTask {
		price += subTask.Price()
	}

	return price
}

```

```go
// Crear la estructura de mas ALTO nivel
package project

import (
	"strconv"
	"strings"
)

type Project struct {
	Name  string
	Tasks []Item
}

func (p *Project) Add(item Item) {
	p.Tasks = append(p.Tasks, item)
}

func (p *Project) String() string {
	sb := strings.Builder{}
	sb.WriteString(p.Name)
	sb.WriteString(" $")
	sb.WriteString(strconv.Itoa(p.Price()))
	sb.WriteString("\n")

	for _, task := range p.Tasks {
		sb.WriteString(task.String())
	}

	return sb.String()
}

func (p *Project) Price() int {
	price := 0

	for _, task := range p.Tasks {
		price += task.Price()
	}

	return price
}

```

```go
// CLIENT
func main() {
	e := echo.New()

	project := project2.Project{Name: "My Project"}
	t1 := project2.Task{Name: "Mockup", Responsable: "UI Designer", TaskPrice: 1000}
	t2 := project2.Task{Name: "Mockup", Responsable: "Web Designer"}
	st21 := project2.SubTask{Name: "HTML Design", SubTaskPrice: 300}
	st22 := project2.SubTask{Name: "CSS Design", SubTaskPrice: 200}

	t2.Add(&st21)
	t2.Add(&st22)

	project.Add(&t1)
	project.Add(&t2)

	fmt.Println(&project)

	e.Logger.Fatal(e.Start(":1323"))
}
```

```go
// Pe­r­mi­te aña­dir fu­n­cio­na­li­da­des a ob­je­tos co­lo­ca­n­do estos ob­je­tos de­n­tro de ob­je­tos en­ca­p­su­la­do­res es­pe­cia­les que co­n­tie­nen estas fu­n­cio­na­li­da­des.”

```
![PastedGraphics](file:///.attachment/2F55A1D5-251F-42E2-907C-981DD4875E7F.png)

```go
// 1. El Co­m­po­ne­n­te de­cla­ra la in­te­r­faz común tanto para wra­p­pe­rs como para ob­je­tos envueltos.


// 2. Co­m­po­ne­n­te Co­n­cre­to es una clase de ob­je­tos en­vue­l­tos. De­fi­ne el co­m­po­r­ta­mie­n­to bá­si­co, que los de­co­ra­do­res pue­den alterar.


// 3. La clase De­co­ra­do­ra Base tiene un campo para re­fe­re­n­ciar un ob­je­to en­vue­l­to. El tipo del campo debe de­cla­rar­se como la in­te­r­faz del co­m­po­ne­n­te para que pueda co­n­te­ner tanto los co­m­po­ne­n­tes co­n­cre­tos como los de­co­ra­do­res. La clase de­co­ra­do­ra base de­le­ga todas las ope­ra­cio­nes al ob­je­to envuelto.


// 4. Los De­co­ra­do­res Co­n­cre­tos de­fi­nen fu­n­cio­na­li­da­des adi­cio­na­les que se pue­den aña­dir di­ná­mi­ca­me­n­te a los co­m­po­ne­n­tes. Los de­co­ra­do­res co­n­cre­tos so­bre­s­cri­ben mé­to­dos de la clase de­co­ra­do­ra base y eje­cu­tan su co­m­po­r­ta­mie­n­to, ya sea antes o de­s­pués de in­vo­car al mé­to­do padre.


// 5. El Clie­n­te puede en­vo­l­ver co­m­po­ne­n­tes en va­rias capas de de­co­ra­do­res, sie­m­pre y cua­n­do tra­ba­jen con todos los ob­je­tos a tra­vés de la in­te­r­faz del componente.

```

```go
// Interface
type Donut interface {
	GetPrice() int
	GetDescription() string
}
```

```go
// Concrete Component
type donut struct {
	price       int
	description string
}

func New(price int, description string) Donut {
	return &donut{
		price:       price,
		description: description,
	}
}

func (d *donut) GetPrice() int {
	return d.price
}

func (d *donut) GetDescription() string {
	return d.description
}
```


```go
// Decorator
type DonutWithMoreSugar struct {
	donut donut.Donut
}

func New(d donut.Donut) *DonutWithMoreSugar {
	return &DonutWithMoreSugar{donut: d}
}

func (d *DonutWithMoreSugar) GetPrice() int {
	return d.donut.GetPrice() + 20
}

func (d *DonutWithMoreSugar) GetDescription() string {
	return d.donut.GetDescription() + ", with more sugar"
}
```


```go
// Client
package main

import (
	"fmt"
	"github.com/labstack/echo/v4"
	donut2 "testo_echo/internal/donut"
	"testo_echo/internal/donut_decorator"
)

func main() {
	e := echo.New()

	simpleDonut := donut2.New(10, "Strawberry donut")
	fmt.Println(simpleDonut.GetPrice())
	fmt.Println(simpleDonut.GetDescription())

	superDonut := donut_decorator.New(simpleDonut)
	fmt.Println(superDonut.GetPrice())
	fmt.Println(superDonut.GetDescription())

	e.Logger.Fatal(e.Start(":1323"))
}
```
![PastedGraphics](file:///.attachment/B30576C4-50D3-46B5-86A3-0B8520406E6E.png)

```go
// Pe­r­mi­te de­fi­nir un me­ca­ni­s­mo de su­s­cri­p­ción para no­ti­fi­car a va­rios ob­je­tos sobre cua­l­quier eve­n­to que le su­ce­da al ob­je­to que están observando.
```

![PastedGraphics](file:///.attachment/1F531572-77DB-4930-905A-67E8B39BFD81.png)


```go
// 1. Re­pa­sa tu ló­gi­ca de ne­go­cio e in­te­n­ta di­vi­di­r­la en dos pa­r­tes: la fu­n­cio­na­li­dad ce­n­tral, in­de­pe­n­die­n­te del resto de có­di­go, ac­tua­rá como no­ti­fi­ca­dor; el resto se co­n­ve­r­ti­rá en un grupo de cla­ses suscriptoras.

// 2. De­cla­ra la in­te­r­faz su­s­cri­p­to­ra. Como mí­ni­mo, de­be­rá de­cla­rar un único mé­to­do actualizar.

// 3. De­cla­ra la in­te­r­faz no­ti­fi­ca­do­ra y de­s­cri­be un par de mé­to­dos para aña­dir  y eli­mi­nar de la lista un ob­je­to su­s­cri­p­tor. Re­cue­r­da que los no­ti­fi­ca­do­res deben tra­ba­jar con su­s­cri­p­to­res úni­ca­me­n­te a tra­vés de la in­te­r­faz suscriptora.

// 4. De­ci­de dónde co­lo­car la lista de su­s­cri­p­ción y la im­ple­me­n­ta­ción de mé­to­dos de su­s­cri­p­ción. No­r­ma­l­me­n­te, este có­di­go tiene el mismo as­pe­c­to para todos los tipos de no­ti­fi­ca­do­res, por lo que el lugar obvio para co­lo­car­lo es en una clase ab­s­tra­c­ta de­ri­va­da di­re­c­ta­me­n­te de la in­te­r­faz no­ti­fi­ca­do­ra. Los no­ti­fi­ca­do­res co­n­cre­tos ex­tie­n­den esa clase, he­re­da­n­do el co­m­po­r­ta­mie­n­to de suscripción. Sin em­ba­r­go, si estás apli­ca­n­do el pa­trón a una je­ra­r­quía de cla­ses exi­s­te­n­tes, co­n­si­de­ra una so­lu­ción ba­sa­da en la co­m­po­si­ción: co­lo­ca la ló­gi­ca de la su­s­cri­p­ción en un ob­je­to se­pa­ra­do y haz que todos los no­ti­fi­ca­do­res reales la utilicen.

// 5. Crea cla­ses no­ti­fi­ca­do­ras co­n­cre­tas. Cada vez que su­ce­da algo im­po­r­ta­n­te de­n­tro de una no­ti­fi­ca­do­ra, de­be­rá no­ti­fi­car a todos sus suscriptores.

// 6. Im­ple­me­n­ta los mé­to­dos de no­ti­fi­ca­ción de ac­tua­li­za­cio­nes en cla­ses su­s­cri­p­to­ras co­n­cre­tas. La ma­yo­ría de las su­s­cri­p­to­ras ne­ce­si­ta­rán cie­r­ta in­fo­r­ma­ción de co­n­te­x­to sobre el eve­n­to, que puede pa­sar­se como ar­gu­me­n­to del mé­to­do de notificación. Pero hay otra op­ción. Al re­ci­bir una no­ti­fi­ca­ción, el su­s­cri­p­tor puede ex­traer la in­fo­r­ma­ción di­re­c­ta­me­n­te de ella. En este caso, el no­ti­fi­ca­dor debe pa­sar­se a sí mismo a tra­vés del mé­to­do de ac­tua­li­za­ción. La op­ción menos fle­xi­ble es vi­n­cu­lar un no­ti­fi­ca­dor con el su­s­cri­p­tor de forma pe­r­ma­ne­n­te a tra­vés del constructor.

// 7. “El clie­n­te debe crear todos los su­s­cri­p­to­res ne­ce­sa­rios y re­gi­s­trar­los con los no­ti­fi­ca­do­res adecuados.

```

```go
package observerPattern

type Publisher interface {
	RegisterObserver(name string, observer Subscriber)
	RemoveObserver(name string)
	NotifyObservers()
	SetMessage(message string)
}

type publisher struct {
	message   string
	observers map[string]Subscriber
}

func NewPublisher() Publisher {
	return &publisher{}
}

func (p *publisher) RegisterObserver(name string, observer Subscriber) {
	if p.observers == nil {
		p.observers = make(map[string]Subscriber)
	}

	p.observers[name] = observer
}

func (p *publisher) RemoveObserver(name string) {
	delete(p.observers, name)
}
```

```go
package observerPattern

// Subscriber define la interfaz para los suscriptores
type Subscriber interface {
	Notify(data string)
}
```

```go
package email

import "fmt"

type Email struct {
}

func (e *Email) Notify(data string) {
	sendEmail(data)
}

func sendEmail(message string) {
	// send email
	fmt.Printf("send email: %v", message)
}
```

```go
package slack

import "fmt"

type Slack struct {
}

func (s *Slack) Notify(data string) {
	sendMessage(data)
}

func sendMessage(message string) {
	// send message to slack
	fmt.Printf("send message to slack: %v", message)
}
```

```go
// Client
func main() {
	e := echo.New()
	newPublisher := observerPattern.NewPublisher()
	email := email2.Email{}
	slack := slack2.Slack{}

	newPublisher.RegisterObserver("email", &email)
	newPublisher.RegisterObserver("slack", &slack)

	newPublisher.SetMessage("This is a new message")
	newPublisher.NotifyObservers()

	e.Logger.Fatal(e.Start(":1323"))
}
```
