module Api
  module V1
    class EventsController < Api::V1::BaseController

      respond_to :json

      def index
        @events = Event.where(:date.gt => params[:from], :date.lt => params[:to])
        respond_with @events
      end

      def show
        @event = Event.find params[:id]
        respond_with @event
      end

      def create
        @event = Event.new event_params
        if @event.save
          respond_with @event, status: :created, location: false
        else
          respond_with @event, status: :unprocessable_entity
        end
      end

      private
        def event_params
          params.require(:event).permit :title, :short_description, :description, :date, :address, :marker
        end
    end
  end
end

