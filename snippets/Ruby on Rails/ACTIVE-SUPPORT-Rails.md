# ACTIVE SUPPORT Rails

```ruby
# DEPRECATION
class InboundEasypostTracking < Outgoing
    after_initialize :deprecation_warning

    private

    def deprecation_warning
        ActiveSupport::Deprecation.warn(
            "InboundEasypostTracking is deprecated and should not be used anymore",
            caller_locations(1, 10) # retorna el stack saltando el actual y retorna hasta 10
        )
    end
end

```
