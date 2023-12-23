class Book < ApplicationRecord
  has_many :borrowings, dependent: :destroy
  has_many :users, through: :borrowings

  def available_copies
    self.total_copies - self.borrowings.where(returned_at: nil).count
  end
end
