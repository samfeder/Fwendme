class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :user_id, null: false
      t.integer :chat_id,     null: false
      t.string :content,      null: false

      t.timestamps
    end
    add_index :messages, :user_id
    add_index :messages, :chat_id
  end
end
