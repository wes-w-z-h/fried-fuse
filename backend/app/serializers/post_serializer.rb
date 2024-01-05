class PostSerializer
  include JSONAPI::Serializer
  attributes :content, :topic_id # :user_id
end
