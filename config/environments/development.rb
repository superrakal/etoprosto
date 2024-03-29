Rails.application.configure do
  config.cache_classes = false
  config.eager_load = false
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false
  config.action_mailer.raise_delivery_errors = false
  config.active_support.deprecation = :log
  config.assets.debug = true
  config.assets.digest = true
  config.assets.raise_runtime_errors = true

  ##Mailcatcher
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {:address => '127.0.0.1', :port => 1025}
  config.action_mailer.default_url_options = { host: 'localhost:3000' }
end
