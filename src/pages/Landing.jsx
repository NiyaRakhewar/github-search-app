import React, { useState } from "react";
import { Search } from "../components/Search";
import { UserList } from "../components/UserList";
import NO_USER from "./../assets/user-not-found.avif";
import "./../styles/Landing.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const Landing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoader(true);
    if (query) {
      try {
        const response = await fetch(`https://api.github.com/users`);
        const data = await response.json();

        const filteredUsers = data.filter((user) =>
          user.login.toLowerCase().includes(query.toLowerCase())
        );
        setUsers(filteredUsers);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        setLoader(false);
      }
    } else {
      setUsers([]);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < Math.ceil(users.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="landing-main-div">
      <div className="landing-search-div">
        <Search onSearch={handleSearch} />
      </div>

      {searchQuery && users.length === 0 && !loader ? (
        <h2
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          User not found
          <img
            src={NO_USER}
            alt="no user found"
            style={{
              backgroundColor: "black",
              width: "15rem",
              borderRadius: "50%",
              color: "black",
            }}
          />
        </h2>
      ) : (
        <>
          <UserList users={paginatedUsers} />
          {users.length > itemsPerPage && (
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                <NavigateBeforeIcon /> Prev
              </button>
              <span className="page-indicator">
                Page {currentPage} of {Math.ceil(users.length / itemsPerPage)}
              </span>
              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
                className="pagination-btn"
              >
                Next <NavigateNextIcon />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
