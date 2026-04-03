# Flash

```ruby
# _message.html.erb
    <%  flash.each do |key,value|%>
        <i class="<%= key == 'notice' ? 'green' : 'red' %> icon"></i>
    <% end %>


# controller

# basic - redirect
flash[:notice] = "User #{@user.username} has been created"

#now - render
flash.now[:alert] = 'There was something wrong with your login details'
```
