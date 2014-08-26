class CreateChats < ActiveRecord::Migration
  def change
    create_table :chats do |t|
      t.string :title,        null: false
      t.string :description
      t.string :avatar,       null: false
      t.integer :owner_id,     null: false

      t.timestamps
    end
    add_index :chats, :owner_id
  end
end
