class Event
  include Mongoid::Document
  include Mongoid::Paperclip

  field :title
  field :short_description
  field :description
  field :date, type: DateTime
  field :address
  field :marker


  belongs_to :category

  has_mongoid_attached_file :image,
                            :styles => {
                                :thumb => "100x100",
                                :small  => "150x150",
                                :medium => "200x200",
                                :original => "860x640"
                            }
  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]
  validates_attachment_size :image, :less_than => 10.megabytes


end
