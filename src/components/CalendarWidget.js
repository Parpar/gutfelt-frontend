import React from 'react';
const calendarEvents = [ { id: 1, day: '28', month: 'AUG', title: 'Deadline: Kvartalsrapport Q3' }, { id: 2, day: '05', month: 'SEP', title: 'Fælles morgenmad i kantinen' }, { id: 3, day: '15', month: 'SEP', title: 'Workshop: Effektiv kundekommunikation' }];
function CalendarWidget() {
  return (
    <div className="widget">
      <h2>Kommende Begivenheder</h2>
      {calendarEvents.map(event => ( <div key={event.id} className="calendar-event"> <div className="calendar-date"> {event.day} <span>{event.month}</span> </div> <div className="calendar-title">{event.title}</div> </div> ))}
    </div>
  );
}
export default CalendarWidget;