# AJAX

```ruby
# en archivo HAML
$('#form-destination').text("#{j(@movie_result)}")

# redirecciona a menos que el request sea AJAX
redirect_to(root_path) unless request.xhr?


# render en la vista .js.haml
$('#target').html("#{j(render 'orders/shipments', shipment: @shipment)}");


#render otro nombre de view cuando haces ajax en el controlador

#1. esto es para explicitamente renderizar una vista move_items_to.js.haml
respond_to do |format|
  format.js { render 'move_items_to' }
end

# 2. En este caso va a renderizar la vista asociada con la accion create2
respond_to do |format|
  format.js { render action: 'create2' }
end



# CONDICIONAL HAML JS AJAX
- if @warning.present?
  :plain
    toastr.warning("#{@warning}")
- else
  :plain
    toastr.success("Box #{@box.id} created.")
    
# OR

result = "#{@result}"
if(result == 'true'){
toastr.success('Box updated')
}else{
toastr.error('There was a problem updating item(s)')
}

```
