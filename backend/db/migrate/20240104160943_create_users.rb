class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.boolean :is_default_password
      t.timestamps
    end
  end
end
