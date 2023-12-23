class Api::V1::BooksController < Api::V1::BaseController

  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_book, only: [:show, :destroy, :update, :borrow, :return]

  def index
    @books = Book.left_joins(:borrowings)
                 .select('books.*, CASE WHEN borrowings.id IS NULL THEN false ELSE true END AS is_borrowed')
    render json: @books, status: 200
  end

  def create
    @book = Book.create(book_params)
    render json: @book, status: 201
  end

  def show
    render json: @book, status: 200
  end

  def destroy
    @book.destroy
    render json: {message: 'Book deleted'}, status: 200
  end

  def update
    @book.update(book_params)
    render json: @book, status: 200
  end

  def borrow
    @user = User.find(params[:user_id])
    if @book.available_copies > 0 && !@user.borrowings.find_by(book_id: @book.id)
      @book.borrowings.create(user_id: @user.id)
      render json: @book, status: 200
    else
      render json: {error: "No available copies"}, status: 400
    end
  end

  def return
    @borrowing = Borrowing.find_by(book_id: @book.id)
    if @borrowing
      @borrowing.update(returned_at: DateTime.now)
      render json: {message: "Book returned"}, status: 200
    else
      render json: {error: "Error"}, status: 400
    end
  end

  private

  def book_params
    params.require(:book).permit(:title, :author, :genre, :isbn, :total_copies)
  end

  def set_book
    @book = Book.find(params[:id])
  end
end
