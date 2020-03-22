class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text, :conversation_id, :created_at
end
