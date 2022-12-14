import React from "react";
import DayListItem from "./DayListItem";

// import "components/DayList.scss";
//props: days(arr), value(day(string)), onChange- setDay (func))
export default function DayList(props) {
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={() => {
          props.onChange(day.name);
        }}
      />
    );
  });

  return <ul>{days}</ul>;
}
