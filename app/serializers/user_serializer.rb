class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :second_name, :avatar_url

  def avatar_url
    @object.image.url
  end
end
