import React, { Fragment } from "react";

import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  console.log("propsA:", props);
  return (
    <div className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
}
