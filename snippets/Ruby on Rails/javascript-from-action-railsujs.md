# javascript from action rails/ujs

```
Esto es para versiones anteriores a TURBO

1. ./bin/importmap pin @rails/ujs

2. add this code on your "application.js" file:
    import Rails from '@rails/ujs';
    Rails.start();

3. call in action
    respond_to do |format|
        format.js { render(partial: 'users/crypto') }
    end
```
