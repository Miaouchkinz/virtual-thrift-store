class User < ApplicationRecord
  # tells the user model that the password needs to be encrypted
  has_secure_password

  validates_presence_of :email
  validates_uniqueness_of :email
end
