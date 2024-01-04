class CategoriesController < ApplicationController

  def index 
    categories = Category.all 
    render json: CategorySerializer.new(categories, options).serializable_hash.to_json
  end 

  def create
    category = Category.new(category_params)

    if category.save
      render json: CategorySerializer.new(category).serializable_hash.to_json
    else
      render json: {error: category.errors.messages}, status: 422
    end
  end


  def show
    category = Category.find_by(name: params[:id])
    render json: CategorySerializer.new(category, options).serializable_hash.to_json
  end 
  
  def destroy
    category = Category.find_by(name: params[:id])
    if category.destroy
      head :no_content
    else
      render json: {error: category.errors.messages}, status: 422
    end

  end

  private 

  def category_params
    params.require(:category).permit(:name)
  end

  def options
    @options ||= { include: %i[topics] }
  end 


end