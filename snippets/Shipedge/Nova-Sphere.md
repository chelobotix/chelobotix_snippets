# Nova Sphere

```
Instalar NovaSphere Login en tu App
Prerequisitos:

app creada en novasphere(es requierido app_id y app_key generada en este paso)
un sistema backend(o frontend) para enviar la credencial
1.- Redireccionamiento
Nova Sphere usa redireccionamiento como medio mas seguro para implementar la authenticacion, por lo tanto
cada sistema que requiera authenticacion debera implementar la logica que se encuentra en este documento
empezando con el direccionamiento a una url registrada en la lista blanca de la app.

Cuando se crea la app en Nova, este nos devolvera la siguiente estructura basica:

{
    "app_id": "app_omniorders",
    "app_key": "ak_omniorders",
    "app_url": "https://app.omniorders.com",
    "callbacks": [
        "http://localhost:8000/callback",
        "https://mi.backend.com/callback"
    ]
}
donde callbacks es la coleccion de url validas para donde se redireccionaran las peticiones de autenticacion, 
tambien donde llegaran las credenciales en el parametro "code".

1.1.- FRONTEND
para empezar con el redireccionamiento creamos por ejemplo un button en nuestro login page:

//ejemplo en react
const ButtonLogin = ({ app_id, state, redirect_uri }) => {
    return (<button
        onClick={() => {
            window.location.href = `${process.env.NOVASPHERE_FRONTEND}/app/${app_id}?redirect_uri=${redirect_uri}&state=${state}`;
        }}
    >
        Login with NovasSphere
    </button>);
}
donde:

process.env.NOVASPHERE_FRONTEND es la url de redireccionamiento, en esta caso extraendolo de las variables de entorno,
puedes tambien solo tenerlo como constante(la url es: https://accounts.shipedge.com)

app_id es la app_id de la app que creamos en novasphere
redirect_uri es la url de redireccionamiento, recuerda que tiene que estar en la lista blanca de la app(callbacks).
state es el estado que nos permitira compartir parametros a nova y devolvernos a nuestra app, por ejemplo
cuando un usuario viene a nuestra app por un link compartido y este link tiene parametros como una ruta e ids de un registro,
puedes envolverlos en un state y mandarlos a la url de redireccionamiento, este al terminarse el login satisfactoriamente devolvera
el mismo state que enviaste

1.2.- BACKEND
Tienes en tu sistema ya sea front o backend crear una url de redireccionamiento, el cual registraras en tu app(callbacks).
En este caso usaremos "http://localhost:8000/login/callback" para redireccionar.

Entonces con el paso anterior usando una app de ejemplo nuestra url de redireccionamiento es: https://accounts.shipedge.com/app/app_omniorders/login?redirect_uri=http://localhost:8000/login/callback

Terminado el login nos llegara a la url de redireccionamiento el code, el cual es un JWT en base64, para leerlo usamos:

//en el caso de un backend basado en nodejs

const code = req.query.code;
//tiempo de expiracion del token
const expiresAt = req.query.expires_at;
//obteniendo el token
const jwt = atob(code);
y si en caso se envio un state, este llegara tambien a la url de redireccionamiento, para leerlo usamos:

const { code, state, expires_at } = req.query;

//token del usuario
const jwt = atob(code);
//parametros que enviaste para volver a recivirlos, puedes enviar por ejemplo donde estaba en el front y para volverlo a llevar al mismo lugar pero con una session valida
const params = atob(state);
seguidamente con el jwt podriamos consultar a por informacion de quien este usuario logeado, usando la api de novasphere
y credenciales de tu app:

export const getUser = async (input: { token: string }) => {
  const res = await fetch(
    `${process.env.APINOVA_URL}/api/v1/app/${process.env.APP_ID}/user`, //app_omniorders por ejemplo
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "App-Key": process.env.APP_KEY //ak_omniorders por ejemplo
        "Authorization": input.token,
      },
      cache: "no-cache"
    }
  );
  return res.json() as Promise<{
    id: string,
    email: string,
    name: string,
  }>;
}
el cual nos retornara un:

{
  "id": "user_omniorders",
  "email": "q0s2w@example.com",
  "name": "John Doe"
}
con esto ya tienes lo necesario para tener un usuario valido, authenticado y con parametros a donde redireccionar(el state)

Que es lo que sigue?
Con estos valores, lo que puedes hacer es, a tu modelos de usuario ligar el id de nova, tambien guardarle el token(porfavor de manera encriptada) 
ya que con estos valores para el siguiente paso podras usarlos(pagos).

Tambien para evitar cuello de botella consultado si usuario valido o no, lo que procede hacer  es con tu propia base de datos
crear un jwt que si compartas a tu frontend y que este use con tu backend porque de esta forma es rapida la forma de trabajar.

Refresh Token
Para refrescar un jwt que esta apunto de expirar, puedes hacerlo con la api de novasphere:

//donde { token } es el token que obtuviste anteriores pasos
export const refreshToken = async (input: { token: string }) => {
  const res = await fetch(
    `${process.env.APINOVA_URL}/api/v1/app/${process.env.APP_ID}/user/refresh`, //app_omniorders por ejemplo
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "App-Key": process.env.APP_KEY //ak_omniorders por ejemplo
        "Authorization": input.token,
      },
      cache: "no-cache"
    }
  );
  return res.json() as Promise<{
    token: string
    expires_at: string
  }>;
}
```

