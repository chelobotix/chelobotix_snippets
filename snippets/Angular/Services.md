# Services

// ES SINGLETON SIEMPRE
// Create service
ng g s serviceName

// SERVICE
```ts
@Injectable({
  providedIn: 'root',
})
export class ThemeManagerService {
  private theme = signal<Theme>('Light')
  actualTheme = this.theme.asReadonly()

  change(theme: Theme): void {
    this.theme.set(theme)
  }
}
```


// COMPONENT 1
```ts
export class OtroComponent{
  
  private themeManagerService = inject(ThemeManagerService)

  themeChange(new_theme: Theme): void {
    this.themeManagerService.change(new_theme)
  }  
}
```
// COMPONENT 2
```ts
export class ThemeButtonComponent {
  private themeManagerService = inject(ThemeManagerService)
  name = input.required<string>()
  theme = this.themeManagerService.actualTheme
  isActive = computed(() => {
    return this.theme() === this.name()
  })
}
```

//ELEMENT INJECTOR
//Esto solo inyectas el servicio en el parent y todos sus childs
@Component({
  ...
  providers: [TasksService]
})

