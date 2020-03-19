# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require ('faker')

Clothing.destroy_all
ClothingCategory.destroy_all
User.destroy_all

ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

5.times do
  User.create(name: Faker::Movies::LordOfTheRings.character, email: Faker::Internet.email, 
              password: '12345', password_confirmation: '12345', avatar_url: Faker::LoremPixel.image(size: "730x411"))
end

ClothingCategory.create(name: "tshirt")
ClothingCategory.create(name: "sweater")
ClothingCategory.create(name: "dress")
ClothingCategory.create(name: "shorts")
ClothingCategory.create(name: "pants")

1..5.times do |i|
  Clothing.create(size: 'S', image_url: Faker::LoremPixel.image(size: "730x411"), available_for_exchange: Faker::Boolean, user_id: User.all[i].id, clothing_category_id: ClothingCategory.all[i].id)
end

1..5.times do |i|
  Clothing.create(size: 'M', image_url: Faker::LoremPixel.image(size: "730x411"), available_for_exchange: Faker::Boolean, user_id: User.all[i].id, clothing_category_id: ClothingCategory.all[i].id)
end

1..5.times do |i|
  Clothing.create(size: 'L', image_url: Faker::LoremPixel.image(size: "730x411"), available_for_exchange: false, user_id: User.all[i].id, clothing_category_id: ClothingCategory.all[i].id)
end