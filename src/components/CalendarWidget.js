import React, { useState, useEffect } from 'react';

const formatDate = (isoString) => {
  if (!isoString) return { day: '?', month: '?' };
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('da-DK', { month: 'short' }).toUpperCase().replace('.', '');
  return { day, month };
};

function CalendarWidget() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://gutfelt-backend.onrender.com/api/calendar-events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Kunne ikke hente events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="widget">
      <h2>Kommende Begivenheder</h2>
      <div className="widget-content">
        {isLoading ? (
          <p>Henter begivenheder fra kalender...</p>
        ) : (
          events.length > 0 ? (
            events.map(event => {
              const { day, month } = formatDate(event.start?.dateTime);
              return (
                <div key={event.id} className="calendar-event">
                  <div className="calendar-date">
                    {day}
                    <span>{month}</span>
                  </div>
                  <div className="calendar-title">{event.subject}</div>
                </div>
              );
            })
          ) : (
            <p>Der er ingen kommende begivenheder.</p>
          )
        )}
      </div>
    </div>
  );
}

export default CalendarWidget;