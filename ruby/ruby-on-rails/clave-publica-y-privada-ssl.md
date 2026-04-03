# Clave Publica y Privada SSL

Para generar claves y cifrar mensajes, puedes usar la clase OpenSSL::PKey::RSA. Aquí te muestro cómo se haría:

1. Generación de claves:

```ruby
require 'openssl'

# Generar un par de claves RSA
rsa_key = OpenSSL::PKey::RSA.new(2048)

# Obtener la clave pública y privada
public_key = rsa_key.public_key
private_key = rsa_key

# Convertir las claves a formato PEM para almacenamiento o transmisión
public_key_pem = public_key.to_pem
private_key_pem = private_key.to_pem
```

2. Cifrado de mensaje:

```ruby
# Suponiendo que el Servidor B tiene la clave pública del Servidor A
public_key_of_server_a = OpenSSL::PKey::RSA.new(public_key_pem)

message = "Hola"
encrypted_message = public_key_of_server_a.public_encrypt(message)

# El mensaje cifrado ahora está en formato binario
# Para transmitirlo, generalmente se codifica en Base64
encoded_encrypted_message = Base64.strict_encode64(encrypted_message)
```

3. Descifrado de mensaje (en el Servidor A):

```ruby
# Servidor A usa su clave privada para descifrar
encrypted_message = Base64.strict_decode64(encoded_encrypted_message)
decrypted_message = private_key.private_decrypt(encrypted_message)
```
