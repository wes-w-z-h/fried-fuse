# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# seeds.rb

# Create categories
categories = Category.create([
  { name: 'Gen1', description: 'all things gen 1 related', img_url: "Gen1_main.png" },
  { name: 'Gen2', description: 'all things gen 2 related', img_url: "Gen2_main.png" },
  { name: 'Gen3', description: 'all things gen 3 realted', img_url: "Gen3_main.png"  },
  { name: 'Gen4', description: 'all things gen 4 realted', img_url: "Gen4_main.png"  },
  { name: 'Gen5', description: 'all things gen 5 realted', img_url: "Gen5_main.png"  },
  { name: 'Gen6', description: 'all things gen 6 realted', img_url: "Gen6_main.png"  },
  { name: 'Gen7', description: 'all things gen 7 realted', img_url: "Gen7_main.png"  },
  { name: 'Gen8', description: 'all things gen 8 realted', img_url: "Gen8_main.png"  }

])

# Create users
users = User.create([
  { username: 'pw', password_digest: BCrypt::Password.create('123'), is_default_password: false },
  { username: 'test', password_digest: BCrypt::Password.create('123'), is_default_password: false },
  { username: 'pwless', password_digest: BCrypt::Password.create('dfiuchn12498723906vcdescfknoq7^#$%*!#'), is_default_password: true}
])

# Create topics
topics = Topic.create([
  { title: 'Fire', content: 'Recent sports events and scores', category: categories.third },
  { title: 'Water', content: 'Introduction to Ruby on Rails', category: categories.first },
  { title: 'Grass', content: 'Latest discoveries in the scientific world', category: categories.second },
])

# Create posts
posts = Post.create([
  { content: 'Blaziken so hot', topic: topics.first, user: users.first },
  { content: 'Blastoise so cool', topic: topics.second, user: users.second },
  { content: 'Venasaur so sick', topic: topics.third, user: users.third }
])

puts 'Seed data created successfully!'
