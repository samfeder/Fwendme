class FixAvatarLinks < ActiveRecord::Migration
  def change
    remove_column :chats, :avatar
    remove_column :users, :avatar_link

    change_table :chats do |t|
      t.attachment :portrait
    end

    change_table :users do |t|
      t.attachment :avatar
    end

  end
end
