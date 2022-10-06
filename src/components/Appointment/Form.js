import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

import "components/Appointment/styles.scss";

//states: student(string) -- setStudent, interviewer("id") -- setInterviewer
//props:student(string), interviewers(arr), interviewer(num/id), onSave(func), onCancel(func)
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };
  const cancel = () => {
    props.onCancel();
    reset();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
          This must be a controlled component
          your code goes here
        */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={() => props.onSave(student, interviewer)} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
