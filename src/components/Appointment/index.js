import React from "react";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import { useVisualMode } from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

//props: id(num), time(string), interview(obj)
export default function Appointment(props) {
  //setting mode
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVING = "ERROR_SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //onSave for CREATE(form)
  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVING, true);
      });
  };

  //transition to CONFIRM before deleting
  const deleteConfirm = () => {
    transition(CONFIRM);
  };

  //onDelete for SHOW
  const deleteInterview = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  };
  // edit on SHOW
  const edit = () => {
    transition(EDIT);
  };

  return (
    <div className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          student={props?.interview?.student}
          interviewer={props?.interview?.interviewer?.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"SAVING"} />}
      {mode === ERROR_DELETE && (
        <Error message={"ERROR WHILE DELETE APPOINTMENT"} onClose={back} />
      )}
      {mode === ERROR_SAVING && (
        <Error message={"ERROR WHILE SAVING APPOINTMENT"} onClose={back} />
      )}
      {mode === CONFIRM && (
        <Confirm onCancel={back} onConfirm={deleteInterview} />
      )}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteConfirm}
          onEdit={edit}
        />
      )}
    </div>
  );
}
