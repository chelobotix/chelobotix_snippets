# Vita Wallet

## Fragment 1: API

```shell
GitLab: Google_Account -> marcelo@vitawallet.io
SSH: ssh-ed25519 <SSH_PUBLIC_KEY> vitawallet@gitlab.com
Access Token: <GITLAB_ACCESS_TOKEN>
Feed Token: <GITLAB_FEED_TOKEN>
Email token: <GITLAB_EMAIL_TOKEN>
```



```shell

# Esta tienes que usar
git clone git@gitlab-vitawallet:VitaWallet/alejandra-web.git

# En emergencias
git clone https://marcelo143:<GITLAB_ACCESS_TOKEN>@gitlab.com/VitaWallet/alejandra-web.git
```


```shell
# STAGE/QA
https://admin.stage.vitawallet.io/login
https://admin.qa.vitawallet.io/login

https://qa.vitawallet.io/

marcelo+admin@vitawallet.io
12345678

# ADMIN
https://admin.vitawallet.io/
marcelo+admin@vitawallet.io
<ADMIN_PASSWORD>


# USERS
marcelo+user1@vitawallet.io # Chile
marcelo+user2@vitawallet.io # Argentina
marcelo+user3@vitawallet.io # BTC USDT USD EUR DOLAR CLP
marcelo+mexico@vitawallet.io # Mexico
marcelo+admin@vitawallet.io # Admin
marcelo+cripto1@vitawallet.io # btc usdt usdc usd clp ars col b2c
marcelo+b2c_api@vitawallet.io # B2C API

<USERS_PASSWORD>

# USERS QA 
santiago+empre@vitawallet.io  # Empresa Chile Qwer1234
marcelo+empresa@vitawallet.io
marcelo+user1@vitawallet.io # Chile
marcelo+user2@vitawallet.io # Argentina

# USERS STAGE
marcelo+empre@vitawallet.io
marcelo+user1@vitawallet.io # Chile
marcelo+user_arg@vitawallet.io # Argentina
derly+b2b13@vitawallet.io	<USERS_PASSWORD>
```
```shell
# ALEJANDRA WEB
git clone https://gitlab.com/VitaWallet/alejandra-web.git

[submodule "src/dumdee"]
	path = src/dumdee
	url = https://gitlab.com/VitaWallet/dumdee.git
[submodule "src/wallet"]
	path = src/wallet
	url = https://gitlab.com/VitaWallet/wallet.git
	
git submodule update --init --recursive

NODE 22.17.1
```

```shell
# FINTOC
https://dashboard.fintoc.com/
soporte@vitawallet.io
<FINTOC_PASSWORD>

RUT 41614850-3
jonsnow

```

```shell
# NO ADMIN PASSWORD AUTH

# class V1::Admin::BaseController < ApplicationController

def check_admin!
    # unless authenticate_user! && current_user.admin? && current_user.admin
    #   raise Pundit::NotAuthorizedError, "No estás autorizado para realizar esta acción"
    # end
  end

  def auth_user
    current_user = User.find(1467)
    # unless authenticate_user!
    #   raise Pundit::NotAuthorizedError, "No estás autorizado para realizar esta acción"
    # end

    current_user.update(source_biometric: 'admin') if current_user.admin?
  end
  

# 
def check_permission(permission, target_id = nil, target_name = nil, field = nil, is_render = true)
    current_user = User.find(1467)
    current_user.role_id = 1
    if current_user.active?
      action = PermissionService.new(current_user, permission)
      if action.has_access
        create_action_log(permission, target_id, target_name, true, field)
        true
      else
        create_action_log(permission, target_id, target_name, false, field)
        render json: { :error => "El usuario no posee permisos para realizar esa acción"}, status: :unauthorized if is_render
        return
      end
    else
      render json: { :error => "El usuario esta baneado, no puede realizar acciones en el sistema."}, status: :unauthorized if is_render
      return
    end
  end
```


```shell
# SIDEKIQ
http://localhost:3000/api/sidekiq
soporte@vitawallet.io
<SIDEKIQ_PASSWORD>

#En local
docker compose run --rm --service-ports api bundle exec sidekiq 
# le das ctrl c luego en otra terminal:
docker exec -it my_container bash
rails s -b 0.0.0.0

```

```shell
# RE GENERAR SCHEMA
rails db:schema:dump
```


```shell
# COVERAGE
open coverage/index.html
```

```shell
# MERGE FROM MASTER
git merge --no-ff master
```

```shell
# GCLOUD
gcloud cloud-shell ssh --authorize-session --project=vita-wallet-api-qa-2

pass: <GCLOUD_PASSWORD>

kep-stg
kep-qa

RAILS_ENV=qa rails c


# Conexion:
Esto poner en bash al final:
alias kuc-qa='kubectl config use-context gke_vita-wallet-api-qa-2_us-central1_gke-vw-qa-management'
alias kuc-stg='kubectl config use-context gke_vita-serverless_us-central1_gke-vw-stg-management'
alias kgc='kubectl config get-contexts'
alias kgp='kubectl get pods --all-namespaces'
alias kep-qa="kuc-qa && kubectl exec \$(kgp | grep api | awk '{print \"-n\", \$1, \"-it\", \$2}') -- bash"
alias kep-stg="kuc-stg && kubectl exec \$(kgp | grep api | awk '{print \"-n\", \$1, \"-it\", \$2}') -- bash"

Luego ejecutar estos comandos:
gcloud container clusters get-credentials gke-vw-qa-management \
    --zone us-central1 \
    --project vita-wallet-api-qa-2
    
gcloud container clusters get-credentials gke-vw-stg-management \
    --zone us-central1 \
    --project vita-serverless
    



# Si no entra con kep-qa
kubectl get pods --all-namespaces
# elegir qa-api-vitawallet     vita-wallet-api-deployment-686f8b8d59-7vn6s
kubectl exec -n qa-api-vitawallet -it vita-wallet-api-deployment-686f8b8d59-7vn6s -- bash




.    
```

```ruby
# Forzar actualizacion en el Front
settings_headers = SettingsHeader.first
if settings_headers.present?
  settings_headers.update(x_residence_config: settings_headers.x_residence_config.to_i + 1)
end


x_rules: 1, -> si cambia actualiza reglas de transferencia
x_residence_config: 1, -> si cambia actualiza los países de residencia
x_settings: 1, -> Si cambia hace una actualización general
```


```ruby
# Concluir recarga
# Bitso:
p = PaymentOrder.last
params = { "payload" => { "amount" => 47328, "fid" => "pago4",  "details" => { "payment_id" => p.public_code, "receive_clabe" => p.provider_code  }  } }
service = ::Bitso::Payin::UpdatePayment.new(params)
service.call
# Bind QR:
p = PaymentOrder.last
params = { "Payload" => { "MensajePago" => { "EstadoTransaccion" => "ACREDITADO", "ImporteBruto" => "120556", "IdOrdenVentaQr" => p
.provider_code.gsub("vita-bind-", "")  } } }
service = ::Bind::UpdatePaymentOrderStatus.new(params)
service.call
# Bind Button:
p = PaymentOrder.last
params = { "Payload" => { "MensajePago" => { "EstadoTransaccion" => "ACREDITADO", "ImporteBruto" => "120556", "IdentificadorOrdenVenta" => p
.provider_code.gsub("vita-bind-boton", "")  } } }
service = ::Bind::UpdatePaymentOrderStatus.new(params)
service.call
# Rendimento:
p = PaymentOrder.last
params = { "pix" => [ { "pagador" => { "cnpj" => p.payer.document  }, "txid" => p.provider_code, "valor" => "650"  }  ]  }
service = ::Rendimento::PaymentOrder::UpdatePaymentOrderStatus.new(params)
service.call (editado)
```

```ruby
# BINANCE SMART CHAIN
0x10d543e2e0355e36c5cab769df8d2d60abb77a73
0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7 # USDT
```

```ruby
# BUSINESS CREDENTIALS
u.x_login
u.business_trans_key
u.business_secret

habilitar en la tabla business_permissions en base al endpoint que quieras de la tabla api_endpoints
```



## Fragment 2: Barry

```js
// HOOKS
Son logica de negocios, hay varios useEffect dentro o otros hooks conocidos

```

```js
// PROVIDERS

// Aca estan todas las llamadas al API. Todas las funciones se vinculan con el archivo APICALL que hace la verdadera llamada.
// Si necesitas pasar un parametro para la url lo pasas como (id) hacia la variable d entorno que es una funcion, luego en la llamada a APICALL pasas un objeto con los datos:
const postRefund = async (id) => {
    return await apiCall({
        authorization: true,
        ...ENDPOINTS.ADMIN.BANK_MOVEMENTS.POST_REFUND(id),
        data: {
            id,
        },
    })
};
```

```js
// RESOURCES

// Aca estan todas las vistas

```


```js
// REACT ADMIN

// Cuando vas a usar una varaible debes pasarla por render:
<FunctionField
    label={'Fecha de origen'}
    render={(record) => {
        return moment.utc(record.transaction_date ? record.transaction_date : record.post_date).format('LL');
    }}
/>

// ***  La logica para saber que es record se encuentra en: src/Providers/Rest/handlers
API (GET /admin/bank_movements)
        ↓
responseHandler.js (transforma los datos si es necesario)
        ↓
React Admin <List> y <Datagrid>
        ↓
Cada campo recibe un objeto como 'record'
```

```js
// RUTAS
src/Resources/index.js
```


```js
// PASOS CREAR UNA NUEVA VISTA

// Aca mapeas el nombre de tu vista con el endpoint que quieres llamar
Users/marceloalarcon/Documents/Programming/VitaWallet/barry/src/Helpers/ResourceHelper.js

//MENU
src/Components/Menu/index.js
```

```js
// NUEVA VISTA
Perfecto! Aquí tienes el flujo en formato Markdown (incluyendo los bloques de código correctamente formateados) para que puedas copiar y pegar donde quieras:
🛠️ Guía para Implementar una Nueva Vista (Recurso) en el Admin
1. Definir el recurso en el helper
Archivo: src/Helpers/ResourceHelper.js
Agrega el nombre del recurso en el objeto RESOURCES (clave en español, valor en inglés o el identificador que usas en la API).

export const RESOURCES = {
  // ... otros recursos ...
  estados_de_los_movimientos_bancarios: 'bank_movements_histories',
};


2. Crear el handler de request
Archivo: src/Providers/Rest/handlers/[nombreRecurso]/requestHandler.js
Crea el archivo si no existe.
Implementa la función para construir la URL y los parámetros necesarios para las peticiones a la API (GET, POST, etc).
Usa API_URL y respeta la estructura de paginación, filtros y ordenamiento.

import { GET_LIST } from 'react-admin';
import { API_URL } from '../../../../Config/env';

const requestHandler = (type, params) => {
  switch (type) {
    case GET_LIST:
      // Construcción de la URL con filtros, paginación, etc.
      return { url, method: 'get' };
    default:
      return {};
  }
};

export default requestHandler;

3. Crear el handler de response
Archivo: src/Providers/Rest/handlers/[nombreRecurso]/responseHandler.js
Crea el archivo si no existe.
Implementa la función para transformar la respuesta de la API al formato que espera el frontend (normalmente un array de objetos y el total).

const responseHandler = (response, type) => {
  switch (type) {
    default:
      // Procesa y retorna los datos
      return { data, total };
  }
};

export default responseHandler;

4. Registrar el handler en el index de handlers
Archivo: src/Providers/Rest/handlers/index.js
Importa y exporta el nuevo handler.

export { default as BankMovementsStatusHandler } from './bankMovementsStatus';


5. Crear los componentes de la vista
Directorio: src/Resources/[NombreRecurso]/
Archivos típicos:
index.js: configuración del recurso para el admin (nombre, icono, permisos, etc).
[NombreRecurso]List/index.js: componente principal de la lista (usualmente con <List>, <Datagrid>, etc).
Filters/index.js: componente de filtros para la lista.
Implementa la UI usando los componentes de react-admin y tus utilidades.
Usa los helpers y constantes para traducir estados, mostrar fechas, etc.

6. Registrar el recurso en el admin
Archivo: Donde configuras los recursos del admin (usualmente en el archivo principal del admin, por ejemplo App.js o similar).
Importa el recurso y agrégalo a la lista de recursos del admin.
import BankMovementsStatus from './Resources/BankMovementsStatus';
// ...
<Resource {...BankMovementsStatus} />

7. Agregar endpoints en la configuración si es necesario
Archivo: src/Config/env.js
Si el recurso necesita endpoints específicos, agrégalos en el objeto ENDPOINTS.
8. Probar la vista
Verifica que la vista carga correctamente, que los filtros funcionan, que los datos se muestran bien y que la paginación/orden funciona.
Ajusta los handlers si la API responde diferente a lo esperado.

9. para requests se anaden aca: /Users/marceloalarcon/Documents/Programming/VitaWallet/barry/src/Providers/Rest/requestHandler.js

Si el recurso tiene estados, tipos o categorías, agrégalos en src/Utils/index.js para mostrar los nombres en español o con formato adecuado.
Resumen de archivos típicos a modificar/crear
src/Helpers/ResourceHelper.js
src/Providers/Rest/handlers/[nombreRecurso]/requestHandler.js
src/Providers/Rest/handlers/[nombreRecurso]/responseHandler.js
src/Providers/Rest/handlers/index.js
src/Resources/[NombreRecurso]/index.js
src/Resources/[NombreRecurso]/[NombreRecurso]List/index.js
src/Resources/[NombreRecurso]/Filters/index.js
src/Config/env.js (si aplica)
Archivo principal del admin para registrar el recurso

```

## Fragment 3: vscode

```json
{
  "editor.rulers": [120],
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": "variable.other.readwrite.instance.ruby",
        "settings": {
          "foreground": "#e0a348"
        }
      },
      {
        "scope": "variable.other.readwrite.class.ruby",
        "settings": {
          "foreground": "#e0a348"
        }
      }
    ]
  }
}
```
