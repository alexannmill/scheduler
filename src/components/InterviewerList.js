import React, { useState } from "react";
import classNames from "classnames";
import "components/InterviewerList.scss";

export default function InverviewerList(props) {
  const [interviewer, setInterviewer] = useState();
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}
