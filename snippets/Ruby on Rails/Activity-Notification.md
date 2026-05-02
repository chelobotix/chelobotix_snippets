# Activity Notification

```ruby
1. gem 'activity_notification'

2. rails generate activity_notification:install & db:migrate

3. table user or your target model:
class User < ActiveRecord::Base
  acts_as_target email: :email, email_allowed: false, notifier_name: :name
end

4. en el modelo que emitira las notificaciones hacia el target:
  acts_as_notifiable :users,
                       targets: ->(_movie, _key) { User.all },
                       notifiable_path: :movie_notifiable_path

  after_commit :notify_all_users, on: :create

  def notify_all_users
    notify(:users, key: "movie #{name} created")
  end

  def movie_notifiable_path
    movie_path(self)
  end





5. rails generate activity_notification:views

6. anadir la ruta
notify_to :users, with_devise: :users

# ejemplo de como se puede acceder /users/1/notifications



```
