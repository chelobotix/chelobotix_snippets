# TRAITS - GRAILS

```java
// CLASSE QUE USA EL TRAIT
package animals

import animals.traits.FlyingAbility
import animals.traits.SingingAbility

class Bird implements FlyingAbility, SingingAbility {
    String name
    
    @Override
    String Obligatorio(){
      "Esto viene obligatorio del trait 1"
    }
}
```

```java
// TRAIT 1
package animals.traits

trait FlyingAbility {
    String fly() {
        "I am flying in the sky"
    }
    
    abstract String Obligatorio
}
```

```java
// TRAIT 2
package animals.traits

trait SingingAbility {
    String sing() {
        "I am singing a beautiful song"
    }
}
```

```java
//CLIENT
import animals.Bird

def bird = new Bird(name: "Parrot")

println bird.fly()   // I am flying in the sky
println bird.sing()  // I am singing a beautiful song
```
