# Change Detection

```typescript
// ZONE DETECTION - ZONE PULLUTION - Anulas el Change Detection
private zone = inject(NgZone)

 ngOnInit(): void {
  this.zone.runOutsideAngular(() =>{
    setTimeout(() => {
      console.log('hola')
    }, 5000)
  })
}




// ON PUSH
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

```
