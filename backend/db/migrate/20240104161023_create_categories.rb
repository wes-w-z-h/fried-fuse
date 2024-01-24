class CreateCategories < ActiveRecord::Migration[7.1]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :description
      t.string :img_url
      t.timestamps
    end
  end
end
