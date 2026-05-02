# Asistencia - Groovy - GRails

```shell
ctrlit/
├── grails-app/                    # ← Equivalente a tu carpeta "app/" en Rails
│   ├── assets/                    # ← app/assets (JS, CSS, imágenes)
│   ├── conf/                      # ← config/ (application.yml, rutas, spring)
│   │   ├── application.yml        # ← config/application.rb + database.yml
│   │   ├── application.groovy     # ← config/initializers/
│   │   ├── runtime.groovy         # ← config/environments/*.rb
│   │   ├── logback.groovy         # ← config/environments/production.rb (logging)
│   │   └── spring/                # ← Sin equivalente directo (inyección de dependencias)
│   ├── controllers/               # ← app/controllers/
│   ├── domain/                    # ← app/models/ (¡PERO SOLO validaciones!)
│   ├── services/                  # ← app/services/ (aquí va TODA la lógica de negocio)
│   ├── views/                     # ← app/views/ (archivos .gsp en vez de .erb)
│   ├── taglib/                    # ← app/helpers/ (helpers de vista)
│   ├── dataObjects/               # ← Sin equivalente en Rails (DTOs)
│   ├── i18n/                      # ← config/locales/
│   ├── init/                      # ← config/application.rb (bootstrap)
│   ├── jobs/                      # ← app/jobs/ (ActiveJob)
│   └── migrations/                # ← db/migrate/
├── src/
│   ├── main/
│   │   ├── groovy/                # ← lib/ (código auxiliar, no es controlador/servicio)
│   │   └── webapp/                # ← public/ (archivos estáticos: JS, CSS, imágenes)
│   ├── test/groovy/               # ← test/unit/ o spec/ (tests unitarios)
│   └── integration-test/groovy/   # ← test/integration/ (tests de integración)
├── build.gradle                   # ← Gemfile (dependencias del proyecto)
├── gradle.properties              # ← .ruby-version / .tool-versions
└── scripts/                       # ← bin/ o lib/tasks/ (scripts utilitarios)
```

```shell
# Routes
grails-app/controllers/ctrl/UrlMappings.groovy
```




