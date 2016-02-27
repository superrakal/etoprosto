class Recall
  include Mongoid::Document
  include Mongoid::Timestamps

  field :email
  field :name
  field :message

  validates_presence_of :email, :name, :message
end
