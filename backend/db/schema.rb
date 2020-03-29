# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_29_015541) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clothing_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "clothings", force: :cascade do |t|
    t.string "size"
    t.string "image_url"
    t.boolean "available_for_exchange"
    t.bigint "user_id"
    t.bigint "clothing_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "left_offset_percent"
    t.integer "right_offset_percent"
    t.integer "top_offset_percent"
    t.index ["clothing_category_id"], name: "index_clothings_on_clothing_category_id"
    t.index ["user_id"], name: "index_clothings_on_user_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.bigint "user_1_id"
    t.bigint "user_2_id"
    t.index ["user_1_id"], name: "index_conversations_on_user_1_id"
    t.index ["user_2_id"], name: "index_conversations_on_user_2_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "text"
    t.bigint "conversation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.string "avatar_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "clothings", "clothing_categories"
  add_foreign_key "clothings", "users"
  add_foreign_key "messages", "conversations"
  add_foreign_key "messages", "users"
end
