# Generate Rails

```ruby

// Scaffold
# Basic
rails g scaffold Post title:string description:text
# nested with user
rails generate scaffold User::Post title:string user:references




#
```

```ruby
# Undone or Destroy
rails db:rollback
rails destroy scaffold MyFoo
to delete a migration just delete the file before run db:migrate



#
```
 
```ruby
// Model
# Basic
rails generate model User first_name:string age:integer

# For many to many 3# table:
rails generate model Appointment patient:belongs_to doctor:belongs_to

# New Model with foreign key from another that already exists
rails g model Actor name:string movie:references 
t.references :movie, foreign_key: true



#
```

```ruby
#######################POLYMORPHIC#########################################

rails g model Comment content commentable:references{polymorphic}

# Comment model
#(significa que la tabla comments tiene un campo commentable_id y commentable_type)
belongs_to :commentable, polymorphic: true

# Movie model
# (significa que la relacion se guardara en commentable_id y commentable_type como: Movie)
has_many :comments, as: :commentable, dependent: :destroy #(movie se guardara en el campo )






######################################################################
```



```ruby
# RELATIONS
# has many
has_many :posts, foreign_key: :author_id, dependent: :destroy
# belongs_to
belongs_to :author, class_name: 'User'

# many to many
# single table:
# has_many :3 table, dependent: :destroy
# has_many :2 sigle table, through: :3 table
has_many :article_categories, dependent: :destroy
has_many :categories, through: :article_categories
# 3 table:
belongs_to :article




#
```


```ruby
//CONTROLLERS (plural)
rails generate controller Users new create
rails g controller invitation_tokens create

#without a View
rails generate controller Users --no-helper --no-assets --no-template-engine --no-test-framework




#
```




```ruby
//API-ONLY
rails g controller api/v1/products index show --no-helper --no-assets --no-template-engine --no-test-framework
rails g model Post title body:text image_url tags words:integer user:references --no-helper --no-assets --no-template-engine --no-test-framework
# Api and Model already exists
rails g scaffold_controller api/v1/group name:string --api --model-name=Group
# Api, Model already exists and references to other models *third table*
rails g scaffold_controller rend user:references group:references --api --model-name=Member



#
```



```ruby 
// Stimulus
rails g stimulus notifications
// Mini Test
rails generate test_unit:scaffold category #for all controllers
rails generate integration_test create_category
# run only one kind of test
rails test test/controllers



#
```

```ruby
# Channels
rails generate channel chatroom



#
```

```ruby
# Resouce
rails generate resource UserStock user:references crypto:references
#for api
rails g resource Trigger --no-helper --no-assets --no-template-engine --no-test-framework



#
```





  


```ruby
#BASIC Migration

# CREATE
rails generate migration CreateProducts name:string

# ADD COLUMN(S)
rails generate migration AddSkuToProducts

# REMOVE COLUMN
rails generate migration RemoveSkuFromProducts

# ADD REF OR FOREIGN KEY(add foreign key from user to products)
rails generate migration AddUserRefToProducts users:references 

# CREATE JOIN TABLE
rails generate migration CreateJoinTableUserProduct user product

# CHANGE TABLE NAME
rails generate migration RenameOldTableNameToNewTableName

# CHANGE COLUMN DEFAULT


```

```ruby
# Add Column
class AddDescriptionsToArticles < ActiveRecord::Migration[7.1]
  def change
    add_column :articles, :description, :text
  end
end


# Alter Rename column name
rails generate migration RenameUrlInRules

class RenameUrlInRules < ActiveRecord::Migration[7.0]
  def change
    rename_column :rules, :old_column_name, :new_column_name
  end
end


# Change column data type
rails generate migration change_column_type_in_users
# then...
class ChangeColumnTypeInUsers < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :bio, :text
  end
end


# Deleted_at TIMESTAMP
t.datetime :deleted_at, index: true


# Add Default
change_column_default :table_name, :column_name, 'default_value'
```

```ruby
# DECIMAL
# precision: numero total de digitos, scale: numero total luego del punto
add_column :warehouses, :cushion_margin, :decimal, default: 0.00, precision: 4, scale: 2
t.decimal :cushion_margin, default: 0.00, precision: 2, scale: 2
```
 
```ruby
# REFERENCES
# New
t.references :other_table(singular), foreign_key: true

# Update
add_reference :books, :author, foreign_key: true # crea author_id en books

add_reference :products, :author, foreign_key: { to_table: :users } #crear author_id referenciado a la tabla users
add_reference :books, :author, foreign_key: true, null: true # puede ser NULL
```


```ruby
# AUTOREFERENCIA o SELF - REFERENTIAL - Self Joins
# modelo 
# replies es el nombre con que vas a acceder comment.replies
belongs_to :parent_comment, class_name: 'Comment', optional: true
has_many :replies, class_name: 'Comment', foreign_key: :parent_comment_id, dependent: :destroy
# migration
def change
    create_table :comments do |t|
      t.text :body, null: false
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true
      t.references :parent_comment, foreign_key: { to_table: :comments }

      t.timestamps
    end
  end
```


```ruby
# ADD INDEX
# Si la tabla ya existe:
rails generate migration AddUniqueIndexToGender
#la tabla se llama user y el index que anadiremos es para la columna gender
add_index :users, :gender


# Si se esta creando la tabla:
class CreatePackageTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :package_types do |t|
      t.string :type

      t.timestamps
    end

    add_index :package_types, :type, unique: true
  end
end




# Add unique constrait for one or more columns (la combinacion entre esas dos keys debe ser unica)
rails generate migration AddUniqueConstraitToCustomApps
add_index :orders, [:user_id, :product_id], unique: true

#or con nombre
add_index :best_rate_configs,
              [:best_rate_id, :shipping_method_config_id],
              unique: true,
              name: 'idx_uniq_best_rate_ship_cfg'


```

```ruby
# Add Constrait
def change
    change_column_null :warehouse_apps, :url, false
    change_column_null :warehouse_apps, :headers, false, default: {}
  end
```

```ruby
# Column Properties
change_column :movies, :title, :string, null: false, default: '', unique: true
t.string :username, null: false, default: ''

# ARRAY
t.string :tags, array: true, default: []


#JSON
t.json :tags, default: {}

```

```ruby
# TYPES
:binary
:boolean
:date
:datetime
:decimal
:float
:integer
:json
:jsonb
:primary_key
:string
:text
:time
:timestamp
```

```ruby
# RE RUN MIGRATION REDO
rails db:migrate:redo VERSION=20240521192746_create_rule_actions.rb
```

```ruby
# DELETE MIGRATION (esto en la tabla de la bd schema_migration)
delete from schema_migrations where version = '201503......'
```







```ruby
# Cambiar el nombre del Index(Indice) en la clave foranea
t.references :third_party_shipment_app,
             foreign_key: true,
             index: { name: 'index_tpsa_reports_on_tpsa_id' } 

```

```ruby
# TIME STAMP

# Esto guardara en UTC y luego ya si quieres lo conviertes a lo que quiereas asi: p.created_at.in_time_zone("Caracas")

create_table :posts do |t|
  t.string :title
  t.text :body

  # Aseguramos que los timestamps sean con zona horaria
  t.timestamptz :created_at, null: false, default: -> { "CURRENT_TIMESTAMP" }
  t.timestamptz :updated_at, null: false, default: -> { "CURRENT_TIMESTAMP" }
end
```

```ruby
# CONDICIONAL
rails g migration add_warehouse_id_to_print_users

# Columna normal
class AddCommentsGiftToOrders < ActiveRecord::Migration[5.2]
  def up
    add_column :orders, :comments_gift, :text unless column_exists?(:orders, :comments_gift)
  end

  def down
    remove_column :orders, :comments_gift if column_exists?(:orders, :comments_gift)
  end
end



# Relacion
class AddWarehouseIdToPrintUsers < ActiveRecord::Migration[5.2]
  def up
    return if column_exists?(:print_users, :warehouse_id)

    add_reference :print_users, :warehouse, index: true, foreign_key: true
  end

  def down
    return unless column_exists?(:print_users, :warehouse_id)

    remove_reference :print_users, :warehouse, index: true, foreign_key: true
  end
end

```

```ruby
# CUANDO SE REQUIERE UN MODELO
class MigracionConBuenasPracticas < ActiveRecord::Migration[7.0]
  category :backfill_fix
  disable_ddl_transaction!

  class EmployeeMock < ApplicationRecord
    self.table_name = 'employees'
  end

  def up
    EmployeeMock.in_batches do |batch|
      batch.update_all foo: 'bar'
    end
  end
end
# o

def up
  execute <<~SQL
    UPDATE employees
    SET foo = 'bar'
  SQL
end


.
```




> https://edgeguides.rubyonrails.org/active_record_migrations.html#schema-dumping-and-you
