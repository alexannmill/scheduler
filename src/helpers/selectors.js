export function getAppointmentsForDay(state, day) {
  const returnArr = [];
  const filterDays = Object.values(state.days);
  filterDays.forEach((arrDay) => {
    if (arrDay.name === day) {
      const arrAppointments = arrDay.appointments;
      arrAppointments.forEach((id) => {
        returnArr.push(state.appointments[id]);
      });
    }
  });
  return returnArr;
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
