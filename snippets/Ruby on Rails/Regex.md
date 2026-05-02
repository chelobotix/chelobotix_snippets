# Regex

```ruby
# COMPARE
your_string =~ regex
#or
string.match?(/world/)
```

```ruby
# EMAIL
/\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
```

```ruby
# BASE64
^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$
```

```ruby
# SPECIAL CHARACTERS
/[^A-Za-z0-9]/
```

```ruby
# PASSWORD COMPLEXITY VALIDATIONS
def password_complexity
  errors.add(:password, 'must be at least 8 characters.') if password.length < 8

  errors.add(:password, 'must contain a number.') unless password.match?(/\d/)

  errors.add(:password, 'must contain at least 1 uppercase.') unless password.match?(/[A-Z]/)

  errors.add(:password, 'must contain at least 1 lowercase.') unless password.match?(/[a-z]/)

  errors.add(:password, 'must contain at least 1 special character.') unless password.match?(/[^A-Za-z0-9]/)
end
```

