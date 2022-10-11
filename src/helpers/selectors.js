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
  const filterDays = state.days.filter((eachDay) => eachDay.name === day);
  if (filterDays.length < 1) {
    return [];
  }
  const dayInterviewers = filterDays[0].interviewers;
  const arrInterviewers = [];
  dayInterviewers.forEach((id) => {
    arrInterviewers.push(state.interviewers[id]);
  });
  return arrInterviewers;
}
