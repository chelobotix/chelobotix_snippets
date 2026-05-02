# Project Structure Go

```shell
my-fiber-app/
├── cmd/                    # Contiene el archivo principal de entrada de la aplicación
│   └── main.go             # Punto de entrada principal
├── config/                 # Configuración de la aplicación, carga de variables de entorno
│   └── config.go           # Variables y funciones de configuración
├── internal/               # Lógica específica de la aplicación (interno, no expuesto a otros módulos)
│   ├── handlers/           # Funciones que gestionan las peticiones y responden con JSON o vistas
│   │   └── user_handler.go # Ejemplo de handler para gestionar usuarios
│   │── presenters          # Serializacion o la respuesta JSON
│   ├── middlewares/        # Definición de middleawares
│   │   └── middleware1.go  # Archivo middleaware
│   ├── models/             # Definición de los modelos de datos (representaciones de estructuras)
│   │   └── user.go         # Ejemplo de modelo de usuario
│   ├── repository/         # Acceso a datos y lógica de persistencia (repositorio)
│   │   └── user_repo.go    # Lógica de acceso a datos para usuarios
│   └── services/           # Lógica de negocio, servicios que usa la capa de handler
│       └── user_service.go # Ejemplo de servicio de usuario
├── pkg/                    # Paquetes reutilizables que podrían usarse en otros proyectos
│   └── utils.go            # Utilidades y funciones auxiliares
├── routes/                 # Definición de rutas de la aplicación
│   └── routes.go           # Archivo para inicializar las rutas
├── migrations/             # Scripts de migración para la base de datos
│   └── 20231109_init.sql   # Ejemplo de script SQL
├── database/               # Configuración y conexión a la base de datos
│   └── db.go               # Inicialización y conexión
├── .env                    # Variables de entorno
├── go.mod                  # Archivo de dependencias de Go
└── README.md               # Documentación del proyecto

```
