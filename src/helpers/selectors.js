export function getAppointmentsForDay(state, day) {
  //find day
  const filterDays = state.days.filter((eachDay) => eachDay.name === day);
  if (filterDays.length < 1) {
    return [];
  }
  //strip array
  const dayAppointments = filterDays[0].appointments;
  const arrAppointments = [];
  //for each app per day push appointment info from state into array
  dayAppointments.forEach((app) => {
    arrAppointments.push(state.appointments[app]);
  });
  //return new array with day+appointment info
  return arrAppointments;
}

export function getInterview(state, interview) {
  //case for no/falsely interview
  if (!interview) {
    return null;
  }
  //interviewer ID
  const interviewerID = interview.interviewer;
  //match with interviewers in state
  const foundInterviewer = state.interviewers[interviewerID];
  const copy = { ...interview };
  // replace with interviewer into copied state
  copy.interviewer = foundInterviewer;
  // return new state
  return copy;
}

export function getInterviewersForDay(state, day) {
  //find day
  const filterDays = state.days.filter((eachDay) => eachDay.name === day);
  //case for no days
  if (filterDays.length < 1) {
    return [];
  }
  //strip array
  const dayInterviewers = filterDays[0].interviewers;
  const arrInterviewers = [];
  //for each interviewer matched id push into new array
  dayInterviewers.forEach((id) => {
    arrInterviewers.push(state.interviewers[id]);
  });
  // return array of interviewers for day
  return arrInterviewers;
}
