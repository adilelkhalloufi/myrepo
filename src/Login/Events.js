import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import LoadingP from "./LoadingPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

const Eents = (props) => {
  const [datedebut, setdatedebut] = useState(new Date());
  const [datefin, setdatefin] = useState(new Date());
  const [nom, setnom] = useState();
  const [cal, setcal] = useState(null);
  const [description, setdescription] = useState();
  const [open, setOpen] = useState(false);
  const [Rows, setRows] = useState([]);
  const [Calands, setCalands] = useState([]);
  const [Talert, setTalert] = useState("error");
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setRows([]);
    axios
      .post(process.env.REACT_APP_API_TEST + "calandrai_evn", {
        user_id: props.User.id,
      })
      .then((respo) => {
        setCalands(respo.data);
      });
    axios
      .post(process.env.REACT_APP_API_TEST + "list_evn", {
        user_id: props.User.id,
      })
      .then((respo) => {
        if (respo.data.length > 0) {
          setRows(respo.data);
        }
      });
  }, []);
  const HandleChange = (e) => {
    switch (e.target.id) {
      case "nom":
        setnom(e.target.value);
        break;
      case "description":
        setdescription(e.target.value);
        break;
    }
  };
  const HandleAdd = async (e) => {
    setLoading(true);
    if (
      description === "" ||
      nom === "" ||
      datedebut === "" ||
      cal === null ||
      datefin === ""
    ) {
      setError("Remplire Les champs");
      setOpen(true);
    } else {
      // resete

      await axios
        .post(process.env.REACT_APP_API_TEST + "create_evn", {
          user_id: props.User.id,
          Nom: nom,
          description: description,
          date_debut: format(new Date(datedebut), "yyyy-MM-dd"),
          date_fin: format(new Date(datedebut), "yyyy-MM-dd"),
          cal_id: cal,
        })
        .then((resp) => {
          if (resp.status === 200) {
            setError("Calandre Est Ajouter");
            setTalert("success");
            setOpen(true);
            let a = Rows;
            a.push({
              Nom: nom,
              description: description,
              date_debut: datedebut,
              date_fin: datefin,
            });
            setRows(a);
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
      <h4>Events</h4>
      <div className="form-ajouter">
        <div className="login-row">
          <TextField
            id="nom"
            label="Nom "
            placeholder="Nom..."
            className="login-input"
            onChange={HandleChange}
          />
        </div>{" "}
        <div className="login-row">
          <TextField
            id="description"
            label="description "
            placeholder="description..."
            className="login-input"
            onChange={HandleChange}
          />
        </div>
        <div className="login-row">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date Début"
              inputFormat="MM/dd/yyyy"
              value={datedebut}
              onChange={(newValue) => {
                setdatedebut(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="login-row">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date Fin"
              inputFormat="MM/dd/yyyy"
              value={datefin}
              onChange={(newValue) => {
                setdatefin(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="login-row">
          <FormControl fullWidth>
            <InputLabel id="Calendrier">Calendrier</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="Calendrier"
              value={cal}
              label="Calendrier"
              onChange={(e) => {
                setcal(e.target.value);
              }}
            >
              {Calands.map((item) => {
                return <MenuItem value={item.id}>{item.title}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div className="login-row">
          <Button className="login-btn" onClick={HandleAdd}>
            Ajouter
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nom</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date Debut</TableCell>
              <TableCell align="center">Date Fin</TableCell>
              <TableCell align="center">Calendrie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.Nom}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.date_debut}</TableCell>
                <TableCell align="center">{row.date_fin}</TableCell>
                <TableCell align="center">
                  {Calands.find((x) => x.id === row.cal_id).title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Eents;
