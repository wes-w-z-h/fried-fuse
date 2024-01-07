class SessionsController < ApplicationController
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
end
