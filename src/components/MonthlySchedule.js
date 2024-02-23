import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Accept events and onAddEvent as props
export default function MonthlySchedule({ onAddEvent }) {
  // Hardcoded events
  const hardcodedEvents = [
    { title: "Calc 2", start: "2024-04-02", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-04-04", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-03-05", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-03-07", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-03-12", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-03-19", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-03-26", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-03-14", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-03-21", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-03-28", end: "2024-03-05", allDay: true },

    { title: "Calc 2", start: "2024-04-09", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-04-16", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-04-23", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-04-30", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-04-11", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-04-18", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-04-25", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-05-02", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-05-07", end: "2024-03-05", allDay: true },
    { title: "Calc 2", start: "2024-05-09", end: "2024-03-05", allDay: true },
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
