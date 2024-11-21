import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./../styles/Search.css";
export const Search = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    onSearch(value);
  };

  return (
    <div className="search-main-div">
      <SearchIcon style={{ padding: "0 0.5rem", color: "whitesmoke" }} />
      <input
        placeholder="Search User Here..."
        value={inputValue}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};
