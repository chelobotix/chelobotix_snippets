https://learnxinyminutes.com/sorbet/

# Sorbet Ruby - Comandos Basicos

Snippets de los comandos y patrones mas comunes de Sorbet para tipado estatico en Ruby.

## Fragment 1: Setup y strictness levels

```ruby
# frozen_string_literal: true
# typed: strict

class Testo23

end

# Nivel de tipado del archivo - va al inicio de cada archivo
typed: false    # Sorbet no verifica nada (util para empezar la migracion)
typed: true     # Sorbet verifica tipos en metodos con firmas declaradas
typed: strict   # Todos los metodos deben tener firma de tipos
typed: strong   # Igual que strict pero sin T.untyped permitido
```

## Fragment 2: Tipos basicos (T primitivos)

```ruby
# frozen_string_literal: true
# typed: true

# Tipos primitivos de Sorbet
T::Boolean          # true o false
Integer             # numeros enteros
Float               # numeros decimales
String              # cadenas de texto
Symbol              # simbolos :foo
NilClass            # nil
T.untyped           # desactiva el chequeo de tipos (escape hatch)

# Tipo nilable: permite el valor o nil
T.nilable(String)   # String o nil
T.nilable(Integer)  # Integer o nil
```

## Fragment 3: Firma de metodos (sig)

```ruby
# frozen_string_literal: true
# typed: true

class User
  extend T::Sig

  # Metodo sin argumentos que retorna String
  sig { returns(String) }
  def full_name
    "#{first_name} #{last_name}"
  end

  # Metodo con argumentos tipados
  sig { params(name: String, age: Integer).returns(String) }
  def greet(name, age)
    "Hola #{name}, tienes #{age} anos"
  end

  # Metodo que puede retornar nil
  sig { params(id: Integer).returns(T.nilable(User)) }
  def self.find_by_id(id)
    # puede retornar nil si no encuentra el usuario
  end

  # Metodo que no retorna nada (void)
  sig { params(message: String).void }
  def log(message)
    puts message
  end
end
```

## Fragment 4: Structs tipados (T::Struct)

```ruby
# frozen_string_literal: true
# typed: strict

# T::Struct es como un Struct pero con tipos verificados
class Address < T::Struct
  const :street, String        # campo inmutable
  prop :country, String        # campo mutable con prop
  prop :notes, T.nilable(String), default: nil  # campo opcional con default
end

# Uso
address = Address.new(street: "Calle Mayor 1", country: "Spain")
address.street  # => "Calle Mayor 1"
address.notes   # => nil
```

## Fragment 5: Enums tipados (T::Enum)

```ruby
# frozen_string_literal: true
# typed: strict

# T::Enum crea enumeraciones con tipo seguro
class Status < T::Enum
  enums do
    Active   = new
    Inactive = new
    Pending  = new
  end
end

# Uso
user_status = Status::Active
user_status == Status::Active  # => true

# En firmas de metodos
sig { params(status: Status).returns(String) }
def status_label(status)
  case status
  when Status::Active   then "Activo"
  when Status::Inactive then "Inactivo"
  when Status::Pending  then "Pendiente"
  else T.absurd(status)  # error en compilacion si falta un caso
  end
end
```

## Fragment 6: Tipos compuestos

```ruby
# frozen_string_literal: true
# typed: true

# Union types: uno de varios tipos posibles
T.any(String, Integer)          # String o Integer
T.any(String, Integer, Float)   # cualquiera de los tres

# Arrays tipados
T::Array[String]                # array de strings
T::Array[Integer]               # array de integers

# Hashes tipados
T::Hash[String, Integer]        # hash con keys String y values Integer
T::Hash[Symbol, T.untyped]      # hash con keys Symbol y values cualquiera

# Sets tipados
T::Set[String]

# Procs y lambdas tipados
T.proc.params(arg0: Integer).returns(String)   # proc que recibe Integer y retorna String
T.proc.void                                     # proc que no retorna nada

# Ejemplo en firma
sig { params(ids: T::Array[Integer], labels: T::Hash[Symbol, String]).returns(T::Array[String]) }
def process(ids, labels)
  ids.map { |id| labels.fetch(id.to_s.to_sym, "unknown") }
end
```

## Fragment 7: Mixins tipados (T::Helpers y concerns)

```ruby
# frozen_string_literal: true
# typed: strict

module Greetable
  extend T::Sig
  extend T::Helpers

  # Marca el modulo como mixin (no puede ser instanciado directamente)
  interface!

  # Metodo abstracto que las clases que incluyan el modulo deben implementar
  sig { abstract.returns(String) }
  def name; end

  sig { returns(String) }
  def greet
    "Hola, soy #{name}"
  end
end

class Person
  extend T::Sig
  include Greetable

  sig { returns(String) }
  def name
    "Marcelo"
  end
end
```

## Fragment 8: Casting y narrowing de tipos

```ruby
# frozen_string_literal: true
# typed: true

extend T::Sig

# T.cast: le dices a Sorbet que confie en ti sobre el tipo
# Util cuando sabes el tipo pero Sorbet no puede inferirlo
value = T.cast(some_untyped_value, String)

# T.must: asegura que el valor no es nil, lanza error en runtime si lo es
name = T.must(user.name)  # String (no nilable)

# T.let: anota el tipo de una variable local
count = T.let(0, Integer)
items = T.let([], T::Array[String])

# T.reveal_type: muestra el tipo inferido en el output de srb tc (solo para debugging)
T.reveal_type(user.name)  # Sorbet imprimira el tipo en la consola al correr srb tc

# is_a? y case/when hacen narrowing automatico
sig { params(value: T.any(String, Integer)).void }
def process(value)
  if value.is_a?(String)
    puts value.upcase  # Sorbet sabe que es String aqui
  else
    puts value + 1     # Sorbet sabe que es Integer aqui
  end
end
```

## Fragment 9: Comandos CLI de Sorbet

```bash
# Instalar Sorbet en el proyecto
bundle add sorbet sorbet-runtime
bundle exec srb init          # inicializa Sorbet, genera sorbet/ directory

# Verificar tipos estaticamente
bundle exec srb tc            # type check de todos los archivos
bundle exec srb tc path/to/file.rb  # type check de un archivo especifico

# Generar RBIs (Ruby Interface files) para gemas
bundle exec srb rbi gems      # genera RBIs para las gemas del Gemfile

# Actualizar archivos generados
bundle exec srb rbi update    # actualiza todos los RBIs generados
bundle exec srb rbi hidden-definitions  # genera RBIs para metodos dinamicos

# Correr con tapioca (alternativa moderna a srb rbi)
bundle add tapioca
bundle exec tapioca init
bundle exec tapioca gems       # genera RBIs para gemas
bundle exec tapioca dsl        # genera RBIs para DSLs (ActiveRecord, etc)
```

## Fragment 10: Sorbet con Rails (ActiveRecord)

```ruby
# frozen_string_literal: true
# typed: true

# Con tapioca, los modelos de ActiveRecord tienen tipos generados automaticamente
# en sorbet/rbi/dsl/

class User < ApplicationRecord
  extend T::Sig

  # Las columnas de la DB estan tipadas automaticamente por tapioca
  # name: String
  # email: String
  # age: T.nilable(Integer)

  # Puedes anadir firmas a tus propios metodos
  sig { returns(String) }
  def display_name
    "#{first_name} #{last_name}".strip
  end

  sig { params(other: User).returns(T::Boolean) }
  def same_email?(other)
    email == other.email
  end
end
```
