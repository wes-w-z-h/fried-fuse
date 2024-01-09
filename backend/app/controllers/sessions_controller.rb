class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    username = params["user"]["username"]
    password = params["user"]["password"]
    user = User.find_by(username: username) # .try(:authenticate, password)
    # found an entry of the user by username
    if user
      # check if the user was created without pw else authenticate the pw passed
      if user.accept_blank? || user.authenticate(password)
        session[:user_id] = user.id
        render json: {
          logged_in: true,
          user: user,
        },
        status: :created
      else
        render json: { error: "Authentication failed" }, status: 401
      end
    else
      render json: { error: "user not found" }, status: 404
    end
  end

  def logged_in
    if @current_user
        render json: {
        logged_in: true,
        user: @current_user,
      }
    else
      render json: {
        logged_in: false,
      }
    end
  end

  def logout
    reset_session
    render json: {
      status: 200,
      logged_in: false,
      logged_out: true
    }
  end
end
