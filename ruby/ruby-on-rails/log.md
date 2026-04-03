# Log

https://thoughtbot.com/blog/supercharge-your-rails-logs-with-tags

```ruby
Rails.logger.error("⛔ >>>>>-----> #{e}\n")
Rails.logger.info("⚠️ >>>>>----->  #{text}")
Rails.logger.info '☢️ >>>>>----->  text'


Rails.logger.tagged("tag") do
  Rails.logger.info "*******************#{text}*******************************"
end

# Buscar en produccion
tail -f log/production.log | grep tag

# Vaciar el archivo en produccion
truncate -s 0 log/production.log

```

```ruby
# TIPOS
Rails.logger.debug "Este es un mensaje de depuración."
Rails.logger.info "El usuario inició sesión correctamente."
Rails.logger.warn "Se intentó acceder a un recurso no autorizado."
Rails.logger.error "Error al procesar el pago: #{e.message}"
Rails.logger.fatal "Fallo crítico: el sistema no pudo conectarse a la base de datos."
Rails.logger.unknown "Evento desconocido ocurrió: datos inesperados recibidos."

```


```ruby
# SILENCE para operaciones que no quieres que se muestren en los logs
ActiveRecord::Base.logger.silence do
  access_token_value.update!(value: response_body['access_token'])
end
```


```ruby
# POR TIPO CON CALLER O SIN

def log_error(message, with_caller: false)
  base = "[#{self.class}] #{message}"
  
  if with_caller
    # caller(1..1) te da SOLO la primera línea del stack, no todo
    location = caller(1..1).first
    Rails.logger.error("#{base} at #{location}")
  else
    Rails.logger.error(base)
  end
end
```

```ruby
# CONFIG
Rails.application.config.filter_parameters += [:password]
Rails.application.config.log_tags = [:request_id]
```
