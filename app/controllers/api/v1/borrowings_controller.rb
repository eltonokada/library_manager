class Api::V1::BorrowingsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_book_and_user, only: [:borrow]

  def borrow
    if @book.available_copies > 0 && !@user.borrowings.find_by(book_id: @book.id)
      @book.borrowings.create(user_id: @user.id)
      render_response(@book, 200)
    else
      render_response({error: "No available copies"}, 400)
    end
  end

  def borrowed_books
    @borrowings = Borrowing.all.borrowed.map { |borrowing| borrowing.book }
    render_response(@borrowings, 200)
  end

  def overdue_books
    @borrowings = Borrowing.overdue.borrowed.map { |borrowing| borrowing.book }
    render_response(@borrowings, 200)
  end

  def overdue_members
    @members = Borrowing.overdue_members
    render_response(@members, 200)
  end

  def destroy
    @borrowing = Borrowing.find(params[:id])
    @borrowing.destroy
    render_response(@borrowing, 200)
  end

  def create
    @borrowing = Borrowing.new(borrowing_params)
    if @borrowing.save
      render_response(@borrowing, 200)
    else
      render_response({error: "Something went wrong"}, 400)
    end
  end

  def update
    @borrowing = Borrowing.find(params[:id])
    if @borrowing.update(borrowing_params)
      render_response(@borrowing, 200)
    else
      render_response({error: "Something went wrong"}, 400)
    end
  end

  private

  def set_book_and_user
    @book = Book.find(params[:id])
    @user = User.find(params[:user_id])
  end

  def render_response(body, status)
    render json: body, status: status
  end

  def borrowing_params
    params.require(:borrowing).permit(:user_id, :book_id, :returned_at)
  end
end
