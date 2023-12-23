class Borrowing < ApplicationRecord
  belongs_to :user
  belongs_to :book

  scope :overdue, -> { where("created_at < ?", 2.weeks.ago) }
  scope :borrowed, -> { where("returned_at IS NULL") }
  scope :returned, -> { where("returned_at IS NOT NULL") }

  def overdue
    DateTime.now > self.created_at + 2.weeks
  end

  def self.overdue_members
    User.joins(:borrowings).where(borrowings: { id: Borrowing.overdue.ids }).distinct
  end

  def due_date
    created_at + 2.weeks
  end

end
