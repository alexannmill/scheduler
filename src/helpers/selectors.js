export function getAppointmentsForDay(state, day) {
  const returnArr = [];
  const appointments = Object.values(state.appointments);
  const days = Object.values(state.days);
  if (day === days.name) {
    const appointmentArr = days.appointments;
    appointmentArr.forEach((id) => {
      if (id === appointments.id) {
        returnArr.push(appointments.id);
      }
    });
  }
  return returnArr;
}
