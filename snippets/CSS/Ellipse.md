# Ellipse

```css
.multiline-ellipsis {
  height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* número de líneas a mostrar */
  -webkit-box-orient: vertical;
}

cuando uses truncate ponle siempre width
<p class="text-blue-400 w-full truncate text-center">


.truncate {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```
