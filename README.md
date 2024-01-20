# frying-fuses

## Table of Contents

- [Roadmap](#roadmap)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [TODO](#todo)

## Roadmap

1. Complete backend

   1. models

   2. controllers & serializers & routes

   3. authentication

   4. assosciations

2. Complete frontend

   1. Utilise mui library

   2. Organise the file structure

   3. Check routes

## Installation

```
yarn install && bundle install
```

# Initial pull

For test data run:

```
rails db:seed
```

## Usage

Information on how to use the project.

To fire the server run

```
rails s -p 3001
```

For frontend

```
yarn start
```

To open the console

```
rails c
```

## Contributing

Guidelines for contributing to your project.

## License

Information about the project's license.

## TODO

1. [x] Create Category & Topics model/controllers/routes
2. [x] Create Posts model/controller/routes
3. [x] Working optional password
4. [x] Authentication
5. [x] Dashboard
6. [x] Render topics
7. [ ] Add post functionality to frontend

### In Progress

1. [x] hooks to generate content on the page
2. [x] resize the images
3. [x] topics layout
4. [ ] add new test seeds to populate data
5. [ ] start posts page & components
6. [ ] add the logout timer
7. [ ] add img to topics (if got time)
