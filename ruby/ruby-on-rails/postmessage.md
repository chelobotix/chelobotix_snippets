# PostMessage

```ruby
# Haml
%h1 IFrame
= current_user.email
%div
	%iframe#iframe23{:height => "400", :src => "http://127.0.0.1:49586/", :width => "600"}


:javascript
	document.addEventListener('DOMContentLoaded', function() {
		console.log('El DOM de la página principal está completamente cargado.');
		var iframe = document.getElementById('iframe23');
		iframe.onload = function() {
				console.log('El iframe ha sido cargado completamente.');
				iframe.contentWindow.postMessage('I like cookies', '*');
		};
	});
	
	
# sitio del iframe externo
window.addEventListener('message', (event) => {
  // Verifica el origen del mensaje
  // Aquí puedes acceder a `event.data` para obtener el JWT enviado desde Rails
  var jwtToken = event.data.token;
  console.log(`desde JS externo ${event.data}`);

  // Ahora puedes usar el JWT para tus propósitos, como autenticación de API, etc.
});

```
