# Basic Go

```go
// STRUCT

// user package
type User struct {
	firstName string // Las propiedades en minusculas para que solo se puedan alterar desde el constructor
	lastName  string
}

package user

func New(FirstName, LastName) *User {
  return &User{
    FirstName: FirstName,
    LastName: LastName,
  }
}

// main package
func main() {
	user := User{
		FirstName: "Natish",
		LastName:  "Alarcon",
	}

	fmt.Println(user.LastName)
}

```

```go
// STRUCT RECEIVER es para que una varible se comporte como un objeto con un metodo
// 1. Primero creas la struct
// 2. Luego instancias el struct n := MiTest{Name: "Chelo"}
// 3. Luego creas la funcion y le pones (n *MiTest)
// 4. Por ultimo con tu varialbe llamas a la funcion como si fuera un metodo
type MiTest struct {
	Name string
}

func main() {
	n := MiTest{Name: "Chelo"}
	n.funcMiTest()}

func (n *MiTest) funcMiTest() {
	fmt.Println(n.Name)
}

```

```go
// MAP
myMap := map[string]string{} 
// or myMap := make(map[string]string) 
//or myMap := make(map[string]string, 10)  -> Mapa con capacidad para 10 elementos
myMap["first_name"] = "John"

fmt.Println(

// store anything
days := map[string]interface{}{}
myMap := make(map[string]interface{})

// Delete Key
delete(myMap, "first_name")
```


```go
//SLICE
var my_slice []string
my_slice = append(my_slice, "John")

// or
numbers := []int{1, 2, 3}

// interface slice
data := []interface{}{1, "hola", true}

// copy
src := []string{"a", "b", "c"}
dst := make([]string, len(src), len(src))

copy(dst, src)

// include?
slices.Contains(my_slice, my_item)

// make con capacidad (espacio ya reservado en memoria)
s := make([]int, 0)              // slice vacío, len=0 cap=0
s := make([]int, 5)              // len=5 cap=5 (con valores cero)
s := make([]int, 5, 10)          // len=5 cap=10

```


```go
// LOOP ITERATORS
for i := 0; i <= 10; i++ {
	log.Println(i)
}

// slice
numbers := []string{"apple", "banana", "orange"}

for index, number := range numbers {
	log.Println(number, index)
}
for _, number := range numbers {
	log.Println(number)
}

// map
for key, value := range myMap {
	log.Println(key, value)
}

// string
for _, c := range "hello" {
		fmt.Printf("%c\n", c)
	}
	
// boolean (es como un while)
for boolean_value {
  
}
```


```go
// BUSCAR TODOS LOS ARCHIVOS EN UN DIRECTORIO
pages, err := filepath.Glob("./templates/*.gohtml")
```

```go
// Interfaces
type MyNumbers interface {
    int64 | float64
}

func SumIntsOrFloats[K comparable, V MyNumbers | float64](m map[K]V) V {
    var s V
    for _, v := range m {
        s += v
    }
    return s
}


```













> export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$PATH
