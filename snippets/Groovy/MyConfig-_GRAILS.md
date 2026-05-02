# MyConfig - GRAILS

```java
// build.gradle
//71

developmentOnly("org.springframework.boot:spring-boot-devtools")
    developmentOnly("net.java.dev.jna:jna:5.13.0")
    developmentOnly("net.java.dev.jna:jna-platform:5.13.0")
    developmentOnly("io.methvin:directory-watcher:0.15.0")
```

```java    
//221

assets {
    minifyJs = false
    minifyCss = false
    enableSourceMaps = false
    skipNonDigests = true

    // En dev, no compilar assets innecesariamente
    if (Environment.current == Environment.DEVELOPMENT) {
        developmentRuntime = true
    }
}
```
