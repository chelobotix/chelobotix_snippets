# Basic Angular

```shell
# VERSION
ng version # Global
npm list @angular/cli # Del app

```
```shell
1. primero asegurate que no hay versines en el global
sudo npm uninstall -g @angular/cli
2. instala la ultima version
npm install -g @angular/cli@version
3. 
ng new hotel_inventory --standalone
4.
ng serve

// Create component
ng g c componentName //con minusculas




// VARIABLE
<img [src]="'assets/users/' + selectedUser.avatar" alt="">
<span>{{selectedUser.name}}</span>
```


```ts
// GETTER
//html: 
<img [src]="imagePath" alt="">
//ts: 
export class UserComponent {
  selectedUser = DUMMY_USERS[randomIndex]

  get imagePath(){
    return `assets/users/${this.selectedUser.avatar}`
  }
}





//
```





```ts
//ACCEDER A UN ELEMENTO DEL DOM @ViewChild
<p #as_p>Hola</p>
@ViewChild('as_p', { static: true }) pElement: ElementRef | undefined; //pElement es la variable donde se almacenara el elemento
console.log(this.pElement?.nativeElement)
//or
private pElement = viewChild<ElementRef>('as_p')

// Usa static: true si el elemento siempre está presente en la plantilla.
// Usa static: false si el elemento aparece condicionalmente (por ejemplo, dentro de un If).


//
```







```ts
// STATE COUNTER
//ts:
export class UserComponent {
  counter = 0

  onClickTest(){
    this.counter++
  }
}
//html:
<button (click)="onClickTest()">
  <span>{{counter}}</span>
</button>





```








```ts
//PARENT TO CHILD
<app-child [color]="color"/> //componente que se encuentra en el Parent
@Input({required: true}) color: string | undefined  //esto es lo que vas a recibir en el componente hijo
@Input({required: true}) avatar!:string // MEJOR ESTE ***

// Si quieres asignar el valor enviado a un signal local par aluego manipularlo:
@Input({ required: true }) set valor_enviado(valores: string[]) {
  this.localValorEnviado.set(valores);
}



```






```ts
//CHILD TO PARENT
import {EventEmitter, Output} from '@angular/core'
//Child
@Output() select_user = new EventEmitter<string>()

user = 'Chelo'

onClickUser() {
  this.select_user.emit(this.user)
}

// Parent
//TS:
<app-child (select_user)="onSelectUser($event)"/>
//Parent controller
onSelectUser(user_name:string){
    console.log(user_name)
}


// Sin argumentos 
@Output() toggleEdit = new EventEmitter<void>()


```






```ts
//ITERATOR
@for (user of users; track user.id){
  <li>
    <app-user [user]="user" (select_user)="onSelectUser($event)"/>
  </li>
}@empty {
  <p>No users yet</p>
}

//extras {{ $count }} {{ $first }}
//old
<li *ngFor="let user of users">
  <app-user [user]="user" (select_user)="onSelectUser($event)"/>
</li>






```






```ts
//CONDITIONAL
@if (targetUser) {
    <app-user-tasks [name]="selectedUser?.name"/>
} @else {
  <h2>Select a user</h2>
}
//old
<app-user-tasks *ngIf="targetUser; else fallback" [name]="selectedUser?.name"/>
<ng-template #fallback>
  <h2>Select a user</h2>
</ng-template>
//Conditional class
<button [class.active]="tu_variable" (click)="onClickUser()">






```







```ts
// EXTEND BUILD IN COMPONENT
//Ts:
import { Component, Input } from '@angular/core';

@Component({
  selector: 'button[app-button]', //esto es lo importante. estas extendiendo un button y le pondras esa propiedad
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) icon!: string;
}

//html
<span>
  {{ title }}
</span>
<span class="icon">
  {{ icon }}
</span>

//Parent:
<button app-button icon="→" title="Create"></button>





```







```ts
// ZONE DETECTION - ZONE PULLUTION
private zone = inject(NgZone)

 ngOnInit(): void {
  this.zone.runOutsideAngular(() =>{
    setTimeout(() => {
      console.log('hola')
    }, 5000)
  })
}





```

```typescript
//GETTER
Si necesitas realizar algún cálculo o transformación cada vez que se accede a una propiedad, un getter es ideal. Permite encapsular la lógica y mantener tu código limpio.
class UserComponent {
  firstName: string = 'John';
  lastName: string = 'Doe';

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}


//TWO WAY BINDING
El Two-Way Binding en Angular se utiliza cuando necesitas una sincronización bidireccional de datos entre el componente y la vista. Es especialmente útil en situaciones donde:

Formularios Interactivos:
Cuando trabajas con formularios donde el usuario puede ingresar o modificar datos, y quieres que estos cambios se reflejen inmediatamente en el modelo del componente.






```
