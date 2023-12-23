# Library Manager

This application uses Ruby on Rails 7.1.2 and React.js

Required software:

* Ruby 3.1.2 +

* Node.js 20.10.0

* Sqlite

# install instructions
Clone this repository

```
  git clone https://github.com/eltonokada/library_manager.git
```

Install dependencies
```
  gem install bundler
  bundle install
```

Create database and initial data
```
  rake db:create
  rake db:migrate
  rake db:seed
```
Start application:

```
  ./bin/dev
```
Go to 127.0.0.1:3000

# api usage

To use the API, you will need to pass the Authorization header with a user token
Each user created in the database will have a generated token, that is in column token from users table

Example of request to books listing

```
curl -H "Authorization: Bearer YOUR_USER_TOKEN" http://127.0.0.1:3000/api/v1/books
```

It will return:
```
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "published_year": 1925,
    "isbn": "9780743273565",
    "available": true
  },
  {
    "id": 2,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "published_year": 1960,
    "isbn": "9780446310789",
    "available": false
  },
  {
    "id": 3,
    "title": "1984",
    "author": "George Orwell",
    "published_year": 1949,
    "isbn": "9780451524935",
    "available": true
  }
]
```
