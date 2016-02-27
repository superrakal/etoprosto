class Category
  include Mongoid::Document

  field :title
  field :color

  has_many :events

  validates_presence_of :title
end
