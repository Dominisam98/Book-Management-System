import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { CREATE_BOOK } from "./GraphQL/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPopup, setShowPopup] = useState(false);
  const [createBookMutation] = useMutation(CREATE_BOOK);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      data.publicationYear = parseInt(data.publicationYear); // Convert to number
      await createBookMutation({ variables: { data } });
      setShowPopup(true); // Show the popup after creating the book
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/"); // Navigate to the desired location
  };

  return (
    <div className="book-container">
      <h1>Create Book</h1>
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
          <button type="submit">Create</button>
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
            <p>Book added successfully!</p>
            <button
              style={{
                backgroundColor: "#ccc",
                color: "#fff",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => handlePopupClose()}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBook;
