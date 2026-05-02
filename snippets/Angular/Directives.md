# Directives

```js
//Basic
@Directive({
  selector: 'a[appSafeLink]', //aca pones el elemento en el que se va a aplicar el directive en este caso uin link
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)' //aca pones el evento y el metodo
  }
})

export class SafeLinkDirective {
  name = = input('chelo', {alias: 'appSafeLink'})helo')
  constructor() {}

  onConfirmLeavePage(event: MouseEvent) {
    console.log(event.type)
    console.log(this.name)
    event.preventDefault();
  }
}
```

```js
//HTML
<a href="https://angular.dev" appSafeLink="Bebish">Angular Documentation</a>


//ANADIR AL COMPONENTE
@Component({
  hostDirectives: [SafeLinkDirective]
})
```
