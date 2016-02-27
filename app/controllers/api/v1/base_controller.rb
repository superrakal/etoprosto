module Api
  module V1
    class BaseController < ApplicationController

      protect_from_forgery with: :null_session
      before_action :authenticate_user_from_token!

      def authenticate_user_from_token
        authenticated = authenticate_with_http_token do |user_token, options|
          user_email = options[:email].presence
          user       = user_email && User.find_by(email: user_email)

          if user && Devise.secure_compare(user.authentication_token, user_token)
            sign_in user, store: false
          else
            return false
          end
        end
        authenticated.nil? ? false : authenticated
      end

      def authenticate_user_from_token!
        authenticated = authenticate_user_from_token
        raise Warden::NotAuthenticated if authenticated.nil?
        authenticated
      end

    end
  end
end