import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/fr";
import { useEffect, useState } from "react";
import axios from "axios";
const messages = {
  allDay: "Tout jour",
  previous: "<",
  next: ">",
  today: "aujourd'hui",
  month: "mois",
  week: "semaine",
  day: "journée",
  agenda: "Agenda",
  date: "date",
  time: "time",
  event: "un événement",
  showMore: (total) => `+ Autre Events (${total})`,
};
const localizer = momentLocalizer(moment);
moment.locale("fr");

const Home = (props) => {
  // {
  //   id: 0,
  //   title: "All Day Event very long title",
  //   allDay: true,
  //   start: new Date(2022, 6, 1),
  //   end: new Date(2022, 6, 2),
  // },
  const [events, setevents] = useState([]);
  useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_TEST + "list_evn", {
        user_id: props.User.id,
      })
      .then((respo) => {
        if (respo.data.length > 0) {
          let a = [];
          respo.data.map((item) => {
            console.log(item.id);
            a.push({
              id: item.id,
              title: item.Nom,
              allDay: true,
              start: new Date(item.date_debut),
              end: new Date(item.date_fin),
            });
            setevents(a);
          });
        }
      });
  }, []);
  return (
    <>
      <h4>Home</h4>
      <Calendar
        messages={messages}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
};
export default Home;
