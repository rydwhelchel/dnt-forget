import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "../static/List.css";

const EventList = ({ events }) => {
  const getDate = (eventDate) => {
    //TODO: Clean up
    let raw = Date.parse(eventDate);
    let ms_until = raw - Date.now();
    if (ms_until < 0) {
      let hours_until = (-1 * ms_until) / (1000 * 60 * 60);
      let hours = Math.floor(hours_until);
      let minutes = (hours_until - hours) * 60;
      return `${hours} hours ${minutes.toFixed(0)} minutes`;
    } else {
      let hours_until = ms_until / (1000 * 60 * 60);
      let hours = Math.floor(hours_until);
      let minutes = (hours_until - hours) * 60;
      return `${hours} hours ${minutes.toFixed(0)} minutes`;
    }

    // We could then have if statements checking the time style of this event and return in different time styles
  };

  return (
    <div className="listGroup">
      <ListGroup as="ul">
        <h1>Until events!</h1>
        {events[0].map((event) => (
          <ListGroup.Item
            style={{ display: "flex" }}
            className="listItem"
            as="li"
          >
            {event.title} - {getDate(event.date)} left!
            <Button style={{ alignSelf: "flex-end" }} variant="outline-primary">
              Edit me:
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <ListGroup as="ul">
        <h1>Since events</h1>
        {events[1].map((event) => (
          <ListGroup.Item
            style={{ display: "flex" }}
            className="listItem"
            as="li"
          >
            {event.title} - {getDate(event.date)} since!
            <Button style={{ alignSelf: "flex-end" }} variant="outline-primary">
              Edit me:
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default EventList;
