# Turbo Stream

```ruby
# first way (somename.turbo_stream.erb):
<%= turbo_stream.prepend "quotes", partial: "quotes/quote", locals: { quote: @quote } %>
<%= turbo_stream.update Quote.new, "" %>

#second way (somename.turbo_stream.erb):
<%= turbo_stream.prepend "quotes" do %>
  <%= render partial: "quotes/quote", locals: { quote: @quote } %>
<% end %>


```
