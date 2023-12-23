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


