# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require ('faker')

3.times do
User.create(name: Faker::Movies::LordOfTheRings.character, email: Faker::Internet.email, 
            password: Faker::Internet.password, avatar_url: Faker::LoremPixel.image(size: "730x411"))
end

5.times do
Clothing.create(size: 'S', image_url: Faker::LoremPixel.image(size: "730x411"), available_for_exchange: Faker::Boolean)
end

ClothingCategory.create(name: "tshirt")
ClothingCategory.create(name: "sweater")
ClothingCategory.create(name: "dress")
ClothingCategory.create(name: "shorts")
ClothingCategory.create(name: "pants")
