class AddEmptyPwToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :is_default_password, :boolean
  end
end
