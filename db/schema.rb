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

ActiveRecord::Schema.define(version: 20140906011646) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bumps", force: true do |t|
    t.integer  "user_id",                    null: false
    t.integer  "message_id",                 null: false
    t.boolean  "snailed",    default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "bumps", ["message_id"], name: "index_bumps_on_message_id", using: :btree
  add_index "bumps", ["user_id"], name: "index_bumps_on_user_id", using: :btree

  create_table "chat_memberships", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "chat_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "chat_memberships", ["chat_id"], name: "index_chat_memberships_on_chat_id", using: :btree
  add_index "chat_memberships", ["user_id"], name: "index_chat_memberships_on_user_id", using: :btree

  create_table "chats", force: true do |t|
    t.string   "title",                 null: false
    t.string   "description"
    t.integer  "owner_id",              null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "portrait_file_name"
    t.string   "portrait_content_type"
    t.integer  "portrait_file_size"
    t.datetime "portrait_updated_at"
    t.boolean  "private_chat"
  end

  add_index "chats", ["owner_id"], name: "index_chats_on_owner_id", using: :btree

  create_table "friendships", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "friend_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "friendships", ["friend_id"], name: "index_friendships_on_friend_id", using: :btree
  add_index "friendships", ["user_id"], name: "index_friendships_on_user_id", using: :btree

  create_table "messages", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "chat_id",    null: false
    t.string   "content",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "messages", ["chat_id"], name: "index_messages_on_chat_id", using: :btree
  add_index "messages", ["user_id"], name: "index_messages_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",               null: false
    t.string   "password_digest",     null: false
    t.string   "name",                null: false
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "uid"
    t.string   "provider"
  end

  add_index "users", ["uid"], name: "index_users_on_uid", using: :btree

end
