class AddReturnedAtToBorrowing < ActiveRecord::Migration[7.1]
  def change
    add_column :borrowings, :returned_at, :datetime
  end
end
