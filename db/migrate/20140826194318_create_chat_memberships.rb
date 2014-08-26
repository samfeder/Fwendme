class CreateChatMemberships < ActiveRecord::Migration
  def change
    create_table :chat_memberships do |t|
      t.integer :user_id, null: false
      t.integer :chat_id, null: false

      t.timestamps
    end
    add_index :chat_memberships, :user_id
    add_index :chat_memberships, :chat_id
  end
end
