# Dropdown Rails

```ruby
def control_links(record)
    # create dropdown options
    edit_link = link_to('edit', channel_path(record.id), method: :post, class: 'dropdown-item')
    delete_link = link_to('delete', channel_path(record.id), method: :delete, class: 'dropdown-item')

    # add dropdown to main container
    dropdown_menu = content_tag(:div, (edit_link + delete_link).html_safe, class: 'dropdown-menu dropdown-menu-right')

    # create dropdown button
    links = link_to(fa_icon('ellipsis-v'), '#', data: { toggle: 'dropdown' }, class: 'btn btn-icon btn-sm icon') + dropdown_menu

    # add all content to main container
    content_tag(:div, links.html_safe, class: 'dropdown show')
end
```
