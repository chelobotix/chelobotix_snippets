# Interceptor

```ts
// loader.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http'

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('request intercepted')
  let cloneRequest = req.clone({
    setHeaders: { pipo: 'pipo!' },
  })
  return next(cloneRequest)
}
```

```ts
// app.confirg.ts
export const appConfig: ApplicationConfig = {
  providers: [
    ...,
    provideHttpClient(withInterceptors([loaderInterceptor])),
  ],
}
```
