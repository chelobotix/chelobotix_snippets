# breakpoint Observer

```typescript
private breakpointObserver = inject(BreakpointObserver)

ngOnInit() {
  this.breakpointObserver
    .observe(['(min-width: 500px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log('Viewport width is 500px or greater!')
      } else {
        console.log('Viewport width is less than 500px!')
      }
    })
}

//OR BREAKPOINT

ngOnInit() {
  this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log('Matches small viewport or handset in portrait mode')
      }
    })
}

//export const Breakpoints = {
  XSmall: '(max-width: 599.98px)',
  Small: '(min-width: 600px) and (max-width: 959.98px)',
  Medium: '(min-width: 960px) and (max-width: 1279.98px)',
  Large: '(min-width: 1280px) and (max-width: 1919.98px)',
  XLarge: '(min-width: 1920px)',
  Handset: '(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)',
  Tablet: '(min-width: 600px) and (max-width: 1279.98px)',
  Web: '(min-width: 1280px)',
  HandsetPortrait: '(max-width: 599.98px) and (orientation: portrait)',
  TabletPortrait: '(min-width: 600px) and (max-width: 1279.98px) and (orientation: portrait)',
  WebPortrait: '(min-width: 1280px) and (orientation: portrait)',
  HandsetLandscape: '(max-width: 959.98px) and (orientation: landscape)',
  TabletLandscape: '(min-width: 600px) and (max-width: 1279.98px) and (orientation: landscape)',
  WebLandscape: '(min-width: 1280px) and (orientation: landscape)',
};
//





//IS MATCHED
ngOnInit() {
  if (this.breakpointObserver.isMatched('(min-width: 768px)')) {
    console.log('Viewport has a minimum width of 768px!')
  } else {
    console.log('Viewport is less than 768px wide.')
  }
}
```
