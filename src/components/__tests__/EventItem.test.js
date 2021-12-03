import { render, screen, clenaup } from '@testing-library/react';
import EventItem from '../EventItem';
import {onClickDelete} from "../EventList"
import { BrowserRouter } from 'react-router-dom';

test('should render until event items', () => {
  const untilEvent = { id: 1, title: 'The far future...', date: '2065-11-09T12:00'};
  render(<BrowserRouter><EventItem onCompletedClick={()=>{return}} typeItem='until' testID={`event-${untilEvent.title}`} event={untilEvent} onRemoveClick={()=>onClickDelete}/></BrowserRouter>);
  const untilElement = screen.getByTestId(`event-${untilEvent.title}`);
  expect(untilElement).toBeInTheDocument();
  expect(untilElement).toHaveTextContent('The far future...');
  expect(untilElement).toContainElement(screen.getByTestId('until-button'));
});
test('should render since event items', () => {
  const sinceEvent = { id: 2, title: 'Assignment Due', date: '2021-11-09T23:59' };
  render(<EventItem onCompletedClick={()=>{return}} typeItem='since' testID={`event-${sinceEvent.title}`}  event={sinceEvent} onRemoveClick={()=>onClickDelete}/>);
  const sinceElement = screen.getByTestId(`event-${sinceEvent.title}`);
  expect(sinceElement).toBeInTheDocument();
  expect(sinceElement).toHaveTextContent('Assignment Due');
  expect(sinceElement).toContainElement(screen.getByTestId('since-button'));
});
