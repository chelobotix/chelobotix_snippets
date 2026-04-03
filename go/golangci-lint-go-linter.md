# golangci-lint Go Linter

```shell
# Install
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.63.4
golangci-lint --version
```

```yml
# .golangci.yml

linters:
  enable:
    - errcheck      # Detect unchecked errors
    - gosimple      # Suggest code simplifications
    - govet         # Reports suspicious constructs
    - ineffassign   # Detects unused variable assignments
    - lll           # Detects long lines
    - staticcheck   # Go vet on steroids
    - revive        # Suggests code simplification
    - gocyclo       # Detect cyclomatic complexity
    - unused        # Detect unused constants, variables, functions and types
    - goconst       # Detect repeated values that can be made constants
    #- gofumpt       # Or "gofmt", # Enforce standard formatting
    - goimports     # Ensure standard import formatting/ordering
    - unconvert     # Detect unnecessary type conversions
    - unparam       # Detect unused function parameters
    - err113

# Configuración de linters específicos
linters-settings:
  lll:
    line-length: 120

  gocyclo:
    min-complexity: 15 # Complejidad ciclomática mínima para advertencias

# Configuración de salida
output:
  formats:
    - format: colored-line-number

```
