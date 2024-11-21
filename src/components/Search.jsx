import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./../styles/Search.css";

export const Search = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      onSearch(value);
    }, 1000); 

    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

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
