import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function MonthlySchedule(){
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
    />
  );
}