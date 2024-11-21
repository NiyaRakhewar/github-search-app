import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import "./../styles/Repositories.css";

export const Repository = ({ userData }) => {
  const { username } = useParams();
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        const data = await response.json();
        console.log("User data:", data);
        setRepo(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="repo-main-div">
      <div className="repo-div">
        {repo.map((repo) => (
          <div
            className="repo-card-div"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              border: "1px solid white",
              borderRadius: "0.5rem",
              padding: "0.7rem 1rem",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
            key={repo.id}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                }}
              >
                <h3
                  style={{ color: "#1976d2", cursor: "pointer", margin: "0" }}
                >
                  {repo.name}
                </h3>
                <div
                  style={{
                    border: "1px solid white",
                    borderRadius: "0.5rem",
                    padding: "0.2rem 0.5rem",
                    opacity: "0.6",
                  }}
                >
                  {repo.visibility}
                </div>
              </div>
              {repo.description && (
                <p
                  style={{
                    textAlign: "left",
                    padding: "0.5rem 0",
                    fontWeight: "lighter",
                    opacity: "0.7",
                  }}
                >
                  {repo.description}
                </p>
              )}
              <div
                style={{
                  textAlign: "left",
                  fontWeight: "lighter",
                  opacity: "0.7",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  🔴 {repo.language} - {repo.size}{" "}
                  {repo.size > 1000000 ? "MB" : "KB"}
                </p>
                <p>
                  Updated {formatDistanceToNow(parseISO(repo.updated_at))} ago
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
