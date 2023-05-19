import React from "react";
import { Routes, Route } from "react-router-dom";
import BookIndex from "./BookIndex";
import CreateBook from "./CreateBook";
import UpdateBook from "./UpdateBook";

const Wrapper = () => {
  return (
    <Routes>
      <Route exact path="/" element={<BookIndex />} />
      <Route path="/create" element={<CreateBook />} />
      <Route path="/update/:id" element={<UpdateBook />} />
    </Routes>
  );
};

export default Wrapper;
