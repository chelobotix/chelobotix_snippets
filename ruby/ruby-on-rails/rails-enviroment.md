# Rails Enviroment

```shell
# DB:CREATE 
RAILS_ENV=test rails db:create
```

```shell
#TABLAS
/Applications/Postgres.app/Contents/Versions/16/bin/psql -U x5 x5demo2_production < /Users/marceloalarcon/Documents/Programming/Shipedge/Dbs/nuevo.sql
```

```shell
# RUN SERVER
rails server -e x5demo2
```

```shell
# config/initializers/01_verify_environment_variables.rb

required_variables = %w[API_KEY API_SECRET]

required_variables.each do |env_name|
 if ENV[env_name].blank?
   raise "Missing environment variable: #{env_name}"
 end
end

# Check all enviroment variables
ENV.keys
```

```shell
# Segun enviroment
RAILS_ENV=production bundle exec rails c
```



