module CurrentUserConcern
  extend ActiveSupport::Concern
  included do
    before_action :set_current_user
  end

  def set_current_user
    # Rails.logger.info("session user id: #{session[:user_id]}\n")
    if session[:user_id]
      @current_user = User.find(session[:user_id])
      # Rails.logger.info("setting instance user: #{@current_user}\n")
    end
  end
end
