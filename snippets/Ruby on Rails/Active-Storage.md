# Active Storage

```ruby
class Carrier < ApplicationRecord
  has_one_attached :logo
  
  # Validaciones opcionales pero recomendadas
  validates :logo, content_type: %w[image/svg+xml image/png image/jpeg image/jpg]
  validate :logo_size
  
  private
  
  def logo_size
    return if logo.blank?

    errors.add(:logo, 'can be grater than 5MB') if logo.blob.byte_size > 5.megabytes # or logo.size en Xenvio
  end
end
```


```ruby
# BORRAR TODOS
Carrier.find_each do |carrier|
  carrier.logo.purge # Esto elimina el attachment y el blob
end


.
```

```ruby
# Generar URL
Rails.application.routes.url_helpers.rails_blob_url(carrier.logo, only_path: false)


.
```


```ruby
# Ver si tiene attached y la cantidad
if shipment.documents.attached? && shipment.documents.count > 5



.
```


```ruby
# Document Type manual
def document_type
  return if documents.blank?

  documents.each_with_index do |document, index|
    unless document.content_type.in?(%w[application/pdf image/png image/jpeg image/jpg])
      errors.add(:documents, "Document #{index + 1} is not a valid type")
    end
  end
end


.
```
