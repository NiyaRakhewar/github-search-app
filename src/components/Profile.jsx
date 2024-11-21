import React from "react";
import "./../styles/Profile.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
export const Profile = ({ userData }) => {
  console.log(userData);
  return (
    <div className="profile-main-div">
      <div className="profile-div">
        <img
          src={userData?.avatar_url}
          alt="profile img"
          className="profile-img-name-div"
        />

        <div className="profile-details">
          <h2 style={{ margin: "0px" }}>{userData?.name}</h2>
          <p style={{ margin: "0px", fontWeight: "lighter", opacity: "0.7" }}>
            {userData?.login}
          </p>

          <p>
            <span style={{ opacity: "0.6" }}>Bio:</span>{" "}
            {userData?.bio || "No bio available"}
          </p>
          <p className="icon-div">
            <BusinessIcon className="icons" /> {userData?.company}
          </p>
          <p className="icon-div">
            <LocationOnIcon className="icons" /> {userData?.location}
          </p>
          <p className="icon-div">
            <PeopleOutlineIcon className="icons" />
            <p>
              {userData?.followers}{" "}
              <span style={{ opacity: "0.7" }}>Followers</span>
            </p>
            |
            <p>
              {userData?.following}{" "}
              <span style={{ opacity: "0.7" }}>Following</span>{" "}
            </p>
          </p>
          <p>
            <span style={{ opacity: "0.6" }}>Repositories: </span>{" "}
            {userData?.public_repos}
          </p>
        </div>
      </div>
    </div>
  );
};
