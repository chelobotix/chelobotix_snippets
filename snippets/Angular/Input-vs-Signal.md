# Input vs Signal

```typescript
//En el parent no cambia nada


//******SIGNAL****** (PREFERED)
// CHILD
//TS:
import {Component, computed, input} from '@angular/core';

export class UserComponent {

  test = input.required<string>()

  imagePath = computed(() => `assets/users/${this.avatar()}`)
}
//HTML:
<img [src]="imagePath()" alt="">
<span>{{name()}}</span>
//PARENT
<app-signal-input [test]="title"/> // Si te marca con error igual lo mandas



//******INPUT******
//TS:
import {Component, Input} from '@angular/core';

export class UserComponent {
  @Input({required: true}) avatar!:string
  @Input({required: true}) name!:string

  get imagePath(){
    return `assets/users/${this.avatar}`
  }
}
//HTML:
<img [src]="imagePath" alt="">
<span>{{name}}</span>





```
