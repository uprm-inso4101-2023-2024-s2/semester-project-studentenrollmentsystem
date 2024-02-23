import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Accept events and onAddEvent as props
export default function MonthlySchedule({ onAddEvent }) {
  // Hardcoded events
  const hardcodedEvents = [
    { title: 'Event 1', start: '2024-03-01', end: '2024-03-02', allDay: true },
    { title: 'Event 2', start: '2024-03-05', end: '2024-03-05', allDay: true },
    { title: 'Long Event', start: '2024-03-07', end: '2024-03-10', allDay: true },
    { title: 'Conference', start: '2024-03-20', end: '2024-03-23', allDay: true },
  ];

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');

    if (title) {
      // Construct the new event object
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };

      // Use the passed onAddEvent function to add this new event
      onAddEvent(newEvent);
    }
  };

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
      events={hardcodedEvents} // Use hardcoded events for display
      select={handleDateSelect}
    />
  );
}
