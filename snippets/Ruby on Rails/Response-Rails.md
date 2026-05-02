# Response Rails

```ruby
# RESPOND_TO FORMAT
respond_to do |format|
  format.html { render :show }               # Respuesta HTML
  format.json { render json: @user }         # Respuesta JSON
  format.xml { render xml: @user }           # Respuesta XML
  format.csv { send_data @user.to_csv }      # Respuesta CSV
  format.yaml { render yaml: @user }         # Respuesta YAML
  format.text { render plain: "Success!" }   # Respuesta en texto plano
  format.js { render js: "alert('Success!');" } # Respuesta JavaScript
  format.pdf { send_data generate_pdf(@user), filename: 'user.pdf' } # Respuesta PDF
  format.png { send_data @image.to_png }     # Respuesta imagen PNG
end
```

