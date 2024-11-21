import React, { useState } from "react";
import { Search } from "../components/Search";
import { UserList } from "../components/UserList";
import NO_USER from "./../assets/user-not-found.avif";
import "./../styles/Landing.css"
export const Landing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query) {
      try {
        const response = await fetch(`https://api.github.com/users`);
        const data = await response.json();

        const filteredUsers = data.filter((user) =>
          user.login.toLowerCase().includes(query.toLowerCase())
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    } else {
      setUsers([]);
    }
  };

  return (
    <div
     className="landing-main-div"
    >
      <div className="landing-search-div">
        <Search onSearch={handleSearch} />
      </div>
      {searchQuery && users.length === 0 ? (
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
        <UserList users={users} />
      )}
    </div>
  );
};
