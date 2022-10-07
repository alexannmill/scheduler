import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "../helpers/selectors";

export default function Application(props) {
  //state obj
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: 0,
    interviewers: [],
  });
  //setState funcs
  const setDay = (day) => setState({ ...state, day });
  const setInterviewer = (interviewer) => setState({ ...state, interviewer });
  //api data fetching
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ]).then((all) => {
      // setting state
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  // finding app by day
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  //using app by day to render into sched
  const appointmentsArr = Object.values(dailyAppointments).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          time={appointment.time}
          {...appointment}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          \
          <DayList days={state.days} value={state.day} onChange={setDay} />
          <InterviewerList
            interviewers={state.interviewers}
            onChange={setInterviewer}
            interviewer={state.interviewer}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
