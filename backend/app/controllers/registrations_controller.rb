class RegistrationsController < ApplicationController
  def create
    user = User.create!(
      username: params["user"]["username"],
      password: params["user"]["password"],
      password_confirmation: params["user"]["password_confirmation"],
    )

    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user,
      }
    else
      render json: {
        status: 500,
      }
    end
  end

  def destroy
    user = User.find_by(username: params[:id])
    if user
      if user.destroy
        render json: {
          status: :destroyed
        }
      else
        render json: {error: user.errors.messages}, status: 422
      end

    else
      render json: {error: "user not found"}, status: 404
    end
  end

  def update

  end
end
