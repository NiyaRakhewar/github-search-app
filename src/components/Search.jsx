import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export const Search = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    onSearch(value);
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        width: "100%",
        height: "3.5rem",
        padding: " 0rem 0.2rem",
        borderRadius: "10px",
        outline: "none",
        border: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <SearchIcon style={{ padding: "0 0.5rem", color: "whitesmoke" }} />
      <input
        placeholder="Search User Here..."
        value={inputValue}
        onChange={handleInputChange}
        style={{
          width: "100%",
          border: "none",
          padding: "0.5rem 0.1rem",
          outline: "none",
          color: "whitesmoke",
          backgroundColor: "transparent",
          fontSize: "medium",
        }}
      />
    </div>
  );
};
