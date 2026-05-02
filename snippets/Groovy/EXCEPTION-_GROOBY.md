# EXCEPTION - GROOBY

```java
int attempts = 0
int maxAttempts = 1

try {
    attempts++
    println "Ejecutando intento ${attempts}"

    // Código que puede fallar
    if (attempts < 2) {
        throw new RuntimeException("Error temporal")
    }

    println "El código terminó sin errores"
} catch (Exception e) {
    println "Rescatado: ${e.message}"
} finally {
    println "Bloque ensure ejecutado"
}
```
