class AuthenticationController < ApplicationController
  include CurrentUserConcern

  def create
    user_param = user_params
    user = User.find_by(username: user_param[:username])
    if user
      create_session(user, user_param[:password])
      # Rails.logger.info("this is in create: #{@current_user} \n")
    else
      create_user(user_param)
    end
  end


  def logged_in
    # Rails.logger.info("current session in logged in: #{session[:user_id]} \n")
    # Rails.logger.info("current user in logged in: #{@current_user} \n")
    if @current_user
        render json: {
        status: 200,
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
      user: @current_user
    }
  end


  def destroy_user
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


  # currently no need for this update function KIV first
  # def update_user
  #   user = User.find_by(username: params[:id])

  #   if user
  #     if user.update(user_params)
  #       render json: { user: user }, status: 200
  #     else
  #       render json: {
  #         status: 422,
  #         errors: user.errors.messages
  #       }, status: 422
  #     end
  #   else
  #     render json: { error: "user not found" }, status: 404
  #   end
  # end


  private

  # check if the user was created without pw else authenticate the pw passed
  def create_session(user, password)
    if user.accept_blank? || user.authenticate(password)
      session[:user_id] = user.id
      # Rails.logger.info("Session set: #{session.inspect}\n")
      render json: {
        status: :created,
        logged_in: true,
        user: user,
      }
    else
      render json: { error: "Authentication failed" }, status: :unauthorized
    end
  end

  # check for nil pw and update to a secure default
  def create_user(user_param)
    # user_param = user_params
    process_params(user_param)
    user = User.new(user_param)

    # created a user object thats not null
    if user.save
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: user,
      }
    else
      render json: { error: "user not created" }, status: 500
    end
  end


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
