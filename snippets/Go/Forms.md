# Forms

```go
// BASIC
// All data comes as a string
func (repo *Repository) PostAvailability(w http.ResponseWriter, r *http.Request) {
  // Primero parseas
  err := r.ParseForm()
	if err != nil {
		log.Println(err)
	}
	
	email := r.Form.Get("email")
	
	// Para fechas
	start := r.Form.Get("start_date") //form field start_date is this case is a date 
	end := r.Form.Get("another")

	w.Write([]byte(fmt.Sprintf("start date is %s and end date is %s", start, end)))
}
```


```go
// RESPONSE JSON
type jsonResponse struct {
	Ok      bool   `json:"ok"`
	Message string `json:"message"`
}

// AvailabilityJSON is the handler for the home page
func (repo *Repository) AvailabilityJSON(w http.ResponseWriter, r *http.Request) {
	response := jsonResponse{
		Ok:      true,
		Message: "Available",
	}

	outResponse, err := json.MarshalIndent(response, "", "    ") //se daran 4 espacions de indentacion en el resultado
	if err != nil {
		log.Println(err)
	}

	log.Println(string(outResponse))
	w.Header().Set("Content-Type", "application-json")
	w.Write(outResponse)
}
```

```go
// CSRFToken from NOSURF
github.com/justinas/nosurf v1.1.1 // indirect
<input type="hidden" name="csrf_token" value="{{.CSRFToken}}">
```
