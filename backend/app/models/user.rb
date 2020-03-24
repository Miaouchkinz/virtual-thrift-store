class User < ApplicationRecord
  # tells the user model that the password needs to be encrypted
  has_secure_password

  validates_presence_of :email
  validates_uniqueness_of :email

  has_many :conversation_user_1, class_name: "Conversation", foreign_key: "user_1"
  has_many :conversation_user_2, class_name: "Conversation", foreign_key: "user_2"
  
  has_many :messages
end
