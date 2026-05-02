# ORM - GRAILS

```java
// QUERY SIN EJECUTAR
DetachedCriteria query = User.where {name == "Natish" && age == "7")


.
```


```java
// createCriteria()
def c = User.createCriteria()
def results = User.createCriteria().list {
    eq("username", "admin")
    gt("age", 18)
    order("createdAt", "desc")
}



// Con condiciones
Book.createCriteria().list {
  if (title) {
    like("title", "%${title}%")
  }
  if (author) {
    eq("author", author)
  }
}


// Con Asociaciones
ObraTrab.createCriteria().get {
    obra {
        eq('id', obraId)
    }
    trabajador {
        eq('id', trabajadorId)
    }
    fetchMode('obra', FetchMode.JOIN)
    fetchMode('trabajador', FetchMode.JOIN)
}
```
