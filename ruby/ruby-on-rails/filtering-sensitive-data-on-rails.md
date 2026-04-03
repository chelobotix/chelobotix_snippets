# Filtering Sensitive data on rails

```yaml
Filtering sensitive data in a Ruby on Rails application is crucial to ensure the security and privacy of user data, especially when dealing with logs and error reporting. Rails provides several ways to filter sensitive information:

Parameter Filtering: Rails automatically filters sensitive data from the request logs. By default, it filters password and password_confirmation fields, but you can add more fields as needed.

In config/application.rb or in the specific environment configuration file (like config/environments/production.rb), you can specify additional parameters to filter:


config.filter_parameters += [:credit_card_number, :ssn]
# This approach replaces the values of these parameters with [FILTERED] in the logs.

Gem-Based Solutions: For more advanced filtering needs, especially when dealing with error tracking services (like Sentry, Rollbar, etc.), you might want to use specific gems or integrations provided by these services. They often allow custom data scrubbing and filtering.

Custom Middleware: For complex requirements, you can write a custom Rack middleware to filter out sensitive data from the request. This can be especially useful if you need to filter data that's not just form parameters.

ActiveRecord Attribute Filtering: If you're logging model attributes, be cautious about accidentally logging sensitive data. You might choose to override to_s or inspect methods on sensitive models to prevent sensitive data from being logged.

Using Rails.logger.silence Temporarily: In specific code blocks where sensitive information might be logged, you can temporarily silence the logger.

ruby
Copy code
Rails.logger.silence do
  # Sensitive operations
end
Environment Configuration: Ensure that your production environment is set up to not log sensitive information. Sometimes developers enable verbose logging in development or test environments for debugging purposes, but this should not be the case in production.
```
