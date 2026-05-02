# nil vs. empty vs. blank in Ruby

```ruby
# Value             | nil?   | empty? | blank? | present? |
# ------------------+--------+--------+--------+----------+
# 5                 | false  | NoMeth | false  | true     |
# ""                | false  | true   | true   | false    |
# " "               | false  | false  | true   | false    |
# "\t\n"            | false  | false  | true   | false    |
# []                | false  | true   | true   | false    |
# (["a"])           | false  | false  | false  | true     |
# {}                | false  | true   | true   | false    |
# ({ a: "b" })      | false  | false  | false  | true     |
# Set.new           | false  | true   | true   | false    |
# nil               | true   | NoMeth | true   | false    |
# true              | false  | NoMeth | false  | true     |
# false             | false  | NoMeth | true   | false    |

```
