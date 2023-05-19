import React, { useState, useEffect } from "react";
import { GET_BOOK } from "./GraphQL/queries";
import { UPDATE_BOOK } from "./GraphQL/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [updateBookMutation] = useMutation(UPDATE_BOOK);
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: {
      id: id,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      const { book } = data;
      setValue("title", book.title, { required: true });
      setValue("publicationYear", book.publicationYear, {
        required: true,
        pattern: /^\d+$/,
      });
      setValue("author", book.author, { required: true });
    }
  }, [data, setValue]);

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/"); // Navigate to the desired location
  };

  const onSubmit = async (data) => {
    try {
      data.publicationYear = parseInt(data.publicationYear); // Convert to number
      const response = await updateBookMutation({
        variables: {
          id: id,
          data: data,
        },
      });
      console.log({ response });
      setShowPopup(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="book-container">
      <h2>Update Book Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="update-form-container">
          <div className="form-fields">
            <label className="form-label">Title :</label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                className="form-input"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span style={{ color: "red" }}>Title is required</span>
              )}
            </div>
          </div>
          <div className="form-fields">
            <label className="form-label">Publication Year :</label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                className="form-input"
                {...register("publicationYear", {
                  required: true,
                  pattern: /^\d+$/,
                })}
              />

              {errors.publicationYear?.type === "required" && (
                <span style={{ color: "red" }}>
                  Publication Year is required
                </span>
              )}
              {errors.publicationYear?.type === "pattern" && (
                <span style={{ color: "red" }}>
                  Publication Year must be a number
                </span>
              )}
            </div>
          </div>
          <div className="form-fields">
            <label className="form-label">Author :</label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                className="form-input"
                {...register("author", { required: true })}
              />
              {errors.author && (
                <span style={{ color: "red" }}>Author is required</span>
              )}
            </div>
          </div>
          <button type="submit">Update</button>
        </div>
      </form>
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
            <p>Book updated successfully!</p>
            <button onClick={() => handlePopupClose()}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
