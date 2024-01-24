class Topic < ApplicationRecord
  before_save :slugify

  belongs_to :category
  belongs_to :user
  has_many :posts, dependent: :destroy

  private

  def slugify
    self.slug = title.parameterize(separator: '-')
  end
end
