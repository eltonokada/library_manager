class Api::V1::UsersController < ApplicationController

  def borrowed_books
    user = User.find(params[:id])
    @borrowings = user.borrowed_books
    render_response @borrowings, 200
  end

  def show
    current_user = User.find(params[:id])
    p current_user
    render_response current_user, 200
  end

  private

  def render_response(body, status)
    render json: body, status: status
  end

end
