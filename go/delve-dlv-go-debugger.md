# DELVE DLV GO DEBUGGER

go install github.com/go-delve/delve/cmd/dlv@latest

```shell
1. dlv debug cmd/api/main.go
# entraras a la consola dlv

Comando	Descripción
break internal/database/database.go:14	Poner un breakpoint en la línea 25
c	Continuar la ejecución hasta el siguiente breakpoint
n	Ejecutar la siguiente línea (sin entrar en funciones)
s	Entrar a la siguiente función
stepout	Salir de la función actual
p variable	Imprimir el valor de la variable
locals	Mostrar todas las variables locales en el scope actual
goroutines	Mostrar todas las goroutines activas
exit	Salir del debugger
```



```shell
# VS CODE
debes tener instalado delve

# launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug main.go",
            "type": "go",
            "request": "launch",
            "mode": "debug",
            "program": "${workspaceFolder}/cmd/api/main.go", 
            "cwd": "${workspaceFolder}",
            "envFile": "${workspaceFolder}/.env",
            "args": []
        }
    ]
}

# para que reconozca las VARIABLES DE ENTORNO:
"github.com/joho/godotenv"
	_ "github.com/joho/godotenv/autoload"
	
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("Warning: .env file not found, skipping load")
	}
```
