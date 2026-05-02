# Validations

```ruby
# Validations
validates :name, presence: true, uniqueness: { case_sensitive: false }
validates :post_counter, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
validates :name, length: { minimum: 6, maximum: 100 }
```

```ruby
# Decimals
validates :cushion_margin,
            numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 },
            format: { with: /\A\d+(\.\d{1,2})?\z/,
            message: 'two decimals max allowed' }
```

```ruby
# Boolean
validates :active, inclusion: { in: [true, false] }
```

```ruby
# ACTIVE STORAGE
validates :logo, content_type: %w[image/svg+xml image/png image/jpeg image/jpg]

```
```ruby
# INCLUDE ACT AS PARANOID
validates :name, presence: true, uniqueness: { conditions: -> { with_deleted } }
```



```ruby
# email
self.email.match?(URI::MailTo::EMAIL_REGEXP)

# o
VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
private_constant :VALID_EMAIL_REGEX
validates :email, presence: true, length: { maximum: 100 }, format: { with: VALID_EMAIL_REGEX }
```



```ruby
#Enum rails 5
STATUSES = %w[action conditional end].freeze
private_constant :STATUSES
validates :category, presence: true, inclusion: { in: STATUSES }
#or
enum status: { pending: 0, accepted: 1, failed: 2 } #para que jale la palabra la columna debe ser de tipo integer en la DB
```



```ruby
# Boolean
validates :active, inclusion: { in: [true, false] }
```



```ruby
# JSON (en este caso el field se llama headers)
validate validate :json_format

def json_format
  begin
    parsed = JSON.parse(headers)
    unless parsed.is_a?(Hash)
      errors.add(:headers, "Invalid JSON")
    end
  rescue JSON::ParserError
    errors.add(:headers, "Invalid JSON")
  end
end
```
  


```ruby
# Validation with scope (en este caso el nombre puede ser unico pero por warehouse si es el mismo nombre y pertenece a otro warehouse no hay lio)
validates :name, presence: true, uniqueness: { scope: :warehouse_id }
```



```ruby
#METHOD
validate :tags_array?

  private

  def tags_array?
    !tags.empty? ? true : errors.add(:tags, 'has to be an array')
  end
  
```

```ruby
# MODIFIERS
validates :name, presence: true, length: { minimum: 8 }, on: :create
validate :name, if: -> { paid? } # paid? es un metodo xD
validate :name, unless: -> { paid? } # paid? es un metodo xD
validates :name, length: { minimum: 8 }, allow_nil: true # Si se ingresa un nombre debe ser minimo 8, tambien se acepta nil
```

```ruby
# With_Options
with_options presence: true do
  validates :name
  validates :email
  validates :password
end
```

```ruby
# Associations (corre las validaciones de la asocioacion tambien)
validates_associated :items
```

```ruby
# URL - URI
def validate_url_format
    uri = ::URI.parse(url)
    errors.add(:url, 'Invalid URL') unless uri.is_a?(::URI::HTTP) || uri.is_a?(::URI::HTTPS)
  end
```

```ruby
# MINIMAMENTE UNA ASOCIOACION - app.warehouse_apps -> minimo debe haber un warehouse_apps
def validate_minimum_one_warehouse_app
  remaining = warehouse_apps.reject(&:marked_for_destruction?)
  errors.add(:base, 'At least one warehouse app is required') if remaining.empty?
end
```

> https://dev.to/daviducolo/rails-model-validation-a-comprehensive-guide-with-code-examples-21mh
