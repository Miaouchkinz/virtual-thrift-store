class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text, :conversation_id, :user_id, :created_at
end
