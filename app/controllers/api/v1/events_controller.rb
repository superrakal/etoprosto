module Api
  module V1
    class EventsController < Api::V1::BaseController

      respond_to :json

      def index
        @events = Event.where(:date.gt => params[:from], :date.lt => params[:to])
        respond_with @events
      end

      def show
      end

      def create
      end

    end
  end
end

