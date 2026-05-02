# STRUCT RUBY

```ruby
# BASIC
Price = Struct.new(:amount, :currency, keyword_init: true) do
  def initialize(amount:, currency:)
    raise TypeError, "amount must be Numeric" unless amount.is_a?(Numeric)
    raise TypeError, "currency must be String" unless currency.is_a?(String)

    super(amount:, currency:)
  end
end



.
```


```ruby
# WITH SERVICE PATTERN
class GreetingService
  Result = Struct.new(:message, :length, keyword_init: true)  # keyword_init: true es para que los argumentos no sean posicionales.

  attr_reader :result

  def initialize(name)
    @name = name
  end

  def call
    text = "Hola #{@name}"

    @result = Result.new(
      message: text,
      length: text.length
    )
  end
end


# CLIENT
service = GreetingService("Natish")
service.call

service.result.message # => "Hola Natish"
service.result.msg # => Error



.
```
