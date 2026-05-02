# Conditional algorithm

```ruby
def find_result(result)
  result = [true, '&&', false, '||', true]
  stack = []
  result.each do |element|
    if element == '&&' || element == '||'
      stack << element
    else
      if stack.empty?
        stack << element
      else
        operator = stack.pop
        operand = stack.pop

        case operator
        when '&&'
          stack << operand && element
        when '||'
          stack << operand || element
        end
      end
    end
  end

  stack.first
end
```
