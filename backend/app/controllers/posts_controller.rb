class PostsController < ApplicationController

  def create
    post_param = post_params
    process_params(post_param)
    post = Post.new(post_param)
    if post.save
      render json: PostSerializer.new(post).serializable_hash.to_json
    else
      render json: {error: post.errors.messages}, status: 422
    end
  end

  def update
    post = Post.find(params[:id])
    if post
      if post.update(post_params)
        render json: PostSerializer.new(post).serializable_hash.to_json
      else
        render json: {error: post.errors.messages}, status: 422
      end
    else
      render json: {error: "Post not found"}, status: 404
    end
  end

  def destroy
    post = Post.find(params[:id])
    if post
      if post.destroy
        head :no_content
      else
        render json: {error: post.errors.messages}, status: 422
      end
    else
      render json: {error: "Post not found"}, status: 404
    end
  end

  private

  def post_params
    params.require(:post).permit(:content, :topic_id, :user_id)
  end

  # Function to convert the slug when coming in from frontend
  def process_params(params)
    # the request send the slug as id
    topic = Topic.find_by(slug: params[:topic_id])
    logger.info("topic: #{topic}")
    if topic
      topic_id = topic.id
      params[:topic_id] = topic_id
    else
      render json: {error: "Invalid topic"}, status: 404
    end
  end
end
