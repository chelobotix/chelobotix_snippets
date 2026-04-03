# JWT

```ruby
1. bundle add 'jwt'

2 Add class to models
class JsonWebToken
  def self.encode(payload)
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end

  def self.decode(token)
    JWT.decode(token, Rails.application.credentials.secret_key_base).first
  end
end


3. Generate migration (Yo estoy usando devise obviooo)
rails g migration AddJwtTokenToUsers jwt_token


4. en el modelo User
before_save :generate_jwt_token
# en este caso estoy codificando el email del usuario pero puede ser lo que quieras
def generate_jwt_token
    jwt_token = JsonWebToken.encode(email)
    self.jwt_token = jwt_token
end

5. En el Controlador ahora anadi un before action apra verificar
before_action :type_of_request

private

  def type_of_request
    if request.format.json?
      authenticate_token!
    elsif request.format.html?
      authenticate_user!
    end
  end

  def authenticate_token!
    token = request.headers['Authorization'].split(' ').last
    begin
      payload = JsonWebToken.decode(token)
      user = User.find_by(email: payload)
      render(json: { error: 'Not Authorized' }, status: :unauthorized) if user.jwt_token != token
    rescue StandardError => e
      render(json: { error: e }, status: :unauthorized)
    end
  end
  
  
6. Si es API ONLY esto pones en el controlador para que ya no verifique el doble:
skip_before_action :verify_authenticity_token


7. strategies
# devise.rb
config.warden do |manager|
    manager.strategies.add :jwt, Devise::Strategies::JWT
    manager.default_strategies(scope: :user).unshift :jwt
end


module Devise
  module Strategies
    class JWT < Base
      def valid?
        request.headers["Authorization"].present? && request.headers["Authorization"] == '1234'
      end

      def authenticate!
        if request.headers["Authorization"] == '1234'
          puts Rainbow('============ JWT valido! ============').bg(:yellow)
          success! (User.find(1))
        else
          fail!
        end
      end
    end
  end
end
```
