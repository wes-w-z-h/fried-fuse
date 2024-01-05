class PostSerializer
  include JSONAPI::Serializer
  attributes :content, :topic_id
end
