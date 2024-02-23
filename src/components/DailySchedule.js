import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function DailySchedule() {
  // Function to format the date to match the event date format
  const formatDate = (date, hours, minutes) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  };

  // Get the current date
  const currentDate = new Date();
  
  // State to store events
  const [events, setEvents] = useState([
    // Add event for the current day from 8:00 AM to 12:00 PM
    { title: 'Current Day Event', start: formatDate(currentDate, 8, 0), end: formatDate(currentDate, 12, 0) }
  ]);

  // Function to handle date/time selection
  const handleDateSelect = (selectInfo) => {
    // Prompt for event title
    let title = prompt('Please enter a new title for your event');

    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

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
        },
      ]);
    }
  };

  const createEventId = () => {
    return String(events.length + 1);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: '',
        center: 'title',
        right: ''
      }}
      initialView='timeGridDay'
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      events={events}
      select={handleDateSelect} 
      style={{ width: '100%', height: '100%' }} 
    />
  );
}
