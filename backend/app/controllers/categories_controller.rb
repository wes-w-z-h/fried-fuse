class CategoriesController < ApplicationController
  skip_before_action :authorized, only: [:show, :index]

  def index
    categories = Category.all
    render json: CategorySerializer.new(categories, options).serializable_hash.to_json
  end

  def create
    category = Category.new(category_params)
    if category
      if category.save
        render json: CategorySerializer.new(category).serializable_hash.to_json
      else
        render json: {error: category.errors.messages}, status: 422
      end
    end
  end

  def update
    category = Category.find_by(name: params[:id])
    if category
      if category.update(category_params)
        render json: CategorySerializer.new(category).serializable_hash.to_json
      else
        render json: { error: category.errors.messages }, status: 422
      end
    else
      render json: { error: "category not found" }, status: 404
    end
  end

  def show
    category = Category.find_by(name: params[:id])
    render json: CategorySerializer.new(category, options).serializable_hash.to_json
  end

  def destroy
    category = Category.find_by(name: params[:id])

    if category
      if category.destroy
        head :no_content
      else
        render json: {error: category.errors.messages}, status: 422
      end
    else
      render json: { error: "category not found" }, status: 404
    end

  end

  private

  def category_params
    params.require(:category).permit(:name, :description, :img_url)
  end

  def options
    @options ||= { include: %i[topics] }
  end

end
