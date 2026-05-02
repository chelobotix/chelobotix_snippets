# ENUM - GRAILS

```java
package enums
import groovy.transform.CompileStatic

@CompileStatic
enum Color {
    RED(1, 'Red Color'),
    GREEN(2, 'Green Color'),
    BLUE(3, 'Blue Color')

    final int id
    final String description

    private Color(int id, String description) {
        this.id = id
        this.description = description
    }

    static Color getById(int id) {
        return values().find { Color c -> c.id == id } as Color
    }
    
    static Color getByDescription(String description) {
        return values().find { Color c -> c.description == description } as Color
    }
}
```


```java
// CLIENT
import enums.*
    
Color.getById(2) //GREEN
```
