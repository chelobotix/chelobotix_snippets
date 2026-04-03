# Components

```js
// DYNAMIC COMPONENT
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [NewCommentComponent, CommonModule],
  })
  
currentComponent: any;

mapPost(id: string){
  console.log(id)
  const componentMap: { [key: string]: any } = {
      '1': CookiesCasosDeLaVidaRealComponent,
    }

  this.currentComponent = componentMap[id] || CookiesCasosDeLaVidaRealComponent;
}
```
