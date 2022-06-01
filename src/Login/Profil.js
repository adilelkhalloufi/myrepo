import { TextField, Button } from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import LoadingP from "./LoadingPage";

const Profil = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setname] = useState(props.User.name);
  const [email, setemail] = useState(props.User.email);
  const [password, setpassword] = useState(props.User.password);
  const [Rows, setRows] = useState([]);
  const [Talert, setTalert] = useState("error");
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  const HandleChange = (e) => {
    switch (e.target.id) {
      case "name":
        setname(e.target.value);
        break;
      case "password":
        setpassword(e.target.value);
        break;
      case "email":
        setemail(e.target.value);
        break;
    }
  };
  const HandleAdd = async (e) => {
    setLoading(true);

    if (name === "") {
      setError("Champ Title est vide");
      setOpen(true);
    } else {
      // resete

      await axios
        .post(process.env.REACT_APP_API_TEST + "user_update/" + props.User.id, {
          name: name,
          email: email,
          password: password,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            setError("User is Update");
            setTalert("success");
            setOpen(true);
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
      <h4>Profil</h4>
      <div className="form-ajouter">
        <div className="login-row">
          <TextField
            id="name"
            label="Name "
            value={name}
            placeholder="Name..."
            className="login-input"
            onChange={HandleChange}
          />
        </div>{" "}
        <div className="login-row">
          <TextField
            type="email"
            value={email}
            id="email"
            label="Email "
            placeholder="email@email.email"
            className="login-input"
            onChange={HandleChange}
          />
        </div>{" "}
        <div className="login-row">
          <TextField
            type="password"
            id="password"
            label="Password "
            placeholder="*****************"
            className="login-input"
            onChange={HandleChange}
          />
        </div>
        <div className="login-row">
          <Button className="login-btn" onClick={HandleAdd}>
            Modifie
          </Button>
        </div>
      </div>
    </>
  );
};
export default Profil;
