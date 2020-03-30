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


User.create(
  name: 'Ariana', 
  email: 'ariana@email.com', 
  password: '12345',
  password_confirmation: '12345',
  avatar_url: '/images/user_avatar/Ariana.jpg');

User.create(
  name: 'Antoine', 
  email: 'antoine@email.com', 
  password: '12345',
  password_confirmation: '12345',
  avatar_url: '/images/user_avatar/Antoine.jpg');

User.create(
  name: 'Raphaelle', 
  email: 'raphaelle@email.com', 
  password: '12345',
  password_confirmation: '12345',
  avatar_url: '/images/user_avatar/Raphaelle.jpg');

User.create(
  name: 'Tess', 
  email: 'tess@email.com', 
  password: '12345',
  password_confirmation: '12345',
  avatar_url: '/images/user_avatar/Tess.jpg');

ClothingCategory.create(name: "tshirt");
ClothingCategory.create(name: "sweater");
ClothingCategory.create(name: "dress");
ClothingCategory.create(name: "shorts");
ClothingCategory.create(name: "pants");

# User 1's closet:
# TSHIRTS
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/TSHIRT_8_FLOWER.png',
  available_for_exchange: false, 
  user_id: 1,
  clothing_category_id: 1,
  left_offset_percent: 0.318,
  right_offset_percent: 0.338,
  top_offset_percent: 0.236 
)
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/TSHIRT_7_CHICKEN.png',
  available_for_exchange: false, 
  user_id: 1,
  clothing_category_id: 1,
  left_offset_percent: 0.26,
  right_offset_percent: 0.3,
  top_offset_percent: 0.11 
)
# CHEMISE
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/CHEMISE_1_STRIPES.png',
  available_for_exchange: false, 
  user_id: 1,
  clothing_category_id: 1,
  left_offset_percent: 0.281,
  right_offset_percent: 0.313,
  top_offset_percent: 0.236 
)
# HOODIE
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/HOODIE_4_YELLOW.png',
  available_for_exchange: false, 
  user_id: 1,
  clothing_category_id: 2,
  left_offset_percent: 0.311,
  right_offset_percent: 0.318,
  top_offset_percent: 0.303 
)
# DRESS
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/DRESS_1_BLUE_STRIPES.png',
  available_for_exchange: false, 
  user_id: 1,
  clothing_category_id: 3,
  left_offset_percent: 0.36,
  right_offset_percent: 0.36,
  top_offset_percent: 0.165 
)
# PANTS
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/PANTS_4_CORDUROY.png',
  available_for_exchange: false, 
  user_id: 1,
  clothing_category_id: 5,
  left_offset_percent: 0.32,
  right_offset_percent: 0.34,
  top_offset_percent: 0.09
)
# SHORTS
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/SHORTS_1_RED_AND_BLUE.png',
  available_for_exchange: false, 
  user_id: 1,
  clothing_category_id: 4,
  left_offset_percent: 0.24,
  right_offset_percent: 0.25,
  top_offset_percent: 0.16
)

# ========================
# ========================

# User 2's closet:
# TSHIRTS
Clothing.create(
  size: 'M',
  image_url: '/images/clothing/TSHIRT_6_GOLLUM.png',
  available_for_exchange: true, 
  user_id: 2,
  clothing_category_id: 1,
  left_offset_percent: 0.245,
  right_offset_percent: 0.282,
  top_offset_percent: 0.107 
)
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/TSHIRT_5_TIEDYE.png',
  available_for_exchange: true, 
  user_id: 2,
  clothing_category_id: 1,
  left_offset_percent: 0.268,
  right_offset_percent: 0.288,
  top_offset_percent: 0.0116 
)
# CHEMISE
Clothing.create(
  size: 'L',
  image_url: '/images/clothing/CHEMISE_2_FLOWERS.png',
  available_for_exchange: true, 
  user_id: 2,
  clothing_category_id: 1,
  left_offset_percent: 0.281,
  right_offset_percent: 0.313,
  top_offset_percent: 0.236 
)
# HOODIE
Clothing.create(
  size: 'L',
  image_url: '/images/clothing/HOODIE_3_GREY.png',
  available_for_exchange: true, 
  user_id: 2,
  clothing_category_id: 2,
  left_offset_percent: 0.323,
  right_offset_percent: 0.353,
  top_offset_percent: 0.315 
)
# DRESS
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/DRESS_2_FLOWERS.png',
  available_for_exchange: true, 
  user_id: 2,
  clothing_category_id: 3,
  left_offset_percent: 0.36,
  right_offset_percent: 0.36,
  top_offset_percent: 0.125
)
# PANTS
Clothing.create(
  size: 'M',
  image_url: '/images/clothing/PANTS_3_TARTAN.png',
  available_for_exchange: true, 
  user_id: 2,
  clothing_category_id: 5,
  left_offset_percent: 0.4,
  right_offset_percent: 0.43,
  top_offset_percent: 0.1
)
# SHORTS
Clothing.create(
  size: 'M',
  image_url: '/images/clothing/SHORTS_2_PLAID.png',
  available_for_exchange: true, 
  user_id: 2,
  clothing_category_id: 4,
  left_offset_percent: 0.175,
  right_offset_percent: 0.2,
  top_offset_percent: 0.11 
)

# ========================
# ========================

# User 3's closet:
# TSHIRTS
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/TSHIRT_4_STARTREK.png',
  available_for_exchange: true, 
  user_id: 3,
  clothing_category_id: 1,
  left_offset_percent: 0.225,
  right_offset_percent: 0.211,
  top_offset_percent: 0.0888 
)
Clothing.create(
  size: 'M',
  image_url: '/images/clothing/TSHIRT_3_CHILDISH.png',
  available_for_exchange: true, 
  user_id: 3,
  clothing_category_id: 1,
  left_offset_percent: 0.264,
  right_offset_percent: 0.279,
  top_offset_percent: 0.132
)
# CHEMISE
Clothing.create(
  size: 'L',
  image_url: '/images/clothing/CHEMISE_3_PATTERN.png',
  available_for_exchange: true, 
  user_id: 3,
  clothing_category_id: 1,
  left_offset_percent: 0.218,
  right_offset_percent: 0.246,
  top_offset_percent: 0.146
)
# HOODIE
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/HOODIE_2_HOCKEY.png',
  available_for_exchange: true, 
  user_id: 3,
  clothing_category_id: 2,
  left_offset_percent: 0.335,
  right_offset_percent: 0.35,
  top_offset_percent: 0.335
)
# DRESS
Clothing.create(
  size: 'M',
  image_url: '/images/clothing/DRESS_3_WHITE.png',
  available_for_exchange: true, 
  user_id: 3,
  clothing_category_id: 3,
  left_offset_percent: 0.46,
  right_offset_percent: 0.46,
  top_offset_percent: 0.15
)
# PANTS
Clothing.create(
  size: 'L',
  image_url: '/images/clothing/PANTS_2_GREEN_SKIRT.png',
  available_for_exchange: true, 
  user_id: 3,
  clothing_category_id: 5,
  left_offset_percent: 0.36,
  right_offset_percent: 0.38,
  top_offset_percent: 0.18 
)
# SHORTS
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/SHORTS_3_JUNGLE.png',
  available_for_exchange: true, 
  user_id: 3,
  clothing_category_id: 4,
  left_offset_percent: 0.22,
  right_offset_percent: 0.225,
  top_offset_percent: 0.16 
)

# ========================
# ========================

# User 4's closet:
# TSHIRTS
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/TSHIRT_2_CSS.png',
  available_for_exchange: true, 
  user_id: 4,
  clothing_category_id: 1,
  left_offset_percent: 0.26,
  right_offset_percent: 0.29,
  top_offset_percent: 0.0854 
)
Clothing.create(
  size: 'M',
  image_url: '/images/clothing/TSHIRT_1_ANIMALCROSSING.png',
  available_for_exchange: true, 
  user_id: 4,
  clothing_category_id: 1,
  left_offset_percent: 0.236,
  right_offset_percent: 0.247,
  top_offset_percent: 0.0929 
)
# CHEMISE
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/CHEMISE_4_SQUARE.png',
  available_for_exchange: true, 
  user_id: 4,
  clothing_category_id: 1,
  left_offset_percent: 0.26,
  right_offset_percent: 0.29,
  top_offset_percent: 0.14 
)
# HOODIE
Clothing.create(
  size: 'L',
  image_url: '/images/clothing/HOODIE_1_BLACK.png',
  available_for_exchange: true, 
  user_id: 4,
  clothing_category_id: 2,
  left_offset_percent: 0.323,
  right_offset_percent: 0.364,
  top_offset_percent: 0.315 
)
# DRESS
Clothing.create(
  size: 'M',
  image_url: '/images/clothing/DRESS_4_GOLD.png',
  available_for_exchange: true, 
  user_id: 4,
  clothing_category_id: 3,
  left_offset_percent: 0.28,
  right_offset_percent: 0.28,
  top_offset_percent: 0.14 
)
# PANTS
Clothing.create(
  size: 'S',
  image_url: '/images/clothing/PANTS_1_FLOWERS.png',
  available_for_exchange: true, 
  user_id: 4,
  clothing_category_id: 5,
  left_offset_percent: 0.435,
  right_offset_percent: 0.437,
  top_offset_percent: 0.075 
)
# SHORTS
Clothing.create(
  size: 'L',
  image_url: '/images/clothing/SHORTS_4_STRIPE.png',
  available_for_exchange: true, 
  user_id: 4,
  clothing_category_id: 4,
  left_offset_percent: 0.2,
  right_offset_percent: 0.21,
  top_offset_percent: 0.15 
)