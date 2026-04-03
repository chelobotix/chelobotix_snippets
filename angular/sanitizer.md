# Sanitizer

```js
// Pass Sanitizer
private sanitizer = inject(DomSanitizer)
public safeHtmlBody: SafeHtml = ''

ngOnInit() {
  this.safeHtmlBody = this.sanitizer.bypassSecurityTrustHtml(this.post()?.body as string)   
}
```
