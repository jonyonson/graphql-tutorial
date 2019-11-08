import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

function AddBook(props) {
  const [book, setBook] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const handleChanges = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, genre, authorId } = book;
    props.addBookMutation({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }],
    });
    setBook({ name: '', genre: '', authorId: '' });
  };

  const displayAuthors = () => {
    const data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          name="name"
          value={book.name}
          onChange={handleChanges}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChanges}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select name="authorId" onChange={handleChanges}>
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
