# Jsonapi-Serializer

gem 'jsonapi-serializer'

```ruby
# GENERATOR
rails g serializer Movie name year



class MovieSerializer
  include JSONAPI::Serializer

  attributes :name, :year
  attributes(*Shipment.attribute_names.map(&:to_sym)) # All attributes ;)
  
  #change attribute name (antes era year: 1978 ahora fundation: 1978)
  attribute :fundation, &:year

  #custom attribute that doesn't belog to model
  attribute :custom do |_record|
    'hola bola'
  end
  

  # Overwrite result => year: "in the year of 1967"
  attribute :year do |_record, params|
    "in the year #{object.year}"
    puts params[:tito]
  end

  has_many :reviews
  has_many :rule_actions, if: Proc.new { |_record, params| params && params[:rule_action] == true }
end



def index
  @movies = Movie.all
  options = {
    params: { tito: 'test' },
    include: %i[reviews reviews.user],
    links: { self: 'https://dasd.com' },
    fields: { movie: [:name], reviews: [:description] },
    meta: { total_movies: @movies.count }
  }
  render(json: MovieSerializer.new(@movies, options).serializable_hash.to_json, status: :bad_request)
end




# ERROR FORMAT
{
    "errors": [
        {
            "title": "Invalid controller_action",
            "detail": "Controller action has already been taken",
            "source": {}
        }
    ],
}



# JSON NORMAL FORMAT
data = { shipment: ShipmentSerializer.new(record).serializable_hash[:data][:attributes] }


```
