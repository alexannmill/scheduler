import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  debugDOM,
  waitForElementToBeRemoved,
  getByTestId,
  waitFor,
  queryByText,
} from "@testing-library/react";
import axios from "axios";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Alex Miller" },
    });
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, /saving/i));
    expect(getByText(appointment, "Alex Miller")).toBeInTheDocument();

    const days = getAllByTestId(container, "day");
    const monday = days.find((day) => getByText(day, "Monday"));
    expect(getByText(monday, /no spots remaining/i));
  });
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[1];

  //click trash icon
  fireEvent.click(getByAltText(appointment, "Delete"));

  //click confirm
  fireEvent.click(getByText(appointment, "Confirm"));
  await waitForElementToBeRemoved(() => getByText(appointment, /deleting/i));
  const days = getAllByTestId(container, "day");
  const monday = days.find((day) => getByText(day, "Monday"));
  expect(getByText(monday, /2 spots remaining/i));
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[1];

  //click edit icon
  fireEvent.click(getByAltText(appointment, "Edit"));
  fireEvent.change(getByTestId(appointment, /student-name-input/i), {
    target: { value: "Alex Miller" },
  });

  fireEvent.click(getByText(appointment, "Save"));

  await waitForElementToBeRemoved(() => getByText(appointment, /saving/i));

  const days = getAllByTestId(container, "day");
  const monday = days.find((day) => getByText(day, "Monday"));
  expect(getByText(monday, /1 spot remaining/i));
});

it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce(new Error("something happened"));

  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Alex Miller" },
  });
  fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
  fireEvent.click(getByText(appointment, "Save"));

  await waitForElement(() => {
    return queryByText(appointment, /error while saving/i);
  });
});

it("shows the delete error when failing to delete an existing appointment", async () => {});
