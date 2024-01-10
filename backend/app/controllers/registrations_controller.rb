class RegistrationsController < ApplicationController
  def create
    user_param = user_params
    # check for nil pw and update to a secure default
    process_params(user_param)
    user = User.create(user_param)

    # created a user object thats not null
    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user,
      }, status: :created
    else
      render json: { error: "user not created" }, status: 500
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

  # need to check this function if it works well
  def update
    user = User.find_by(username: params[:id])

    if user
      if user.update(user_params)
        render json: { user: user }, status: 200
      else
        render json: {
          status: 422,
          errors: user.errors.messages
        }, status: 422
      end
    else
      render json: { error: "user not found" }, status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :is_default_password)
  end

  # function to check the user_param passed and update the defualts accordingly
  def process_params(user_param)
    curr_pw = user_param[:password]
    if curr_pw.blank?
      password = SecureRandom.hex(12)
      user_param[:password] = password
      user_param[:is_default_password] = true
    else
      user_param[:is_default_password] = false
    end

  end
end
