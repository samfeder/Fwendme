# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140826194318) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chat_memberships", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "chat_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "chat_memberships", ["chat_id"], name: "index_chat_memberships_on_chat_id", using: :btree
  add_index "chat_memberships", ["user_id"], name: "index_chat_memberships_on_user_id", using: :btree

  create_table "chats", force: true do |t|
    t.string   "title",       null: false
    t.string   "description"
    t.string   "avatar",      null: false
    t.integer  "owner_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "chats", ["owner_id"], name: "index_chats_on_owner_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                         null: false
    t.string   "password_digest",               null: false
    t.string   "name",                          null: false
    t.string   "avatar_link",     default: "t"
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end