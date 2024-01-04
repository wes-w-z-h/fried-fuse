class TopicSerializer
  include JSONAPI::Serializer
  attributes :title, :content, :category_id, :slug

  has_many :posts
end
