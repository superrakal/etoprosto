module Api
  module V1
    class FaqQuestionsController < Api::V1::BaseController

      respond_to :json

      def index
        @questions = FaqQuestion.all
        respond_with @questions
      end

      def show
        @question = FaqQuestion.find params[:id]
        respond_with @question
      end

    end
  end
end

