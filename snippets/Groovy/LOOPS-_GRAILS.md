# LOOPS - GRAILS

```groovy
// Enumerators

// Single logic
postInstance.comments.each {
  println it
}

// complex logic:
postInstance.comments.each { comment ->
  if (comment.author) {
    println comment.author.name
  }
}
```
