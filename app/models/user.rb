class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  before_create :generate_token
  enum role: [:member, :librarian]
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :borrowings
  has_many :books, through: :borrowings

  def borrowed_books
    borrowings.borrowed.includes(:book).map do |borrowing|
      borrowing.as_json(methods: [:due_date, :overdue]).merge(book_title: borrowing.book.title)
    end
  end


  private

  def generate_token
    self.token = SecureRandom.hex(20)
  end

end
