class AddTensorFlowColumns < ActiveRecord::Migration[5.2]
  change_table :clothings do | t |
    t.decimal :left_offset_percent
    t.decimal :right_offset_percent
    t.decimal :top_offset_percent
  end
end
