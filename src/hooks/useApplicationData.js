import React, { useEffect, useState } from "react";
import axios from "axios";

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
    //new appointment with new as interview
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // placing appointment into appointments object
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
  /*

//cancel interview
*/
  const cancelInterview = (id) => {
    //new appointment with null as interview
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    // placing appointment into appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // setting state to new appointments object
    setState({
      ...state,
      appointments,
      days: availableSpots(appointments, id),
    });

    //returning to db
    return axios.delete(`/appointments/${id}`, appointment);
  };

  const availableSpots = (appointments, id) => {
    let index = -1;
    const copy = { ...state };

    //finding day in state copy, along with index in days array
    const day = copy.days.find((day, i) => {
      index = i;
      if (day.appointments.includes(id)) {
        return day;
      }
    });

    //counting nulls in appointments per day
    let counter = 0;
    const dayAppointments = day.appointments;
    dayAppointments.forEach((app) => {
      if (appointments[app].interview === null) {
        counter++;
      }
    });

    //replacing # of spots and inserting day into days array
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
