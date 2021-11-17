import { render, screen, clenaup } from '@testing-library/react';
import EventList from '../EventList';


test('should render list of event items', () => {
    const args = {
        events: [
          { id: 1,title: 'Meeting with Prof', date: '2065-11-11T12:00' },
          { id: 2,title: 'Anniversary', date: '2065-11-09' },
          { id: 3,title: "Mom's Birthday", date: '2065-11-10T12:00' },
          { id: 4,title: 'Assignment Due', date: '2065-11-12T23:59' },
          { id: 5,title: 'Test!', date: '2065-11-09T12:00' },
          { id: 6,title: 'Go out with friends', date: '2000-11-20T18:00' },
          { id: 7,title: 'My Birthday!', date: '2000-01-16' },
          { id: 8,title: 'My Birthday next year!', date: '2000-11-25' },
          { id: 9,title: 'Thanksgiving', date: '2000-01-16' },
        ],
      };
    render(<EventList events={args.events} />);
    // Ensure Until events 
    for (let i = 0; i < 5; i+=1) {
        const event = screen.getByTestId(`event-${args.events[i].id}`);
        expect(event).toBeInTheDocument();
        expect(event).toHaveAttribute('variant', 'primary');
    }
    //Ensure Since events
    for (let i = 5; i < 9; i+=1) {
        const event = screen.getByTestId(`event-${args.events[i].id}`);
        expect(event).toBeInTheDocument();
        expect(event).toHaveAttribute('variant', 'danger');
    }

});

// test('should render since event items', () => {
//     const sinceEvent = { title: 'Assignment Due', date: '2021-11-09T23:59' };
//     render(<EventItem typeItem='since' event={sinceEvent} onRemoveClick={()=>onClickDelete}/>);
//     const sinceElement = screen.getByTestId('since-todo');
//     expect(sinceElement).toBeInTheDocument();
//     expect(sinceElement).toHaveTextContent('Assignment Due');
//     expect(sinceElement).toContainElement(screen.getByTestId('since-button'));
//   });