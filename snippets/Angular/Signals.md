# Signals

```typescript
//Basic
//ts:
ticket_data = input.required<ITicket>();

close = output<void>();
this.close.emit();

//UPDATE
this.detailsVisible.update((prev) => !prev);
// or
this.user.update((prev) => ({
      ...prev,
      email: 'test@test.com', // Actualiza solo el campo email
    }));



//COMPUTED
number1 = 2
number2 = 3
esCinco = computed(() => this.number + this.other_number === 5)
```
