class User < ApplicationRecord
  has_secure_password
  # has_many :posts
  has_many :topics

  validates_presence_of :username
  validates_uniqueness_of :username

end
