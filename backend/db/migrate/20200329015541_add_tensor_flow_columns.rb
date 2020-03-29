class AddTensorFlowColumns < ActiveRecord::Migration[5.2]
  change_table :clothings do | t |
    t.integer :left_offset_percent
    t.integer :right_offset_percent
    t.integer :top_offset_percent
  end
end
