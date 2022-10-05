import React from "react";
import "components/DayListItems.scss";
import classNames from "classnames";
import { useState } from "react";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "--selected": props.selected,
    "--full": props.spots === 0,
  });
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{props.spots} spots remaining</h3>
    </li>
  );
}
