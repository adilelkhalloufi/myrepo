import NavBar from "./Nav";
import Logo from "../images/logo.svg";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingP from "./LoadingPage";

const Oublie = () => {
  const [email, setemail] = useState("");
  const [open, setOpen] = useState(false);
  const [Talert, setTalert] = useState("error");
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleChange = (e) => {
    setemail(e.target.value);
  };
  const HandleRegister = async (e) => {
    setLoading(true);

    if (email === "") {
      setError("Champ Email est vide");
      setOpen(true);
    } else {
      // resete
      await axios
        .post(process.env.REACT_APP_API_TEST + "resete", {
          email: email,
        })
        .then((resp) => {
          if (resp.status === 200) {
            setError("Check your Email");
            setTalert("success");
            setOpen(true);
            setTimeout(() => {
              navigate("/Login");
            }, 5000);
          } else {
            setError("Probleme sur le Serveur");
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
              label="email"
              className="login-input"
              placeholder="Email"
              type="email"
              onChange={HandleChange}
            />
          </div>
          <div className="login-row">
            <Button className="login-btn" onClick={HandleRegister}>
              Oublié
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Oublie;
