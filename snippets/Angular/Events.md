# Events

```ts
//HOST COMPONENT EVENT
@Component({
    host: {
    '(click)': 'onClick()',
  },
})
export class NewTicketComponent {
  onClick() {
    console.log('click!');
  }
}





//
```


```ts
// Observable
//HTML
<button #btn1>Click!</button>

//TS
@ViewChild('btn1', {static: true}) btn1!: ElementRef;

  ngOnInit(): void {
    const eventData$ = fromEvent(this.btn1.nativeElement, 'click')
    eventData$
      .pipe(
        tap((val) => this.btn1.nativeElement.disabled = true
        )
      ).subscribe()
  }
}


```

