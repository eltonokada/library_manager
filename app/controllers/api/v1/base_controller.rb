class Api::V1::BaseController < ApplicationController
  before_action :authenticate_api_user!, except: [:index, :show]
  attr_reader :current_user

  private

  def authenticate_api_user!
    token = request.headers['Authorization']
    if token.present?
      @api_user = User.find_by(token: token)
    end
    unless @api_user
      render json: { error: 'Not Authorized' }, status: 401
      return
    end
  end
end
