# Div_for

```ruby
# with ITERATION
= div_for(@posts, :class => "foo") do |post| %>
    = post.title


# with SINGLE OBJECT
= div_for @post do
  %p title:
    = @post.title
```
