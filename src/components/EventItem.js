import React from 'react';
import PropTypes from 'prop-types';
import { Button, ListGroup, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EventItem = function EventItem({
  event,
  typeItem,
  onRemoveClick,
  onCompletedClick,
  testID,
}) {
  const getDate = (eventDate) => {
    const raw = Date.parse(eventDate);
    const msUntil = raw - Date.now();
    let hoursUntil = 0;
    let hours = 0;
    let minutes = 0;
    if (msUntil < 0) {
      hoursUntil = (-1 * msUntil) / (1000 * 60 * 60);
    } else {
      hoursUntil = msUntil / (1000 * 60 * 60);
    }
    hours = Math.floor(hoursUntil);
    minutes = (hoursUntil - hours) * 60;
    if (hours > 48) {
      return `${Math.floor(hours / 24)} days and ${hours % 24} hours`;
    }
    return `${hours} hours ${minutes.toFixed(0)} minutes`;
  };

  return (
    <div>
      {typeItem === 'until' ? (
        <ListGroup.Item variant="primary">
          <div data-testid={testID} variant="primary" className="listItem">
            {event.title} - {getDate(event.date)} left!
            <ButtonGroup>
              <Link to={'/details/' + event.id}>
                <Button
                  variant="outline-info"
                  className="listButton"
                  type="button"
                >
                  Details
                </Button>
              </Link>
              <Button
                className="listButton"
                variant="outline-secondary"
                onClick={() => onCompletedClick()}
              >
                Complete
              </Button>
              <Button
                className="listButton"
                data-testid="until-button"
                variant="outline-danger"
                onClick={() => onRemoveClick()}
              >
                Remove
              </Button>
            </ButtonGroup>
          </div>
        </ListGroup.Item>
      ) : (
        <ListGroup.Item variant="danger">
          <div data-testid={testID} variant="danger" className="listItem">
            {event.title} - {getDate(event.date)} since!
            <Button
              className="listButton"
              data-testid="since-button"
              variant="outline-danger"
              onClick={() => onRemoveClick()}
            >
              Remove
            </Button>
          </div>
        </ListGroup.Item>
      )}
    </div>
  );
};

EventItem.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  typeItem: PropTypes.string.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onCompletedClick: PropTypes.func.isRequired,
  testID: PropTypes.string.isRequired,
};

export default EventItem;
