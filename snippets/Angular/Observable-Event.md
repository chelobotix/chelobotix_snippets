# Observable Event

```typescript
// SERVICE
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private clickEvent = new Subject<void>()
  clickEvent$ = this.clickEvent.asObservable()

  emitClickEvent() {
    this.clickEvent.next()
  }
}



//COMPONENTE QUE EMITE
export class MenuComponent {
  private menuService = inject(MenuService)

  handleClick() {
    this.menuService.emitClickEvent()
  }
}



//COMPONENTE QUE ESCUCHA
export class HomeComponent implements OnInit, OnDestroy {
  private renderer = inject(Renderer2)
  private menuService = inject(MenuService)
  private subscription!: Subscription

  ngOnInit(): void {
    this.subscription = this.menuService.clickEvent$.subscribe(() => {
      console.log('click')
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
```
