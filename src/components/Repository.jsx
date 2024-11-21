import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./../styles/Repositories.css";

export const Repository = () => {
  const { username } = useParams();
  const [repo, setRepo] = useState([]);
  const [loader, setLoader] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

  useEffect(() => {
    const fetchUserData = async () => {
      setLoader(true);
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        const data = await response.json();
        setRepo(data);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoader(false);
      }
    };

    fetchUserData();
  }, [username]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRepos = repo.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) =>
      prev < Math.ceil(repo.length / itemsPerPage) ? prev + 1 : prev
    );
  };

  return loader ? (
    <div>Loading...</div>
  ) : (
    <div className="repo-main-div">
      <div className="repo-div">
        {currentRepos.map((repo) => (
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
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div className="repo-lang-div">
                  <p style={{ margin: 0 }}>{repo.language}</p>
                  <p style={{ margin: 0, marginTop: "0.2rem" }}>
                    {repo.size} {repo.size > 1000000 ? "MB" : "KB"}
                  </p>
                </div>

                <p>
                  Updated {formatDistanceToNow(parseISO(repo.updated_at))} ago
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
          gap: "1rem",
        }}
      >
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}

          className="pagination-btn"
       
        >
          <NavigateBeforeIcon />
          Prev
        </button>
        <span style={{ color: "white" }}>
          Page {currentPage} of {Math.ceil(repo.length / itemsPerPage)}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === Math.ceil(repo.length / itemsPerPage)}
          className="pagination-btn"
        
        >
          Next
          <NavigateNextIcon />
        </button>
      </div>
    </div>
  );
};
