import { Container, Box } from "@mui/material";
import NavBar from "./Nav";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import SideMenu from "./SideMenu";
// pages

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calan from "./Calan";
import Eents from "./Events";
import Profil from "./Profil";
import Home from "./Home";

const Dashboard = (props) => {
  const [PaperSelected, setPaperSelected] = useState(4);
  const [PaperShow, setPaperShow] = useState();
  const handleChildModif = (e) => {
    setPaperSelected(e);
  };
  const navigate = useNavigate();

  useEffect(() => {
    //1 acces vehicle 2 pesage vehcile  3 persona 4 password 4  logout
    switch (PaperSelected) {
      case "1":
        setPaperShow(<Calan User={props.User} />);
        break;
      case "2":
        setPaperShow(<Eents User={props.User} />);
        break;
      case "3":
        setPaperShow(<Profil User={props.User} />);
        break;
      case "4":
        setPaperShow(<Home User={props.User} />);
        break;
      case "5":
        props.LogOut();
        break;
      default:
      // setPaperShow(<AccessCar />);
    }
  }, [PaperSelected]);
  useEffect(() => {
    if (props.User == null) {
      navigate("/login");
    } else {
      setPaperShow(<Home User={props.User} />);
    }
  }, []);
  return (
    <>
      <NavBar />
      <div className="dashbord-page">
        <Container maxWidth="xl">
          <div className="dashbord-content">
            {/*  */}
            <SideMenu PaperSelected={handleChildModif} />
            <div className="dashbord-result">
              {" "}
              <Paper className="dash-res">{PaperShow} </Paper>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
function mapStateToProps(state) {
  return {
    User: state.User,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    LogOut: () => {
      dispatch({
        type: "ACTION_LOGOUT",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
