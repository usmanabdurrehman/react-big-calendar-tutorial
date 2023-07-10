import { Appointment } from "./types";
import express from "express";
const app = express();

let appointments: Appointment[] = [
  {
    id: 1,
    status: "P",
    location: "New York",
    resource: "Dr Alex",
    address: "Building 5\nStreet 44\nNear Express Highway\nNew York",
    start: "2022-10-10T10:00:00",
    end: "2022-10-10T11:00:00",
  },
];

app.use(express.json());

app.get("/appointments", (req, res) => {
  res.send(appointments);
});

app.post("/appointments", (req, res) => {
  const { appointment } = req.body;
  const newAppointment = { ...appointment, id: appointments.length + 1 };
  appointments.push(newAppointment);
  res.send({ appointment: newAppointment });
});

app.put("/appointments", (req, res) => {
  const { appointment } = req.body;
  appointments = appointments.map((app) =>
    app.id === appointment.id ? appointment : app
  );
  res.send({ appointment });
});

app.delete("/appointments/:id", (req, res) => {
  const { id } = req.params;
  appointments = appointments.filter((app) => app.id !== Number(id));
  res.send({ id });
});

app.listen(7000, () => {
  console.log("listening on port 7000");
});
