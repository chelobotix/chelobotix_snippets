# JSON GO MARSHALL UNMARSHALL

```go
// JSON TO GO(MAP)
type User struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Age       int    `json:"age"`
}

func main() {
	my_json := `
	[
		{
			"firstname": "Clark",
			"lastname": "Kent",
			"age": 45
		},
		{
			"firstname": "Bruce",
			"lastname": "Wayne",
			"age": 42
		}
	]
	`
	// ESTA ES LA MEJOR OPCION PARA LEER EL BODY DE UN JSON ENVIADO POR HTTP REQUEST
	var unmarshalled User
	decoder := json.NewDecoder(c.Request().Body)
	// opcional: decoder.DisallowUnknownFields()
  if err := decoder.Decode(&unmarshalled); err != nil {
      return echo.NewHTTPError(http.StatusBadRequest, "Invalid JSON").SetInternal(err)
  }
	
	
	// ESTO USAS CUANDO YA TIENES EN MEMORIA UN JSON Y NO ESMUY GRANDE
	var unmarshalled []User
	err := json.Unmarshal([]byte(my_json), &unmarshalled)

	if err != nil {
		fmt.Println("error unmarshalling json", err)
	} else {
		fmt.Println(unmarshalled[0].Firstname)
	}
	
	// PARA LEER EL BODY DE UN JSON ENVIADO POR HTTP REQUEST:
	// Get body
	body, err := io.ReadAll(c.Request().Body)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	// Unmarshal
	err = json.Unmarshal(body, &unmarshalled)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}	
}
  

```


```go
// GO TO JSON
newJson, err := json.Marshal(users)

if err != nil {
	fmt.Println("error marshalling json", err)
} else {
	fmt.Println(string(newJson))
}

```

```go
// FROM API
type responseCDI struct {
	Data  string `json:"data"`
	Valor string `json:"valor"`
}

func updateCDI() error {
	var apiResponse []responseCDI
	url := "https://api.bcb.gov.br/dados/serie/bcdata.sgs.27568/dados/ultimos/15?formato=json"

	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	err = json.Unmarshal(body, &apiResponse)
	if err != nil {
		return err
	}

	fmt.Println(apiResponse)

	return nil
}

```
