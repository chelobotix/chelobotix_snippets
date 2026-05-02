# BCrypt

```ruby
# model (add to model)
has_secure_password

# console
irb(main):012> user.authenticate("password123")  # true or false


# From scratch
# shell
rails generate model User

class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.timestamps
    end
  end
end


# Compare password
admin_password_hash = User.find_by_email('admin@send.com').encrypted_password
BCrypt::Password.new(admin_password_hash).is_password?(params[:user]['password'])

```

> gem 'bcrypt', '~> 3.1.7'
$ rails generate migration add_password_digest_to_users
