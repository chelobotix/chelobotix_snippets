# Curl

```shell
curl https://example.com

# Headers
curl -H "Authorization: Bearer TOKEN" https://example.com/api #request
curl -i https://example.com # response

# Enviar Params
curl -X POST -d "param1=value1&param2=value2" https://example.com/api

# Enviar JSON
curl -X POST -H "Content-Type: application/json" -d '{"key":"value"}' https://example.com/api


# Ejemplo
curl -X POST -H "Content-Type: application/json" \
     -H "Authorization: Bearer TOKEN" \
     -d '{"key":"value"}' \
     -o response.json \
     https://example.com/api
     
# otro
curl -i -X POST -H "Content-Type: application/json" --write-out '%{http_code}' -d '{"user": {"email": "howard@shipedge.com", "password": "consultar en local"}}' https://cubing.shipedge.com/login

```
