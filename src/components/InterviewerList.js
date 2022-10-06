import React, { useState } from "react";
import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

// props : interviewers(arr), setInterviewers(fnc), interviewer(num/id)
export default function InterviewerList(props) {
  console.log("props:", props);
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => {
          props.onChange(interviewer.id);
        }}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}