# before_action :

```ruby
before_action :set_article, only: %i[show edit update destroy]

private 
  # get Article
  def set_article
    @article = Article.find(params[:id])
end

```
