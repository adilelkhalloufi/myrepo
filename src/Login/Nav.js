import Logo from "../images/logo.svg";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const NavBar = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-container">
          {" "}
          <img src={Logo} className="navbar-logo" /> <h1>ADEVCAL</h1>
        </div>{" "}
        {props.User === null ? (
          <span
            onClick={() => {
              navigate("/" + props.t);
            }}
          >
            {props.t}
          </span>
        ) : (
          <span>{props.User.name}</span>
        )}
      </div>
    </>
  );
};
function mapStateToProps(state) {
  return {
    User: state.User,
  };
}
export default connect(mapStateToProps)(NavBar);
