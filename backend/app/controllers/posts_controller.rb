class PostsController < ApplicationController
  # add back the assosciation with user after writing user mc
  def create
    post = Post.new(post_params)
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
end
