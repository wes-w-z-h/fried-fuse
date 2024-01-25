# frying-fuses

## Table of Contents

- [Roadmap](#roadmap)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [TODO](#todo)

## Roadmap -- completed

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

Install frontend dependencies
```bash
cd frontend/
```

```bash
yarn install 
```
Set up the database
```bash
cd backend/
```

```bash
rails db:migrate
```

For seed data run:

```bash
rails db:seed
```

IMPORTANT: UPDATE SEED WITH SERVER RUNNING WOULD CAUSE ISSUES

## Usage

Rails version: 7.1.2

To fire the server run:
```bash
rails s -p 3001
```

To start the frontend server run:
```bash
yarn start
```

To open the console
```bash
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
7. [x] Add post functionality to frontend

### In Progress

1. [x] hooks to generate content on the page
2. [x] resize the images
3. [x] topics layout
4. [x] start posts page & components
5. [x] add validation for editing & deleting posts
6. [x] add the logout timer + countdown
