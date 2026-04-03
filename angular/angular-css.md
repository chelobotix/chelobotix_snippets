# Angular CSS

```typescript
//Conditional add class status
<div [class.status]="currentStatus === 'online'">

//or 
//Con varias propiedades:
<div 
  [class]="{
  status: true,
  otra_clase: currentStatus === 'online'
  }"
  [style]="{
    fontSize: '64px'
  }"
>
```
