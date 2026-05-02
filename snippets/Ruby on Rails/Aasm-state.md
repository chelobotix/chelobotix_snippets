# Aasm state

```ruby
aasm column: 'aasm_state' do
  state :pending, initial: true
  state :sent
  state :accepted
  state :rejected
  state :failed
  state :completed

  after_all_transitions :log_status_change

  event :send_request do
    transitions from: :pending, to: :sent, after: :aasm_send_request
  end

  event :accept do
    transitions from: :sent, to: :accepted
  end

  event :reject do
    transitions from: :sent, to: :rejected
  end

  event :fail do
    transitions from: %i[pending sent], to: :failed
  end

  event :complete do
    transitions from: :accepted, to: :completed
  end
end

private

def log_status_change
  puts(Rainbow("changing from #{aasm.from_state} to #{aasm.to_state} (event: #{aasm.current_event})").bg(:yellow))
end
```
  
```ruby
# current state
model.aasm.current_state
#or
rule.sleeping?
  
  
  
#
```

```ruby
# Change state(solo llamas al evento y si es posible cambiara)
model.accept! # => sent -> accepted



#
```


```ruby
# EXCEPTIONS
AASM::InvalidTransition



#
```


