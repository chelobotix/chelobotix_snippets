# Pipeline Gem

```ruby
# PIPELINE
 gem 'html-pipeline'
 gem 'github-markdown'
 gem 'gemoji'
 gem 'sanitize'
 
 
 1. Te creas un helper donde vas a poner todos los filtros que quieres aplicar:
 module PostsHelper
  def markdownify(content)
    #gfm = github format markdown
    context = { gfm: true}  
    pipeline = HTML::Pipeline.new(
      [
        HTML::Pipeline::MarkDownFilter,
        HTML::Pipeline::SanitizationFilter,
        HTML::Pipeline::EmojiFilter,
      ],
      context
    )
    pipeline.call(content)[:output].to_s
  
  end
 
 
 end
```
