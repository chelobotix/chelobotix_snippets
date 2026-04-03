# Breaking nested loop

```ruby
catch :break_first do
  10.downto(0) do |n|
    puts "first loop #{n}"
    5.downto(0) do |m|
      puts "second loop #{m}"
      throw :break_first if n == 9 && m == 4
    end
  end
end
```
