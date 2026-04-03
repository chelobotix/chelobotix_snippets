# jQuery Tricks

```javascript
 // Recargar con nueva informacion solo un elemento del DOM
 $('#last-movie').load(window.location.href + ' #last-movie');
 
 
 
 // Esperar a que cargue completamente el DOM (coffee)
 $(document).ready ->
 // Esperar a que cargue completamente el DOM (normal)
 $(document).ready(function () {
  toastr.info('Are you the 6 fingered man?')
  //https://github.com/d4be4st/toastr_rails?tab=readme-ov-file
});
 
 
 
 // Scrollear hasta el bottom
 $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight)
 
 
 
 //Verificar si un elemento existe en el DOM (super util)
 if ($("#chat-box").length > 0)
 
 
 // Events
$(".demo").click(function(){
  $(this).hide(200);
});

.click() //on click event

.dblclick() // on double click

.focus(), .focusin(), .focusout()

.hover()

.keydown(), .keyup(), .keypress()

.mousedown(), .mouseup()

.mousemove() 

.ready() // after page is completly loaded


// Input event
$('input.myTextInput').on('input',function(e){
 alert('Changed!')
});



// Ajax request
$(document).on("ajax:complete", function() {
    console.log('Ajax completed!')
} );





```
