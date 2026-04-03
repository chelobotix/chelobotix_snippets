# Ruby LP Rubocop

## Fragment 1: Fragment

1. Add Gem Rubocop
2 .Create .rubocop.yml
3. Pick a project and set the bundle path in the local config bundle config --local path .bundle
4. Run bundle install
5. Run exe/ruby-lsp inside that project's folder
6. Verify that it boots the LSP successfully
7. Cleanup the bundle configuration rm -rf .bundle


## Fragment 2: .rubocop.yml

```yaml
AllCops:
  EnabledByDefault: true
  TargetRubyVersion: 3.2.2
  Exclude:
    - '**/db/**/*'
    - '**/config/**/*'
    - '**/bin/**/*'
    - 'config.ru'


Style/Copyright:
  Enabled: false
```
