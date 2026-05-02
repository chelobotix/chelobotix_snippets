# Config GO

```go
package config

type config struct {
	Environment string
}

var AppConfig config

func New() {
	AppConfig = config{
		Environment: "development",
	}
}

// main.go
config.New()
log.Info(config.AppConfig.Environment)
```
