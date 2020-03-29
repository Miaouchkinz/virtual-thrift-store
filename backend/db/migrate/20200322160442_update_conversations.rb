class UpdateConversations < ActiveRecord::Migration[5.2]
  def change
    change_table :conversations do | t |
      t.string :title
    end
  end
end
