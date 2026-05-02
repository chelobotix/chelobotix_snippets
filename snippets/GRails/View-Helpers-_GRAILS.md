# View Helpers - GRAILS

# Grails GSP Tag Helpers — Referencia

> Ordenados de mayor a menor frecuencia de uso (análisis sobre 526 archivos `.gsp`).
> Cada sección es buscable de forma independiente.

---

## g:if

**Frecuencia:** ~1312 usos  
**Tipo:** Control de flujo  
**Descripción:** Bloque condicional. Renderiza su contenido solo si `test` evalúa a verdadero. Es el tag más usado del proyecto.

```gsp
<g:if test="${usuario.activo}">
  <span>Activo</span>
</g:if>
```

**Renderiza:**
```html
<span>Activo</span>
```
_(nada si la condición es falsa)_

---

## g:message

**Frecuencia:** ~979 usos  
**Tipo:** Internacionalización (i18n)  
**Descripción:** Obtiene un texto traducido desde `messages.properties` según el `code`. Acepta `args` para interpolación. Indispensable para i18n.

```gsp
<g:message code="default.create.label" args="[entityName]" />
```

**Renderiza:**
```html
Crear Turno
```
_(texto leído de messages.properties para el locale activo)_

---

## g:resource

**Frecuencia:** ~938 usos  
**Tipo:** Assets estáticos  
**Descripción:** Genera la URL correcta a un recurso estático (JS, CSS, imágenes). Incluye cache-busting automático. Se usa dentro de `<script src>`, `<link href>`, `<img src>`, etc.

```gsp
<script src="<g:resource dir='js' file='turno.js'/>"></script>
<link rel="stylesheet" href="<g:resource dir='css' file='main.css'/>"/>
```

**Renderiza:**
```html
<script src="/ctrlit/js/turno.js?_=1234567890"></script>
<link rel="stylesheet" href="/ctrlit/css/main.css?_=1234567890"/>
```

---

## g:each

**Frecuencia:** ~613 usos  
**Tipo:** Control de flujo / iteración  
**Descripción:** Itera sobre una colección. Expone cada elemento en la variable `var`. Equivalente a un `for-each`.

```gsp
<g:each in="${turnos}" var="turno">
  <li>${turno.nombre}</li>
</g:each>
```

**Renderiza:**
```html
<li>Turno Mañana</li>
<li>Turno Tarde</li>
<li>Turno Noche</li>
```

---

## g:else

**Frecuencia:** ~367 usos  
**Tipo:** Control de flujo  
**Descripción:** Bloque alternativo que se ejecuta cuando la condición del `g:if` precedente es falsa. Debe ir inmediatamente después de un `g:if` o `g:elseif`.

```gsp
<g:if test="${marcaje.entrada}">
  <span>Entrada registrada</span>
</g:if>
<g:else>
  <span>Sin entrada</span>
</g:else>
```

**Renderiza:**
```html
<span>Sin entrada</span>
```
_(cuando `marcaje.entrada` es falso/null)_

---

## g:form

**Frecuencia:** ~161 usos  
**Tipo:** Formulario  
**Descripción:** Renderiza un elemento `<form>` HTML con el token CSRF incluido automáticamente. Acepta `url` como mapa con `controller`, `action` e `id`.

```gsp
<g:form url="[resource: turnoInstance, action: 'save']">
  <!-- campos -->
</g:form>
```

**Renderiza:**
```html
<form action="/ctrlit/turno/save" method="POST">
  <input type="hidden" name="_method" value="POST"/>
  <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
  <!-- campos -->
</form>
```

---

## g:include

**Frecuencia:** ~141 usos  
**Tipo:** Composición de vistas  
**Descripción:** Incluye el output de otro action/controller dentro de la vista actual. Útil para widgets o secciones reutilizables que requieren lógica de controlador.

```gsp
<g:include action="areas" controller="subcontrato" id="${params.id}" />
```

**Renderiza:**
```html
<!-- HTML completo generado por SubcontratoController#areas -->
```

---

## g:render

**Frecuencia:** ~135 usos  
**Tipo:** Composición de vistas  
**Descripción:** Incluye un template parcial (`_nombreTemplate.gsp`) en la vista. Equivalente a un partial/partial view. El template debe comenzar con `_`.

```gsp
<g:render template="form"/>
<g:render template="fila" model="[turno: turnoInstance]" collection="${turnos}" var="turno"/>
```

**Renderiza:**
```html
<!-- contenido de grails-app/views/turno/_form.gsp -->
```

---

## g:set

**Frecuencia:** ~93 usos  
**Tipo:** Variables  
**Descripción:** Declara una variable en el scope de la vista (page, request, session o application). Muy usado para evitar repetir expresiones largas.

```gsp
<g:set var="entityName" value="${message(code: 'turno.label', default: 'Turno')}" />
<title>Crear ${entityName}</title>
```

**Renderiza:**
```html
<title>Crear Turno</title>
```

---

## g:link

**Frecuencia:** ~75 usos  
**Tipo:** Navegación  
**Descripción:** Renderiza un `<a href>` usando el sistema de URL mapping de Grails. Evita hardcodear URLs.

```gsp
<g:link class="btn btn-default" action="index" controller="turno" id="${obra.id}">
  <g:message code="default.list.label" args="[entityName]" />
</g:link>
```

**Renderiza:**
```html
<a class="btn btn-default" href="/ctrlit/turno/index/42">Listar Turnos</a>
```

---

## g:fieldValue

**Frecuencia:** ~38 usos  
**Tipo:** Presentación  
**Descripción:** Obtiene y escapa el valor de una propiedad de un bean para mostrarla en la vista. Aplica HTML escaping automático. Útil en vistas `show`.

```gsp
<g:fieldValue bean="${turnoInstance}" field="nombre"/>
```

**Renderiza:**
```html
Turno Mañana
```
_(texto escapado de `turnoInstance.nombre`)_

---

## g:textField

**Frecuencia:** ~36 usos  
**Tipo:** Formulario — input  
**Descripción:** Renderiza un `<input type="text">`. Acepta atributos HTML estándar como `class`, `maxlength`, `required`, `placeholder`.

```gsp
<g:textField name="nombre" class="form-control" maxlength="100" value="${turnoInstance?.nombre}" />
```

**Renderiza:**
```html
<input type="text" name="nombre" id="nombre" class="form-control" maxlength="100" value="Turno Mañana"/>
```

---

## g:datePicker

**Frecuencia:** ~36 usos  
**Tipo:** Formulario — input fecha  
**Descripción:** Renderiza un selector de fecha. Con `precision="day"` muestra día/mes/año como dropdowns separados. Puede integrarse con jQuery UI calendar.

```gsp
<g:datePicker name="fechaInicio" precision="day" value="${turnoInstance?.fechaInicio}" />
```

**Renderiza:**
```html
<select name="fechaInicio_day">...</select>
<select name="fechaInicio_month">...</select>
<select name="fechaInicio_year">...</select>
```

---

## g:textArea

**Frecuencia:** ~29 usos  
**Tipo:** Formulario — textarea  
**Descripción:** Renderiza un `<textarea>` HTML. Acepta `rows`, `cols`, `maxlength`, `placeholder`, etc.

```gsp
<g:textArea name="notas" class="form-control" maxlength="200" placeholder="Observaciones"/>
```

**Renderiza:**
```html
<textarea name="notas" id="notas" class="form-control" maxlength="200" placeholder="Observaciones"></textarea>
```

---

## g:elseif

**Frecuencia:** ~28 usos  
**Tipo:** Control de flujo  
**Descripción:** Permite agregar condiciones adicionales entre `g:if` y `g:else`. Equivalente a `else if`.

```gsp
<g:if test="${estado == 'ACTIVO'}">
  <span class="green">Activo</span>
</g:if>
<g:elseif test="${estado == 'PENDIENTE'}">
  <span class="yellow">Pendiente</span>
</g:elseif>
<g:else>
  <span class="red">Inactivo</span>
</g:else>
```

**Renderiza** (cuando `estado == 'PENDIENTE'`):
```html
<span class="yellow">Pendiente</span>
```

---

## g:formatDate

**Frecuencia:** ~27 usos  
**Tipo:** Formateo  
**Descripción:** Formatea un objeto `Date` a string según el formato o locale especificado. Si no se da `format`, usa el locale del sistema.

```gsp
<g:formatDate date="${turnoInstance?.fechaCreacion}" format="dd/MM/yyyy HH:mm"/>
```

**Renderiza:**
```html
15/05/2024 09:30
```

---

## g:hiddenField

**Frecuencia:** ~25 usos  
**Tipo:** Formulario — input oculto  
**Descripción:** Renderiza un `<input type="hidden">`. Esencial para pasar datos backend→frontend o IDs dentro de formularios sin mostrarlos al usuario.

```gsp
<g:hiddenField name="obraId" value="${obraInstance?.id}" />
```

**Renderiza:**
```html
<input type="hidden" name="obraId" id="obraId" value="42"/>
```

---

## g:formatBoolean

**Frecuencia:** ~8 usos  
**Tipo:** Formateo  
**Descripción:** Convierte un booleano en texto localizado. Por defecto usa "Sí"/"No" según locale. Se puede personalizar con `true` y `false`.

```gsp
<g:formatBoolean boolean="${turnoInstance?.activo}" true="Habilitado" false="Deshabilitado"/>
```

**Renderiza:**
```html
Habilitado
```

---

## g:hasErrors

**Frecuencia:** ~6 usos  
**Tipo:** Manejo de errores  
**Descripción:** Bloque condicional que se renderiza solo si el bean tiene errores de validación. Se usa para envolver la lista de errores.

```gsp
<g:hasErrors bean="${turnoInstance}">
  <ul class="errors">
    <g:eachError bean="${turnoInstance}" var="error">
      <li><g:message error="${error}"/></li>
    </g:eachError>
  </ul>
</g:hasErrors>
```

**Renderiza** (cuando hay errores):
```html
<ul class="errors">
  <li>El nombre no puede estar vacío</li>
</ul>
```

---

## g:eachError

**Frecuencia:** ~6 usos  
**Tipo:** Manejo de errores  
**Descripción:** Itera sobre los errores de validación de un bean. Se usa dentro de `g:hasErrors`. Expone cada error en `var` para usar con `g:message`.

```gsp
<g:eachError bean="${turnoInstance}" var="error">
  <li <g:if test="${error in org.springframework.validation.FieldError}">
      data-field-id="${error.field}"</g:if>>
    <g:message error="${error}"/>
  </li>
</g:eachError>
```

**Renderiza:**
```html
<li data-field-id="nombre">El nombre no puede estar vacío</li>
```

---

## g:checkBox

**Frecuencia:** ~6 usos  
**Tipo:** Formulario — checkbox  
**Descripción:** Renderiza un `<input type="checkbox">`. Grails añade automáticamente un campo oculto asociado para manejar el caso `false` cuando el checkbox no está marcado.

```gsp
<g:checkBox name="entrada" value="${registroInstance?.entrada}" />
```

**Renderiza:**
```html
<input type="hidden" name="_entrada"/>
<input type="checkbox" name="entrada" id="entrada" checked="checked"/>
```

---

## g:submitButton

**Frecuencia:** ~4 usos  
**Tipo:** Formulario — botón  
**Descripción:** Renderiza un botón `<input type="submit">` estándar para enviar el formulario.

```gsp
<g:submitButton name="create" class="btn btn-success" value="${message(code: 'default.button.create.label', default: 'Crear')}" />
```

**Renderiza:**
```html
<input type="submit" name="create" id="create" class="btn btn-success" value="Crear"/>
```

---

## g:actionSubmit

**Frecuencia:** ~5 usos  
**Tipo:** Formulario — botón con acción  
**Descripción:** Similar a `g:submitButton` pero permite especificar un `action` distinto al del formulario. Útil para formularios con múltiples acciones (guardar vs. eliminar).

```gsp
<g:actionSubmit class="btn btn-success" action="update" value="${message(code: 'default.button.save.label')}" />
```

**Renderiza:**
```html
<input type="submit" name="_action_update" class="btn btn-success" value="Guardar"/>
```

---

## g:select

**Frecuencia:** ~10 usos  
**Tipo:** Formulario — dropdown  
**Descripción:** Renderiza un `<select>` HTML. Acepta `from` (colección de opciones), `optionKey`, `optionValue`, `value` (seleccionado) y `noSelection`.

```gsp
<g:select name="horaInicio"
          from="${['00','01','02','03','04','05','06','07','08','09','10','11','12']}"
          value="${turnoInstance?.horaInicio}"
          noSelection="['': 'Seleccione...']"/>
```

**Renderiza:**
```html
<select name="horaInicio" id="horaInicio">
  <option value="">Seleccione...</option>
  <option value="00">00</option>
  <option value="01" selected="selected">01</option>
  ...
</select>
```

---

## g:paginate

**Frecuencia:** ~10 usos  
**Tipo:** Paginación  
**Descripción:** Renderiza controles de paginación (anterior/siguiente/páginas). Requiere `total` con el total de registros. Lee el parámetro `offset` automáticamente.

```gsp
<g:paginate total="${registroInstanceCount ?: 0}" />
```

**Renderiza:**
```html
<div class="pagination">
  <span class="step previous disabled">Anterior</span>
  <span class="currentStep">1</span>
  <a href="/ctrlit/registro/index?offset=10">2</a>
  <a href="/ctrlit/registro/index?offset=10">Siguiente</a>
</div>
```

---

## g:sortableColumn

**Frecuencia:** ~6 usos  
**Tipo:** Tabla — columna ordenable  
**Descripción:** Renderiza un `<th>` con un enlace de ordenación. Alterna entre ASC y DESC al hacer clic. Usa los parámetros `sort` y `order` en la URL.

```gsp
<g:sortableColumn property="fecha" title="${message(code: 'registro.fecha.label', default: 'Fecha')}" />
```

**Renderiza:**
```html
<th class="sortable asc">
  <a href="/ctrlit/registro/index?sort=fecha&order=desc">Fecha</a>
</th>
```

---

## g:field

**Frecuencia:** ~15 usos  
**Tipo:** Formulario — input genérico  
**Descripción:** Renderiza inputs HTML5 de cualquier tipo especificado en `type` (`number`, `email`, `date`, `range`, etc.). Más flexible que `g:textField`.

```gsp
<g:field name="gmt" type="number" step="1" min="-12" max="12" class="form-control" placeholder="-12 a 12"/>
```

**Renderiza:**
```html
<input type="number" name="gmt" id="gmt" step="1" min="-12" max="12" class="form-control" placeholder="-12 a 12"/>
```

---

## g:renderErrors

**Frecuencia:** ~19 usos  
**Tipo:** Manejo de errores  
**Descripción:** Renderiza directamente todos los errores de validación de un bean sin necesitar iterar manualmente. Alternativa compacta a `g:hasErrors` + `g:eachError`.

```gsp
<g:renderErrors bean="${turnoInstance}"/>
```

**Renderiza:**
```html
<ul class="errors">
  <li>El nombre no puede estar vacío</li>
  <li>La hora de inicio es requerida</li>
</ul>
```

---

## g:formatNumber

**Frecuencia:** ~2 usos  
**Tipo:** Formateo numérico  
**Descripción:** Formatea números con separadores de miles, decimales o como porcentaje/moneda, según el `type` y `locale`.

```gsp
<g:formatNumber number="${totalHoras}" type="number" maxFractionDigits="2"/>
```

**Renderiza:**
```html
1.234,56
```
_(formato según locale; en es_CL: punto como miles, coma como decimal)_

---

## g:meta

**Frecuencia:** ~2 usos  
**Tipo:** Metadatos de aplicación  
**Descripción:** Renderiza un valor de los metadatos de la aplicación Grails (definidos en `application.properties` o `build.gradle`), como la versión.

```gsp
<g:meta name="info.app.version"/>
```

**Renderiza:**
```html
3.2.1
```

---

## g:layoutHead

**Frecuencia:** ~8 usos  
**Tipo:** Layout  
**Descripción:** Usado en templates de layout. Renderiza el contenido del bloque `<head>` de la vista hija dentro del layout padre. Sin este tag, los `<script>` y `<link>` de la vista hija no se incluirían.

```gsp
<!-- En layouts/main.gsp -->
<head>
  <title>Mi App</title>
  <g:layoutHead />
</head>
```

**Renderiza:**
```html
<head>
  <title>Mi App</title>
  <!-- contenido del <head> de la vista hija -->
  <script src="/ctrlit/js/turno.js"></script>
</head>
```

---

## g:layoutBody

**Frecuencia:** ~8 usos  
**Tipo:** Layout  
**Descripción:** Usado en templates de layout. Renderiza el `<body>` de la vista hija dentro del layout padre. El equivalente al `yield` en otros frameworks de templating.

```gsp
<!-- En layouts/main.gsp -->
<body>
  <nav>...</nav>
  <g:layoutBody/>
  <footer>...</footer>
</body>
```

**Renderiza:**
```html
<body>
  <nav>...</nav>
  <!-- contenido del <body> de la vista hija -->
  <footer>...</footer>
</body>
```

---

## g:layoutTitle

**Frecuencia:** ~6 usos  
**Tipo:** Layout  
**Descripción:** Renderiza el título definido en la vista hija (`<title>`) dentro del layout padre. Permite que cada vista personalice el `<title>` de la página.

```gsp
<!-- En layouts/main.gsp -->
<title><g:layoutTitle default="ctrlit"/> - Buk</title>
```

**Renderiza:**
```html
<title>Crear Turno - Buk</title>
```

---

## g:pageProperty

**Frecuencia:** ~1 uso  
**Tipo:** Layout  
**Descripción:** Permite a la vista hija pasar contenido con nombre arbitrario al layout padre. Similar a `content_for` en Rails. La vista hija define el bloque con `<content tag="nombre">`.

```gsp
<!-- En layouts/main.gsp -->
<g:pageProperty name="page.nav"/>

<!-- En la vista hija -->
<content tag="nav">
  <ul>...</ul>
</content>
```

**Renderiza:**
```html
<ul>...</ul>
```

---

## g:findAll

**Frecuencia:** ~2 usos  
**Tipo:** Colecciones  
**Descripción:** Filtra una colección usando una expresión Groovy en `expr`. Retorna solo los elementos que cumplen la condición. Poco usado; preferir filtrar en el controller.

```gsp
<g:findAll in="${usuarios}" expr="it?.activo == true">
  <li>${it.nombre}</li>
</g:findAll>
```

**Renderiza:**
```html
<li>Juan Pérez</li>
<li>María González</li>
```

---

## g:passwordField

**Frecuencia:** ~1 uso  
**Tipo:** Formulario — input contraseña  
**Descripción:** Renderiza un `<input type="password">` con el texto enmascarado. El valor nunca se muestra al usuario.

```gsp
<g:passwordField name="pwd" class="form-control" />
```

**Renderiza:**
```html
<input type="password" name="pwd" id="pwd" class="form-control" value=""/>
```

---

## g:javascript

**Frecuencia:** ~2 usos  
**Tipo:** Scripts inline  
**Descripción:** Renderiza un bloque `<script>` con el contenido del body del tag. Aplica escaping correcto. Preferir archivos JS externos en la mayoría de casos.

```gsp
<g:javascript>
  var obraId = ${obraInstance.id};
  console.log(obraId);
</g:javascript>
```

**Renderiza:**
```html
<script type="text/javascript">
  var obraId = 42;
  console.log(obraId);
</script>
```

---

## g:renderException

**Frecuencia:** ~1 uso  
**Tipo:** Debug / errores  
**Descripción:** Renderiza el stack trace completo de una excepción. Solo se usa en la vista de error (`error.gsp`). No debe usarse en vistas de producción.

```gsp
<g:renderException exception="${exception}" />
```

**Renderiza:**
```html
<h2>groovy.lang.MissingPropertyException: No such property...</h2>
<pre>at ctrl.TurnoController.index(TurnoController.groovy:25)
...</pre>
```

---

## f:all

**Frecuencia:** ~3 usos  
**Tipo:** Form fields library  
**Descripción:** Del plugin `fields`. Renderiza automáticamente todos los campos de un bean como un formulario completo. Útil para scaffolding rápido; menos control que renderizar campo a campo.

```gsp
<f:all bean="turno"/>
```

**Renderiza:**
```html
<div class="fieldcontain">
  <label for="nombre">Nombre</label>
  <input type="text" name="nombre" id="nombre" value=""/>
</div>
<div class="fieldcontain">
  <label for="horaInicio">Hora inicio</label>
  <input type="text" name="horaInicio" id="horaInicio" value=""/>
</div>
<!-- ... un bloque por cada propiedad del bean -->
```

---

## f:table

**Frecuencia:** ~1 uso  
**Tipo:** Form fields library  
**Descripción:** Del plugin `fields`. Renderiza una tabla HTML completa con headers y filas a partir de una colección de beans. Útil para scaffolding; poco control visual.

```gsp
<f:table collection="${turnos}" />
```

**Renderiza:**
```html
<table>
  <thead>
    <tr><th>Nombre</th><th>Hora Inicio</th>...</tr>
  </thead>
  <tbody>
    <tr><td>Turno Mañana</td><td>08:00</td>...</tr>
  </tbody>
</table>
```

---

## f:display

**Frecuencia:** ~1 uso  
**Tipo:** Form fields library  
**Descripción:** Del plugin `fields`. Renderiza todas las propiedades de un bean en modo lectura (sin inputs). Útil para vistas `show` generadas por scaffolding.

```gsp
<f:display bean="turno" />
```

**Renderiza:**
```html
<div class="fieldcontain">
  <span class="property-label">Nombre</span>
  <span class="property-value">Turno Mañana</span>
</div>
<!-- ... uno por cada propiedad -->
```

---

_Generado el 2026-04-13 · Basado en análisis de 526 archivos GSP del proyecto ctrlit_

