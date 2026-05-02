# Guard Hash

```ruby
#BASIC
objeto.feature1&.name

#otros
params.dig(:nova, :token).present?
params[:nova] && params[:nova][:token].present?
params[:nova].try(:[], :token).present?
params.fetch(:nova, {}).fetch(:token, nil).present?

```

```ruby
#DIG
nested_hash = {
  level1: {
    level2: {
      level3: {
        level4: "Deep Value"
      }
    }
  }
}

nested_hash.dig(:level1, :level2, :level3, :level4)

# or
hash = {
  test: [
    { pi: { dos: 23, tres: 42 } },
    { po: { cuatro: 56, cinco: 78 } }
  ]
}

hash.dig(:test, 0, :pi, :dos)

```
