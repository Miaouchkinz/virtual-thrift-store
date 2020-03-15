class CreateClothings < ActiveRecord::Migration[5.2]
  def change
    create_table :clothings do |t|
      t.string :size
      t.string :image_url
      t.boolean :available_for_exchange
      t.references :user, foreign_key: true
      t.references :clothing_category, foreign_key: true

      t.timestamps
    end
  end
end
