import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import { Profile } from "../components/Profile";
import { Repository } from "../components/Repository";
import GitHubIcon from "@mui/icons-material/GitHub";
export const UserData = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [value, setValue] = useState(0);

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Fetch user data based on the username param
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        const data = await response.json();
        console.log("User data:", data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  console.log("User data2:", userData);

  return (
    <div style={{ color: "whitesmoke" }}>
      <div
        style={{
          margin: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <GitHubIcon
          sx={{ color: "white", fontSize: 40, cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <h3> {username}</h3>
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="user data tabs"
        sx={{ color: "white", marginLeft: "3rem" }}
      >
        <Tab label="Profile" sx={{ color: "white" }} />
        <Tab label="Repositories" sx={{ color: "white" }} />
      </Tabs>

      <Box sx={{ padding: 2 }}>
        {value === 0 && userData && <Profile userData={userData} />}
        {value === 1 && <Repository userData={userData} />}
      </Box>
    </div>
  );
};
