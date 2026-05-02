# SQL Rails ORM

```ruby
# FIND
Book.find([1,2])
Book.where("books.id IN (1,2)")
Book.where("books.id = 1 AND books.author_id = 28")

# FIND_BY (to get all results use where)
Book.find_by(title: "Wildfire at Midnight")
User.find_by(name: 'John', last_name: 'Doe')






#
```


```ruby
# INCLUDES 
@box = Box.includes([:shipment, :package]).find(1234)
#Nested siempre al final
@box = Box.includes([:package, shipment: :orders]).find(params[:id])

# *** Los modelos dentro de Where siempre deben ser en plural: nombre de la tabla en la DB
carrier_accounts = CarrierAccount.includes(:shipping_method_configs)
                                 .where(shipping_method_configs: { warehouse_id: 106 })
                                 .distinct


# Varios Nested: 
# Plural o Singular? es facil copias lo que esta en el modelo:
belongs_to :package (singular)
has_many :items (plural)


includes(:package, :items) # Lo que esta en el modelo lo pones en el include
.where(packages: { client_code: "PA06" })  # Aca siemrpe es prlurarl pq asi se llama la tabla en la BD


# Acceder a una relacion
crypto_accounts = self.association(:crypto_account)
crypto_accounts.loaded?
crypto_accounts.target.find { |ca| ca.provider_name == 'dfns' }
#
```

```ruby
# EXITS?
User.exists?(email: "marce@gmail.com") # busca en toda la tabla

# ORDER
Channel.all.order(:name)
Channel.all.order(name: :desc)



# take (devuelve un array con el numero de resultados)
Book.take(5)

# classic SQL
result = ActiveRecord::Base.connection.execute("SELECT * FROM books WHERE condition = 'something';")

# first
Book.first(3)

# WHERE
Book.where("title = 'Vanity Fair'") # return relation 
Book.where(title: "Vanity Fair") # return relation    
Book.where('account_id = :account_id', {account_id: 6}) # return relation 
Book.where('account_id = ? AND some_other = ?', 6, "value")  # return relation
Book.where(id: (15..20)) # range
Book.where(id: [1, 3, 5]) # IN
Book.where.not(id: [1, 3, 5]) # NOT
Book.where(id: 1).or(Book.where(id: 2)) # OR
Book.where(id: 1).where(title: "Vanity Fair") # AND
Book.joins(:author).where(authors: { id: 1 }) # With Join Table
post.likes.where(user_id: id).any? # return true or false
# find_each 
    #(retrieve 1000 record (y default) and start at id: 0 per time) 
    Book.find_each do |book|
        puts book
    end
    # Devolvera 2000 records por baths en default es 1000.
    # Start at 2230 and end at 34500
    Book.find_each(batch_size: 2000, start: 2230, end: 3500, order: :desc) do |book|
        puts book
    end


.
```

```ruby
# LIKE - ILIKE
Book.where("title LIKE ?", "%" + Book.sanitize_sql_like("and") + "%")


.
```


```ruby
# SELECT
Book.select(:title, :price)

.
```


```ruby
# LIMIT
Book.limit(5)
Book.offset(22).limit(5) #offset omite los primeros 22 registros y limit muestra los siguientes 5

```

```ruby
# GROUP BY

SELECT author_id, AVG(price)
FROM books
GROUP BY author_id;
# Agrupa los libros por author_id
# Calcula el promedio (AVG) por cada autor
| author_id | avg_price |
| --------- | --------- |
| 1         | 12.5      |
| 2         | 20.0      |

# Toda columna en el SELECT debe estar: o en el GROUP BY o dentro de una función de agregación (COUNT, SUM, AVG, etc.)

COUNT(*)   -- cantidad
SUM(price) -- total
AVG(price) -- promedio
MAX(price) -- máximo
MIN(price) -- mínimo


Book.select(:title).group(:title).count
Book.group(:title).having('COUNT(*) > 1').count

  #=>  contar por estado y el total
  cr = ChannelRequest.group(:aasm_state).count   # => {"completed"=>1, "pending"=>2, "failed"=>1}
  total = { **cr, "all" => cr.values.sum }






#
```

```ruby
####################
# JOIN (!!! SOLO SI NO USARAS LOS CAMPOS DE LA TABLA JOIN PQ SINO VA A SER N+1)
# SOLO SI NECESITAS FILTRAR CON "SELECT" REGISTROS BASADOS EN RELACIONES
Book.select("books.*, authors.first_name").joins('INNER JOIN authors ON authors.id = books.author_id')
# LUEGO YA PUEDES ITERAR SOBRE TU RESULTADO DE BOOKS PERO NO PUEDES ACCEDER A BOOK.AUTHOR PQ SERA N + 1
####################


#Se usa para ver los campos que tienen relacion (Los libros que tienen un autor asociado)
Book.joins(:reviews).distinct # return a Book object for all books with reviews
Book.joins(:author, :reviews).distinct # return all books with their author that have at least one review
Book.joins(reviews: :customer).distinct # return all books that have a review by a customer

#All CR que tengan el mismo customer_id en ambas tablas y que el campo account_id sea igual a 6
ChannelRequest.joins(:customer_channel).where(customer_channels: {account_id: 6}) 

#Para hacer un join con una tabla relacionada con otra en este caso Package esta relacionado con Account y Account esta relacionada con Warehouse
Package.joins(account: :warehouses)
Package.joins(account: :warehouses).where(warehouses: {id: 102 })

# Para hacer un Join desde CarrierAccount con la ShippingMethodConfig(El id de CarrierAccount tiene que estar en ShippingMethodConfig)
# Una vez que ya tienes unidas las tablas puedes poner una condicion en ShippingMethodConfig
# Como ShippingMethodConfig puede tener varios metodos con el warehouse 6 usamos distict.
carrier_accounts = CarrierAccount.joins(:shipping_method_configs)
                                 .where(shipping_method_configs: { warehouse_id: 106 })
                                 .distinct




#
```


```sql
# SQL JOIN
# INNER JOIN
# Muestra sólo las filas que tienen coincidencias en ambas tablas.
SELECT customers.name, orders.order_date
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id;


# LEFT JOIN
# Muestra todas las filas de la tabla izquierda y las filas coincidentes de la tabla derecha. Si no hay coincidencias, muestra NULL para las columnas de la tabla derecha.
SELECT customers.name, orders.order_date
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;


# RIGHT JOIN
# Muestra todas las filas de ambas tablas. Las coincidencias entre ambas se muestran en una sola fila, y donde no hay coincidencias se rellena con NULL.
SELECT customers.name, orders.order_date
FROM customers
FULL JOIN orders ON customers.id = orders.customer_id;



#
#

```

```ruby
# EXTRACT (https://www.postgresqltutorial.com/postgresql-date-functions/postgresql-extract/)
user = User.where(id: 6).select("EXTRACT(YEAR FROM created_at) AS year").first

```

```ruby
# PLUCK
# obtener un modelo nested
carriers = warehouse.carrier_accounts.includes(:carrier).pluck('carriers.*')

# [[67, "Amazon FBA Sandbox"], [68, "Chazki Sandbox"]]
warehouse.carrier_accounts.includes(:carrier).pluck('carriers.id', 'carriers.name') 
```

```ruby
# INDEX BY
Currency.where(iso_code: ['BOL', 'BRA']).index_by(&:iso_code)

{
  BOL: objeto_currency_de_bol
  BRA: objeto_currency_de_bra
}
```


```ruby
# REFERENCE

# Esto usas cuando haras un where y las condiciones de ese where estan en las relaciones 
@account_provider_user = AccountProviderUser
  .includes(account_provider_country: [:country, :currency, :account_provider])
  .references(:account_provider_countries, :account_providers)
  .where(
    user: @user,
    account_provider_countries: {
      active: true,
      currency_id: @recharge_provider_country&.currency_id
    },
    account_providers: {
      name: @recharge_provider_country.account_provider.name
    }
  )
  .take # Devuelve cualquier registro



.
```


```ruby
# WHEN CASE
# 1. ESTADO DE USUARIO
User.select(<<~SQL.squish)
  *, CASE
    WHEN active = true                                     THEN 'active'
    WHEN active = false AND invitation_accepted_at IS NULL THEN 'pending'
    ELSE                                                        'inactive'
  END AS status
SQL

# 2. RANGO DE EDAD
User.select(<<~SQL.squish)
  *, CASE
    WHEN age < 18  THEN 'minor'
    WHEN age < 65  THEN 'adult'
    ELSE                'senior'
  END AS age_group
SQL

```

```ruby
# ENCADENAR CON CONDICION

STATUS_CONDITION = {
  "active"   => "active = true",
  "pending"  => "active = false AND invitation_accepted_at IS NULL",
  "inactive" => "active = false AND invitation_accepted_at IS NOT NULL"
}.freeze

query = User.all
query = query.where(STATUS_CONDITION[params[:status]]) if params[:status].present?



.
```





















```ruby
# ORDEN DE USO:
# 1 PRELOAD:

# You have no WHERE conditions on associated tables
# Association cardinality is high (many tasks per project)
# You want predictable, separate queries

# Quieres mostrar proyectos con sus tareas, sin filtrar por tareas
Project.preload(:tasks)

# Query 1: SELECT * FROM projects
# Query 2: SELECT * FROM tasks WHERE project_id IN (1, 2, 3...)

# Ideal porque cada proyecto puede tener miles de tareas y un JOIN multiplicaría las filas.



# 2 EAGER_LOAD
* You filter or sort by associated table columns
* You need one query for reporting or SQL-level aggregation
* Row count after join stays reasonable

# Quieres proyectos que tengan tareas con prioridad alta
Project.eager_load(:tasks).where(tasks: { priority: "high" })

# SELECT projects.*, tasks.*
# FROM projects
# LEFT OUTER JOIN tasks ON tasks.project_id = projects.id
# WHERE tasks.priority = 'high'

# Necesitas el JOIN porque estás filtrando por una columna de tasks.




# 3 INCLUDES
* Almost never

```


```ruby
#Filtrar por asociación + cargar datos → joins + preload
Order.joins(:user)
     .where(users: { active: true })
     .preload(:user)
#Reporte pequeño / query puntual → eager_load

#Solo evitar N+1 → preload


.
```

```ruby
# VERIFICAR SI YA ESTA PRECARGADO (SOLO FUNCIONA SOBRE UN REGISTRO NO SOBRE UN ACTIVERECORD:RELATION)
users.association(:country).loaded? # No acepta anidada, si usas Pre Load Manual no afecta en nada pq solo cargara lo que falta.
transaction.sender.association(:country).loaded? # ANIDADA

# Evitar con Pre Laod Manual (esto ya carga sobre el modelo las asocioaciones no necesitas re asignar nada)
users = User.limit(10)

ActiveRecord::Associations::Preloader.new(
  records: users,
  associations: [country: :currency]
).call


# Ejemplo

posts = Post.limit(10)

posts.each do |post|
  unless post.association(:comments).loaded?
    ActiveRecord::Associations::Preloader.new.preload(records: post, associations: :comments).call
  end
  
  post.comments.each { |comment| comment.body }
end



.
```


```ruby
# FIND_BY VS FIND

# Jamas uses find_by para eager_loading pq no usara los datos en memoria.
Post.includes(:comments).each do |post|
  post.comments.find_by(author: current_user) # Genera N+1
end

Post.includes(:comments).each do |post|
# Busca en memoria y si no hay nada precargado recien hace el queary
  post.comments.find{ |comment| comment.author_id == current_user.id } 
end


.
```


```ruby
# ATTACHED
.with_attached_avatar
#or
.includes(documents_attachments: :blob)



.
```


```ruby
# COMPOSE QUERY
query = Book.all

query = query.where(active: true) if params[:active].present?

query = query.where(author_id: params[:author_id]) if params[:author_id].present?

if params[:published_after].present?
  query = query.where("published_at >= ?", params[:published_after])
end

books = query.to_a

```

```ruby
# Metodos que no ejecutan el query
where
joins
includes
preload
eager_load
order
group
having
limit
offset
select
distinct
references
merge

```

```ruby

# Metodos que disparan el query
# Iteración / enumeración
each
map
collect
select
reject
detect
find
# Conversión a colección concreta
to_a
to_ary
entries
# Acceso a un solo registro
first
last
take
second
third
fourth
fifth
# Métodos de búsqueda directa
find_by
find_by!
# Métodos de agregación
count
sum
average
minimum
maximum
pluck
ids
# Métodos booleanos / existencia
any?
empty?
exists?
present?
blank?


```

