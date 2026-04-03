# Rake Tasks

```ruby
1. Create a file in lib/tasks/test_task.rake
2. Crear la logica del archivo:
require('csv')

namespace :import do
  desc 'Import users from CSV'
  task(users: :environment) do
    filename = File.join(Rails.root, 'test.csv')
    CSV.foreach(filename) do |row|
      puts row
    end
  end
end


3. rake import:users
```
