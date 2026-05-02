# Test GO

```go
package main

import "testing"

var test = []struct {
	name     string
	dividend float32
	divisor  float32
	expected float32
	isErr    bool
}{
	{"valid-data", 100.0, 10.0, 10.0, false},
	{"invalid-data", 100.0, 0, 0.0, true},
}

func TestDivision(t *testing.T) {
	for _, test := range test {
		got, err := divide(test.dividend, test.divisor)

		if test.isErr {
			if err == nil {
				t.Errorf("%s: expected error, got nil", test.name)
			}
		} else {
			if err != nil {
				t.Errorf("%s: expected no error, got %v", test.name, err)
			}
		}

		if got != test.expected {
			t.Errorf("%s: expected %f, got %f", test.name, test.expected, got)
		}
	}
}

// Manual test not recommended
func TestDivide(t *testing.T) {
	_, err := divide(10.0, 2.0)
	if err != nil {
		t.Error("got an error")
	}
}

func TestBadDivide(t *testing.T) {
	_, err := divide(10.0, 0)
	if err == nil {
		t.Error("got an error")
	}
}


```
