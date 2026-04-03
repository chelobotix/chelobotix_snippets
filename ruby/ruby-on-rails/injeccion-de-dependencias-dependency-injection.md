# Injeccion de Dependencias - Dependency Injection

```ruby
module Bvnk
  module Customer
    class DependencyContainer
      class << self
        def new_customer_dependencies
          {
            validator: Bvnk::Customer::NewCustomerValidator,
            builder: Bvnk::Customer::NewCustomerBuilder,
            http_client: Bvnk::HttpClient,
            response_handler: Bvnk::ResponseHandler,
            record_creator: Bvnk::Customer::NewCustomerRecord,
            notification_handler: Bvnk::NotificationHandler
          }
        end

        def update_customer_dependencies
          {
            validator: Bvnk::Customer::UpdateCustomerValidator,
            notification_handler: Bvnk::NotificationHandler
          }
        end
      end
    end
  end
end


# Instanciando:
deps = Bvnk::Customer::DependencyContainer.new_customer_dependencies

service = Bvnk::Customer::NewCustomer.new(
  user,
  params,
  currency,
  **deps # inyecta todas las dependencias como keyword arguments
)
```
