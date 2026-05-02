# RAILS COMMANDS

```sh
gem install rails
rails new Project --database=postgresql -T
rails new Project --api --database=postgresql -T
rails new Project --database=postgresql --css tailwind -T
rails new -j webpack Project --database=postgresql -T
rails new Project -j esbuild -c tailwind
rails _5.2.1_ new Project --database=postgresql -T
 
 
rails server

```

```sh
# Basic Rails app with default configurations
rails new myapp

# Rails app with specific database
rails new myapp --database=postgresql
rails new myapp --database=mysql
rails new myapp --database=sqlite3

# API-only application
rails new myapp --api

# Minimal application without default gems
rails new myapp --minimal

# Rails 7+ with specific frontend configurations
rails new myapp --css tailwind
rails new myapp --css bootstrap
rails new myapp --css bulma
rails new myapp --javascript esbuild
rails new myapp --javascript webpack
rails new myapp --javascript importmap

# Skip specific components
rails new myapp --skip-test
rails new myapp --skip-system-test
rails new myapp --skip-active-storage
rails new myapp --skip-action-mailbox
rails new myapp --skip-action-text
```

```ruby
1. mkdir Test5.2.1
2. cd Test5.2.1/
3. echo 2.7.5 > .ruby-version
4. bundler init
5. Replace in gemfile: gem "rails", '6.0.1'
6. bundle install
7. bundle exec rails new . --force # --force to overrite curent Gemfile
8. bundle update
9. add to gem file: 
    gem 'rails', '~> 5.2.1'
    gem 'sprockets', '~> 3.6.3'
    gem 'pg'
10. update database.yml
11. rails s
```

> https://www.sharmaprakash.com.np/rails/generate-an-application-with-a-specific-rails-version/

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

```shell
# Server Commands
rails server -p 4000          # Run on specific port
rails server -b 0.0.0.0       # Bind to all interfaces
rails server -e production    # Run in specific environment
rails server -d              # Run as daemon

# Console Variations
rails console --sandbox      # Run console in sandbox mode
rails console -e production  # Production console
rails console test          # Test environment console

# Debugging and Information
rails stats                  # Code statistics
rails notes                 # Show TODO/FIXME/OPTIMIZE comments
rails middleware            # Show middleware stack
rails runner 'puts User.count' # Run Ruby code

# Routes Information
rails routes -g users       # Show routes matching pattern
rails routes -c Users      # Show routes for controller
rails routes --expanded    # Display routes in expanded format
```

```shell
# Asset Pipeline Commands
rails assets:precompile              # Compile assets
rails assets:clean                   # Remove old compiled assets
rails assets:clobber                 # Remove compiled assets
rails assets:environment             # Load asset environment
rails assets:precompile:all          # Compile all assets

# Webpacker Specific (if using Webpacker)
rails webpacker:install              # Install Webpacker
rails webpacker:compile              # Compile JavaScript packs
rails webpacker:clean                # Clean old compiled packs
rails webpacker:clobber              # Remove compiled packs
```

```shell
# Hotwire/Turbo Installation
rails turbo:install
rails turbo:install:redis

# Stimulus Installation
rails stimulus:install

# Import Map Commands
bin/importmap pin @hotwired/turbo-rails
bin/importmap pin @hotwired/stimulus
bin/importmap pin lodash --download
bin/importmap json

# CSS Processing
rails css:install:tailwind
rails css:install:bootstrap
rails css:install:postcss
rails css:install:sass
```
