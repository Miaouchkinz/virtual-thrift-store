class UpdateMessages < ActiveRecord::Migration[5.2]
  def change
    change_table :messages do | t |
      t.remove :user_id
    end
  end
end
