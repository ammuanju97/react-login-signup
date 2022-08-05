import React, { Component} from 'react';

class Books extends Component {

 books = {
    books: []
  }

  loadBooks = () => {
    fetch('http://127.0.0.1:8000/api/books/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('authtoken')}`
      },
      body: JSON.stringify(this.books.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        this.books={books: data}
        this.forceUpdate()
      }
    )
    .catch( error => console.error(error))
  }

  render() {
    return (
      <div>
        <h1>Books</h1>
        { this.books.books.map( book => {
          return <h3 key={book.id}>{book.title}</h3>
        })}
        <button onClick={this.loadBooks}>Load Books</button>
        {/* {JSON.stringify(this.books.books)} */}
      </div>
      
    );
  }
}

export default Books;