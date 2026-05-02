# Http requests

```ts
// main.ts
bootstrapApplication(AppComponent,{
  providers: [provideHttpClient(withFetch())]
}).catch((err) => console.error(err));
```

```ts
// METHODS
this.httpClient.get<IPost>(`https://jsonplaceholder.typicode.com/posts/1`).pipe(
      tap((response) => {}),
      
      map((response) => {}),
      
      filter((response) => {}) ,
      
      //Se usa para ahcer un request en base al resultado de la primera
      switchMap((params) => {
        return this.httpClient.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${params[5]["id"]}`).pipe(
          tap((data: IPost) => {
            console.log(data)
          })
        )
      })
      ).suscribe())
      
```


```ts
// Incluir Headers
this.httpClient.post('test.com/auth', body, { headers: headers, observe: 'response' })
```

```ts
//COMPONENT
//TS
export class SearchComponent implements AfterViewChecked {
  postService = inject(PostService)
  posts$: Observable<IPost[]> = of([]) //or = new Observable()

  handleSearch() {
    this.posts$ = this.postService.searchPosts(this.searchData)
  }
}



//HTML
//*** Si no vas a suscribirte al observable tienes que usar ASYNC SI O SI!!! 
//Este if determina el type que te devolvera el observer
<div *ngIf="post$ | async as data; else loading">
  {{ data.post.title }}
</div>

<ng-template #loading>
  <p>Loading.......</p>
</ng-template>
//or
@if (posts$ | async; as posts) {
  @for (post of posts; track post.id) {
    post.title  
  }
}


//Service
export class PostService {
  private httpClient = inject(HttpClient)
  private base_url = 'http://localhost:3000/api/v1'
  isLoading = signal<boolean>(false)

  searchPosts(query: string) {
    this.isLoading.set(true)

    return this.post(`/search_posts?q[title_or_body_or_tags_cont]=${query}`, {}, {}).pipe(
      map((response) => {response}),
      tap(() => this.isLoading.set(false)),
      catchError((error) => {
        this.isLoading.set(false)
        return of([])
      })
    )
  }

  private get(endpoint: string): Observable<IPosts> {
    return this.httpClient.get<IPosts>(`${this.base_url}${endpoint}`)
  }

  private post(endpoint: string, header: {}, body: {}): Observable<IPosts> {
    const headers = new HttpHeaders(header)

    return this.httpClient.post<IPosts>(`${this.base_url}${endpoint}`, body, { headers: headers })
  }
}


```
