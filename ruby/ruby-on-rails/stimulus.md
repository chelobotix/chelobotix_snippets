# Stimulus

## Fragment 1: menu1_controller.js

rails generate stimulus scroll_top

```js
//Crear un controller en app/javascript/controllers/
//test_controller.js

import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="test"
export default class extends Controller {
  static targets = ["my_target"]

  connect() {
    console.log("connected to test controller")
    console.log(this.element) // <div data-controller="test">
  }

  my_click() {
    this.my_targetTarget.textContent = "Hello Works"
    console.log(this.my_targetTarget) // <p data-test-target="my_target">Hello Works</p>
  }
  
  my_func_with_params(e) {
    const nombre = event.params.nombre
  }
}
```

```html
// Crear un elemento HTML que obtenga todo lo que se quiera manejar y ponerle data-controller="test", todos los elementos deben estar dentro del tag

<div data-controller="test">
  <p data-action="click->test#my_click">click me</p>
  
  // data-[controller]-[nombre_param]-param="valor"
  <p data-action="click->test#my_func_with_params" data-test-nombre-param="Marcelo">click me</p> 
  
  <p data-test-target="my_target"></p>
</div>
```

## Fragment 2: Action List

```shell
Acciones/eventos más usados en Stimulus:

Eventos de click y mouse:

click

dblclick

mouseenter

mouseleave

mouseover

mouseout

Eventos de formularios:

submit

change

input

focus

blur

Eventos de teclado:

keydown

keyup

keypress

Acciones/eventos más usados en Stimulus:

Eventos de click y mouse:

click

dblclick

mouseenter

mouseleave

mouseover

mouseout

Eventos de formularios:

submit

change

input

focus

blur

Eventos de teclado:

keydown

keyup

keypress
```

## Fragment 3: Form Rails

```erb
# Siempre es con doble guion si es que el controlador de Stimulus esta dentro de una sub carpeta
<%= form_with model: @user, url: washup_admin_profile_path, method: :patch, local: true, html: { multipart: true, data: { washup_admin__profile__avatar_target: "form" } } do |f| %>

<label data-action="click->washup-admin--profile--avatar#openFilePicker">
  <%= lucide_icon("upload", width: 18, height: 18) %>
  <span>Change Image</span>
</label>
<%= f.file_field :avatar, data: { washup_admin__profile__avatar_target: "fileInput", action: "change->washup-admin--profile--avatar#handleFileSelect" } %>

```
