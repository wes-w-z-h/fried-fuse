class Topic < ApplicationRecord
  before_save :slugify

  belongs_to :category
  belongs_to :user
  has_many :posts

  private

  def slugify
    self.slug = title.parameterize(separator: '-')
  end
end
