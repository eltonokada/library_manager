# # This file should ensure the existence of records required to run the application in every environment (production,
# # development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# #
# # Example:
# #
# #   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
# #     MovieGenre.find_or_create_by!(name: genre_name)
# #   end

# # Path: db/seeds.rb

# # Compare this snippet from app/models/user.rb:

# Book.create(title: "Harry Potter", author: "J.K. Rowling", total_copies: 15, genre: 'Fantasy')
# Book.create(title: "Game of Thrones", author: "George R.R. Martin", total_copies: 15, genre: 'Fantasy')
# Book.create(title: "The Lord of the Rings", author: "J.R.R. Tolkien", total_copies: 15, genre: 'Fantasy')
# Book.create(title: "The Shining", author: "Stephen King", total_copies: 15, genre: 'Horror')
# Book.create(title: "Murder on the Orient Express", author: "Agatha Christie", total_copies: 15, genre: 'Mystery')
# Book.create(title: "The Adventures of Tom Sawyer", author: "Mark Twain", total_copies: 15, genre: 'Adventure')
# Book.create(title: "The Old Man and the Sea", author: "Ernest Hemingway", total_copies: 15, genre: 'Fiction')
# Book.create(title: "The Great Gatsby", author: "F. Scott Fitzgerald", total_copies: 15, genre: 'Fiction')
# Book.create(title: "Hamlet", author: "William Shakespeare", total_copies: 15, genre: 'Drama')
# Book.create(title: "A Tale of Two Cities", author: "Charles Dickens", total_copies: 15, genre: 'Historical Fiction')
# Book.create(title: "Mrs Dalloway", author: "Virginia Woolf", total_copies: 15, genre: 'Fiction')
# Book.create(title: "Ulysses", author: "James Joyce", total_copies: 15, genre: 'Fiction')
# Book.create(title: "War and Peace", author: "Leo Tolstoy", total_copies: 15, genre: 'Historical Fiction')
# Book.create(title: "Wuthering Heights", author: "Emily Bronte", total_copies: 15, genre: 'Romance')
# Book.create(title: "Pride and Prejudice", author: "Jane Austen", total_copies: 15, genre: 'Romance')
# Book.create(title: "Sherlock Holmes", author: "Arthur Conan Doyle", total_copies: 15, genre: 'Mystery')
# Book.create(title: "The Call of Cthulhu", author: "H.P. Lovecraft", total_copies: 15, genre: 'Horror')
# Book.create(title: "The Tell-Tale Heart", author: "Edgar Allan Poe", total_copies: 15, genre: 'Horror')
# Book.create(title: "The Picture of Dorian Gray", author: "Oscar Wilde", total_copies: 15, genre: 'Fiction')
# Book.create(title: "Moby-Dick", author: "Herman Melville", total_copies: 15, genre: 'Adventure')

# Borrowing.create(book: book1, user: User.first, created_at: 30.days.ago)

# book2 = Book.create(title: "To Kill a Mockingbird", author: "Harper Lee", total_copies: 15, genre: 'Southern Gothic', created_at: 30.days.ago)
# Borrowing.create(book: book2, user: User.first, created_at: 30.days.ago)

# book3 = Book.create(title: "1984", author: "George Orwell", total_copies: 15, genre: 'Dystopian', created_at: 30.days.ago)
# Borrowing.create(book: book3, user: User.first, created_at: 30.days.ago)





# Create books
book_titles = [
  ["Harry Potter", "J.K. Rowling"],
  ["Game of Thrones", "George R.R. Martin"],
  ["The Lord of the Rings", "J.R.R. Tolkien"],
  ["The Shining", "Stephen King"],
  ["Murder on the Orient Express", "Agatha Christie"],
  ["The Adventures of Tom Sawyer", "Mark Twain"],
  ["The Old Man and the Sea", "Ernest Hemingway"],
  ["The Great Gatsby", "F. Scott Fitzgerald"],
  ["Hamlet", "William Shakespeare"],
  ["A Tale of Two Cities", "Charles Dickens"],
  ["Mrs Dalloway", "Virginia Woolf"],
  ["Ulysses", "James Joyce"],
  ["War and Peace", "Leo Tolstoy"],
  ["Wuthering Heights", "Emily Bronte"],
  ["Pride and Prejudice", "Jane Austen"],
  ["Sherlock Holmes", "Arthur Conan Doyle"],
  ["The Call of Cthulhu", "H.P. Lovecraft"],
  ["The Tell-Tale Heart", "Edgar Allan Poe"],
  ["The Picture of Dorian Gray", "Oscar Wilde"],
  ["Moby-Dick", "Herman Melville"],
  ["To Kill a Mockingbird", "Harper Lee"],
  ["1984", "George Orwell"],
  ["The Catcher in the Rye", "J.D. Salinger"],
  ["The Hobbit", "J.R.R. Tolkien"],
  ["Fahrenheit 451", "Ray Bradbury"],
  ["The Chronicles of Narnia", "C.S. Lewis"],
  ["The Da Vinci Code", "Dan Brown"],
  ["The Alchemist", "Paulo Coelho"],
  ["Animal Farm", "George Orwell"],
  ["The Hunger Games", "Suzanne Collins"]
]

book_titles.each do |title, author|
  Book.create(title: title, author: author, total_copies: 15, genre: 'Genre')
end

# Create users
member1 = User.create(email: 'member1@example.com', role: 'member', password: 'password')
member2 = User.create(email: 'member2@example.com', role: 'member', password: 'password')
librarian = User.create(email: 'librarian@example.com', role: 'librarian', password: 'password')

# Borrow books
10.times do |i|
  Borrowing.create(book: Book.find(i+1), user: member1, created_at: (i < 5 ? 31.days.ago : Time.now))
  Borrowing.create(book: Book.find(i+11), user: member2, created_at: (i == 0 ? 31.days.ago : Time.now))
end
