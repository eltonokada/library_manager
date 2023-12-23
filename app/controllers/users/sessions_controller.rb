# app/controllers/users/sessions_controller.rb

class Users::SessionsController < Devise::SessionsController
  def create
    super do
      flash[:notice] = 'Login successful'
    end
  end
end
