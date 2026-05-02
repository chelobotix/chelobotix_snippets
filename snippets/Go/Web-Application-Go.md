# Web Application Go

```go
// BASIC
package main

import (
	"fmt"
	"log"
	"net/http"
)

const portNumber = ":8080"

func Home(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprintf(w, "Welcome to the home page!")

	if err != nil {
		log.Fatal(err)
	}
}

// About is the about page handler
func About(w http.ResponseWriter, r *http.Request) {
	sum := addValues(2, 3)
	_, err := fmt.Fprintf(w, fmt.Sprintf("About page a total is %d", sum))

	if err != nil {
		log.Fatal(err)
	}
}

func addValues(x, y int) int {
	return x + y
}

func main() {
	http.HandleFunc("/", Home)
	http.HandleFunc("/about", About)

	fmt.Println(fmt.Sprintf("Listening on port %s", portNumber))
	_ = http.ListenAndServe(portNumber, nil)
}

```


```go
// TEMPLATE
package main

import (
	"fmt"
	"html/template"
	"net/http"
)

const portNumber = ":8080"

func Home(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "home.page.tmpl")
}

// About is the about page handler
func About(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "about.html")
}

func renderTemplate(w http.ResponseWriter, tmpl string) {
	parseTemplate, _ := template.ParseFiles("./templates/" + tmpl)
	err := parseTemplate.Execute(w, nil)

	if err != nil {
		fmt.Println(err)
		return
	}
}

func main() {
	http.HandleFunc("/", Home)
	http.HandleFunc("/about", About)

	fmt.Println(fmt.Sprintf("Listening on port %s", portNumber))
	_ = http.ListenAndServe(portNumber, nil)
}


```
