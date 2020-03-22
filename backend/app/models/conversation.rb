class Conversation < ApplicationRecord
  has_many :messages
  has_many :user_conversations
end
