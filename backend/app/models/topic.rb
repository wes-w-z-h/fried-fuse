class Topic < ApplicationRecord
  before_save :slugify

  belongs_to :category
  has_many :posts

  private 

  def slugify
    self.slug = title.parameterize(separator: '-')
  end
end
 