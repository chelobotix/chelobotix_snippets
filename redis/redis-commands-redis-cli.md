# Redis commands redis-cli

gem 'redis', '~> 4.0'  # Especifica la versión adecuada para Rails 5.2.1
gem 'redis-rails', '~> 5.0'

```shell
redis-server
redis-cli
```

```shell
# MONITOR para monitorear los request

set name Marcelo
set usuario1 Ana NX  # => NX - Solo establece la key si NO existe
set usuario1 Ana XX # => XX - Solo establece la key si ya existe
set bomb "booooom" EX 10 # => Con expiracion

get name # => "Marcelo"
del name
getrange name 0 4 # => "Marce"

KEYS '*' # => para ver todas las claves

redis-cli flushall # => Borrar todo
```

```shell
# MAP
mset fName Natasha lastName Alarcon
mget fName lastName
# 1) "Natasha"
# 2) "Alarcon"
```

```shell
# SETEX EXPIRES
SETEX key seconds value
TTL bomb # => Ver el tiempo restante
```

```shell
#LIST lpush or rpush for remove rpop or lpop
lpush country Bolivia
lpush country Brasil

lrange country 0 -1
lindex country 0
```

```shell
# SETS
sadd cities "La Paz" Guayaramerin "Porto Velho"
smembers cities
```


```shell
# HASH
hset my_hash fName Natish age 5
hkeys my_hash #show keys
hvals my_hash #show values
hdel my_hash age #remove key
hget my_hash fName # retrieve key value
```


```shell
# Transaction
multi
set name Luis
set age 5
exec
discard # para anular la TR
```


```ruby
# SCAN
SCAN 0 MATCH el_patron_que_quieras*
#LOOP
def self.scan_pattern(pattern, count = 10)
  cursor = "0"
  keys = []

  loop do
    cursor, found_keys = @redis.scan(cursor, match: "#{pattern}*", count: count)
    keys += found_keys
    break if cursor == '0'
  end

  keys
end
```

```shell
#PUB/SUB CHAT
Terminal 1: SUBSCRIBE canal23
Terminal 2: SUBSCRIBE canal23
Terminal 3: PUBLISH canal23 "Hola"
```

```shell
# KEYSPACE
info keyspace
select 1 #con esto te vas a la BD numero 1
```
