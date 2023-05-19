import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS } from "./GraphQL/queries";
import { DELETE_BOOK } from "./GraphQL/mutations";
import "./App.css";

const BookIndex = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_BOOKS);
  const [deleteBookMutation] = useMutation(DELETE_BOOK);

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      let confirm = window.confirm(
        "Are you sure you want to delete this book?"
      );

      if (confirm) {
        const response = await deleteBookMutation({ variables: { id } });
        console.log({ response });
        console.log("Book deleted successfully!");
        // Refetch books after delete the data
        refetch();
        setShowPopup(true); // Show the popup after deleting
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // Navigate to BookDetail with the specified id
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="book-container">
      <h1>Book details</h1>
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Author</th>
            <th>Action</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {data.books.map((book, index) => (
            <tr
              key={book.id}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td className="center-cell">{book.title}</td>
              <td className="center-cell">{book.publicationYear}</td>
              <td className="center-cell">{book.author}</td>
              <td className="center-cell">
                <button
                  className="action-buttons"
                  onClick={() => handleUpdate(book.id)}
                >
                  Update
                </button>
                <button
                  className="action-buttons"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Background opacity
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p>Book deleted successfully!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookIndex;
