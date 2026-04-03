# ng-content CSS

```typescript
//Basic
//WRAPPPER CONTENT
<app-component>
  <h1>Test</h1>
</app-component>

//en el componente que esta usandose como contenedor, en este caso app-component:
<div>
  <ng-content/>
</div>





//SELECTOR
//Child
<ng-content select=".icon"/>
//parent
<span class="icon">→</span>

//*SELECTOR WITH ngProjectAs
//Child
<ng-content select=".icon"/>
//parent
<span ngProjectAs="icon">→→</span>



//CSS cuando quieras aplicar un estilo a la clase que esta usando el ng-content o sea al wrapper usas :host en tu css file
:host {
  color: blue;
}
// tambien mas facil le asignas un nombre de clase al wrapper
<app-control class="mi-clase">


//Tambien puedes romper el ancapsulamiento pero puede llevar a conflictos globales:
@Component({
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mi-clase',
  },
})

```
