# TURBO basic

## Fragment 1: BASIC

https://www.hotrails.dev/turbo-rails

```ruby
# Rule 1: When clicking on a link within a Turbo Frame, Turbo expects a frame of the same id on the target page. It will then replace the Frame's content on the source page with the Frame's content on the target page.
# Rule 2: When clicking on a link within a Turbo Frame, if there is no Turbo Frame with the same id on the target page, the frame disappears, and the error Response has no matching <turbo-frame id="name_of_the_frame"> element is logged in the console.
# Rules 3: A link can target another frame than the one it is directly nested in thanks to the data-turbo-frame data attribute.

```
```html
<!-- # DOS CONTENEDORES
# Turbo buscara el mismo id "testo_turbo_frame" en el link de destino, si lo encuentra ramplazara por el contenido"
# view 1 -->
<%= turbo_frame_tag "testo_turbo_frame" do %>
  <h1>Testo 1</h1>
  <%= link_to "Go to Testo 2", testo2_path %>
<% end %>

<!-- # view 2 -->
<%= turbo_frame_tag "testo_turbo_frame" do %>
  <h1>Testo 2</h1>
  <%= link_to "return to Testo 1", testo1_path %>
<% end %>



<!-- # TRES CONTENEDORES
# view 1 - frame 1
# Este frame llamara el frame 3 de la otra vista y lo remplazara en el frame 2 -->
<%= turbo_frame_tag "test_turbo_frame" do %>
  <h2>VIEW 1 - Frame 1</h2>
  <%= link_to "Replace frame 2 for frame 3", new_task_path, data: { turbo_frame: "replace" } %>
<% end %>

<!-- # view 1 - frame 2 -->
# Este frame sera remplazado por el frame 3 de la otra vista
<%= turbo_frame_tag "replace" do %>
  <p>TEXT BEFORE REPLACE</p>
<% end %>

<!-- # view 2 - frame 3 -->
# Este frame remplazara el frame 2 en la vista 1
<%= turbo_frame_tag "replace" do %>
  <p>NEW TEXT AFTER REPLACE</p>
<% end %>


<!-- # REMPLAZANDO TODA LA VISTA -->
<!-- # view 1 - frame 1 -->
<%= turbo_frame_tag "new_tweet_turbo_frame" do %>
  <%= link_to "New tweet", new_tweet_path, class: "btn btn-primary", data: { turbo_frame: "_top" } %>
<% end %>

<!-- # view 2 -->
<h1 class="text-2xl font-bold">New Tweet</h1>
<%= render "form", tweet: @tweet %>
<%= link_to "Cancel", tweets_path, class: "btn btn-secondary" %>
```


```ruby
# TURBO STREAM

# Remove a Turbo Frame
turbo_stream.remove

# Insert a Turbo Frame at the beginning/end of a list
turbo_stream.append
turbo_stream.prepend

# Insert a Turbo Frame before/after another Turbo Frame
turbo_stream.before
turbo_stream.after

# Replace or update the content of a Turbo Frame
turbo_stream.update
turbo_stream.replace

# ----------------------- #

# Controller
def testo2
  respond_to do |format|
    format.turbo_stream
  end
end


# View => Rails buscara automaticamente testo.turbo_stream.erb
%h2 VIEW 1 - Frame 1
= link_to "Use Turbo Stream", testo2_path, data: { turbo_stream: true }

= turbo_frame_tag "frame_2" do
  %h2 Frame 2


# Controller
def testo2
  respond_to do |format|
    format.turbo_stream
  end
end


# testo2.turbo_stream.erb 
= turbo_stream.remove "frame_2"



# Prepend and Update
= turbo_stream.prepend "tasks", partial: "tasks/task", locals: { task: @task }
= turbo_stream.update Task.new, ""
```


```ruby
# DOM_ID

dom_id(Post.find(45))       # => "post_45"
dom_id(Post.new)            # => "new_post"

dom_id(Post.find(45), :edit) # => "edit_post_45"
dom_id(Post.new, :custom)    # => "custom_post"

# estas serian las equivalencias:
<%= turbo_frame_tag "task_#{@task.id}" do %>
  ...
<% end %>

<%= turbo_frame_tag dom_id(@task) do %>
  ...
<% end %>

<%= turbo_frame_tag @task %>
  ...
<% end %>





#
```



```js
// EVENTO TURBO RAILS +6
document.addEventListener("turbo:load", () => {
  console.log("turbo");
}); 
```


```ruby
# DISABLE TURBO
<%= link_to "New quote", new_quote_path, data: { turbo: false } %>
<%= form_with model: tweet, html: { id: dom_id(tweet) }, data: { turbo: false } do |f| %>


# ALL APP
# app/javascript/application.js
import { Turbo } from "@hotwired/turbo-rails"
Turbo.session.drive = false


.
```



```erb
<!-- # PREFETCH FALSE -->
<%= link_to "Edit", edit_tweet_path(tweet), data: { turbo_prefetch: false } %>
<!-- o -->
<%= turbo-frame id="tweet_frame" data-turbo-prefetch="false" %>



.
```

```erb
<!-- # Width 100% -->
<%= turbo_frame_tag "security_form1", class: "flex-1 min-w-0" do %>



.
```

```erb
<!-- data-turbo-action="advance" le dice a Turbo que cuando se cargue el frame, agregue una nueva entrada al historial del navegador y actualice la URL. -->
<%= link_to profile_path, data: { turbo_frame: "main_content", turbo_action: "advance" } %>



.
```



## Fragment 2: ACTION CABLE

```ruby
# Esto sirve para actualizar a todos los suscriptores en tiempo real
```
```ruby
# MODEL
class Task < ApplicationRecord
  after_create_commit -> { broadcast_prepend_to "tasks_channel", partial: "tasks/task", locals: { task: self }, target: "tasks" }
  after_update_commit -> { broadcast_replace_to "tasks_channel", partial: "tasks/task", locals: { task: self }, target: "tasks" }
  after_destroy_commit -> { broadcast_remove_to "tasks_channel", partial: "tasks/task", locals: { task: self }, target: "tasks" }
  
  # With active JOBS:
  after_create_commit -> { broadcast_prepend_later_to "quotes" }
  after_update_commit -> { broadcast_replace_later_to "quotes" }
  after_destroy_commit -> { broadcast_remove_to "quotes" } # Este sigue igual pq no hay para JOBS
end

```

```ruby
# VIEW
<%= turbo_stream_from "tasks" %>
    <%= turbo_frame_tag "tasks" do %>
        <%= render @tasks %>
    <% end %>
```

## Fragment 3: Completo

```ruby
# app/controllers/tweets_controller.rb
# =============================================================================
# TWEETS CONTROLLER - Arquitectura Turbo Rails
# =============================================================================
# Este controlador implementa el patrón CRUD usando Turbo para actualizaciones
# sin recarga completa de página. Clave: respond_to con format.turbo_stream
# permite que las acciones create/destroy devuelvan respuestas Turbo Stream.
# =============================================================================

class TweetsController < ApplicationController
  before_action :set_tweet, only: [:show, :edit, :update, :destroy]

  # ---- INDEX ----
  # El frame del formulario inline. El formulario se carga dentro del frame "new_tweet".
  def index
    @tweets = Tweet.all
  end

  def show
    # Vista completa, sin turbo_frame (usa _top al navegar)
  end

  # ---- NEW ----
  # Solo necesario cuando se accede por URL directa (new_tweet_path).
  # En index, el enlace data: { turbo_frame: dom_id(Tweet.new) } carga
  # esta vista DENTRO del frame vacío, sin cambiar la URL.
  def new
    @tweet = Tweet.new
  end

  # ---- CREATE (Turbo Stream) ----
  # respond_to es la pieza clave: cuando el request viene con Accept:
  # Rails renderiza create.turbo_stream.erb
  # en vez de hacer redirect. La vista .turbo_stream.erb define las
  # operaciones DOM (append, update, etc.) que Turbo ejecuta en el index.html.erb.
  def create
    @tweet = Tweet.new(tweet_params)

    if @tweet.save
      respond_to do |format|
        format.html { redirect_to root_path, notice: "Tweet was successfully created." }
        format.turbo_stream  # Renderiza app/views/tweets/create.turbo_stream.erb
      end
    else
      render :new, status: :unprocessable_entity
    end
  end

  # ---- EDIT ----
  # Solo necesario cuando se accede por URL directa (edit_tweet_path).
  # En index, el enlace data: { turbo_frame: dom_id(@tweet) } carga
  # esta vista DENTRO del frame vacío, sin cambiar la URL.
  def edit; end

  # ---- UPDATE ----
  # Igual que create: respond_to permite respuesta turbo_stream.
  # update.turbo_stream.erb envía turbo_stream.replace para actualizar
  # el elemento del DOM sin recargar.
  def update
    if @tweet.update(tweet_params)
      respond_to do |format|
        format.html { redirect_to root_path, notice: "Tweet was successfully updated." }
        format.turbo_stream  # Renderiza app/views/tweets/update.turbo_stream.erb
      end
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # ---- DESTROY (Turbo Stream) ----
  # Igual que create: respond_to permite respuesta turbo_stream.
  # destroy.turbo_stream.erb envía turbo_stream.remove para eliminar
  # el elemento del DOM sin recargar.
  def destroy
    @tweet.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: "Tweet was successfully deleted." }
      format.turbo_stream  # Renderiza app/views/tweets/destroy.turbo_stream.erb
    end
  end

  private

  def tweet_params
    params.require(:tweet).permit(:content)
  end

  def set_tweet
    @tweet = Tweet.find_by(id: params[:id])
    redirect_to root_path, alert: "Tweet not found" if @tweet.blank?
  end
end

```


```erb
<!-- app/views/tweets/index.html.erb -->
<!-- ============================================================================
    INDEX - Página principal con Turbo Frames
    ============================================================================
    Patrón "lazy frame" + "target frame": el enlace New tweet tiene
    data: { turbo_frame: dom_id(Tweet.new) }, lo que hace que al hacer
    clic se cargue new_tweet_path DENTRO del frame vacío (línea 18),
    sin cambiar la URL ni recargar la página.
    El frame "tweets" (línea 22) es el contenedor que recibe los
    turbo_stream.append desde create.turbo_stream.erb. -->


<div class="flex flex-col gap-2">
    <h1 class="text-2xl font-bold">Tweets</h1>

    <%# Target del enlace: el frame que recibirá el contenido de new_tweet_path %>
    <%= link_to "New tweet", new_tweet_path, class: "btn btn-primary", data: { turbo_frame: dom_id(Tweet.new) } %>

    <%# Frame vacío: aquí se inyecta el formulario cuando se hace clic en "New tweet" %>
    <%= turbo_frame_tag dom_id(Tweet.new) %>

    <%# Contenedor de la lista: id="tweets" es el target de turbo_stream.append en create %>
    <%= turbo_frame_tag "tweets" do %>
        <%= render @tweets %>
    <% end %>
</div>
```

```erb
<!-- app/views/tweets/new.html.erb -->
<%# ============================================================================
    NEW - Formulario de creación
    ============================================================================
    Envuelto en turbo_frame_tag dom_id(Tweet.new) para que coincida con
    el target del link en index. Cuando se carga vía link (data: turbo_frame),
    Turbo reemplaza el contenido del frame vacío con ESTE HTML.
    El id del frame debe ser idéntico al data-turbo-frame del link.
%>

<%= turbo_frame_tag dom_id(Tweet.new) do %>
    <h1 class="text-2xl font-bold">New Tweet</h1>

    <%= render "form", tweet: @tweet %>
<% end %>
```

```erb
<!-- app/views/tweets/_tweet.html.erb -->
<%# ============================================================================
    _TWEET - Parcial de cada item en la lista
    ============================================================================
    Cada tweet está envuelto en turbo_frame_tag dom_id(tweet). Esto permite:
    1) Edit: al hacer clic, la respuesta de edit_tweet_path contiene un frame
       con el mismo id → Turbo reemplaza solo este card por el formulario.
    2) Delete: destroy.turbo_stream.erb usa turbo_stream.remove dom_id(@tweet)
       para eliminar este elemento del DOM sin recargar.
    3) Show: turbo_frame: "_top" fuerza navegación completa (salir del frame).
%>

<%= turbo_frame_tag dom_id(tweet) do %>
    <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-bold"><%= tweet.content %></h1>

        <%# _top = navegación completa, ignora frames padre %>
        <%= link_to "Show", tweet_path(tweet), class: "text-blue-600 underline", data: { turbo_frame: "_top" } %>

        <%# Sin turbo_frame: Turbo busca frame con id=tweet_X en la respuesta %>
        <%= link_to "Edit", edit_tweet_path(tweet), class: "text-green-600 underline" %>

        <%# button_to DELETE → si hay turbo_stream, usa destroy.turbo_stream.erb %>
        <%= button_to "Delete", tweet_path(tweet), method: :delete, class: "text-red-600 underline" %>
    </div>
<% end %>

```


```erb
<!-- app/views/tweets/_form.html.erb -->
<%# ============================================================================
    FORM - Parcial reutilizado en new y edit
    ============================================================================
    form_with model: tweet genera automáticamente la URL correcta (create/update)
    y el método POST/PATCH. Turbo intercepta el submit y envía la petición
    con Accept: text/vnd.turbo-stream.html cuando hay turbo_stream.
    El link "Cancel" con data: { turbo_frame: "tweets" } vuelve a cargar
    el frame "tweets" desde la página actual (index), cerrando el form.
%>

<%= form_with model: tweet, html: { id: dom_id(tweet) } do |f| %>
  <% if tweet.errors.any? %>
    <div class="mb-3 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
      <ul class="list-disc list-inside">
        <% tweet.errors.full_messages.each do |msg| %>
          <li><%= msg %></li>
        <% end %>
      </ul>
    </div>
  <% end %>
  <div class="flex flex-col gap-2">
    <%= f.text_field :content, class: "border border-gray-300 rounded-md px-3 py-2 #{'border-red-500' if tweet.errors[:content].any?}" %>

    <%= f.submit "Create Tweet", class: "bg-blue-500 text-white p-2 rounded-md hover:cursor-pointer" %>

    <% if action_name == "new" %>
      <%= link_to "Cancel", tweets_path, class: "btn btn-secondary", data: { turbo_frame: Tweet.new } %>
    <% else %>
      <%= link_to "Cancel", tweets_path(tweet), class: "btn btn-secondary", data: { turbo_frame: "tweets" } %>
    <% end %>
  </div>
<% end %>


```
