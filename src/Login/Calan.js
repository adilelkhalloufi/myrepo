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
import { format, getYear } from "date-fns";

const timeZones = [
  { Value: "America/New_York", Text: "(UTC-05:00) Eastern Time" },
  { Value: "UTC", Text: "UTC" },
  { Value: "Asia/Kolkata", Text: "(UTC+05:30) India Standard Time" },
];
const Calan = (props) => {
  const [open, setOpen] = useState(false);
  const [timezone, settimezone] = useState("UTC");
  const [nbr, setnbr] = useState(0);
  const [Couts, setCouts] = useState([]);
  const [title, settitle] = useState("");
  const [Rows, setRows] = useState([]);
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
        setRows(respo.data);
      });

    axios
      .post(process.env.REACT_APP_API_TEST + "count", {
        date: format(new Date(), "Y-MM-dd").toString(),
      })
      .then((res) => {
        if (res.data.length > 0) {
          setCouts(res.data);
        }
      });
  }, []);
  const HandleChange = (e) => {
    switch (e.target.id) {
      case "titre":
        settitle(e.target.value);
        break;
      case "nbr":
        setnbr(e.target.value);
        break;
    }
  };
  const HandleAdd = async (e) => {
    setLoading(true);

    if (title === "") {
      setError("Champ Title est vide");
      setOpen(true);
    } else {
      // resete
      await axios
        .post(process.env.REACT_APP_API_TEST + "create_cal", {
          user_id: props.User.id,
          nbr_events: nbr,
          title: title,
          timezone: timezone,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            setError("Calandre Est Ajouter");
            setTalert("success");
            setOpen(true);
            let a = Rows;
            a.push({
              title: title,
              nbr_events: nbr,
              timezone: timezone,
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
      <h4>Calendrier</h4>
      <div className="form-ajouter">
        <div className="login-row">
          <TextField
            id="titre"
            label="Titre "
            placeholder="Exaple..."
            className="login-input"
            onChange={HandleChange}
          />
        </div>{" "}
        <div className="login-row">
          <TextField
            type="number"
            id="nbr"
            label="Nbr Events "
            placeholder="10"
            className="login-input"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={HandleChange}
          />
        </div>
        <div className="login-row">
          <FormControl fullWidth>
            <InputLabel id="timezone">Timezone</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="timezone"
              value={timezone}
              label="Timezone"
              onChange={(e) => {
                settimezone(e.target.value);
              }}
            >
              <MenuItem value={timeZones[0].Value}>
                {timeZones[0].Text}
              </MenuItem>
              <MenuItem value={timeZones[1].Value}>
                {timeZones[1].Text}
              </MenuItem>
              <MenuItem value={timeZones[2].Value}>
                {timeZones[2].Text}
              </MenuItem>
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
              <TableCell align="center">Titre</TableCell>
              <TableCell align="center">Nbr Events</TableCell>
              <TableCell align="center">TimeZone</TableCell>
              <TableCell align="center">Nbr Events</TableCell>
              <TableCell align="center">Taux Remplissage </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.nbr_events}</TableCell>
                <TableCell align="center">{row.timezone}</TableCell>
                <TableCell align="center">
                  {" "}
                  {Couts.length > 0
                    ? Couts.find((x) => x.cal_id === row.id).CountEvents
                    : 0}
                </TableCell>{" "}
                <TableCell align="center">
                  {" "}
                  {Couts.length > 0
                    ? (Couts.find((x) => x.cal_id === row.id).CountEvents /
                        30) *
                      100
                    : 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Calan;
