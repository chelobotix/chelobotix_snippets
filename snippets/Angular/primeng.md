# primeng

```ts
//setting up
//app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), importProvidersFrom(BrowserAnimationsModule)]
};

//app.component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    AccordionModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



//CSS

:host ::ng-deep .p-menubar-button .p-icon {
  width: 25px !important;
  height: 25px !important;
  color: #7e7f7f;
}



// STYLE
[style]="{ width: '100%', padding: '20px', 'margin-top': '100px' }"

```


