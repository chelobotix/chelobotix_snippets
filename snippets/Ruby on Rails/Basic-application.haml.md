# Basic application.haml

```ruby
= provide(:title, params[:controller].titleize)
!!!
%html
  %head
    %meta{:content => "text/html; charset=UTF-8", "http-equiv" => "Content-Type"}/
    %meta{name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no"}/
    %title=  yield(:title) 
    = csrf_meta_tags
    = csp_meta_tag
    = stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload'
    = javascript_include_tag 'application', 'data-turbolinks-track': 'reload'
  %body
    = yield
```
