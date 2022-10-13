import React, { useEffect, useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

import { useApplicationData } from "hooks/useApplicationData";

export default function Application(props) {
  //helper functions
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  // finding app array for day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  //finding interviewers array for day
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  //using app by day to render into sched
  const schedule = dailyAppointments.map((appointment) => {
    //get full interview info per appointment
    const fullInterview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={fullInterview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
