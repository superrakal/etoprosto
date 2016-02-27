module Api
  module V1
    class RecallsController < Api::V1::BaseController

      respond_to :json

      def create
        @recall = Recall.new recall_params
        if @recall.save
          respond_with @recall, status: :created, location: false
        else
          respond_with @recall, status: :unprocessable_entity
        end
      end

      private
        def recall_params
          params.require(:recall).permit :email, :name, :message
        end
    end
  end
end

