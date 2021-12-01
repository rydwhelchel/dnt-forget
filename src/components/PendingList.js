import React from 'react';
import { ListGroup } from 'react-bootstrap';

const PendingList = ({ pendingChanges }) => {
  return (
    <div className="pendingList">
      {pendingChanges.length > 0 ? (
        <ListGroup style={{ paddingLeft: '0px' }} className="list">
          <ListGroup.Item
            style={{ backgroundColor: '#1d1d1d' }}
            variant="secondary"
          >
            <div style={{ height: '40px' }} className="pendingChange">
              <h3 style={{ color: '#adadad' }}>Event</h3>
              <h3 style={{ color: '#adadad' }}>Pending</h3>
            </div>
          </ListGroup.Item>
          {pendingChanges.map((change) =>
            change.method === 'add' ? (
              <ListGroup.Item variant="primary">
                <div className="pendingChange">
                  <p style={{ color: 'black' }}>{change.event.title}</p>
                  <div style={{ display: 'flex' }}>
                    {' '}
                    TO={'>'}
                    <p style={{ color: 'green' }}>{change.folder}</p>
                  </div>
                  <p style={{ color: 'red' }}>Add event</p>
                </div>
              </ListGroup.Item>
            ) : change.method === 'remove' ? (
              <ListGroup.Item variant="danger">
                <div className="pendingChange">
                  <p style={{ color: 'black' }}>{change.event.title}</p>
                  <p style={{ color: 'red' }}>Remove event</p>
                </div>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item variant="info">
                <div className="pendingChange">
                  <p style={{ color: 'black' }}>{change.event.title}</p>
                  <p style={{ color: 'red' }}>Complete event</p>
                </div>
              </ListGroup.Item>
            )
          )}
        </ListGroup>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PendingList;
