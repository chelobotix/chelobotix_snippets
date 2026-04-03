# Requests GO

```go
// URL
r.RequestURI
```

```go
// QUERY STRING (PARA PARAMETROS QUERY STRING QUE SEAN SANITIZADOS)
url2.QueryEscape(endDate)

```

```go
// HTTP
res := &http.Request{
		Method: "GET",
		URL:    url,
		Header: map[string][]string{
			"Authorization": {ptoken},
		},
		
req, err := http.DefaultClient.Do(res)
if err != nil {
	log.Error(err)
}

defer req.Body.Close()

body, err := io.ReadAll(req.Body)
if err != nil {
	log.Error(err)
}
```

```go
// REDIRECT
http.Redirect(w, r, "/search-availability", http.StatusSeeOther)
```

