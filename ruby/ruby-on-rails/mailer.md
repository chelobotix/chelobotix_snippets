# Mailer

## Fragment 1: Fragment

```ruby
# 1. Generate Mailer
rails g mailer PostMailer

# 2. Dentro del archivo mailer crear un metodo
def new_comment_in_your_post(user, post)
  @user = user
  @post = post
  
  mail(
    to: "#{@user.email}",
    subject: "New comment on #{@post.title} post",
    content_type: 'text/html'
  )
end

# 3. en el modelo Post (en este caso) llamar al mailer dentro del metodo que elijas

def tu_metodo(user)
  PostMailer.new_comment_in_your_post(user, self).deliver_later 
end


# 4. Ir a la vista que tiene el mismo nombre que el mailer y crear una nueva vista con el nombre de tu accion
(ahi le metes el html que quieras)
#** No teolvides que si vas a poner un link hacia alguna parte del app no debe ser _path sino _url

# 5. Tienes que tener configurado un Job handler





# Embed image
# in mailer method
attachments.inline['logo.png'] = File.read("#{Rails.root}/app/assets/images/logo.png")
# in view
= image_tag(attachments['logo.png'].url)




# LINK
host = Rails.env.production? ? "https://#{ENV.fetch('HOST_XENVIO')}" : 'http://localhost:3000'
= link_to("Visit now!", "#{@host}/orders/#{record[:order][:id]}", style: "color: #ffffff")
```

## Fragment 2: Testear

```ruby
#1. crear en test/mailers/previews/test_mailer_preview.rb (mi mailer se llama test_mailer)
class TestMailPreview < ActionMailer::Preview
  def el_metodo_de_tu_mailer
  
    TestMailer.with(user: User.first).el_metodo_de_tu_mailer(los argumentos que necesites)
  end
end
    
#2. acceder a http://127.0.0.1:3000/rails/mailers/

#3. Listo (hemos sufrido a full pero ya esta!)
```
