class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title, :user_1_id, :user_2_id
  has_many :messages
end
