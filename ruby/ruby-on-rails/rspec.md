# RSPEC

## Fragment 1: Install and Expects

gem "rspec-rails", "~> 4.0"
rails generate rspec:install
https://devhints.io/rspec

```shell
1. rails generate rspec:install
2. rails g rspec:model Store (para testear modelos)
3. rails generate rspec:controller store (para testear controladores)
```

```ruby
# BEFORES
before(:all) # SOLO SE EJECUTA UNA VEZ PARA TODOS LOS BLOQUES, LOS DATOS PERSISTEN ENTRE EJEMPLO
before(:each) # SE EJECUTA ANTES DE ENTRAR A CADA BLOQUE Y BORRA LOS REGISTROS. ES MEJOR USAR ESTE, LOS DATOS SE LIMPIAN ENTRE EJEMPLOS
before # LO MISMO QUE EACH. AZUCAR SINTACTICO
  
before(:each) do
    ...
end
  
#
```

```ruby
# ALLOW - DOUBLE

# Basic
let(:user) { double("user") }
allow(user).to receive(:name).and_return("Alice")  # => user.name = 'Alice'
# o menos largo (preferible)
let(:user) { "user", name: "Alice" }

# Sobreescribe un metodo de un objeto real
let(:real_user) { User.new(name: "Charlie") }
allow(real_user).to receive(:age).and_return(40)

# Todo un servicio
allow(Fintoc::GetFintocResourceId).to receive(:new).and_return(double(call: nil, valid?: true))
```

```ruby
# CUSTOM HEADER
get sitemap_help_index_path, headers: { HTTP_XENVIO_TOKEN: encode_jwt }
```


```ruby
# EXPECTS
expect(response).to(have_http_status(201))
expect(variable).to be_an_instance_of(Shipment)
expect(record.created_at).to be_kind_of(ActiveSupport::TimeWithZone) # Usar con MATCH no con EQ
expect(response.headers).to(have_key('Xenvio-Token'))
expect(JSON.parse(response.body)).to(have_key('errors'))
expect(jwt).to be_instance_of(String)
expect(hash[:key2]).to be_empty
expect(service[:lock_info]).to(be_present)
expect(service[:lock_info]).to(be_nil)
expect(valor).to(be(true))
expect(post.title).to(eq('New Post'))
expect(text).to include("world")
expect(text.split).to include("world")
expect(result.success?).to(be_truthy)
expect(result.success?).to(be_falsey)
expect(6).to_not(eq(5))
expect(user).to(be_valid)
```

```ruby
# EXPECTATIONS ANTES DE LLAMAR AL SERVICIO
expect(service).not_to receive(:validate_available_accounts)

```

```ruby
# MATCHER - CHANGE
expect { service.call }.not_to change { Box.count }
expect { service.call }.to change { Box.count }.by(0)
expect { service.call }.to change { Box.count }.from(Box.count).to(Box.count + 1)

expect(account_provider_user).to have_received(:update!).with(
          wallet_status: 'w_active',
          is_active: true,
          account_number: 'ES12345678901234567890',
          meta: { code: 'TEST123' }
        )
        
```

```ruby
# REQUIRES
require('rails_helper')
require('ostruct')
```

```ruby
# VARIABLE DE ENTORNO
allow(ENV).to receive(:[]).and_call_original # => esto es para que siga llamando las otras normalmente
allow(ENV).to(receive(:[]).with('pak2go_base_url').and_return('https://test-api.pak2go.com'))
```

```ruby
# VARIABLE DE INSTANCIA
service = described_class.new(shipment)
service.instance_variable_set(:@error, 'mi error')
service.call
```

```ruby
# ARCHIVOS LECTURA ESCRITURA
File.read('spec/fixtures/dummy.pdf') # leer en modo normal
File.binread('spec/fixtures/dummy.pdf') # leer en modo binario
```

```ruby
# IMAGENES - FILES - ACTIVE STORAGE
logo = fixture_file_upload(Rails.root.join('spec/fixtures/files/test_dni.jpg'), 'image/jpg')
```

```ruby
# PARAMS
let(:params) { ActionController::Parameters.new({ data: "my_data" }) }
# Llamas como json: 
post boxes_path, params: params.to_json, headers: @headers


# para hacer la comparacion si el param te sale unpermited necesitas:
new_attributes[:shipment][:services].permit!.to_h
expect(@shipment.services).to(eq(new_attributes[:shipment][:services].permit!.to_h))



.
```

```ruby
# KIND OF

# Usar con MATCH no con EQ
kind_of(ActiveSupport::TimeWithZone)



.
```



## Fragment 2: Template

```ruby
require('rails_helper')
require('ostruct')

RSpec.describe(Wizards::OnBoarding::WarehouseService) do
  let(:account) { Account.find(6) }
  let(:current_user) { User.find(6) }
  let(:order) { Order.create!(warehouse_id: 3, account_id: 6, user_id: current_user.id, order_number: '111111') }
  let(:shipment) { Shipment.create!(order_id: order.id, account_id: 6, warehouse_id: 3, shipment_number: '111111') }
  let(:box) { Box.create!(weight: 1, height: 1, width: 1, length: 1, shipment_id: shipment.id, box_package_uuid: 'XYZ') }
  let(:service) { described_class.new(shipment.boxes, params, mail_type_constraint) }
  let(:params) do
        params_hash = {
          shipment: {
            boxes_attributes: [
              {
                weight: 1,
                box_package_uuid: 'XYZ'
              }
            ]
          }
        }.with_indifferent_access

        ActionController::Parameters.new(params_hash)
      end

  describe '#call' do
    context 'when new Box and new Package(cuando pase esto)' do
      it 'should success without mailtype(se debe retornar esto)' do
      end
    end
  end
end
```

## Fragment 3: LET - ALLOW

```ruby
# Double hara como si fuera un objeto real. El parametro 'Request' no se usa es solamente identificativo.
let(:mock_request) { double('Request', ip: '192.168.1.1') } # => mock_request.ip retornara '192.168.1.1'
let(:mock_shipment) { double('Shipment', id: 999) }


.
```

``` ruby
# MOCK User.current (Xenvio)
let(:account) { Account.find(6) }

before do
  allow(User).to(receive(:current).and_return(current_user))
  allow(current_user).to(receive(:account).and_return(account))
end


.
```

```ruby
# Stub Servicio con result object
let(:mock_service) { instance_double(Bvnk::TuServicio) }
let(:params) { { test: "test1" } }

before do
  allow(Bvnk::TuServicio).to receive(:new).with(params).and_return(mock_service)
  allow(mock_service).to receive(:call)
  allow(mock_service).to receive(:valid?).and_return(true)
end

# todo en uno
allow(Bvnk::WalletUpdater).to receive(:new).and_return(
      instance_double(Bvnk::WalletUpdater, valid?: true, errors: [], call: nil)
    )
    
    
.
```

```ruby
# LAMBDA
let(:wizard_warehouse_service_lambda) { ->(_params, _current_user) { nil } }

allow(wizard_warehouse_service_lambda)
          .to(receive(:call)
                .and_return(result_builder.send(:success, data: { status: 'success', warehouse: { id: 1, name: 'New Warehouse' } })))
                
                
.
```


```ruby
# LOGGER
allow(Rails.logger).to receive(:error)

# Este expect debe estar antes de la llamada al servicio
expect(Rails.logger).to receive(:error).once


.
```


```ruby
# ACTIVE RECORD
allow(AccountProviderUser).to receive(:includes).with([account_provider_country: :currency]).and_return(AccountProviderUser)
allow(AccountProviderUser).to receive(:find_by).with(customer_id: 'test-customer-id').and_return(nil)

allow(box).to(receive(:save!).and_raise(ActiveRecord::ActiveRecordError.new('Validation failed')))
allow_any_instance_of(Box).to receive(:save!).and_raise(ActiveRecord::RecordNotSaved, "No se pudo guardar")

let(:box_double) { double("Box", name: "Test") }
allow(box_double).to receive(:save!).and_raise(ActiveRecord::RecordInvalid)


.
```


```ruby
# JSON validator
allow(JSON::Validator).to receive(:fully_validate).and_return([])


.
```

```ruby
# CALL ORIGINAL
allow(Bvnk::Customer::UpdateCustomerValidator).to receive(:new).and_call_original


.
```


```ruby
# VARIABLE DE INSTANCIA
my_instance_variable = service.instance_variable_get(:@my_instance_variable)

#or
allow(described_class.instance_variable_get(:@account_provider_user)).to receive(:update).with(customer_status: 'verified').and_return(false)


.
```

```ruby
# ANY INSTANCE
allow_any_instance_of(AccountProviderUser).to receive(:update).with(customer_status: 'verified').and_return(false)


.
```

```ruby
# VARIABLE DE ENTORNO
allow(ENV).to receive(:[]).with('BVNK_BASE_URL').and_return(nil)

# Esto permite que otras llamadas a ENV[] funcionen normalmente y solo sobrescribe la clave específica:
allow(ENV).to receive(:[]).and_call_original
allow(ENV).to receive(:[]).with('cubing_token').and_return('no_valid_token')

# Si lo que haces es asignar la variable de entorno a una constante en la clase mejor estubeas la constante:
stub_const('CreateRequester::SECRET', nil)


.
```

```ruby
# CONSTANTE
stub_const('CreateRequester::SECRET', nil)


.
```

```ruby
# ENVIROMENT
allow(Rails.env).to receive(:production?).and_return(false)


.
```

```ruby
# EXCEPCION
# Opción 1: Usando instance_double (más estricto)
let(:update_customer_service) { instance_double(Bvnk::Customer::UpdateCustomer) }

before do
  allow(Bvnk::Customer::UpdateCustomer).to receive(:new)
    .with(parsed_body)
    .and_return(update_customer_service)
  
  allow(update_customer_service).to receive(:call)
    .and_raise(ActiveRecord::RecordInvalid)
end

# Opción 2: Usando double genérico (más flexible)
let(:update_customer_service) { double('UpdateCustomer') }

before do
  allow(Bvnk::Customer::UpdateCustomer).to receive(:new)
    .with(parsed_body)
    .and_return(update_customer_service)
  
  allow(update_customer_service).to receive(:call)
    .and_raise(ActiveRecord::RecordInvalid.new("Error message"))
end

# Opción 3: Más completo con error específico
let(:invalid_record) { double('invalid_record', errors: { base: ['Invalid data'] }) }
let(:update_customer_service) { instance_double(Bvnk::Customer::UpdateCustomer) }

before do
  allow(Bvnk::Customer::UpdateCustomer).to receive(:new)
    .with(parsed_body)
    .and_return(update_customer_service)
  
  allow(update_customer_service).to receive(:call)
    .and_raise(ActiveRecord::RecordInvalid.new(invalid_record))
end


# Opcion 4 Para un modelo
invalid_package = Package.new
invalid_package.errors.add(:base, 'invalid warehouse')

allow_any_instance_of(Package).to(receive(:save!)
  .and_raise(ActiveRecord::RecordInvalid.new(invalid_package)))
  
  
.
```

```ruby
# COOKIES

# PREFERRED:
# ========================================
# 1. USANDO request.cookies EN REQUEST SPECS
# ========================================
# Para request specs, puedes establecer cookies directamente
before do
  cookies['user_token'] = 'abc123'
  # O para cookies firmadas
  cookies.signed['user_id'] = 123
end

# XENVIO
before(:each) do
  @headers = {
    'Content-Type' => 'application/json',
  }

  sign_in(user)

  cookies['_ng_localhost'] = { valid: true }

  allow_any_instance_of(ActionDispatch::Cookies::CookieJar)
    .to(receive(:signed)
          .and_return({ "_ng_localhost" => { valid: true }.to_json }))
end

# COOKIE REAL LEER EN LOS TESTS
jar = ActionDispatch::Cookies::CookieJar.build(request, response.cookies)
value = jar.encrypted["_rails_genius_settings"] # encrypter
value = jar.signed["_rails_genius_settings"] # signed


# CREAR COOKIE REAL ANTES DEL REQUEST:


# ========================================
# 1. STUBBING CON allow_any_instance_of (Tu ejemplo)
# ========================================
# Útil cuando no tienes acceso directo al controller
allow_any_instance_of(ActionDispatch::Cookies::CookieJar)
  .to receive(:signed)
  .and_return({ "_ng_#{subdomain}" => { valid: true }.to_json })

# ========================================
# 2. STUBBING DIRECTO EN CONTROLLER SPECS
# ========================================
# En controller specs tienes acceso a @controller
before do
  allow(controller.send(:cookies)).to receive(:signed)
    .and_return({ user_id: 123 })
end

# ========================================
# 4. STUBBING CON DOUBLE OBJECTS
# ========================================
# Crear un double completo del CookieJar
let(:cookie_jar) { double('cookie_jar') }
let(:signed_jar) { double('signed_jar') }

before do
  allow(controller).to receive(:cookies).and_return(cookie_jar)
  allow(cookie_jar).to receive(:signed).and_return(signed_jar)
  allow(signed_jar).to receive(:[]).with('user_id').and_return(123)
  allow(signed_jar).to receive(:[]=)
end

# ========================================
# 5. STUBBING COOKIES ENCRIPTADAS
# ========================================
allow_any_instance_of(ActionDispatch::Cookies::CookieJar)
  .to receive(:encrypted)
  .and_return({ secure_token: 'encrypted_value' })

# ========================================
# 6. USANDO HELPERS EN FEATURE/SYSTEM SPECS
# ========================================
# Con Capybara
page.driver.browser.manage.add_cookie(
  name: 'user_session',
  value: 'session_value',
  domain: 'example.com'
)

# ========================================
# 7. STUBBING MÚLTIPLES MÉTODOS DE COOKIES
# ========================================
before do
  cookie_jar = instance_double(ActionDispatch::Cookies::CookieJar)
  signed_jar = instance_double(ActionDispatch::Cookies::SignedKeyRotatingCookieJar)
  
  allow(controller).to receive(:cookies).and_return(cookie_jar)
  allow(cookie_jar).to receive(:signed).and_return(signed_jar)
  allow(cookie_jar).to receive(:[]=)
  allow(cookie_jar).to receive(:[]).and_return('plain_value')
  allow(signed_jar).to receive(:[]=)
  allow(signed_jar).to receive(:[]).and_return('signed_value')
end


.
```

```ruby
# HTTP Client (wiiiiiuuu)
let(:http_client) do
  double('HTTP Client').tap do |client|
    allow(client).to receive(:use_ssl=)
    allow(client).to receive(:verify_mode=)
    allow(client).to receive(:read_timeout=)
    allow(client).to receive(:open_timeout=)
    allow(client).to receive(:cert=)
    allow(client).to receive(:key=)
  end
end

let(:response_body) { { test: "testo" }.to_json }

let(:response) { instance_double(Net::HTTPSuccess, body: response_body) }

before do
  allow(Net::HTTP).to receive(:new).and_return(http_client)
  allow(http_client).to receive(:request).and_return(response)
  allow(response).to receive(:is_a?).with(Net::HTTPSuccess).and_return(true)
end


.
```


```ruby
# OR - SATISFY
expect(results[1][:errors][:message]).to satisfy { |msg|
  msg.include?('PG::UniqueViolation') || msg.include?('Seguimos procesando')
}


.
```


```ruby
# Stub a class method
allow_any_instance_of(described_class).to receive(:export_shipment) do |instance|
  instance.instance_variable_set(:@shipment, shipment)
  instance.instance_variable_set(:@error, nil)
end


.
```





## Fragment 4: Request

```ruby
post webhooks_bank_movement_refund_fintoc_path,
             params: json_payload,
             headers: { "CONTENT_TYPE" => "application/json" }
             
# OR
# Opción 1: URL completa como string
post "/webhooks/bank_movement/refund/fintoc",
     params: json_payload,
     headers: { "CONTENT_TYPE" => "application/json" }

# Opción 2: Usando url_for con la ruta nombrada
post url_for(controller: 'webhooks', action: 'bank_movement_refund_fintoc'),
     params: json_payload,
     headers: { "CONTENT_TYPE" => "application/json" }

# Opción 3: Si necesitas la URL completa con dominio
post webhooks_bank_movement_refund_fintoc_url,
     params: json_payload,
     headers: { "CONTENT_TYPE" => "application/json" }

# Opción 4: Definiendo la ruta en una variable
webhook_endpoint = "/webhooks/bank_movement/refund/fintoc"
post webhook_endpoint,
     params: json_payload,
     headers: { "CONTENT_TYPE" => "application/json" }
```

## Fragment 5: Around

```ruby
# AROUND es un hook que envuelve el ejemplo completo, te da control de lo que pasa antes y después de que corra el test.
around do |example|
  # ANTES del test — setea el contexto
  Current.user       = washup_admin_user
  
  example.run  # ← aquí corre el test
  
ensure
  Current.reset  # DESPUÉS del test — limpia el contexto
end
```


## Fragment 6: Factory Bot

```ruby
# Basic
FactoryBot.define do
  factory :user do
    first_name "Aaron"
    last_name  "Sumner"
    email "tester@example.com"
    password "dottle-nouveau-pavilion-tights-furze"
  end
end

FactoryBot.build(:user)
FactoryBot.create(:user)
```


```ruby
# SEQUENCE
FactoryBot.define do
  factory :user do
    first_name "Aaron"
    last_name  "Sumner"
    sequence(:email) { |n| "tester#{n}@example.com" }
    password "dottle-nouveau-pavilion-tights-furze"
  end
end
```

```ruby
# Trait
FactoryBot.define do
  factory :my_model do
    trait :expiring_soon do
      expires_at { 2.hours.from_now }
    end

    trait :expired do
      expires_at { 1.day.ago }
    end
  end
end


create(:my_model, :expiring_soon)
create(:my_model, :expired)
```


```ruby
# LIST
create_list(:unassigned_bank_movement, 3) 

# con cambios ne alguna columna
create_list(:unassigned_bank_movement, 3) do |movement, index|
  movement.external_id = "EXT_#{index + 1}"
end
```

## Fragment 7: VCR

```ruby
# Configuration

# spec/rails_helper.rb
Dir[Rails.root.join('spec', 'support', '**', '*.rb')].sort.each { |f| require f }

# spec/support/vcr.rb
require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = 'spec/cassettes'
  config.hook_into :webmock
  config.ignore_localhost = true
  config.configure_rspec_metadata!
  config.allow_http_connections_when_no_cassette = true

  config.before_record do |interaction|
    %w[
      Authorization
      X-Api-Key
      X-Access-Token
    ].each do |header|
      interaction.request.headers[header]&.map! { "<#{header.upcase.gsub('-', '_')}>" }
    end
  end

  config.filter_sensitive_data('<USPS_USER_ID>') { ENV['usps_user_id'] }
  config.filter_sensitive_data('<USPS_BASE_URL>') { ENV['usps_base_url'] }

  config.default_cassette_options = {
    match_requests_on: [:method, :uri],
    record: :once
  }
end

# RSPEC

VCR.use_cassette('usps_verify_address_success') do
  # WebMock.allow_net_connect!
  service = described_class.new(shipment: shipment)
  service.call

  expect(service).to(be_valid)

end

```

```ruby
# Acceder al body guardado en un casette
cassette_response = JSON.parse(
            VCR.current_cassette.http_interactions.instance_variable_get(:@used_interactions).first.response.body
          ).with_indifferent_access
          
expect(AccountProviderUser.last.customer_id).to eq(cassette_response['reference'])
```


```ruby
# ANULAR VCR PAR AUN TEST
it 'should ...' do
  VCR.turned_off do
    
  end
end
```

## Fragment 8: Worker

```ruby
require 'rails_helper'

RSpec.describe V3::Bvnk::WalletStatusWorker, type: :worker do
  it 'raises a StandardError' do 
       
        # Llamada normal
        worker.perform(nil)
        
        # Si tienes alguna espectativa       
        expect {
          worker.perform(wallet_id)
        }.to raise_error(StandardError, error_message)
  end
end
```

## Fragment 9: Threads

```ruby
it 'handles concurrent rate limit creation correctly when rate limit exists and is expired' do
        create(:rate_limit_to_request, user: user, expiration_date: 1.minute.ago)

        results = []
        threads = []
        wait_until_all_threads_to_start = true

        2.times do
          threads << Thread.new do
            true while wait_until_all_threads_to_start

            ActiveRecord::Base.connection_pool.with_connection do
              service = described_class.new(user)
              service.call
              results << { valid: service.valid?, errors: service.errors, time_stamp: Time.now }
            end
          end
        end

        wait_until_all_threads_to_start = false

        threads.each(&:join)

        binding.break
        # One should succeed, one should fail due to lock
        expect(results[0][:valid]).to be_truthy
        expect(results[0][:errors]).to be_nil
        expect(results[1][:valid]).to be_falsey
        expect(results[1][:errors]).to be_present
        expect(results[1][:errors][:response_status]).to(eq(:too_many_requests))
        expect(results[0][:time_stamp].to_i).to(eq(results[1][:time_stamp].to_i))
      end

```
