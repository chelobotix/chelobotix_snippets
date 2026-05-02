# Turbo Frame

```ruby
#view
<%= form_tag search_crypto_path, data: { turbo_action: "replace" }, method: :get do %>
....

<%= render 'users/crypto', crypto: @crypto %>

#controller
render(
        turbo_stream: turbo_stream.replace(
          'response',
          partial: 'users/crypto',
          locals: { crypto: @crypto }
        )
      )
      
#partial
<%= turbo_frame_tag 'response' do %>
...
<% end %>

```

```ruby
# Source index
<div class="border-[2px] border-black m-3 p-3">
  <h2 class="text-2xl">Basic</h2>
  <%= turbo_frame_tag "about_turbo_frame" do %>
    <%= link_to 'About', about_path, class: "text-lime-500 text-xl" %>
  <% end %>
</div>


# Target about
<%= turbo_frame_tag "about_turbo_frame" do %>
  <div>information about this page</div>
<% end %>


```

```ruby
# index
<div class="border-[2px] border-black m-3 p-3">
  <h2 class="text-2xl">Nested</h2>
  <%= link_to "Update square 2", about_path, data: { turbo_frame: 'square2' }, class:"text-indigo-500 text-xl" %>
  <%= turbo_frame_tag "square2" do %>
    <div>Square 1</div>
  <% end %>
</div>

# about
<%= turbo_frame_tag "square2" do %>
  <div class="bg-lime-700 text-white w-[150px]">Square 2</div>
<% end %>
```

```ruby
# index
<div class="border-[2px] border-black m-3 p-3 flex flex-col gap-5">
  <h2 class="text-2xl">De ida y vuelta</h2>
  <%= turbo_frame_tag "idayvuelta" do %>
    <%= link_to "Open Form", idayvuelta_path, class: "bg-lime-500 text-white p-3"  %>
  <% end %>
  </div>
  
# idayvuelta
<%= turbo_frame_tag "idayvuelta" do %>
    <%= form_with scope: :test, url: processidayvuelta_path do |f| %>
      <%= f.text_field :text, required: true, class: 'w-50' %>
      <%= f.submit "Send", class: 'px-5' %>
    <% end %>
<% end %>

#controller

def idayvuelta; end

def processidayvuelta
redirect_to(root_path, notice: 'Quote was successfully updated.')
end
```

```coffeescript
# If the quote is persisted and its id is 1:
dom_id(@quote) # => "quote_1"

# If the quote is a new record:
dom_id(Quote.new) # => "new_quote"

# Note that the dom_id can also take an optional prefix argument
# We will use this later in the tutorial
dom_id(Quote.new, "prefix") # "prefix_new_quote"


#Equivalence (all are the same)
<%= turbo_frame_tag "quote_#{@quote.id}" do %>
  ...

<%= turbo_frame_tag dom_id(@quote) do %>
  ...

<%= turbo_frame_tag @quote %>
  ...

```
