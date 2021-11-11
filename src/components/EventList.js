import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "../static/List.css";

const EventList = ({ events }) => {
  const getDate = (eventDate) => {
    let raw = Date.parse(eventDate);
    let ms_until = raw - Date.now();
    let hours_until = 0;
    let hours = 0;
    let minutes = 0;
    if (ms_until < 0) {
      hours_until = (-1 * ms_until) / (1000 * 60 * 60);
    } else {
      hours_until = ms_until / (1000 * 60 * 60);
    }
    hours = Math.floor(hours_until);
    minutes = (hours_until - hours) * 60;
    if (hours > 48) {
      return `${Math.floor(hours / 24)} days and ${hours % 24} hours`;
    }
    return `${hours} hours ${minutes.toFixed(0)} minutes`;
  };

  return (
    <div className="listContainer">
      <ListGroup className="untilList">
        {events[0].map((event) => (
          <ListGroup.Item variant="primary">
            <div className="listItem">
              {event.title} - {getDate(event.date)} left!
              <Button className="listButton" variant="outline-primary">
                Edit me:
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <ListGroup className="sinceList">
        {events[1].map((event) => (
          <ListGroup.Item variant="danger">
            <div className="listItem">
              {event.title} - {getDate(event.date)} since!
              <Button className="listButton" variant="outline-primary">
                Edit me:
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default EventList;
