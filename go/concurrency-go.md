# Concurrency GO

```go
// Go Routine
var wg sync.WaitGroup

func main() {
	wg.Add(1)
	go foo()
	bar()
	wg.Wait()
}

func foo() {
	for i := 0; i < 3; i++ {
		fmt.Println("foo:", i)
	}
	defer wg.Done()
}

func bar() {
	for i := 0; i < 3; i++ {
		fmt.Println("bar:", i)
	}
}

```

```go
// WAIT GROUP
// Sirve para que todas las go routines acaben antes de que el MAIN acabe
var wg sync.WaitGroup
wg.Add(2)
wg.Done()
wg.Wait()
```


```go
// RACE CONDITION
go run -race main.go 
```


```go
// MUTEX
var mutex sync.Mutex

	for i := 0; i < gs; i++ {
		go func() {
			mutex.Lock()
			// yout logic
			mutex.Unlock()
		}()
	}
```


```go
// ATOMIC EN VEZ DE MUTEX
var counter int64 // Debe ser de tipo int64 para usar con atomic

func increment(wg *sync.WaitGroup) {
	defer wg.Done()
	for i := 0; i < 1000; i++ {
		atomic.AddInt64(&counter, 1) // Incremento atómico
	}
}
```


```go
// CHANNELS
// Basic
func main() {
	c := make(chan int)

	go func() {
		c <- 42
	}()
}

// or
func main() {
	done := make(chan bool)
	go greet(done)

	<-done

}

func greet(done chan bool) {
	time.Sleep(2 * time.Second)
	fmt.Printf("Saludos")
	done <- true
}


```

```go
// Buffer Channel
c := make(chan int, 1)
```

```go
// One Direction 
c := make(chan <- int) //send
c := make(<- chan int) //receive
```

```go
// Close Channel (Usas cuando hay una iteracion y no se sabe cuando acabara)
// EL CIERRE DEL CANAL DEBE SER RESPONSABILIDAD DE QUIEN LO ESCRIBE O QUIEN LO ENVIA (casi siempre main)
close(c)
```

```go
// Range (si no se sabe cuanto va a iterar tienes que juntarlo con close dentro el go rutine)
for i := range c {
	fmt.Println(i)
}
```

```go
// SELECT
func test2(e, o, q chan int) {
	for {
		select {
		case v := <-e:
			fmt.Println("even", v)
		case v := <-o:
			fmt.Println("odd", v)
		case _ = <-q:
			close(q)
			return
		}
	}
}
```

```go
// 2 task uno luego del otro
package main

import (
	"fmt"
	"time"
)

// Primera tarea pesada
func task1(input int, result chan int) {
	output := input * 2         // Operación pesada ficticia
	result <- output            // Enviar resultado al canal
}

// Segunda tarea pesada
func task2(input int, result chan int) {
	output := input + 10        // Operación pesada ficticia
	result <- output            // Enviar resultado al canal
}

func main() {
	// Crear canales
	task1Result := make(chan int)
	task2Result := make(chan int)

	// Lanzar goroutines para ambas tareas
	go task1(5, task1Result) // Inicia la primera tarea
	go func() {
		// La segunda tarea depende del resultado de la primera
		resultFromTask1 := <-task1Result // Espera el resultado de la primera tarea
		task2(resultFromTask1, task2Result)
	}()

	// Recibir el resultado final
	finalResult := <-task2Result // Espera el resultado de la segunda tarea
	fmt.Printf("Resultado final: %d\n", finalResult)
}

```

```go
// EJEMPLO COMPLETO DATE TU TIEMPO
package main

import (
	"fmt"
	"time"
)

func main() {
	numbers := []int{2, 4, 6, 8}
	channel1 := make(chan int)
	channel2 := make(chan int)

	for _, number := range numbers {
		go test1(number, channel1)
		go func() {
			resultFromTest1 := <-channel1
			test2(resultFromTest1, channel2)
		}()
	}

	counter := 0
	for i := range channel2 {
		fmt.Println(i)
		if counter == len(numbers)-1 {
			close(channel2)
		}
		counter++
	}
}

func test1(n int, result chan int) {
	fmt.Println("test 1 started...")
	time.Sleep(1 * time.Second)
	result <- n + 1
}

func test2(n int, result chan int) {
	fmt.Println("test 2 started...")
	time.Sleep(1 * time.Second)
	result <- n + 2
}

```


```go
// FAN-IN PATTERN
package main

import (
	"fmt"
	"sync"
)

func main() {
	fanInChannel := make(chan int)
	numbers1Channel := make(chan int)
	numbers2Channel := make(chan int)
	var wg sync.WaitGroup

	wg.Add(2)

	go task1(numbers1Channel, &wg)
	go task2(numbers2Channel, &wg)
	go fanIn(numbers1Channel, numbers2Channel, fanInChannel)

	go func() {
		wg.Wait()
		close(fanInChannel)
	}()

	for fi := range fanInChannel {
		fmt.Println(fi)
	}

	fmt.Println("Finish!")
}

func task1(numbers chan<- int, wg *sync.WaitGroup) {
	defer wg.Done()
	for i := 1; i <= 10; i++ {
		if i%2 == 0 {
			numbers <- i
		}
	}
	close(numbers)
}

func task2(numbers chan<- int, wg *sync.WaitGroup) {
	defer wg.Done()
	for i := 1; i <= 10; i++ {
		if i%2 != 0 {
			numbers <- i
		}
	}
	close(numbers)
}

func fanIn(numbers1, numbers2 <-chan int, fanInChan chan<- int) {
	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		defer wg.Done()
		for n := range numbers1 {
			fanInChan <- n
		}
	}()

	go func() {
		defer wg.Done()
		for n := range numbers2 {
			fanInChan <- n
		}
	}()

	wg.Wait()
}

```


```go
// FAN-OUT PATTERN
package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	fanOutChan := make(chan int)

	// Lanzar 9 goroutines (workers)
	for i := 1; i <= 9; i++ {
		wg.Add(1)
		go task1(i, fanOutChan, &wg)
	}

	// Lanza una goroutine para cerrar el canal cuando todas las goroutines terminen
	go func() {
		wg.Wait()
		close(fanOutChan)
	}()

	// Leer los resultados del canal
	for result := range fanOutChan {
		fmt.Println(result)
	}

	fmt.Println("Fin del programa.")
}

func task1(number int, fanOutChan chan int, wg *sync.WaitGroup) {
	defer wg.Done()
	// Enviar el cuadrado del número al canal
	fanOutChan <- number * number
}

```
