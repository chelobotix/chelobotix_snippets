# Observables

```ts
  //BASIC
  import { of, from, Observable } from 'rxjs';
import { map, tap, switchMap, catchError, filter, debounceTime } from 'rxjs/operators';

// ----------------------------
// of: Crea un observable que emite los valores dados
// ----------------------------
const obsOf$ = of(1, 2, 3);
obsOf$.subscribe(value => console.log('of:', value));

// ----------------------------
// from: Convierte arrays, promesas o iterables en observables
// ----------------------------
const obsFromArray$ = from([10, 20, 30]);
obsFromArray$.subscribe(value => console.log('from (array):', value));

const obsFromPromise$ = from(Promise.resolve('respuesta de promesa'));
obsFromPromise$.subscribe(value => console.log('from (promise):', value));

// ----------------------------
// pipe: Encadena operadores RxJS
// ----------------------------
obsOf$.pipe(
  map(x => x * 10),
  tap(x => console.log('pipe:', x))
).subscribe();

// ----------------------------
// map: Transforma el valor emitido
// ----------------------------
obsOf$.pipe(
  map(x => `Valor transformado: ${x * 2}`)
).subscribe(console.log);

// ----------------------------
// tap: Efecto secundario sin modificar el valor
// ----------------------------
obsOf$.pipe(
  tap(x => console.log('tap antes de map:', x)),
  map(x => x + 1),
  tap(x => console.log('tap después de map:', x))
).subscribe();

// ----------------------------
// switchMap: Cancela el observable anterior si llega uno nuevo
// Útil para llamadas HTTP encadenadas
// ----------------------------
import { of as ofRx, interval } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

const userClick$ = ofRx('userClicked');

userClick$.pipe(
  switchMap(() => interval(1000).pipe(take(3)))
).subscribe(value => console.log('switchMap:', value));

// ----------------------------
// catchError: Maneja errores sin romper el flujo
// ----------------------------
import { throwError } from 'rxjs';

const obsWithError$ = throwError(() => new Error('Algo salió mal'));

obsWithError$.pipe(
  catchError(err => of('Valor por defecto tras error'))
).subscribe(console.log);

// ----------------------------
// filter: Emite solo los valores que cumplan una condición
// ----------------------------
obsOf$.pipe(
  filter(x => x % 2 === 0)
).subscribe(value => console.log('filter (pares):', value));

// ----------------------------
// debounceTime: Espera un tiempo sin nuevos valores antes de emitir
// Útil para inputs de búsqueda
// ----------------------------
import { Subject } from 'rxjs';

const input$ = new Subject<string>();

input$.pipe(
  debounceTime(300)
).subscribe(value => console.log('debounced:', value));

// Simulación de escritura
input$.next('a');
input$.next('ab');
setTimeout(() => input$.next('abc'), 400); // Solo este pasa


```

