# Sidekiq

```shell
bundle exec sidekiq
```

```shell
1. docker compose run --rm --service-ports api bundle exec sidekiq
2. le das control c y se abrira recien sidekiq
3. en otra pestaña abres terminal docker exec -it nombre_de_contenedor bash
```


```shell
# Directo sin Async
V3::Bvnk::WalletStatusWorker.new.perform(account_provider_user_id)

# Async
V3::Bvnk::WalletStatusWorker.perform_async(account_provider_user_id)

# Con Delay
V3::Bvnk::WalletStatusWorker.perform_in(1.hour, account_provider_user_id)

```


```ruby
sidekiq_retries_exhausted do |msg, ex|
  handle_exhausted_retries(msg, ex)
end

# msg
Es un hash con todos los metadatos del job que falló, incluyendo:

Nombre de la clase ('class')

Argumentos originales ('args')

Número de intentos ('retry_count')

Timestamps

Queue, etc.


# ex
Es la instancia de la excepción que causó el último fallo del job.

Contiene el mensaje de error (ex.message)

El backtrace (ex.backtrace)

Y cualquier otra propiedad normal de un objeto Exception en Ruby.
```


```ruby
# DELAYED JOBS

```

```ruby
# config/application.rb
config.active_job.queue_adapter = :sidekiq
```

```ruby
# TERMINAL
rails jobs:work
```

```ruby
# GENERATE
rails generate job webhook
ImportShipmentJob.perform_later(@channel_request) if @channel_request.aasm_state == 'waiting'
```

```ruby
# KILL ALL ENQUEUE JOBS
Delayed::Job.delete_all
```



```ruby
module V3
  module Bvnk
    class WalletStatusWorker
      include Sidekiq::Worker

      sidekiq_options retry: 5

      sidekiq_retries_exhausted do |msg, ex|
        handle_exhausted_retries(msg, ex)
      end

      # Performs wallet status verification for the given account provider user
      #
      # @param account_provider_user_id [Integer] The ID of the account provider user
      #
      # @return [void]
      #
      # @raise [StandardError] When wallet status is still INACTIVE
      def perform(account_provider_user_id)
        account_provider_user = AccountProviderUser.find(account_provider_user_id)

        if account_provider_user.present? && account_provider_user.is_a?(AccountProviderUser)
          Rails.logger.info("Iniciando verificación de estado para account_provider_user: #{account_provider_user.id}")

          service = ::Bvnk::Wallet::WalletStatusChecker.new(account_provider_user)
          service.call

          unless service.valid?
            error_message = "WalletStatus todavia en estado INACTIVE | wallet_id: #{account_provider_user.wallet_id}"
            raise StandardError.new(error_message)
          end
        else
          Rails.logger.error('WalletStatusWorker falló. Error: account_provider_user no es válido.')
        end
      end

      # Handles the scenario when all retries have been exhausted
      #
      # @param msg [Hash] The Sidekiq message containing job details
      # @param ex [Exception] The exception that caused the retries to be exhausted
      #
      # @return [void]
      def self.handle_exhausted_retries(msg, ex)
        account_provider_user_id = msg['args'].first
        account_provider_user = AccountProviderUser.find(account_provider_user_id)

        error_message = "WalletStatusWorker falló después de 5 reintentos. Error: #{ex.message}"

        Rails.logger.error(error_message)

        # Sends a failure notification when wallet creation verification fails
        handle_failure_notification(account_provider_user)
      end

      # Sends a failure notification when wallet creation verification fails
      #
      # @param account_provider_user [AccountProviderUser] The account provider user
      # @return [void]
      def self.handle_failure_notification(account_provider_user)
        service = ::Bvnk::NotificationHandler.new(
          user: account_provider_user.user,
          currency: account_provider_user.account_provider_country&.currency&.singular_name.to_s,
          scope: 'wallet',
          type: 'created_failed',
          is_success: false,
          errors: "Se agotaron los retries para verificar la habilitacion de la billetera #{account_provider_user.inspect}"
        )

        service.call
      end
    end
  end
end
```
