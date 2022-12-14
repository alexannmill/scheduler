import React from "react";
import "components/DayListItems.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  //setting CSS based on focus
  const dayClass = classNames({
    "day-list__item": props,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  //format spots message based on number
  function formatSpots() {
    if (props.spots === 1) {
      return "1 spot remaining";
    }
    if (props.spots === 0) {
      return "no spots remaining";
    }
    return `${props.spots} spots remaining`;
  }
  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={props.setDay}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
