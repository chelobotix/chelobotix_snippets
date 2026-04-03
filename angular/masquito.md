# Masquito

npm install @maskito/core
npm install @maskito/angular
npm install @maskito/kit

```js
// TS
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';


@Component({
  selector: 'app-bank-input',
  standalone: true,
  imports: [ReactiveFormsModule, MaskitoDirective],
  templateUrl: './bank-input.component.html',
  styleUrl: './bank-input.component.scss'
})
export class BankInputComponent {
  formData = new FormGroup({
    amount: new FormControl('', {
      validators: [Validators.required],
    }),
  })

  readonly maskitoOptions: MaskitoOptions = {
    mask: /^\d+$/,
  };

  onSubmit() {
    console.log(this.formData.value)
  }
}
```


```js
// HTML
<form [formGroup]="formData" (ngSubmit)="onSubmit()">
  <input type="text" [maskito]="maskitoOptions"  formControlName="amount"/>
  <button type="submit" class="button">Send</button>
</form>
```
