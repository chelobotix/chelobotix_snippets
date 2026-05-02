# asdf

```
https://mac.install.guide/rubyonrails/7.html

Using asdf as a version manager
You can install an earlier version of Ruby, for example Ruby 2.7.3.

$ asdf install ruby 2.7.3
For the current shell session, you can switch Ruby versions from the command line with asdf shell ruby 2.7.3. Opening the terminal will always use the default version of Ruby you specified initially with asdf global ruby 3.3.0.

The command asdf list ruby will show all installed versions of Ruby.

$ asdf list ruby
To override the default version of Ruby for a particular project, move into the project root directory and enter the command asdf local ruby <version>.

$ asdf local ruby 2.7.3
The command will write a file .tool-versions file in the current directory containing a Ruby version number.

The command asdf current will display all the asdf-installed software versions that are currently active.

If you no longer need a Ruby version, asdf can remove it with asdf uninstall ruby 2.7.3.
```
