# Key Event

```js
export class SearchModalComponent {
  
  // Listener para Ctrl + K
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Verifica si es Ctrl + K (en Mac sería Command + K)
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault(); // Previene el comportamiento por defecto
      ...
    }

    // Opcional: Cerrar con ESC
    if (event.key === 'Escape' && this.isModalOpen) {
      ...
    }
  }
```
