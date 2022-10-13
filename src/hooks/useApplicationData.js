import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

export function useApplicationData() {
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

  //api data fetching
  useEffect(() => {
    Promise.all([
      axios.get(`/days`),
      axios.get(`/appointments`),
      axios.get(`/interviewers`),
    ])
      .then((all) => {
        // setting state
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {
        console.log(error, "Error when fetching API data");
      });
  }, []);

  //book interview
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //setting new state with new appointment
    setState({
      ...state,
      appointments,
      days: availableSpots(appointments, id),
    });
    //updating the db with new appointments
    return axios.put(`/appointments/${id}`, appointment);
  };

  //cancel interview
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({
      ...state,
      appointments,
      days: availableSpots(appointments, id),
    });
    return axios.delete(`/appointments/${id}`, appointment);
  };

  const availableSpots = (appointments, id) => {
    let index = -1;
    const copy = { ...state };
    const day = copy.days.find((day, i) => {
      index = i;
      if (day.appointments.includes(id)) {
        return day;
      }
    });
    let counter = 0;
    const dayAppointments = day.appointments;
    dayAppointments.forEach((app) => {
      if (appointments[app].interview === null) {
        counter++;
      }
    });
    day.spots = counter;
    const days = [...state.days];
    days.splice(index, 1, day);
    return days;
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    availableSpots,
  };
}
