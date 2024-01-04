class TopicsController < ApplicationController
  def create
    topic = Topic.new(topic_params)
    if topic.save
      render json: TopicSerializer.new(topic, options).serializable_hash.to_json
    else
      render json: {error: topic.errors.messages}, status: 422
    end

  end

  def show
    topic = Topic.find_by(slug: params[:id])
    if topic
      render json: TopicSerializer.new(topic, options).serializable_hash.to_json
    end
  end

  # kiv the update for topics
  # def update
  # end 

  def destroy
    topic = Topic.find_by(slug: params[:id])
    if topic
      if topic.destroy
        head :no_content
      else
        render json: {error: topic.errors.messages}, status: 422
      end
    else
      render json: { error: "topic not found" }, status: 404
    end
  end

  private 

  def topic_params
    params.require(:topic).permit(:title, :content, :category_id)
  end

  def options
    @options ||= { include: %i[posts] }
  end
end
