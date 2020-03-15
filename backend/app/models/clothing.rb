class Clothing < ApplicationRecord
  belongs_to :user
  belongs_to :clothing_category

end
