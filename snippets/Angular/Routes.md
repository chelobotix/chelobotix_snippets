# Routes

```ts
//ENABLING ROUTING
//app.config.ts
export const appConfig: ApplicationConfig= {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
      paramsInheritanceStrategy: 'always'
    }))
  ]
}
//main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//app.routes.ts
export const routes: Routes = [
  {
    path: 'task',
    component: TaskComponent,
    title: 'Tu Titulin' // tambien acepta un resolver
  },
  {
    path: '**',
    component: NotFoundComponent //route for 404
  }
]
//html app-component.html
<router-outlet/>
```



```ts
//NESTED
export const routes: Routes = [
    {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: [
      {
        path: 'tasks',
        component: TasksComponent
      }
    ],
    {
    path: 'auth',
    children: [
      {
        path: 'signup',
        component: SignupComponent,
        title: 'Sign Up',
      },
    ],
  },
  }
]
```


```ts
//LINK ROUTER AND ACTIVE (ENLACE)
//ts
import {ActivatedRoute, RouterLink} from "@angular/router";
@Component({
  selector: 'app-header',
  imports: [RouterLink],
})

//html
<a [routerLink]="['/users', user().id]" routerLinkActive="selected"> // => /users/23
<a [routerLink]="['/posts', '2323']"> // => /posts/2323
<a [routerLink]="'/posts/' + postId"> // => /posts/2323
<a [routerLink]="['/posts', postId]" [queryParams]="{edit: true}"> // => /posts/2323?edit=true

```


```ts
//ROUTE PARAMETERS VIA INPUT
//TS destiny component
userId = input.required<string>()

//ROUTE PARAMETERS VIA ACTIVATED ROUTE
//TS destiny component
activatedRoute = inject(ActivatedRoute)
const subscription = this.activatedRoute.paramMap.subscribe({
  next: params => console.log(params)
})
//o ESTE ES MUY BUENO MAS FACIL DE ACCEDER SIN OBSERVABLE
this.activatedRoute.snapshot 
```





```ts
//PROGRAMMATIC NAVIGATION
//ts
private router = inject(Router)

// route 'favorites/:id'
this.router.navigate(['/favorites]', favorite.ID], {
  state: {
    favorite: favorite.result_data,
  },
})


// Para recibir la data
router = inject(Router)

ngOnInit() {
  const navigation = this.router.getCurrentNavigation()
  if (navigation?.extras.state) {
    this.favorite = navigation.extras.state['favorite']
  }
}
```



```ts
//REDIRECT
{
  path: '',
  redirectTo: 'tasks',
  pathMatch: 'full'
},

import { Router } from '@angular/router';
private router = inject(Router)
this.router.navigate(['/home']);
this.router.navigate(['/user', userId]);
this.router.navigate(['/destination'], {
  state: { data: 'some data' }
});

```



```ts
//SEND QUERY PARAMS
// TS
order = input<'asc' | 'dec'>()
// HTML
<a routerLink="./" [queryParams]="{order: order() === 'asc' ? 'desc' : 'asc'}">Sort Ascending / Descending</a>


//GET QUERY PARAMS
// TS
export class PostComponent implements OnInit {
  private route = inject(ActivatedRoute)
  postId: string | null = null

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('id')
      console.log('Post ID:', this.postId)
      // Aquí puedes cargar los detalles del post usando este ID
    })
  }
}
```



```ts
//SEND STATIC DATA
//route
{
  path: 'about',
  component: AboutComponent,
  data: { message: 'test23'}
},
//ts
message = input<string>()
```


```ts
//SEND DYNAMIC DATA CON RESOLVER
//route
{
  path: 'about',
  component: AboutComponent,
  runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  resolve: {
      userName: resolveUserName
  },
}
//TS creas una constante con funcion flecha fuera de la clase
export const resolveUserName: ResolveFn<string | undefined> =
  (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
    const userService = inject(UsersService) //puedes inyectar el servicio
    return userService.users.find((user) => user.id === activatedRoute.paramMap.get('userId'))?.name
  }
//TS denntro de tu clase pones el input para llamar a tu signal
userName = input.required<string>()

```


```js
// RESOLVER CAMBIAR TITULO DINAMICAMENTE
// resolver:
import { ResolveFn } from '@angular/router'

export const postTitleResolver: ResolveFn<string> = (route, state) => {
  let title = route.paramMap.get('identifier')

  if (title) {
    title = title
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    return `Rail Genius - ${title}`
  }

  return 'Rails Genius - Ruby on Rails Post'
}


// routes:
{
  path: ':id/:year/:language/:identifier',
  component: PostContentComponent,
  resolve: {
    title: postTitleResolver,
  },
},


// componente
import { Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'

export class PostContentComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private titleService = inject(Title)

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const postTitle = data['title']
      this.titleService.setTitle(postTitle)
    })
  }
}
```



```ts
//GUARDS
//route
{
  path: 'about',
  component: AboutComponent,
  canMatch: [dummyCanMatch]
}
//TS
const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router)
  const access = Math.random()
  if(access < 0.5){
    return true
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'))
}
```


```ts
//CAN DEACTIVATE
//route
{
  path: 'about',
  component: AboutComponent,
  canDeactivate: [canLeaveEditPage]
}
//TS
export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component: NewTaskComponent) => {
  if(component.enteredTitle() || component.enteredSummary() || component.enteredDate()){ //si escribe algo
    return window.confirm('Do you really want to leave?')
  }

  return true
}
```


```ts
//RELOAD
//route
runGuardsAndResolvers: 'always',
//TS
this.router.navigate(['./'], {
  relativeTo: this.activatedRoute,
  onSameUrlNavigation: 'reload',
  queryParamsHandling: 'preserve'
})
```



```ts
//LAZY LOAD
//route
{
  path: 'about',
  loadComponent: () => import('../about/about.component').then((mod) => mod.AboutComponent),
}


```







