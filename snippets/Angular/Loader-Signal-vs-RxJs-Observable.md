# Loader Signal vs RxJs Observable

```ts
//Service with Signals
import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderSignalService {
  private loading = signal(false);
  loadingState = this.loading.asReadonly();

  loadingOn() {
    this.loading.set(true);
  }

  loadingOff() {
    this.loading.set(false);
  }
}
```

```ts
//Spinner
//html
@if(loading()) {
  <div class="spinner-container">
    <mat-spinner />
    <p>este es el dos y funca</p>
  </div>
}
//ts
export class Spinner2Component {
  private loaderSignalService = inject(LoaderSignalService)
  loading = this.loaderSignalService.loadingState
}
```

```ts
//componente child
//html
@for(post of posts; track post.id){
  <p>{{post.title}}</p>
}

//ts
export class ChildComponent implements OnInit, OnDestroy {
  private httpClient = inject(HttpClient)
  private loadingService = inject(LoaderSignalService);
  private subscription!: Subscription
  posts: any[] = [];

  
  ngOnInit(): void {
    this.loadingService.loadingOn();
    this.subscription = this.httpClient.get('https://jsonplaceholder.typicode.com/posts').pipe(
      delay(3000),
      tap((data) => {
        console.log(data)
        this.posts = data as any[]
      })
    ).subscribe({
      complete: () => {
        console.log('AcaboOnInit')
        this.loadingService.loadingOff();
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
```

```ts
//HTML app.component
<p>hello</p>
<app-spinner/>
<app-child/>
```

```ts
//Service with Observables
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderRxJsService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }

}
```

```ts
//Spinner
//html
@if(loading$ | async) {
  <div class="spinner-container">
      <mat-spinner />
    <p>squeleton</p>
  </div>
}
//ts
export class SpinnerComponent {
  private loaderRxJsService = inject(LoaderRxJsService);
  loading$ = this.loaderRxJsService.loading$

}
```

```ts
//componente child
//html
@for(post of posts; track post.id){
  <p>{{post.title}}</p>
}

//ts
export class ChildComponent implements OnInit, OnDestroy {
  private httpClient = inject(HttpClient)
  private loadingService = inject(LoaderRxJsService);
  private subscription!: Subscription
  posts: any[] = [];

  
  ngOnInit(): void {
    this.loadingService.loadingOn();
    this.subscription = this.httpClient.get('https://jsonplaceholder.typicode.com/posts').pipe(
      delay(3000),
      tap((data) => {
        console.log(data)
        this.posts = data as any[]
      })
    ).subscribe({
      complete: () => {
        console.log('AcaboOnInit')
        this.loadingService.loadingOff();
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
```

```ts
//HTML app.component
<p>hello</p>
<app-spinner/>
<app-child/>
```
