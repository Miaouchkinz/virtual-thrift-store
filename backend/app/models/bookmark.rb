class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :clothing
end
