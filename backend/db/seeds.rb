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
  { name: 'Gen1', description: 'all things gen 1 related', img_url: "Gen1_main.jpg" },
  { name: 'Gen2', description: 'all things gen 2 related', img_url: "Gen2_main.jpg" },
  { name: 'Gen3', description: 'all things gen 3 realted', img_url: "Gen3_main.jpg"  },
  { name: 'Gen4', description: 'all things gen 4 realted', img_url: "Gen4_main.jpg"  },
  { name: 'Gen5', description: 'all things gen 5 realted', img_url: "Gen5_main.jpg"  },
  { name: 'Gen6', description: 'all things gen 6 realted', img_url: "Gen6_main.jpg"  },
  { name: 'Gen7', description: 'all things gen 7 realted', img_url: "Gen7_main.jpg"  },
  { name: 'Gen8', description: 'all things gen 8 realted', img_url: "Gen8_main.jpg"  }

])

# Create users
users = User.create([
  { username: 'admin_pw', password_digest: BCrypt::Password.create('123'), is_default_password: false },
  { username: 'admin_pwless', password_digest: BCrypt::Password.create('pwless'), is_default_password: true}
])

# Create topics
topics = Topic.create([
  { title: 'Gen1 Starters', content: 'Discuss your favorite Generation 1 starter Pokémon', category_id: categories[0].id, user_id: users[0].id },
  { title: 'Gen1 Gyms', content: 'Toughest gyms discussion', category_id: categories[0].id, user_id: users[0].id },
  { title: 'Gen1 Pokemon', content: 'Discuss your favorite Generation 1 Pokémon', category_id: categories[0].id, user_id: users[0].id },
  { title: 'Gen1 Regions', content: 'Discuss your favorite Generation 1 region', category_id: categories[0].id, user_id: users[0].id },
  { title: 'Gen2 Legendaries', content: 'Share your thoughts on Generation 2 legendary Pokémon', category_id: categories[1].id, user_id: users[0].id },
  { title: 'Gen3 Evolutions', content: 'Discuss interesting evolutions in Generation 3', category_id: categories[2].id, user_id: users[0].id },
  { title: 'Gen4 Gym Leaders', content: 'Talk about the challenging gym leaders in Generation 4', category_id: categories[3].id, user_id: users[0].id },
  { title: 'Gen5 Unova Region', content: 'Explore the Unova region in Generation 5', category_id: categories[4].id, user_id: users[0].id },
  { title: 'Gen6 Mega Evolutions', content: 'Share your favorite Mega Evolutions from Generation 6', category_id: categories[5].id, user_id: users[0].id },
  { title: 'Gen7 Alola Region', content: 'Discuss the unique Alola region in Generation 7', category_id: categories[6].id, user_id: users[0].id },
  { title: 'Gen8 Galar Region', content: 'Share your experiences in the Galar region of Generation 8', category_id: categories[7].id, user_id: users[0].id }
])

# Create posts
posts = Post.create([
  { content: 'Charizard is the best gen1 starter ever!', topic_id: topics[0].id, user_id: users[0].id },
  { content: 'testing many posts', topic_id: topics[0].id, user_id: users[0].id },
  { content: 'Blastoise is the ultimate Gen1 starter!', topic_id: topics[0].id, user_id: users[0].id },
  { content: 'Typhlosion has the best design in Gen2', topic_id: topics[0].id, user_id: users[0].id },
  { content: 'Sceptile\'s mega evolution is amazing in Gen3', topic_id: topics[0].id, user_id: users[0].id },
  { content: 'Lucario is my favorite from Gen4 gyms', topic_id: topics[0].id, user_id: users[1].id },
  { content: 'Serperior is a sleek Gen5 Pokémon', topic_id: topics[0].id, user_id: users[1].id },
  { content: 'Greninja\'s ninja-like moves in Gen6 are awesome!', topic_id: topics[0].id, user_id: users[1].id },
  { content: 'Decidueye is my go-to in Gen7 Alola region', topic_id: topics[0].id, user_id: users[0].id },
  { content: 'Cinderace is a speedy choice in Gen8 Galar region', topic_id: topics[0].id, user_id: users[0].id }
])

puts 'Seed data updated successfully!'
