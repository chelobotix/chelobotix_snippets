# Ruby Install

## Fragment 1: Fragment

```shell
xcode-select --install
brew install openssl@1.1
rvm install 3.2.2 --with-openssl-dir=$(brew --prefix openssl@1.1)
rvm install 2.7.7 --with-openssl-dir=$(brew --prefix openssl@1.1)


#remove brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"

curl -O https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh


# Linker OPENSSL
echo 'export PATH="$(brew --prefix)/opt/opessl@1.1/bin:$PATH"' >> ~/.zprofile
openssl version

# Others
-
BUNDLE_BUILD__NOKOGIRI: "--use-system-libraries"
BUNDLE_BUILD__PG: "--with-pg-config=/Applications/Postgres.app/Contents/Versions/16/bin/pg_config"
BUNDLE_BUILD__OPENSSL: "--with-openssl-dir=/usr/local/opt/openssl@1.1"


#FOG
[fog][DEPRECATION] Unable to load Fog
gem 'fog-core', '2.1.0'

#AJAX DATATABLE
gem 'ajax-datatables-rails', '~> 1.0.0'

# Ransack
gem 'ransack', '~>2.1.1'
# BUNDLE WHY
bundle plugin install bundler-why --source https://rubygems.org

# Nokogiri
gem install nokogiri -v 1.8.5 -- \
--use-system-libraries \
--with-xslt-dir=/usr/local/opt/libxslt \
--with-xml2-dir=/usr/local/opt/libxml2 \
--with-cflags="-Wno-incompatible-function-pointer-types"


# PG
gem install pg -v 1.1.3 -- --with-pg-config=/Applications/Postgres.app/Contents/Versions/16/bin/pg_config --with-cflags="-Wno-incompatible-function-pointer-types"


# OPEN SSL
Desisntalar si o si openssl3
gem install openssl -v 2.2.0 -- --with-openssl-dir=/usr/local/opt/openssl@1.1 --with-cflags="-Wno-incompatible-function-pointer-types"


--with-cflags="-Wno-error=implicit-function-declaration"


# gem install byebug -v 10.0.2
brew install llvm@12
export CC=$(brew --prefix llvm@12)/bin/clang
restart terminal 
gem install byebug -v 10.0.2


# puma (4.3.1)
gem install puma -v 4.3.1 -- --with-cflags="-Wno-error=implicit-function-declaration"


# ovirt-engine-sdk
gem install ovirt-engine-sdk -v 4.2.5 -- --with-cflags="-Wno-incompatible-function-pointer-types"
```

```ruby
export CC=$(brew --prefix llvm@12)/bin/clang
```


## Fragment 2: claude

Nivel de la Pregunta: Mid

Explicación Detallada:

El error que estás experimentando sugiere que Ruby no se compiló correctamente con soporte para OpenSSL. Esto es un problema común, especialmente en sistemas macOS, y más aún en los nuevos Mac con chips M1/M2. Vamos a resolverlo paso a paso:

1. Primero, asegúrate de que OpenSSL esté instalado a través de Homebrew:

   ```bash
   brew install openssl@1.1
   ```

2. Ahora, necesitamos decirle a RVM dónde encontrar OpenSSL. Agrega estas líneas a tu archivo `~/.zshrc` o `~/.bash_profile`:

   ```bash
   export LDFLAGS="-L/opt/homebrew/opt/openssl@1.1/lib"
   export CPPFLAGS="-I/opt/homebrew/opt/openssl@1.1/include"
   export PKG_CONFIG_PATH="/opt/homebrew/opt/openssl@1.1/lib/pkgconfig"
   ```

3. Recarga tu perfil de shell:

   ```bash
   source ~/.zshrc  # o source ~/.bash_profile
   ```

4. Ahora, vamos a reinstalar Ruby 3.0.3 con RVM, especificando explícitamente el uso de OpenSSL:

   ```bash
   rvm remove 3.0.3
   rvm install 3.0.3 --with-openssl-dir=/opt/homebrew/opt/openssl@1.1
   ```

5. Una vez que Ruby se haya reinstalado, selecciónalo:

   ```bash
   rvm use 3.0.3
   ```

6. Ahora, actualiza Bundler a la versión requerida:

   ```bash
   gem install bundler:2.3.4
   ```

7. Finalmente, intenta ejecutar `bundle` nuevamente.

Si aún tienes problemas, puedes intentar lo siguiente:

8. Verifica que estás usando la versión correcta de Ruby:

   ```bash
   ruby -v
   ```

9. Comprueba que OpenSSL está disponible para Ruby:

   ```ruby
   ruby -ropenssl -e "puts OpenSSL::OPENSSL_VERSION"
   ```

Riesgos de Seguridad:
- Asegúrate de mantener OpenSSL actualizado para evitar vulnerabilidades de seguridad conocidas.
- Utiliza siempre fuentes HTTPS en tu Gemfile para prevenir ataques de intermediario.

Seguimiento del Progreso:
Este tipo de problema de configuración es común en el desarrollo de Ruby, especialmente en nuevas arquitecturas como Apple Silicon. Resolver estos problema

## Fragment 3: POSTGRESS

```bash
# Primero te conectas con el usuario de tu mac
/Applications/Postgres.app/Contents/Versions/16/bin/psql -U shipedge

# Creas el usuario X5
CREATE USER x5;
ALTER USER x5 WITH createdb;
ALTER USER x5 WITH superuser;
ALTER USER x5 WITH login;

# Te conectas a postgres DB
/Applications/Postgres.app/Contents/Versions/16/bin/psql -U shipedge -d postgres
# Creas la tabla
CREATE DATABASE x5_development;


# importas el fixture
/Applications/Postgres.app/Contents/Versions/16/bin/psql -U x5 x5_development < /Users/shipedge/Documents/Programming/Shipedge/Dbs/nuevo.sql

```
