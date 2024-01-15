class AddImageUrlToCategory < ActiveRecord::Migration[7.1]
  def change
    add_column :categories, :img_url, :string
  end
end
