import React, { useState } from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

//props : id(num), name:(string), avatar(url), setInter(func) - selected
export default function InterviewerListItem(props) {
  const interviewerClass = classNames({
    interviewers__item: props,
    "interviewers__item--selected": props.selected,
  });
  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
      selected={props.selected}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
