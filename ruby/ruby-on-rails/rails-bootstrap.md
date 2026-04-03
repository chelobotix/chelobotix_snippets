# Rails Bootstrap

## Fragment 1: Basic

```ruby
1. rails new myapp --css bootstrap
2. bin/importmap pin bootstrap 
4. aplication.js -> import * as bootstrap from "bootstrap" (si es que no hiciste el paso uno)
3/ compilar con ./bin/dev




```

## Fragment 2: Custom

NO NECESITAS IMPORTAR NINGUNA CLASE DE BOOTSTRAP EN NINGUNA PARTE!

En application.bootstrap.scss
@import "custom.css.scss";

Solo la sobreescribes...
# custom.css.scss

.navbar-brand {
  font-size: 100px;
}

## Fragment 3: Rails 7

Adding Bootstrap to Rails 7

Reference: https://www.linkedin.com/pulse/rails-7-bootstrap-52-importmap-md-habibur-rahman-habib/

INSTRUCTIONS

1. Add the following to Gemfile:
gem "bootstrap"
gem "sassc-rails"

Then $ bundle install

2. Rename application.css to application.scss

3. Import Bootstrap styles in app/assets/stylesheets/application.scss:
$primary: green;
@import "bootstrap";

4. Include bootstrap in your app/javascript/application.js:
import "popper"
import "bootstrap"

5. Go to config/importmap.rb and add the following:
pin "popper", to: 'popper.js', preload: true
pin "bootstrap", to: 'bootstrap.min.js', preload: true

6. Add the following to config/initializers/assets.rb:
Rails.application.config.assets.precompile += %w( bootstrap.min.js popper.js)

7. Test that everything works by adding some navigation (see below example) and restarting the server.

```
<div class="container-flouid">
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container">
      <a class="navbar-brand" href="/">
        <h3>Your Logo</h3>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Member</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#">Courses</a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Blog</a>
          </li>

          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Event</a>
          </li>

        </ul>
        <form class="">
          <a class="btn btn-outline-primary mr-2" href="#">Login</a>
          <a class="btn btn-outline-success" href="#">Become member</a>
        </form>

      </div>
    </div>
  </nav>
</div>
```
