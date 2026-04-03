# Json Schema

## Fragment 1: Fragment

gem 'json-schema'
go get github.com/xeipuuv/gojsonschema

```ruby
# ESTO SE USA CUANDO TIENE SUAN ESTRUCTURA JSON COMPLEJA NO PARA UN SOLO MODELO
# Controller
def validate_params
  schema_path = ::Rails.root.join('app/schemas/package_optimization_schema.json').to_s
  errors = JSON::Validator.fully_validate(schema_path, params.to_unsafe_h)

  errors = errors.map { |error| error.gsub(/ in schema file:.*\.json/, '') }

  render(json: { errors: errors, cubing_api: { year: '2024' } }, status: :bad_request) if errors.present?
end



#
```







## Fragment 2: Schema

```json 
// app/schemas/package_optimization_schema.json
{
  "type": "object",
  "required": [
    "cubing"
  ],
  "properties": {
    "cubing": {
      "type": "object",
      "required": [
        "packages",
        "items",
        "UOM"
      ],
      "additionalProperties": false,
      "properties": {
        "packages": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "object",
            "required": [
              "pack_number",
              "weight",
              "max_weight",
              "dimensions"
            ],
            "properties": {
              "pack_number": {
                "type": "string"
              },
              "category": {
                "type": ["number", "null"]
              },
              "transit_days": {
                "oneOf": [
                  {"type": "null"},
                  {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 365
                  }
                ]
              },
              "tags": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "weight": {
                "type": "number",
                "minimum": 0.1
              }
            }
          }
        },
        "items": {
          "type": "array",
          "items": {
            "type": "object",
            "required": [
              "id",
              "quantity",
              "dimensions",
              "weight"
            ],
            "properties": {
              "id": { "type": "integer", "minimum": 1 },
              "sku": { "type": "string" },
              "quantity": {
                "type": "integer",
                "minimum": 1
              },
              "weight": {
                "type": "number",
                "minimum": 0.1
              },
              "category": {
                "type": "string",
                "minLength": 1
              },
              "tags": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "options": {
                "type": "object",
                "additionalProperties": true
              },
              "dimensions": {
                "type": "object",
                "required": ["length", "width", "height"],
                "properties": {
                  "length": { "type": "number", "minimum": 0.1 },
                  "width": { "type": "number", "minimum": 0.1 },
                  "height": { "type": "number", "minimum": 0.1 }
                }
              }
            }
          }
        },
        "UOM": {
          "type": "object",
          "required": ["type", "weight_unit_system", "dims_unit_system"],
          "properties": {
            "type": { "type": "string", "enum": ["box", "envelop", "pallet"] },
            "weight_unit_system": { "type": "string", "enum": ["lb", "oz", "gr"] },
            "dims_unit_system": { "type": "string", "enum": ["ft", "inch", "cm", "m"] },
            "cushion_margin_percentage": { "type": "number", "minimum": 0.1 } 
          }
        }
      }
    }
  }
}
```
