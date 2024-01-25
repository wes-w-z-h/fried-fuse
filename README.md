# frying-fuses

## Table of Contents

<!-- - [Roadmap](#roadmap) -->
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Navigating the code](#Navigating-the-code)
- [Acknowledgements](#acknowledgements)
<!--- [TODO](#todo) -->
<!--
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
-->
# Overview

This react app is part of the assignment submission for CVWO 23/24.
It is a basic webforum using ruby on rails backend with a react typescript
frontend. Forum was designed with pokemon enthusiats in mind, provides a discussion platform.

## Getting Started
### Installation


1. Guide to installing ruby on rails can be found [here](https://guides.rubyonrails.org/getting_started.html#creating-a-new-rails-project-installing-rails) 

   Rails version: 7.1.2

   Ruby version: 3.2.2

2. [Clone](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories) this repo 

```bash
git clone https://github.com/wes-w-z-h/frying-fuses.git
```

3. Install dependencies in the appropriate folders 

Install frontend dependencies

```bash
cd frontend/
```

```bash
yarn install
```

Install backend dependancies

```bash
cd backend/
```

```bash
bundle install
```

Setup the database

```bash
rails db:migrate
```

Seed the database:

```bash
rails db:seed
```

### Usage


1. To fire the server run:
```bash
rails s -p 3001
```

2. To start the frontend server run:

```bash
yarn start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

4. You should see a page like this.
![Basic Page](frontend/public/images/Page.png)

5. To open the rails console

```bash
rails c
```

## Navigating the code
This is the main file structure

```
├── /backend
│   ├── /app
│   ├── /bin
│   ├── /config
│   ├── /db
│   ├── /lib
│   ├── /log
│   ├── /public
│   ├── /storage
│   ├── /test
│   ├── /tmp
│   ├── .dockerignore
│   ├── .ruby-version
│   ├── config.ru
│   ├── Dockerfile
│   ├── Gemfile
│   ├── Gemfile.lock
│   └── Rakefile
│   
├── frontend
│   ├── ./node_modules
│   ├── /public
│   ├── /src
│   ├── tsconfig.json
│   ├── package.json
│   └── yarn.lock
│   
├── README.md
└── .gitignore

```

Main directories/files to note:
- `frontend/src` contains all the src code for the frontend
- `frontend/package.json` contains all the important metadata, for example, the dependencies and available scripts in the project.
- `backend/app` contains the folders for controllers/ models/ serializers
- `backend/config` contains the /initializers as well as the routes.rb file
- `backend/db` contains the migrations and schema.rb file
- `backend/Gemfile` contains all the gems used for this project

## Acknowledgements

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project uses [MUI](https://mui.com/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/).

<!--
~~## TODO~~

~~1. [x] Create Category & Topics model/controllers/routes~~
~~2. [x] Create Posts model/controller/routes~~
~~3. [x] Working optional password~~
~~4. [x] Authentication~~
~~5. [x] Dashboard~~
~~6. [x] Render topics~~
~~7. [x] Add post functionality to frontend~~

~~### In Progress~~

~~1. [x] hooks to generate content on the page~~
~~2. [x] resize the images~~
~~3. [x] topics layout~~
~~4. [x] start posts page & components~~
~~5. [x] add validation for editing & deleting posts~~
~~6. [x] add the logout timer + countdown~~
-->
