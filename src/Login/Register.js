import NavBar from "./Nav";
import Logo from "../images/logo.svg";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import LoadingP from "./LoadingPage";
const Register = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [Talert, setTalert] = useState("error");
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Password, setPassword] = useState();
  const [Name, setName] = useState();
  const [email, setemail] = useState();
  const navigate = useNavigate();

  const HandleChange = (e) => {
    switch (e.target.id) {
      case "password":
        setPassword(e.target.value);
        break;
      case "email":
        setemail(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
    }
  };
  const HandleRegister = async (e) => {
    setLoading(true);

    if (email === "") {
      setError("Champ Email est vide");
      setOpen(true);
    } else {
      // resete
      await axios
        .post(process.env.REACT_APP_API_TEST + "user_create", {
          email: email,
          name: Name,
          password: Password,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            setError("Thank you for Registration");
            setTalert("success");
            setOpen(true);
            setTimeout(() => {
              navigate("/Login");
            }, 5000);
          } else {
            setError(resp.data.msg);
            setTalert("error");
            setOpen(true);
          }
        });
    }
    setLoading(false);
  };
  return (
    <>
      {Loading === true ? <LoadingP /> : null}
      <NavBar t="Login" />
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
          severity={Talert}
        >
          {Error}
        </Alert>
      </Snackbar>
      <div className="login-page">
        <div className="login-box">
          <div className="login-head">
            <img src={Logo} className="login-logo" />
            <h2 className="login-titre">ADEVCAL</h2>
          </div>
          <div className="login-row">
            <TextField
              label="name"
              id="name"
              className="login-input"
              placeholder="Name"
              type="text"
              onChange={HandleChange}
            />
          </div>
          <div className="login-row">
            <TextField
              label="Email"
              id="email"
              className="login-input"
              placeholder="Email"
              type="text"
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
            <Button className="login-btn" onClick={HandleRegister}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
