class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :short_description, :description, :date
end
