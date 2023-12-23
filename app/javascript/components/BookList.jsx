import React from 'react';
import BorrowButton from './BorrowButton';

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchQuery: '',
    };
    this.onDeleteBook = this.onDeleteBook.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    fetch('http://127.0.0.1:3000/api/v1/books')
      .then(response => response.json())
      .then(data => this.setState({ books: data }));
  };

  handleSearchChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  onDeleteBook = (book) => {
    const csrfToken = document.querySelector("[name='csrf-token']").content;
    const url = `http://127.0.0.1:3000/api/v1/books/${book.id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        'Authorization': `${this.props.currentUser.token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id),
        }));
      });
  };

  render() {
    const { currentUser, onEditBook } = this.props;
    const { books, searchQuery } = this.state;
    return (
      <div>
        <div className="row row-cols-1 row-cols-sm-5 row-cols-md-5 g-5 p-10 grid row-gap-3 column-gap-3 justify-content-center d-flex">
          <div className="input-group mt-5 ">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search books by title, author or genre" 
              value={searchQuery} 
              onChange={this.handleSearchChange}
            />
          </div>

          {books.filter(book => 
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
          ).map(book => (
            <div key={book.id} className="col card shadow-sm p-2 ">
              <strong>{book.title}</strong>
              <p>author: {book.author}</p>
              <p>genre: {book.genre}</p>
              <p>ISBN: {book.isbn}</p>
              
              {currentUser ? <BorrowButton currentUser={currentUser} bookId={book.id} borrowed={book.is_borrowed}/> : null}

              {currentUser && currentUser.role === 'librarian' && (
                <>
                <button onClick={() => onEditBook(book)}>Edit</button>
                <button onClick={() => this.onDeleteBook(book)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } 
}

export default BookList;