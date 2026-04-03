# JSON

respond: https://www.justinweiss.com/articles/respond-to-without-all-the-pain/


```ruby
# PARSE
parsed_json = JSON.parse(escaped_json_string).deep_symbolize_keys
parsed_json = JSON.parse(escaped_json_string).with_indifferent_access
puts parsed_json[:detail]
```

```ruby
# STRINGIFY
hash.to_json
#o
JSON.generate(hash)
```

```ruby
# ACTION RESPOND TO
def index
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @posts }
      # o si quieres jbuilder
      format.json { render 'index.json.jbuilder', status: :ok }
    end
end
# o directo
render(json: { error: 'Not Authorized' })


# MORE COMPLEX
respond_to do |format|
    format.html do
      if params[:state].present?
        redirect_to params[:state] and return
      else
        redirect_to root_path and return
      end
    end
    format.json do
      # Generate header
      response.headers['Xenvio-Token'] = result[:xenvio_jwt]
      response.headers['Csrf-Token'] = form_authenticity_token
      
      render json: { status: 'JWT generated' }, status: :ok 
    end
end

# SHORTCUT
respond_to :html, :json


# EXCEPT  
render json: @post, except: %i[created_at updated_at]


```

```ruby
#STORE ACCESSORS
# Esto se usa cuando quieres acceder a los atributos de manera individual. 
store :settings, accessors: %i[custom_label_tag1 custom_label_tag2 custom_label_tag3 category], coder: JSON

```


```ruby
# OPEN STRUCT
JSON.parse(response.response.body, object_class: OpenStruct)



response = {
  response: {
    body: '{"name": "John", "age": 30, "address": {"city": "New York"}}'
  }
}

# Parsear el JSON y convertirlo en un OpenStruct
data = JSON.parse(response[:response][:body], object_class: OpenStruct)

# Acceso a propiedades
puts data.name         # Output: John
puts data.age          # Output: 30
puts data.address.city # Output: New York
```

