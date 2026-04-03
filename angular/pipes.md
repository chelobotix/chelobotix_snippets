# Pipes

ng g p sort --skip-tests

```ts
//BASIC
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'temperature',
  standalone: true,
  pure: false //disable caching
})

export class TemperaturePipe implements PipeTransform {
  transform(value: string , options:string){
    
    return `${value} PIPE!`
  }
}
```
