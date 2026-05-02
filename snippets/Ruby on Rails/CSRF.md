# CSRF

```ruby
skip_before_action :verify_authenticity_token
:verify_authenticity_token unless: -> { request.format.json? }


# GET TOKEN
session[:_csrf_token]
#or
form_authenticity_token

```

> https://medium.com/rubyinside/a-deep-dive-into-csrf-protection-in-rails-19fa0a42c0ef
