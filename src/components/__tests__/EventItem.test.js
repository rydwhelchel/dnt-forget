import { render, screen, clenaup } from '@testing-library/react';
import EventItem from '../EventItem';
import {onClickDelete} from "../EventList"

test('should render until event items', () => {
  const untilEvent = { title: 'The far future...', date: '2065-11-09T12:00'};
  render(<EventItem typeItem='until' testID={`event-${untilEvent.title}`} event={untilEvent} onRemoveClick={()=>onClickDelete}/>);
  const untilElement = screen.getByTestId(`event-${untilEvent.title}`);
  expect(untilElement).toBeInTheDocument();
  expect(untilElement).toHaveTextContent('The far future...');
  expect(untilElement).toContainElement(screen.getByTestId('until-button'));
});
test('should render since event items', () => {
  const sinceEvent = { title: 'Assignment Due', date: '2021-11-09T23:59' };
  render(<EventItem typeItem='since' testID={`event-${sinceEvent.title}`}  event={sinceEvent} onRemoveClick={()=>onClickDelete}/>);
  const sinceElement = screen.getByTestId(`event-${sinceEvent.title}`);
  expect(sinceElement).toBeInTheDocument();
  expect(sinceElement).toHaveTextContent('Assignment Due');
  expect(sinceElement).toContainElement(screen.getByTestId('since-button'));
});
