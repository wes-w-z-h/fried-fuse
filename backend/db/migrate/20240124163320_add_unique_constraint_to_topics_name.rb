class AddUniqueConstraintToTopicsName < ActiveRecord::Migration[7.1]
  def change
    add_index :topics, :title, unique: true
  end
end
