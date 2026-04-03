# Cookies

## Fragment 1: Basic

https://www.writesoftwarewell.com/how-http-cookies-work-rails/
chrome: chrome://settings/content/all

```ruby
# BASIC
# In Action Controller
cookies[:password_reset] = { value: "true", expires: 1.minute.from_now }

# In JS
:javascript
	$(document).ready(function () {
		var showToast = document.cookie.split('; ').find(row => row.startsWith('password_reset='))
		if(showToast){
			showToast = showToast.split('=')
			if (showToast.length > 0 && showToast[1] === 'true'){
				toastr.info('A recovery password link has been sent to your Email')
			}
		}
	});
	
	
	
#
```


```ruby
# RESPONSE
response.set_cookie(
  'xenvio_session',
  {
    value: result[:xenvio_jwt],
    path: '/',
    expires: 8.hours.from_now,
    secure: Rails.env.production?,
    httponly: Rails.env.production?
  }
)


# REQUEST (no te olvides que el front debe incluir credentials: 'include')
request.cookies['xenvio_session']

# CORE => credentials: true,

#o
cookies['_csrf_token'] =
        {
          value: form_authenticity_token,
          domain: ".shipedge.com", #Que dominios podran ller la cookie
          path: '/',
          same_site: :strict,
          expires: 1.minute.from_now,
          secure: true, # esto es para forzar https
          httponly: false # esto es para que JS pueda leer la cookie o no
        }
        
        
### DOMAIN ### RE IMPORTANTE        
# MULTIPLE DOMAINS: NO EXISTE SOLO SUBDOMAIN CON :all o .shipedge.com  TAMPOCO PUEDES SETEAR PARA OTRO DOMINIO DIFERENTE DEL QUE ESTAS CREANDO
# ESTO ES PARA VER QUE DOMINIOS TENDRAN ACCESO A LA COOKIE O LA PODRAN VER

# SAME SITE: Esto aplica a los request que se hagan hacia el servidor para que el navegador decida si manda o no manda una cookie ya existente.
#   :strict solo el dominio que la genero puede mandarla
#   :lax puede mandar el dominio que la genero y cualquier subdominio
#   :none puede mandar cualquier dominio, es peligroso
# EJEMPLO domain: ".test.com"
1. `same_site: :none`
   - test1.test.com: Puede enviar la cookie.
   - test2.test.com: Puede enviar  la cookie.
   - test3.diferente.com: Puede enviar la cookie.

2. `same_site: :lax`
   - test1.test.com: Puede enviar  la cookie.
   - test2.test.com: Puede enviar en solicitudes GET de nivel superior.
   - test3.diferente.com: No puede enviar la cookie excepto en navegaciones de nivel superior.

3. `same_site: :strict`
   - test1.test.com: Puede enviarla cookie.
   - test2.test.com: Puede enviar y recibir la cookie (mismo sitio).
   - test3.diferente.com: No puede enviar ni recibir la cookie. 



#
```


```ruby
# DELETE
cookies.delete('_xenvio', path: '/', domain: Rails.env.development? ? '127.0.0.1' : ".shipedge.com")


#
```


```ruby
# SI LA INFORMACION ES VITAL Y NO DEBE MODIFICARSE USAR cookies.signed[:user_id]
# Esto hara que la cookie se pueda leer pero si se modifica sera detectado por el backend
# Mira la pestana signed hay una explicacion muy buena 
cookies.signed[:user_id] = {
  value: current_user.id,
  domain: '.example.com',    # Disponible para todos los subdominios
  same_site: :lax,           # Protege contra CSRF en solicitudes de terceros
  secure: true               # Solo se envía en conexiones HTTPS
}


# Para leerla desde el backend:
cookies.signed["_xenvio_#{subdomain}"]
# Parsearla
begin
  payload = JSON.parse(cookies.signed['tu_cookie']).with_indifferent_access
rescue JSON::ParserError
  payload = 'invalid cookie'
rescue StandardError => e
  payload = e
end
```

## Fragment 2: Signed

```shell
La diferencia clave entre **`cookies.signed[:user_id]`** y **`cookies[:user_id]` con `httponly: true`** radica en la **integridad y seguridad** de los datos que se almacenan en la cookie. Ambos enfoques ofrecen seguridad, pero tienen usos distintos en función de lo que necesites garantizar. A continuación, te explico las diferencias y por qué usarías una sobre la otra.

### Diferencia clave

1. **`cookies.signed[:user_id]`**:
   - **Firma criptográfica**: Esta cookie incluye una firma criptográfica generada por Rails usando una clave secreta. Esto garantiza que **nadie puede modificar** el valor de la cookie sin que se detecte.
   - **Verificación de integridad**: Si alguien intenta cambiar el contenido de la cookie (como el `user_id`), la firma ya no coincidirá, y Rails considerará la cookie como inválida.
   - **Garantía de autenticidad**: Usas esto cuando necesitas asegurarte de que el valor almacenado en la cookie es auténtico y no ha sido manipulado en el lado del cliente.
   
2. **`cookies[:user_id]` con `httponly: true`**:
   - **Protección contra acceso en JavaScript**: `httponly: true` evita que la cookie sea accesible desde JavaScript en el lado del cliente, protegiendo contra ataques XSS (Cross-Site Scripting).
   - **No protege contra manipulación**: Aunque el valor de la cookie no puede ser leído por JavaScript, **puede ser manipulado** en el cliente (por ejemplo, usando herramientas como la consola del navegador o aplicaciones de depuración HTTP). Si alguien cambia el valor de `user_id` manualmente, el servidor **no podrá saber** si fue modificado.

### Cuándo usar cada una

1. **Usar `cookies.signed[:user_id]`**:
   - **Autenticidad de datos**: Si el valor de la cookie es crítico para la seguridad de la aplicación (por ejemplo, el `user_id`), usar una cookie firmada te asegura que nadie pueda cambiar el valor sin que el servidor lo detecte. Esto es fundamental en casos donde confías en la cookie para realizar operaciones sensibles, como identificar usuarios autenticados.
   
   - **Ejemplo**: En una aplicación donde los usuarios tienen diferentes permisos basados en su ID, un atacante podría intentar cambiar el `user_id` manualmente para acceder a una cuenta con más privilegios. Con una cookie firmada, este intento será detectado y la cookie será invalidada.
   
   ```ruby
   cookies.signed[:user_id] = {
     value: current_user.id,
     httponly: true,       # Protege contra acceso desde JavaScript
     secure: true          # Solo se envía en conexiones HTTPS
   }
   ```

2. **Usar `cookies[:user_id]` con `httponly: true`**:
   - **Protección XSS**: Si simplemente quieres asegurarte de que la cookie no sea accesible por JavaScript, pero no necesitas proteger la integridad del valor en sí, puedes usar `httponly: true`. Esta opción es adecuada si el valor almacenado no es crítico para la seguridad y solo necesitas evitar que JavaScript lo lea.
   
   - **Ejemplo**: Si necesitas almacenar un valor de configuración o algo que no afecte la seguridad si se modifica (como el idioma preferido de un usuario), `httponly: true` puede ser suficiente.

   ```ruby
   cookies[:user_id] = {
     value: current_user.id,
     httponly: true,       # Protege contra acceso desde JavaScript
     secure: true          # Solo se envía en conexiones HTTPS
   }
   ```

### ¿Por qué usar una cookie firmada si ya tengo `httponly`?

- **`httponly: true`** **evita la lectura en JavaScript**, pero **no impide** que alguien modifique la cookie desde el navegador. Si alguien cambia el `user_id` manualmente en la cookie, el servidor aceptará ese valor sin ninguna verificación adicional.
- **`cookies.signed[:user_id]`** agrega una capa adicional de seguridad, ya que **verifica la integridad** del valor almacenado. Esto es útil cuando el valor de la cookie puede ser crítico, como un identificador de usuario que no debe ser alterado.

### Diferencias con `cookies.signed.permanent`

- **`cookies.signed.permanent`** es simplemente una cookie firmada que tiene una duración mucho más larga (20 años). La puedes usar cuando quieres que el valor de la cookie persista durante mucho tiempo, como en el caso de un "remember me" para usuarios que quieren mantenerse autenticados a lo largo de sesiones prolongadas.

### Conclusión

- **Usa `cookies.signed[:user_id]`** cuando necesitas asegurarte de que el valor de la cookie (como el `user_id`) no ha sido alterado en el lado del cliente. Esto es importante para datos críticos que afectan la autenticación o la lógica de la aplicación.
  
- **Usa `cookies[:user_id]` con `httponly: true`** si solo necesitas evitar que JavaScript acceda al valor, pero no te preocupa si el cliente lo puede modificar. Esto es menos seguro cuando el valor almacenado tiene relevancia para la autenticación o seguridad.

El enfoque más seguro en la mayoría de los casos es combinar **`cookies.signed`** con **`httponly: true`** para garantizar que la cookie no sea ni leída ni manipulada por el cliente.

```
