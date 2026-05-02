# CRUD - GRAILS

```java
package domain

class Testo {
    String name
    String email
    Integer age
    Float height
    Boolean isStudent = false
    Date dateCreated
    Date lastUpdated

    static constraints = {
        name size: 5..250, blank: false, nullable: false
        email email: true, blank: false, nullable: false
        age nullable: false
        height nullable: false
        isStudent nullable: false, defaultValue: false
    }
    
    static mapping = {
      // Ver lista abajo
    }
}


.
```

```java
static mapping = {

    // ── TABLA ────────────────────────────────────────────────────────────────
    table 'nombre_tabla'              // nombre de tabla en BD (default: nombre del dominio en snake_case)
    schema 'mi_schema'                // schema de BD (útil en PostgreSQL/Oracle con múltiples schemas)

    // ── PRIMARY KEY ──────────────────────────────────────────────────────────
    id column: 'mi_pk'                // nombre de la columna PK (default: 'id')
    id generator: 'sequence'         // generador: 'native', 'sequence', 'uuid', 'assigned', 'increment'
    id name: 'miId'                  // nombre del campo en la clase (si no es 'id')
    id composite: ['campo1', 'campo2'] // PK compuesta (en vez de usar @EmbeddedId)

    // ── VERSION (optimistic locking) ─────────────────────────────────────────
    version false                     // deshabilita la columna 'version' de Hibernate (cuidado con concurrencia)
    version 'mi_version'             // nombre de columna custom para el campo version

    // ── COLUMNAS ─────────────────────────────────────────────────────────────
    nombre column: 'nm_nombre'        // nombre de columna custom
    nombre column: 'nm_nombre', sqlType: 'TEXT'  // tipo SQL explícito
    descripcion type: 'text'          // tipo Hibernate ('text', 'string', 'integer', etc.)
    monto sqlType: 'decimal(18,4)'    // tipo SQL raw
    activo defaultValue: 'true'      // valor por defecto a nivel de columna en BD
    campo insertable: false          // no incluir en INSERT
    campo updateable: false          // no incluir en UPDATE
    campo index: 'idx_nombre'        // crear índice en esa columna

    // ── ENUMS ────────────────────────────────────────────────────────────────
    estado enumType: 'string'         // guarda el nombre del enum como String ("ACTIVO")
    estado enumType: 'identity'       // guarda el ordinal numérico del enum (0, 1, 2...)

    // ── ASOCIACIONES (hasMany / belongsTo) ───────────────────────────────────
    items cascade: 'all'             // cuándo propagar: 'all', 'save-update', 'delete', 'none'
    items cascade: 'all-delete-orphan' // borra hijos al desasociarlos del padre
    items lazy: true                  // lazy loading (default: true)
    items lazy: false                 // eager loading (carga inmediata, cuidado con N+1)
    items fetch: 'join'              // estrategia de fetch: 'select' (default) o 'join'
    items batchSize: 10              // carga en batches de N para evitar N+1
    items cache: true                // cachear esta colección

    // ── HERENCIA ─────────────────────────────────────────────────────────────
    tablePerHierarchy false          // TABLE_PER_CLASS: una tabla por subclase (default: single table)
    tablePerSubclass true            // JOINED: tabla base + tabla por subclase con JOIN

    // ── CACHE (second-level cache, requiere plugin/config) ───────────────────
    cache true                       // habilitar caché con estrategia default ('read-write')
    cache usage: 'read-only'         // estrategia: 'read-only', 'read-write', 'nonstrict-read-write', 'transactional'
    cache include: 'all'             // qué incluir: 'all' (default) o 'non-lazy'

    // ── ORDENAMIENTO ─────────────────────────────────────────────────────────
    sort 'nombre'                    // campo de orden por defecto en queries
    sort nombre: 'asc'              // orden ascendente explícito
    sort nombre: 'desc'             // orden descendente

    // ── AUTOTIME STAMPS ──────────────────────────────────────────────────────
    autoTimestamp false              // deshabilita el manejo automático de dateCreated/lastUpdated

    // ── DISCRIMINADOR (herencia single-table) ────────────────────────────────
    discriminator value: 'admin', column: [name: 'tipo', sqlType: 'varchar(50)']

    // ── COMENTARIO DE TABLA ──────────────────────────────────────────────────
    comment 'Tabla de usuarios del sistema' // comentario en DDL (no todos los motores lo soportan)
}
```

```java
package ctrl

import domain.Testo
import domain.TestoDomainService

class TestosController {

    TestoDomainService testoDomainService

    def index() {
        List<Testo> testoList = testoDomainService.listarTestos()

        [testoList: testoList]
    }

    def show() {
        Testo testoInstance = testoDomainService.obtenerTesto(params.long('id'))

        if (!testoInstance) {
            response.sendError(404)
            return
        }

        [testoInstance: testoInstance]
    }

    def create() {
        [testoInstance: new Testo()]
    }

    def save() {
        Testo testoInstance = new Testo()
        bindData(testoInstance, testoParams())

        if (testoInstance.hasErrors() || !testoInstance.save(flush: true)) {
            flash.error = "Error al crear testo"
            render view: 'create', model: [testoInstance: testoInstance]
            return
        }

        flash.message = "Testo creado correctamente"
        redirect action: "show", id: testoInstance.id
    }

    def edit() {
        Testo testoInstance = testoDomainService.obtenerTesto(params.long('id'))

        if (!testoInstance) {
            response.sendError(404)
            return
        }

        [testoInstance: testoInstance]
    }

    def update() {
        Testo testoInstance = testoDomainService.obtenerTesto(params.long('id'))

        if (!testoInstance) {
            response.sendError(404)
            return
        }

        bindData(testoInstance, testoParams())

        if (testoInstance.hasErrors() || !testoInstance.save(flush: true)) {
            render view: 'edit', model: [testoInstance: testoInstance]
            return
        }

        flash.message = "Testo actualizado correctamente"
        redirect action: "show", id: testoInstance.id
    }

    def delete() {
        Testo testoInstance = testoDomainService.obtenerTesto(params.long('id'))

        if (!testoInstance) {
            response.sendError(404)
            return
        }

        testoDomainService.eliminarTesto(testoInstance)
        flash.message = "Testo eliminado correctamente"
        redirect action: "index"
    }

    // Strong params estilo Grails
    private Map testoParams() {
        params.subMap(['name', 'email', 'age', 'height', 'isStudent'])
    }
}
```

```java
package domain

class TestoDomainService {

    // Listar todos los Testos
    List<Testo> listarTestos() {
        Testo.list()
    }

    // Obtener un Testo por su ID
    Testo obtenerTesto(Long id) {
        Testo.get(id)
    }

    // Eliminar un Testo
    void eliminarTesto(Testo testo) {
        testo.delete(flush: true)
    }
}
```

```html
// INDEX
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="active_admin">
		<title><g:message code="default.create.testo.label" args="[entityName]" /></title>
	</head>
	<body>
		<g:if test="${flash.message}">
			<div class="alert alert-success">
				<g:message code="testo.message.label" default="Message" />: ${flash.message}
			</div>
		</g:if>

		<h1>Testos</h1>
		<g:link action="create">Create Testo</g:link>

    <g:each in="${testoList}" var="testo">
      <g:link action="show" id="${testo.id}">
        <p>${testo.name}</p>
      </g:link>
    </g:each>
	</body>
</html>


.
```


```html
// SHOW
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="active_admin">
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
  		<%-- Check messages with flash.message --%>
		<g:if test="${flash.message}">
			<div class="alert alert-success">
				<g:message code="testo.message.label" default="Message" />: ${flash.message}
			</div>
		</g:if>
  		<h1>Show Testo</h1>

		<p><strong>Name:</strong> ${testoInstance?.name}</p>
	  	<p><strong>Email:</strong> ${testoInstance?.email}</p>
	 	<p><strong>Age:</strong> ${testoInstance?.age}</p>
	  	<p><strong>Height:</strong> ${testoInstance?.height}</p>
	  	<p><strong>Is Student:</strong> ${testoInstance?.isStudent ? 'Yes' : 'No'}</p>

		<g:link action="index">Back to List</g:link>
	  <g:link action="edit" id="${testoInstance?.id}">Edit</g:link>
		<g:link action="delete" id="${testoInstance?.id}">Delete</g:link>
  </body>
</html>


.
```

```html
// CREATE
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="active_admin">
		<g:set var="entityName" value="${message(code: 'testo.label', default: 'Testo')}" />
		<title><g:message code="default.create.testo.label" args="[entityName]" /></title>
	</head>
	<body>
		<%-- Check errors with hasErrors --%>
		<g:hasErrors bean="${testoInstance}">
			<div class="alert alert-danger">
				<ul>
					<g:eachError bean="${testoInstance}" var="err">
						<li><g:message error="${err}" /></li>
					</g:eachError>
				</ul>
			</div>
		</g:hasErrors>

    <%-- Link to index action --%>
    <g:link action="index">Go To All Testos</g:link>

		<%-- Form to save testo --%>
		<g:form action="save">
			<%-- Render form template --%>
			<fieldset class="form">
				<g:render template="form" model="[testoInstance: testoInstance]" />
			</fieldset>

			<%-- Submit button --%>
			<fieldset class="buttons">
				<g:submitButton name="create" class="save" value="${message(code: 'default.button.create.label', default: 'Create')}" />
			</fieldset>
		</g:form>
  </body>
</html>


.
```

```html
<!DOCTYPE html>
// EDIT
<html>
	<head>
		<meta name="layout" content="active_admin">
		<g:set var="entityName" value="${message(code: 'testo.label', default: 'Testo')}" />
		<title><g:message code="default.create.testo.label" args="[entityName]" /></title>
	</head>
	<body>
		<%-- Check errors with hasErrors --%>
		<g:hasErrors bean="${testoInstance}">
			<div class="alert alert-danger">
				<ul>
					<g:eachError bean="${testoInstance}" var="err">
						<li><g:message error="${err}" /></li>
					</g:eachError>
				</ul>
			</div>
		</g:hasErrors>

    <%-- Link to index action --%>
    <g:link action="index">Go To All Testos</g:link>

		<%-- Form to save testo --%>
		<g:form action="update" id="${testoInstance.id}" method="post">
			<%-- Render form template --%>
			<fieldset class="form">
				<g:render template="form" model="[testoInstance: testoInstance]" />
			</fieldset>

			<%-- Submit button --%>
			<fieldset class="buttons">
				<g:submitButton name="update" class="save" value="${message(code: 'default.button.create.label', default: 'Update')}" />
			</fieldset>
		</g:form>
  </body>
</html>


.
```



```html
// FORM
<div class="fieldcontain ${hasErrors(bean: testoInstance, field: 'name', 'error')} required">
	<label for="name">
		<g:message code="testo.name.label" default="Names" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="name" value="${testoInstance?.name}" />
</div>

<div class="fieldcontain ${hasErrors(bean: testoInstance, field: 'email', 'mi_clase_css_error')} required">
	<label for="email">
		<g:message code="testo.email.label" default="Email" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="email" value="${testoInstance?.email}" />
</div>

<div class="fieldcontain ${hasErrors(bean: testoInstance, field: 'age', 'error')} required">
	<label for="age">
		<g:message code="testo.age.label" default="Age" />
		<span class="required-indicator">*</span>
	</label>
	<g:field type="number" name="age" min="5" max="10" required value="${testoInstance?.age}" />
</div>

<div class="fieldcontain ${hasErrors(bean: testoInstance, field: 'height', 'error')} required">
	<label for="height">
		<g:message code="testo.height.label" default="Height" />
		<span class="required-indicator">*</span>
	</label>
	<g:field type="number" name="height" required value="${testoInstance?.height}" />
</div>

<div class="fieldcontain ${hasErrors(bean: testoInstance, field: 'isStudent', 'error')}">
	<label for="isStudent">
		<g:message code="testo.isStudent.label" default="Is Student" />
	</label>
	<g:checkBox name="isStudent" checked="${testoInstance?.isStudent}"/>
</div>


```


```java
// migrations/changelog.groovy
include file: 'crear-tabla-testo.groovy'
```

```java
databaseChangeLog = {

    changeSet(author: "malarcon", id: "crear_tabla_testo") {
        tagDatabase(tag: "antes_de_crear_tabla_testo")

        createTable(tableName: "testo") {
            column(name: "id", type: "BIGINT", autoIncrement: true) {
                constraints(primaryKey: true, nullable: false)
            }
            column(name: "name", type: "VARCHAR(250)") {
                constraints(nullable: false)
            }
            column(name: "email", type: "VARCHAR(250)") {
                constraints(nullable: false)
            }
            column(name: "age", type: "INT") {
                constraints(nullable: false)
            }
            column(name: "height", type: "FLOAT") {
                constraints(nullable: false)
            }
            column(name: "is_student", type: "BOOLEAN") {
                constraints(nullable: false, defaultValue: false)
            }
            column(name: "date_created", type: "datetime")
            column(name: "last_updated", type: "datetime")
            column(name: "version", type: "BIGINT")
        }

        rollback {
            dropTable(tableName: "testo")
        }
    }
}
```
