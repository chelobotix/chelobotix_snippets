# Exceptions  Rescue Begin

```ruby
# BEGIN
attempts = 0
max_attempts = 1

begin
  attempts += 1
  puts "Ejecutando intento #{attempts}"

  # Código que puede fallar
  raise "Error temporal" if attempts < 2

  puts "El código terminó sin errores"

rescue StandardError => e
  puts "Rescatado: #{e.message}"

  # Con retry volvemos a ejecutar desde el begin
  retry if attempts <= max_attempts

else
  # Se ejecuta si NO ocurre ninguna excepción
  puts "Se ejecuta la parte del else porque no hubo errores"

ensure
  # Se ejecuta SIEMPRE, ocurra o no error
  puts "Bloque ensure ejecutado"
end


```

```ruby
# EXCEPTIONS LIST

ActiveRecord::ActiveRecordError
# Cualquier error Active Record

ActiveRecord::RecordNotFound
# Se lanza cuando no se encuentra un registro con el ID dado, por ejemplo con `find`.

ActiveRecord::RecordInvalid
# Ocurre cuando intentas guardar un modelo inválido usando `save!` o `create!`.

ActiveRecord::RecordNotUnique
# Se lanza cuando se intenta guardar un registro que viola una restricción de unicidad en la base de datos.

ActiveRecord::RecordNotSaved
# Cuando un modelo no pudo ser guardado (`save!` falla pero no por validaciones).

ActiveRecord::StaleObjectError
# Se lanza al usar locking optimista y hay un conflicto entre versiones del registro.

ActiveRecord::StatementInvalid
# Error genérico para una sentencia SQL inválida, como errores de sintaxis o columnas inexistentes.

ActiveRecord::Rollback
# No es una excepción real; se utiliza dentro de `transaction` para forzar un rollback sin lanzar excepción.

ActiveRecord::SubclassNotFound
# Cuando Rails no puede encontrar una subclase STI (Single Table Inheritance) en una tabla.

ActiveRecord::AssociationTypeMismatch
# Cuando se asigna un objeto incorrecto a una asociación, por ejemplo, una clase equivocada.

ActiveRecord::ConnectionNotEstablished
# Rails no puede conectarse a la base de datos.

ActiveRecord::ReadOnlyRecord
# Cuando se intenta modificar un registro que fue marcado como de solo lectura (`readonly`).

ActionController::RoutingError
# Se lanza cuando no se encuentra una ruta que coincida con la solicitud.

ActionController::UnknownFormat
# El controlador no puede responder al formato solicitado (por ejemplo, `format.pdf` sin soporte).

ActionController::InvalidAuthenticityToken
# Token CSRF inválido o ausente (protección contra ataques cross-site request forgery).

ActionController::ParameterMissing
# Cuando falta un parámetro obligatorio en `params.require`.

ActionController::BadRequest
# Ocurre cuando la solicitud es inválida, por ejemplo, parámetros mal formateados.

ActionController::UnpermittedParameters
# Se lanza si se reciben parámetros no permitidos cuando se usa `params.permit` estrictamente.

ActionController::UnknownHttpMethod
# Método HTTP no soportado (por ejemplo, PATCH si no está configurado).

ActionController::NotImplemented
# Se lanza cuando una acción aún no ha sido implementada explícitamente.

ActionController::UrlGenerationError
# Error al construir una URL con `url_for` o helpers si faltan parámetros requeridos.

ActionDispatch::Cookies::CookieOverflow
# Cuando el contenido de la cookie excede el tamaño máximo permitido (~4KB).

ActionDispatch::Session::SessionRestoreError
# Error al restaurar la sesión del usuario desde la cookie o almacén.

ActionDispatch::Http::Parameters::ParseError
# Cuando Rails no puede parsear los parámetros enviados (por ejemplo, JSON malformado).

ActiveModel::ValidationError
# Ocurre cuando se intenta guardar un modelo inválido con `save!`.

ActiveModel::UnknownAttributeError
# Se lanza si se intenta asignar un atributo que no existe en el modelo.

ActiveJob::DeserializationError
# Cuando Rails no puede deserializar un objeto al ejecutar un job (por ejemplo, un modelo fue borrado).

ActiveJob::SerializationError
# Cuando Rails no puede serializar un objeto antes de encolarlo (por ejemplo, un tipo no soportado).

TypeError, ArgumentError
# Base64.urlsafe_decode64()

JSON::ParserError
# JSON.parse()

```

```ruby
# RESCUE FROM
class PostsController < ApplicationController
      rescue_from ActionController::ParameterMissing, with: :handle_empty_params
      rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found_exception

def handle_record_not_found_exception(exception)
  if action_name == 'task_executor'
    Rails.logger.info("****#{exception.message}****")
    render(json: { error: exception.message }, status: :bad_request)
  else
    raise(ActiveRecord::RecordNotFound)
  end
end
```
