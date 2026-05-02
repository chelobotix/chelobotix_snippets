# Stream Live

ActionController::Live
```ruby
#ActionController::Live
class StreamController < ApplicationController
  include ActionController::Live
  def live
    response.headers['Content-Type'] = 'text/event-stream'
    response.headers['Last-Modified'] = Time.now.httpdate

    sse = SSE.new(response.stream, retry: 300, event: 'Stream started')
    
    sleep 1
    
    sse.write("The current time is #{Time.current}", event: 'message')
  rescue ActionController::Live::ClientDisconnected
    puts('client disconnected')
    sse.close
    response.stream.close
  rescue IOError
    puts('client disconnected')
    sse.close
    response.stream.close
  ensure
    puts('close stream')
    response.stream.close
  end
end

```

```ts
//FRONT END
//stream.js
document.addEventListener('DOMContentLoaded', function () {
  const eventSource = new EventSource('http://127.0.0.1:3000/stream/live');

  eventSource.onmessage = function (event) {
    console.log('Nuevo dato recibido:', event.data);
  };

  // Opcionalmente, manejar la finalización del stream
  eventSource.onopen = function (event) {
    console.log('Stream abierto...');
  };
});
```
