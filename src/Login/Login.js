import "../App.css";
import Logo from "../images/logo.svg";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import NavBar from "./Nav";
import LoadingP from "./LoadingPage";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
const Login = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [Login, setLogin] = useState();
  const [Password, setPassword] = useState();
  const [Error, setError] = useState("");

  const navigate = useNavigate();
  const HandleChange = (e) => {
    if (e.target.id == "login") {
      setLogin(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  const HandleLogin = async () => {
    setLoading(true);
    if (Login === "" && Password === "") {
      setError("Identifiant ou mot de passe incorrect");
      setOpen(true);
    } else {
      await axios
        .post(process.env.REACT_APP_API_TEST + "login", {
          email: Login,
          password: Password,
        })
        .then((resp) => {
          if (resp.status === 200) {
            props.formlogin(resp.data);
            navigate("/Dashbord");
          } else {
            setError("Identifiant ou mot de passe incorrect");
            setOpen(true);
          }
        });
    }
    setLoading(false);
  };

  useEffect(() => {
    props.ClearState();
  }, []);
  return (
    <>
      {Loading === true ? <LoadingP /> : null}

      <NavBar t="Register" />
      <div className="login-page">
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Alert
            onClose={() => {
              setOpen(false);
            }}
            severity="error"
          >
            {Error}
          </Alert>
        </Snackbar>
        <div className="login-box">
          <div className="login-head">
            <img src={Logo} className="login-logo" />
            <h2 className="login-titre">ADEVCAL</h2>
          </div>
          <div className="login-row">
            <TextField
              id="login"
              label="Utilsateur "
              placeholder="Ahme..."
              className="login-input"
              onChange={HandleChange}
            />
          </div>
          <div className="login-row">
            <TextField
              id="password"
              label="Password"
              className="login-input"
              placeholder="********"
              type={passwordShown == false ? "password" : "text"}
              onChange={HandleChange}
            />
            <div
              className="login-eye"
              onClick={() => {
                setPasswordShown(!passwordShown);
              }}
            >
              <i className="far fa-eye"></i>
            </div>
          </div>
          <div className="login-row">
            <Button className="login-btn" onClick={HandleLogin}>
              Connexion
            </Button>
          </div>
          <div className="login-row">
            <a
              onClick={() => {
                navigate("/Oublie");
              }}
            >
              {" "}
              Mot de passe oublié ?
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
function mapStateToProps(state) {
  return {
    state,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    formlogin: (User) => {
      dispatch({
        type: "ACTION_LOGIN",
        User: User,
      });
    },
    ClearState: () => {
      dispatch({
        type: "ACTION_CLEAR",
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
