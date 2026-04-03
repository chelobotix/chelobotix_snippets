# Threads

## Fragment 1: Basic

https://github.com/ruby-concurrency/concurrent-ruby

https://freedium.cfd/https://medium.com/@raviskit2012/handling-multithreading-in-a-ruby-on-rails-transaction-processing-app-280c502af162

```ruby
Usa threads cuando:

Necesitas alto throughput dentro del mismo proceso web

Estás haciendo muchas llamadas a APIs externas (operaciones I/O-bound)

Quieres procesamiento en paralelo (batching) dentro de un mismo request

Usa Sidekiq / Resque cuando:

El trabajo es de larga duración

El trabajo puede ejecutarse con retraso

El trabajo debe sobrevivir reinicios del servidor
```

```ruby
# EJEMPLO SENIOR
class BatchTransactionService
  THREADS = 5

  def self.process_all_pending
    ids = Transaction.where(status: :pending).pluck(:id)
    pool = Concurrent::FixedThreadPool.new(THREADS)

    ids.each do |id|
      pool.post do
        ActiveRecord::Base.connection_pool.with_connection do
          TransactionProcessor.perform(id)
        end
      end
    end

   pool.shutdown
    pool.wait_for_termination
  end
end
```

```ruby
# En Ruby
def print_number(n)
  sleep 1
  puts n
end

start_time = Time.now
threads = []

numbers = [1,2,3,4]

numbers.each do |n|
  threads << Thread.new {print_number(n)}
end

threads.each(&:join) # El comadno thread.join hace que el programa espere hasta que el thread termine.

puts start_time - Time.now

```

```ruby
# MUTEX (se usa para prevenir race condition)
balance = 100
threads = []
mutex = Mutex.new

10.times do |n|
  threads << Thread.new do
    sleep 0.1
    
    mutex.synchronize do
      balance -= 10
    end
  end
end

threads.each(&:join)

puts balance

```

```ruby
# ActiveRecord::Base.connection_pool.with_connection

# 6️⃣ Analogía simple (clave para tus notas)

# 🧠 Pool = caja con 5 llaves
# 🧵 Thread = persona

# Sin with_connection:

#La persona toma una llave y se va a su casa

# Con with_connection:

#La persona entra, usa la llave y la devuelve

✔ Threads creados manualmente
✔ Scripts concurrentes
✔ Rake tasks
✔ Rails runner
✔ Servicios paralelos

❌ Controllers
❌ Models
❌ Background jobs (Sidekiq ya lo hace)

threads = tx_ids.map do |id|
  Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      TransactionProcessor.perform(id)
    end
  end
end

threads.each(&:join)

```

## Fragment 2: Api Threads

https://workingwithruby.com/wwrt/mutex/

```ruby
class ThreadsController < ApplicationController
  def threads_api; end

  def api_call_slow
    start_time = Time.current
    @response_api = []
    5.times do
      res = HTTParty.get('https://catfact.ninja/fact')
      @response_api << res['fact']
    end
    @time_elapsed = Time.current - start_time
  end

  # FASTER
  def api_call_fast
    start_time = Time.current
    threads = []
    @response_api = []
    mutex = Mutex.new
    
    5.times do
      threads << Thread.new do
        res = HTTParty.get('https://catfact.ninja/fact')
        
        mutex.synchronize {
        @response_api << res['fact']
      }
      end
    end
    threads.each(&:join)
    @time_elapsed = Time.current - start_time
  end
end

```
