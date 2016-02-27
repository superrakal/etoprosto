module Api
  module V1
    class SessionsController < Devise::SessionsController
      protect_from_forgery with: :null_session

      after_action only: :create do
        sign_out(:user)
      end

      def create
        self.resource = warden.authenticate!(auth_options)
        data = {
            token: self.resource.authentication_token,
            email: self.resource.email,
            id:    self.resource.id
        }
        render json: data, status: 201
      end
    end
  end
end