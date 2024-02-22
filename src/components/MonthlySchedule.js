import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function MonthlySchedule() {
  // State to keep track of events
  const [events, setEvents] = useState([]);

  // Handler for adding a new event
  const handleDateSelect = (selectInfo) => {
    // Prompt for entering a title for the new event
    let title = prompt('Please enter a new title for your event');

    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      // Add new event to the calendar
      setEvents([
        ...events,
        {
          id: createEventId(), 
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        }
      ]);
    }
  };

  const createEventId = () => String(events.length + 1);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: ''
      }}
      initialView='dayGridMonth'
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      events={events} 
      select={handleDateSelect} 
    />
  );
}
