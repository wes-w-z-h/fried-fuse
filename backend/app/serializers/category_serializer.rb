class CategorySerializer
  include JSONAPI::Serializer
  attributes :name, :description, :img_url

  has_many :topics
end
