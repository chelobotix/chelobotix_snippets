# Variable de Entorno ENV

1. nano .bash_profile
2. anades la variable que quieres en el final asi
export HOST= "x5demo2.shipedge.com"

3. Recargas con: source ~/.bash_profile
4. Accedes desde la terminal con: echo $MI_VARIABLE 
5. Desde Rails: api_key = ENV["MY_API_KEY"]
