# CURRENT CLASS - ActiveSupport::CurrentAttributes

```ruby
# app/models/current.rb
class Current < ActiveSupport::CurrentAttributes
  attribute :user, :request_id

def self.user_name
    user&.name || "Guest"
  end
end

# Lo alimentas desde el controlador:

# app/controllers/application_controller.rb
class TestoController < ActionController::Base
  before_action :set_current_attributes

  private

  def set_current_attributes
    Current.user       = current_user  # de devise o tu auth
    Current.ip_address = request.remote_ip
    Current.request_id = request.request_id
  end
end
```
