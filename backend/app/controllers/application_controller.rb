class ApplicationController < ActionController::API
  def authenticate
    @current_user
  end
end
