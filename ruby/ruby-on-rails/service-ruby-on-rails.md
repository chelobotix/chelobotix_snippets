# SERVICE Ruby on Rails

```ruby
# BASE MY_SERVICE SERVICE
module MyService
    class Base
      include ResultUtils::BaseService

      attr_reader :shipment
      private :shipment

      def initialize(shipment:, dependencies:)
        @shipment = shipment
        @sub_service1 = dependencies[:sub_service1]
        @sub_service2 = dependencies[:sub_service2]
        @is_flow_completed = true
      end

      def call
        perform_flow

        set_as_valid! if is_flow_completed
        
      rescue StandardError => e # Esto es para recuperar de algun error en la Transaction
        set_as_invalid!
        set_errors({ service: e.message, code: 500, details: e.message })
      end

      private

      def perform_flow
        ActiveRecord::Base.transaction do
          flow = [:sub_service_1, :sub_service_2]

          flow.each do |step|
            send(step)
            break unless is_flow_completed
          end
        end
      end

      def sub_service_1
        service = @sub_service1.new(shipment:)
        service.call

        mark_as_invalid(service.errors) unless service.valid?
      end

      def sub_service_2
        service = @sub_service2.new(shipment:)
        service.call

        mark_as_invalid(service.errors) unless service.valid?
      end

      def mark_as_invalid(errors)
        @is_flow_completed = false
        set_as_invalid!
        set_errors(errors)
        
        # Esto es si quieres lanzar rollback manual
        # Rails.logger.info '☢️ >>>>>----->  Forcing rollback manually'
        # raise(ActiveRecord::Rollback)
      end
    end
  end
```

```ruby
# SUB_SERVICE
module MyService
  class SubService1
    include ResultUtils::BaseService

    attr_reader :shipment
    private :shipment

    ALLOWED_STATES = %i[shipped].freeze
    private_constant :ALLOWED_STATES

    def initialize(shipment:)
      @shipment = shipment
    end

    def call
      perfom
      set_as_valid!

    rescue ::Errors::StandardServiceError => e
      set_as_invalid!
      set_errors({ service: e.message, code: e.code, details: e.details })
    end

    private

    def perfom
      unless ALLOWED_STATES.include?(shipment.aasm_state.to_sym)
        raise_service_error(:INVALID_SHIPMENT_STATE, "Shipment state #{shipment.aasm_state} is not allowed") # =>Shared
      end
    end
  end
end
```

```ruby
# SHARED
module MyService
  module Shared
    def raise_service_error(code, details)
      raise ::Errors::StandardServiceError.new(
        message: self.class.name,
        code: ErrorCodes::CODES[code],
        details: details
      )
    end
  end
end
```

```ruby
# ERROR CODES
module MY_SERVICE
  module ErrorCodes
      CODES = {
        INVALID_SHIPMENT_STATE: 1001,
        MISSING_SHIPPING_METHOD_CONFIG: 1002,
        NO_RECORD_FOUND: 1003,
        JSON_SCHEMA_VALIDATION_ERROR: 1004,
        USER_ROLE_ERROR: 1005,
        MISSING_MERCHANT: 1006,
        MISSING_MERCHANT_ADDRESS: 1007,
      }.freeze
  end
end

```

```ruby
# DEPENDENCIES
module MyService
  class << self
    def base_dependencies
      {
        sub_service1: SubService1,
        sub_service2: SubService2,
      }
    end
  end
end
```

```ruby
# **** OTHERS:
```

```ruby
# CUSTOM ERROR StandardServiceError
module Errors
  class StandardServiceError < StandardError
    attr_reader :code, :details

    def initialize(message:, code:, details:)
      @code = code
      @details = details
      super(message)
    end
  end
end
```

```ruby
# BASE SERVICE
module ResultUtils
  module BaseService
    attr_reader :errors, :valid

    def valid?
      @valid
    end

  private

    def set_as_invalid!
      @valid = false
    end

    def set_as_valid!
      @valid = true
    end

    def set_errors(errors)
      Rails.logger.error(
        "[#{self.class.name}] Service error - code: #{errors[:code]}, details: #{errors[:details]}"
      ) unless Rails.env.test?   
         
      @errors = errors
    end
  end
end
```
