import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Props are added to accept events and a function to add new events
export default function DailySchedule({ events, onAddEvent }) {

  // Function to handle date/time selection
  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      // This function will be passed from the parent component
      // It is responsible for updating the events state in the parent
      onAddEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
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
      events={events} // Use the events passed down as props
      select={handleDateSelect}
      style={{ width: '100%', height: '100%' }} 
    />
  );
}
