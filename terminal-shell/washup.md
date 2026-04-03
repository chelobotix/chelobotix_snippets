# WashUp

```shell
# Levantar con Tailwind
docker compose run --rm -p 3000:3000 -p 3036:3036 web bash -c "BINDING=0.0.0.0 bin/dev"

# Si se necesita isntalar algo de VITE
docker compose run --rm web bash -c "npm install && bin/dev"

```


```shell 
# Correr Capybara
# esto solo si es la primera vez:
DATABASE_URL=postgresql://postgres:postgres@localhost:5432 bundle exec rails db:create db:migrate RAILS_ENV=test

# si no 
DATABASE_URL=postgresql://postgres:postgres@localhost:5432 bundle exec rails db:migrate RAILS_ENV=test
DATABASE_URL=postgresql://postgres:postgres@localhost:5432 HEADLESS=false bundle exec rspec spec/system/washup_admin/companies/toggle_status_spec.rb
```
