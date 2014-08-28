class ExtendChatsToPrivate < ActiveRecord::Migration
  def change
    add_column :chats, :private_chat, :boolean
  end
end
