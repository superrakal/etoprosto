Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :show, :create]
      resources :faq_questions, only: [:index, :show]
      resources :users, only: [:index, :show, :create]
      resources :recalls, only: [:create]
    end
  end

  devise_for :users, controllers: {confirmations: 'api/v1/confirmations', passwords: 'api/v1/passwords'}
  devise_scope :user do
    post 'api/v1/authenticate' => 'api/v1/sessions#create'
  end

  mount_ember_app :frontend, to: "/"
  mount_ember_assets :frontend, to: "/"
end
