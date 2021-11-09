import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const EventList = ({ events }) => {
  const getDate = (eventDate) => {
    let raw = Date.parse(eventDate);
    let ms_until = raw - Date.now();
    let hours_until = ms_until / (1000 * 60 * 60);
    let hours = Math.floor(hours_until);
    let minutes = (hours_until - hours) * 60;
    // We could then have if statements checking the time style of this event and return in different time styles
    return `${hours} hours ${minutes.toFixed(0)} minutes`;
  };

  return (
    <div style={{ display: "flex" }}>
      <ListGroup as="ul">
        {events.map((event) => (
          <ListGroup.Item as="li">
            {event.title} - {getDate(event.date)} left!
            {/* TODO:Need to figure out better styling/placement  */}
            <Button variant="outline-primary">Edit me:</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default EventList;
