import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

function BookList(props) {
  const displayBooks = () => {
    const data = props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map((book) => <li key={book.id}>{book.name}</li>);
    }
  };
  return (
    <div>
      <div id="book-list">{displayBooks()}</div>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
