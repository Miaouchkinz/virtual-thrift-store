class AddUsersToConversations < ActiveRecord::Migration[5.2]
  change_table :conversations do | t |
    t.references :user_1 
    t.references :user_2
  end
end
