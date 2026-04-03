# Time and Date

https://www.strfti.me/
https://github.com/basecamp/local_time

```ruby
post.created_at.strftime("%B %d, %Y")
```

```ruby
#config/application.rb
config.active_record.default_timezone = :utc

```

```ruby
# FUTURE
Time.zone.now + 20.minutes
# o
20.minutes.from_now
# en UNIX
60.minutes.from_now.to_i
Time.current.advance(months: 1).utc.to_i
Time.current.utc.to_i
1.month.ago.utc.to_i
Time.at(1741887409).advance(months: 1).to_i  # days, years, hours
Time.at(1741887409).advance(months: -1).to_i
```

```ruby
# PAST
60.days.ago
1.day.ago.beginning_of_day
```

```ruby
# TODO EL MES
month = (Time.zone.now.beginning_of_month..Time.zone.now.end_of_month)
#o
month = (Time.zone.now.beginning_of_month.beginning_of_week..Time.zone.now.end_of_month.end_of_week)
```


```ruby
# TIME AGO IN WORDS
<p>Joined at <%= time_ago_in_words(user.created_at) %>, ago</p>
```

```ruby
# HTTP DATE
# Se usa para:
# 1. Headers HTTP
# 2. Cacheo de respuestas
# 3. Validación de contenido modificado
# 4. Comunicación entre servidores web

response.headers['Last-Modified'] = Time.now.httpdate

Time.now.httpdate #"Thu, 06 Oct 2011 02:26:12 GMT"

```


```ruby
# PARSE
begin
  Time.parse(available_date).utc
rescue ArgumentError
  # Handle invalid date format
  nil
rescue TypeError
  # Handle invalid input type
  nil
```
