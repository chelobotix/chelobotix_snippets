# Generate - Migrations - GRAILS

```shell
# CREATE DOMAIN
grails create-domain-class domain.MyDomain



.
```


```groovy
// PASOS CREAR MIGRATION NUEVA TABLA:

// 1. Crer manualmente el archivo en migrations
// grails-app/migrations/crear-tabla-testo.groovy
databaseChangeLog = {
  changeSet(author: "malarcon", id: "crear_tabla_testo") {
    tagDatabase(tag: "antes_de_crear_tabla_testo")
    
    createTable(tableName: "testos") {
      column(name: "id", type: "BIGINT", autoIncrement: true) {
          constraints(primaryKey: true, nullable: false)
      }
      column(name: "date_created", type: "datetime")
      column(name: "last_updated", type: "datetime")
    }
    
    rollback {
      dropTable(tableName: "testos")
    }
  }
}

// 2. Anadir el archivo al changelog: grails-app/migrations/changelog.groovy
include file: 'crear-tabla-testo.groovy'

// 3. Ejecutar en terminal
grails dbm-update

```

```shell
# ROLLBACK
grails dbm-rollback "antes_de_crear_tabla_testo"
# o
grails dbm-rollback-count 1

.
```


```shell
# BORRAR SCHEMA VERSION
TABLA DATABASECHANGELOG



.
```
