# Postgres Terminal

## Fragment 1: Rails

```shell
# CONNECT CONSOLE TERMINAL
/Applications/Postgres.app/Contents/Versions/16/bin/psql -U x5 -d postgres
/Applications/Postgres.app/Contents/Versions/16/bin/psql -U x5 x5_development

# OTHER PORT (DOCKER)
/Applications/Postgres.app/Contents/Versions/16/bin/psql \
  -h localhost \
  -p 6432 \
  -U postgres \
  rails_genius_development

```

```shell
# gem pg
gem install pg -- --with-pg-config=/Applications/Postgres.app/Contents/Versions/16/bin/pg_config

```

```shell
# import sql file
/Applications/Postgres.app/Contents/Versions/16/bin/psql -U x5 x5_development < /Users/marceloalarcon/Documents/Programming/Shipedge/Dbs/nuevo.sql

# Esto es para DUMP FILE
/Applications/Postgres.app/Contents/Versions/16/bin/pg_restore \
  -h localhost \
  -p 6432 \
  -U postgres \
  -d rails_genius_development \
  /Users/marceloalarcon/dump-railway-202411262120.sql
```

```shell
# Fix stale postmaster.pid file on Postgres
cd Library/Application\ Support/Postgres/var-16
rm -rf postmaster.pid
```


```shell
# Create database
rails db:create

# Run all pending migrations
rails db:migrate

# Rollback last migration
rails db:rollback STEP=1

# Reset database (drop, create, migrate)
rails db:reset

# Load seed data
rails db:seed

# Drop database
rails db:drop

# Advanced Database Commands
rails db:migrate:status  # Check migration status
rails db:version        # Show current schema version
rails db:schema:load    # Load schema.rb
rails db:structure:load # Load structure.sql
rails db:setup         # Create, load schema, and seed
rails db:prepare       # Prepare test database
rails db:environment:set RAILS_ENV=production  # Set environment

# Database Maintenance
rails db:schema:cache:clear  # Clear schema cache
rails db:schema:cache:dump   # Create schema cache
rails db:migrate:down VERSION=20230101000000  # Revert specific migration
rails db:migrate:up VERSION=20230101000000    # Run specific migration
```

## Fragment 2: commands

```shell
# all DBs
\l 

# conenct to db
\c db_name

# list all tables
\dt

# table structure
\d+ your_table

# Add column to a table
ALTER TABLE your_table ADD COLUMN uuid VARCHAR NOT NULL;

# Edit field of a table
ALTER TABLE rule_steps ALTER COLUMN uuid SET NOT NULL;

# Drop table
DROP TABLE tblname
```

## Fragment 3: IMPORT DOCKER

```shell
# COPIAR ARCHIVO
docker cp /Users/marceloalarcon/Documents/Programming/VitaWallet/barry_db.sql 806927c2219a7a930c8a6c15792c239e3fccc2976a8293fdbb20b9e87523409a:/tmp/barry.sql

# ENTRAR EN LA TERMINAL POSTGRES
docker exec -it 806927c2219a7a930c8a6c15792c239e3fccc2976a8293fdbb20b9e87523409a

# CONECTARSE CON USUARIO Y NOMBRE DE DB
psql -U postgres -d vita-wallet-api_test -f /tmp/barry.sql

# SI ES UN SQL POSTGRES USAR ESTO
pg_restore -U postgres -d vita-wallet-api_test -v /tmp/barry.sql


```
