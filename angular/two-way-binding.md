# Two Way Binding

```typescript
// Basic
import { FormsModule } from '@angular/forms'
//TS
export class NewTaskComponent {
  title = ''
  onSubmit() {
    this.add.emit({ title: this.title)
  }
}
//HTML
<form (ngSubmit)="onSubmit()">
  <input type="text" id="title" name="title" [(ngModel)]="title" />
  <button type="submit">Create</button>
</form>





//CUSTOM
//TS
test23 = input.required<string>()
test23Change = output<string>();

onReset(){
  this.test23Change.emit('reseteo');
}

//HTML
<p>{{test23}}<p/>
<button (click)="onReset"> reset

//PARENT
<app-prueba [(test23)]="hola"/>

//short way angular +17
size = model.required<{width: string, height: string}>()

onReset() {
  this.size.set({width: '100', height: '100'});
}
```
