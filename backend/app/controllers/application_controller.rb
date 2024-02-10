class ApplicationController < ActionController::API
  before_action :authorized

  def encode_token(payload)
    JWT.encode(payload, ENV["SECRET_BASE_KEY"])
    # JWT.encode(payload, ENV["RAILS_MASTER_KEY"])
  end

  def decoded_token
    header = request.headers['Authorization']
    if header
      token = header.split(" ")[1] # to get the token from the request header
      begin
        JWT.decode(token, ENV["SECRET_BASE_KEY"])
        # JWT.decode(token, ENV["RAILS_MASTER_KEY"])
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
    return @user
  end

  def authorized
    unless !!current_user
      render json: {message: "Please log in"}, status: 401
    end
  end

end
