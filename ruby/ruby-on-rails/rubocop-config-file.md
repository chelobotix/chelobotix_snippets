# Rubocop config file

## Fragment 1: Fragment

Add this line to the Gemfile
gem 'rubocop-rails', require: false
 
rubocop -A
rubocop --only Style/StringLiterals -A

```ruby
inherit_from: .rubocop_todo.yml

require:
  - rubocop-rails

AllCops:
  EnabledByDefault: true
  TargetRubyVersion: 3.2.2
  Exclude:
    - '**/db/**/*'
    - '**/config/**/*'
    - '**/bin/**/*'
    - 'config.ru'
Style/Documentation:
  Enabled: false

Style/FrozenStringLiteralComment:
  Enabled: false

Lint/ConstantResolution:
  Enabled: false

Bundler/GemVersion:
  Enabled: false

Bundler/GemComment:
  Enabled: false

Metrics/MethodLength:
  Max: 30

Metrics/AbcSize:
  Max: 30

```

## Fragment 2: Disabled

```ruby
# rubocop:disable all

module TempTask
  ...
end

# rubocop:enable all
```
