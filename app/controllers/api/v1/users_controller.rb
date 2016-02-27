module Api
  module V1
    class UsersController < Api::V1::BaseController

      respond_to :json

      def index
      end

      def show
        @user = User.find params[:id]
        respond_with @user
      end

      def create
        @user = User.new user_params
        if @user.save
          respond_with @user, status: :created, location: false
        else
          respond_with @user, status: :unprocessable_entity
        end
      end

      private
        def user_params
          params.require(:user).permit :email, :first_name, :second_name, :password, :password_confirmation
        end


    end
  end
end
