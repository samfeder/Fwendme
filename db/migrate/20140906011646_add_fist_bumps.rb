class AddFistBumps < ActiveRecord::Migration
  def change

    create_table :bumps do |t|
      t.integer :user_id, null: false
      t.integer :message_id, null: false
      t.boolean :snailed, null: false, default: false

      t.timestamps
    end
    add_index :bumps, :user_id
    add_index :bumps, :message_id
  end
end
