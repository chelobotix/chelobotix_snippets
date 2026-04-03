# Lazybox

```ruby
1. application.haml
= render_lazybox

2. application.scss
@import 'lazybox';

3. application.js
//= require lazybox

4. Añadi un link que sea REMOTE TRUE
=link_to("New channel", new_channel_path, class: "btn btn-primary btn-sm", remote: true)

4. En la vista que quieras new.js.haml
$.lazybox("#{j(render 'form', channel: @channel, title_modal: "titulo")}")

5. luego creas esto con el nombre de tu accion de Backend
create.js.haml
$.lazybox.close()
window.location.reload()


Listo calixto!

```
