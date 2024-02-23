import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "../styles/components/weeklySchedule.module.scss";

function WeeklySchedule({ onAddEvent }) {
  // Hardcoded events for demonstration
  const hardcodedEvents = [
    {
      title: "Calc 2",
      start: "2024-02-20T09:00:00",
      end: "2024-02-20T10:00:00",
    },
    {
      title: "Calc 2",
      start: "2024-02-22T09:00:00",
      end: "2024-02-22T10:00:00",
    },
    {
      title: "Calc 2",
      start: "2024-02-27T09:00:00",
      end: "2024-02-20T10:00:00",
    },
    {
      title: "Calc 2",
      start: "2024-02-29T09:00:00",
      end: "2024-02-22T10:00:00",
    },
  ];

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event:");

    if (title) {
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      // Ideally, onAddEvent should update the parent component's state
      // But for hardcoded events, this step may not be necessary
      onAddEvent(newEvent);
    }

    // Normally, you'd clear the selection here
    // calendarApi.unselect();
  };

  return (
    <FullCalendar
      className={styles.calendar}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      selectable={true}
      select={handleDateSelect}
      events={hardcodedEvents} // Use the hardcoded events for display
      eventColor="#05B774"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
    />
  );
}

export default WeeklySchedule;
