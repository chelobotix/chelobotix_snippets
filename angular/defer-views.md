# Defer Views

```typescript
//Viewport se carga cuando entra
@defer(on viewport){
  <app-offer-preview />
} @placeholder {
  <p>We might have an offer...</p>
}



//On Interaction
@defer(on interaction){
  <app-offer-preview />
} @placeholder {
  <p>We might have an offer...</p>
}



@defer(on interaction; prefetch on hover){
  <app-offer-preview />
} @placeholder {
  <p>We might have an offer...</p>
}
```
