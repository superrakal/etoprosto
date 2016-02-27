source 'https://rubygems.org'

gem 'rails', '~>4.2.4'

# MongoDB support
gem 'mongoid', '~>4.0.0'
gem 'mongoid-autoinc'
gem 'kaminari'

# Mongoid utils
gem 'mongoid-paperclip', require: 'mongoid_paperclip'
gem 'paperclip', '~>4.2.0'

# Search engine
gem 'ransack', github: 'Zhomart/ransack', branch: 'mongoid'

gem 'active_model_serializers'

gem 'state_machines-mongoid'

# Admin tool
gem 'rails_admin', '0.7.0'
gem 'rails_admin_nestable', '0.3.2'

# Authentication & Authorization
gem 'devise'
gem 'cancancan'
gem 'rolify'

#ember js
gem 'ember-cli-rails'

group :test, :development do
  gem 'capybara', '~> 2.3.0'
  gem 'rspec-rails', '~> 3.0.0'
  gem 'rspec-mocks'
  gem 'factory_girl_rails'
  gem 'database_cleaner'
  gem 'cucumber-rails', require: false
  gem 'selenium-webdriver'
  gem 'rack'
  gem 'coveralls', require: false
  gem 'simplecov', require: false
  gem 'unicorn_service', '~>0.5.1', require: false
  gem 'nginx-config', require: false
  gem 'email_spec'
  gem 'delorean'
  gem 'better_errors'
end

group :development do
  gem 'quiet_assets'
  gem 'capistrano'
  gem 'rvm-capistrano',  require: false
  gem 'net-ssh', '~> 2.7.0'
  gem 'capistrano-unicorn', '~> 0.2.0', :require => false
  gem 'capistrano-sidekiq'
end

group :production do
  gem 'unicorn', '~>4.9.0', platform: :ruby
end

gem 'sidekiq', '3.4.0'
gem 'prerender_rails'
gem 'redis'

