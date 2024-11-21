import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export const UserList = ({ users }) => {
  console.log(users);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        // flexDirection: "column",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
        mt: 3,
        width: "75%",
      }}
    >
      {users.map((user) => (
        <Card
          key={user.id}
          onClick={() => navigate(`/${user.login}`)}
          sx={{
            minWidth: 250,
            // maxWidth: 300,
            display: "flex",
            alignItems: "center",
            backgroundColor: "black",
            border: "1px solid gray",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          <CardMedia
            component="img"
            alt={user.login}
            height="50"
            image={user.avatar_url}
            sx={{ borderRadius: "50%", width: "50px", marginLeft: "0.5rem", border: "1px solid gray" }}
          />
          <CardContent>
         
            <Typography variant="h6" sx={{ color: "#74b9ff" }}>
              {user.login}
            </Typography>
        
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
