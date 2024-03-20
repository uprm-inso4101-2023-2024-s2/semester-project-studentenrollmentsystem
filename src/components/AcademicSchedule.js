import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Accept events and onAddEvent as props
export default function AcademicSchedule({ onAddEvent }) {
  // Hardcoded events
  const hardcodedEvents = [
    
  ];

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");

    if (title) {
      // Construct the new event object
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      // Use the passed onAddEvent function to add this new event
      onAddEvent(newEvent);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
      eventColor="#05B774"
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      events={hardcodedEvents} // Use hardcoded events for display
      select={handleDateSelect}
    />
  );
}
