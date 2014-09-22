class AddUnreadNotifications < ActiveRecord::Migration
  def change

    add_column :chat_memberships, :unread, :integer, default: 0 

  end
end
