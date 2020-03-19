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

ActiveRecord::Schema.define(version: 2020_03_18_190249) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookmarks", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "clothing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clothing_id"], name: "index_bookmarks_on_clothing_id"
    t.index ["user_id"], name: "index_bookmarks_on_user_id"
  end

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
    t.index ["clothing_category_id"], name: "index_clothings_on_clothing_category_id"
    t.index ["user_id"], name: "index_clothings_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.string "avatar_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "bookmarks", "clothings"
  add_foreign_key "bookmarks", "users"
  add_foreign_key "clothings", "clothing_categories"
  add_foreign_key "clothings", "users"
end
