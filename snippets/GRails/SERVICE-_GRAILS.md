# SERVICE - GRAILS

```java
import groovy.transform.CompileStatic

@CompileStatic
class User {
 String name
 String email
 Integer age
    
    def call(String email){
        Map result = [success: null, data: null, errorMessage: null]
        this.email = email
        nameAndAge() 
    }
    
    private String nameAndAge(){
        "$name - $age - $email"
    }
}



.
```

```java
// CLIENT
User userInstance = new User(name: "Natish")
userInstance.age = 7
userInstance("dasd@dsad.com")
```

