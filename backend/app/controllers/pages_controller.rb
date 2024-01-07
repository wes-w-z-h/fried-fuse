class PagesController < ApplicationController
  def index
    render json: {status: "root index"}
  end
end
