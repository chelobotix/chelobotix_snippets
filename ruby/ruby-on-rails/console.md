# Console

```ruby
# Errors
article.errors.full_messages



# CUSTOM ERROR
shipment.errors.add(:lo_que_quieras, service.errors)



# Valid?
person = Person.new(name: "John Doe")
person.valid?
person.errors.full_messages




# Build
user1.articles.build(title: 'Article 2', description: 'bla bla bla').save




# Toggle
User.find(1).toggle(:admin)




# restart or delete assets
rails assets:clobber





# Enviroment
# Open Rails console in test envoriment
RAILS_ENV=test rails console 
RAILS_ENV=production bundle exec rails console
#check what is the enviroment
Rails.env



# DB NAME
Rails.configuration.database_configuration[Rails.env]["database"]

# DB TABLE LIST
ActiveRecord::Base.connection.tables

# DELETE TABLE
ActiveRecord::Base.connection.drop_table(:table_name)

```
