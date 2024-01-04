class TopicSerializer
  include JSONAPI::Serializer
  attributes :title, :content, :category_id, :user_id

  has_many :posts
end
