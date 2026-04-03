# Callbacks Rails

```ruby
# Ver todos los callbacks que se ejecutan en un controlador

# Initializer

# config/initializers/callbacks.rb

class ActionController::Base
  class << self
    CALLBACK_KINDS = [:before, :after, :around].freeze

    CALLBACK_KINDS.each do |kind|
      define_method("#{kind}_actions") do
        _process_action_callbacks.select { |c| c.kind == kind }.map(&:filter)
      end
    end
  end
end

# Using
PostsController.before_actions
=> 
[:verify_authenticity_token,
 :set_site_info,
 :configure_permitted_parameters,
 :authenticate_user!,
 :set_post,
 :set_tags]

PostsController.after_actions
=> [:verify_same_origin_request]

PostsController.around_actions
=> [:turbo_tracking_request_id]
```
