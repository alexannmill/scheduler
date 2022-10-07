import React from "react";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";

import "components/Appointment/styles.scss";

//props: id(num), time(string), interview(obj)
export default function Appointment(props) {
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
