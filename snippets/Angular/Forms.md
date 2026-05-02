# Forms

```ts
// TEMPLATES

// NGMODEL WAY
// HTML
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <input id="email" type="email" name="email" ngModel #emailControl="ngModel"/>
</form>
//TS
onSubmit(formData: NgForm) {
  const email = formData.form.value.email
  const password = formData.form.value.password
}



//
```

```ts
// VALIDATIONS CSS
<input id="email" type="email" name="email" ngModel required  email /> //validara que el campo sea un email
//CSS classes added for validation
ng-pristine = no input
ng-invalid = input invalid
ng-valid = input valid
ng-touched = user selected the input at least one time
//css style:
input.ng-invalid.ng-touched.ng-dirty {
  background-color: #fbdcd6;
  border-color: #f84e2c;
}


//VALIDATIONS HTML
<input id="email" type="email" name="email" ngModel #emailControl="ngModel"/>
@if (emailControl.touched && emailControl.dirty && emailControl.invalid) {
  <p class="control-error">
    Invalid values detected, please check your input.
  </p>
}



//
```



```ts
// RESET FORM (reactive)
clearForm() {
  this.formData.reset()
}

```

```ts

//UPDATE FORM FIELD
formData.controls['password']?.setValue("12345")
```

```ts
//VIEW_CHILD
export class LoginComponent {
  private form = viewChild.required<NgForm>('formData')
  private destroyRef = inject(DestroyRef)

  constructor() {
    afterNextRender(() => {
      const subscription = this.form().valueChanges?.subscribe({
        next: (value) => {
          console.log(value)
        }
      })

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      })

    })

    }

```


```ts
// ATTACH IMAGE OR FILE
// TS
imagePreview: string | ArrayBuffer | null = null

form = new FormGroup({
    image: new FormControl<File | null>(null, { validators: [Validators.required] }),
  })
  
onSubmit() {
  if (this.form.value.image && this.form.value.image instanceof File) {
    formData.append('post[image]', this.form.value.image, this.form.value.image.name)
  }

}
  
onFileSelected(event: any) {
  const file: File = event.target.files[0]
  if (file) {
    this.form.patchValue({
      image: file,
    })
    // Opcional: si quieres mostrar una vista previa de la imagen
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// HTML
<form [formGroup]="form" (ngSubmit)="onSubmit()" class="container">
  <div>
    <input type="file" (change)="onFileSelected($event)" accept="image/*" />
  </div>

  <button type="submit" class="button">Login</button>
</form>
```










> https://guides.rubyonrails.org/form_helpers.html

```ts
//TS
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
    imports: [
      ReactiveFormsModule,
  ],
})
export class LoginComponent {
  formData = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    image: new FormControl<File | null>(null, {})
  })

  onSubmit() {
    console.log(this.formData.value.email)
    if (this.formData.valid) {
      console.log('valid!')
    }
  }
  
  onReset() {
     this.formData.reset();
  }
}
//HTML
<form [formGroup]="formData" (ngSubmit)="onSubmit()">
  <h2>Login</h2>

  <div class="control-row">
    <div class="control no-margin">
      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email" />
    </div>

    <div class="control no-margin">
      <label for="password">Password</label>
      <input id="password" type="password" formControlName="password" />
    </div>
    
    <div class="control-row" formGroupName="address">
      ...address inputs
    </div>

    <button type="submit" class="button">Login</button>
  </div>
</form>



//
```



```ts
// AGRUPAR FORMS
//TS
formData = new FormGroup({
  address: new FormGroup({
    addressStreet: new FormControl('', {
      validators: [Validators.required],
    }),
    addressNumber: new FormControl('', {
      validators: [Validators.required],
    })
  })
})
//HTML
<div class="control-row" formGroupName="address">
  <input type="text" id="street" name="street" formControlName="addressStreet" />
  <input type="text" id="street" name="street" formControlName="addressNumber" />
</div>



//
```




```ts
//FORM ARRAY (se usa para check boxes)
//TS
formData = new FormGroup({
  source: new FormArray([
      new FormControl(false, [Validators.required]),
      new FormControl(false, [Validators.required]),
      new FormControl(false, [Validators.required]),
    ]),
})
//HTML
<fieldset formArrayName="source">
  <input
    type="checkbox"
    id="google"
    name="acquisition"
    value="google"
    formControlName="0"
  />
  <input
    type="checkbox"
    id="facebook"
    name="acquisition"
    value="facebook"
    formControlName="1"
  />
</fieldset>




//
```

```ts
// DETECTAR CAMBIOS
//TS
export class MyPostComponent implements OnInit{
    formData = new FormGroup({
    search: new FormControl<any>('',{}),
  })

  ngOnInit(): void {
    this.formData.controls['search'].valueChanges.pipe(
      debounceTime(1000),
      tap((response) => console.log(response))
    ).subscribe();
  }

}

//HTML
<form [formGroup]="formData">
  <input formControlName="search">
</form>




//
```

```js
// ACTUALIZAR EL VALOR DE UN CAMPO DINAMICAMENTE
formData = new FormGroup({
    body: new FormControl('', {
      validators: [Validators.required],
    }),
  })
  
//aca  
this.formData.patchValue({
      body: "nuevo valor",
    })
```

```js
// MARCAR TODOS LOS CAMPOS TOUCHED
submitForm() {
  if (this.formData.invalid) {
    this.formData.markAllAsTouched();
    return;
  }
  // Lógica de envío
  console.log(this.formData.value);
}

```

```ts
//CSS STATES
pristine:

    Descripción: Indica que el control no ha sido modificado por el usuario.
    Uso: Se usa para determinar si un control ha sido tocado o cambiado. Útil para mostrar mensajes de error solo después de que el usuario haya interactuado con el campo.

dirty:

    Descripción: Indica que el control ha sido modificado por el usuario.
    Uso: Se usa para saber si el valor del control ha cambiado desde su valor inicial. Útil para habilitar o deshabilitar el botón de envío o mostrar mensajes de validación.

touched:

    Descripción: Indica que el control ha sido visitado (es decir, ha recibido el foco y luego ha sido desenfocado).
    Uso: Se usa para mostrar mensajes de error o validación solo después de que el usuario haya interactuado con el campo, evitando mostrar mensajes de error antes de que el usuario haya tenido la oportunidad de ingresar datos.

untouched:

    Descripción: Indica que el control no ha sido visitado.
    Uso: Se usa para diferenciar entre campos que han sido visitados y aquellos que no. A menudo se usa en combinación con touched para mostrar mensajes de error solo después de que el campo ha sido tocado.

valid:

    Descripción: Indica que el control cumple con todas las validaciones establecidas.
    Uso: Se usa para determinar si el control es válido y puede ser útil para habilitar el botón de envío del formulario o para mostrar mensajes de validación.

invalid:

    Descripción: Indica que el control no cumple con alguna de las validaciones establecidas.
    Uso: Se usa para mostrar mensajes de error y para evitar el envío de datos no válidos.

pending:

    Descripción: Indica que el control está en espera de una validación asíncrona.
    Uso: Se usa para manejar casos en los que una validación asíncrona (como una verificación de disponibilidad de nombre de usuario) está en curso.

disabled:

    Descripción: Indica que el control está deshabilitado.
    Uso: Se usa para evitar que el usuario interactúe con el campo, por ejemplo, cuando se está realizando alguna operación que impide modificar el campo.

enabled:

    Descripción: Indica que el control está habilitado.
    Uso: Se usa para permitir la interacción del usuario con el campo.
```
