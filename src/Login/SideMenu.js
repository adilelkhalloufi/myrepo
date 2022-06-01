import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";

const SideMenu = (props) => {
  const [MenuPostion, setMenuPostion] = useState(4);
  const HandleClick = (e) => {
    console.log(e.target.id);
    setMenuPostion(e.target.id);
    props.PaperSelected(e.target.id);
  };
  return (
    <>
      {" "}
      <div className="dashbord-menu">
        <Paper className="dash-menu-titre">
          <h3>User Profile</h3>
          <div className="menu-btn">
            <Button
              id="4"
              onClick={HandleClick}
              className={MenuPostion == 4 ? "btn-men btn-selected" : "btn-men"}
            >
              <i class="fa-solid fa-house-user" id="4"></i>
              <span id="4">Home</span>
            </Button>{" "}
            <Button
              id="1"
              onClick={HandleClick}
              className={MenuPostion == 1 ? "btn-men btn-selected" : "btn-men"}
            >
              <i id="1" className="fa-solid fa-calendar"></i>{" "}
              <span id="1">Calendrier</span>
            </Button>{" "}
            <Button
              id="2"
              onClick={HandleClick}
              className={MenuPostion == 2 ? "btn-men btn-selected" : "btn-men"}
            >
              <i className="fa-solid fa-calendar-day"></i>{" "}
              <span id="2">Events</span>
            </Button>{" "}
            <Button
              id="3"
              onClick={HandleClick}
              className={MenuPostion == 3 ? "btn-men btn-selected" : "btn-men"}
            >
              <i className="fa-solid fa-address-card" id="3"></i>{" "}
              <span id="3">Profil</span>
            </Button>{" "}
            <Button
              id="5"
              onClick={() => {
                window.location.assign("/");
              }}
              className={MenuPostion == 5 ? "btn-men btn-selected" : "btn-men"}
            >
              <i className="fas fa-sign-out-alt" id="5"></i>{" "}
              <span id="5">Se déconnecter</span>
            </Button>
          </div>{" "}
        </Paper>
      </div>
    </>
  );
};
export default SideMenu;
