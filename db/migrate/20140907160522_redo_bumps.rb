class RedoBumps < ActiveRecord::Migration
  def change
    drop_table :bumps

    create_table :bumps do |t|
      t.integer :message_id
      t.integer :user_id
      t.integer :val

      t.timestamps
    end

    add_index :bumps, :message_id
    add_index :bumps, :user_id
  end
end
