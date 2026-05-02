# Generics Go

```go
// FUNCTION
// basic
test(map[string]int{"a": 1, "b": 2}) // Esto es cuando SI puede inferir el tipo
test[int](map[string]int{"a": 1, "b": 2}) // Esto es cuando no puede inferir el tipo

func test[T int | float64](a, b T) T {
	return a + b
}

```

```go
// Comparable que recibe un map
SumIntsOrFloats(map[string]int{"a": 1, "b": 2}) // infiriendo
SumIntsOrFloats[string, int64](map[string]int{"a": 1, "b": 2}) // sin inferir

func SumIntsOrFloats[K comparable, V int64 | float64](m map[K]V) V {
    var s V
    for _, v := range m {
        s += v
    }
    return s
}
```


```go
// STRUCT AND INTERFACE
type FlexibleStruct struct {
    Data GenericField[string] | GenericField[int]
}

// or
type StringOrInt interface {
    ~string | ~int
}

type GenericField[T StringOrInt] struct {
    Value T
}
```
