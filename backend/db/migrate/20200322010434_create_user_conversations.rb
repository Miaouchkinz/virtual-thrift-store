class CreateUserConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :user_conversations do |t|
      t.references :conversation, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
