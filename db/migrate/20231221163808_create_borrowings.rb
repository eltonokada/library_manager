class CreateBorrowings < ActiveRecord::Migration[7.1]
  def change
    create_table :borrowings do |t|
      t.boolean :returned
      t.integer :book_id
      t.integer :user_id

      t.timestamps
    end
  end
end
