class AddTensorFlowColumns < ActiveRecord::Migration[5.2]
  change_table :clothings do | t |
    t.float :left_offset_percent
    t.float :right_offset_percent
    t.float :top_offset_percent
  end
end
