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

gem 'uglifier', '>= 1.3.0'

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

