export function getAppointmentsForDay(state, day) {
  const filterDays = state.days.filter((eachDay) => eachDay.name === day);
  if (filterDays.length < 1) {
    return [];
  }
  const dayAppointments = filterDays[0].appointments;
  const arrAppointments = [];
  dayAppointments.forEach((app) => {
    arrAppointments.push(state.appointments[app]);
  });
  return arrAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerID = interview.interviewer;
  const foundInterviewer = state.interviewers[interviewerID];
  const copy = { ...interview };
  copy.interviewer = foundInterviewer;
  return copy;
}

export function getInterviewersForDay(state, day) {
  let filterDays = state.days.filter((eachDay) => eachDay.name === day)[0];
  if (!filterDays) {
    return [];
  }
  const returnInterviewers = filterDays.interviewers.map(
    (interviewerID) => state.interviewers[interviewerID]
  );
  return returnInterviewers;
}
