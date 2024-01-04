class RemoveUserFromTopics < ActiveRecord::Migration[7.1]
  def change
    remove_reference :topics, :user, foreign_key: false
  end
end
