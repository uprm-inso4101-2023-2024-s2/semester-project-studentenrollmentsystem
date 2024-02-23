import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from "../styles/components/weeklySchedule.module.scss";

// Accept events and onAddEvent function as props
function WeeklySchedule({ events, onAddEvent }) {
    
    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event:');

        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // Clear date selection

        if (title) {
            const newEvent = {
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            };

            // Call the onAddEvent function passed through props
            onAddEvent(newEvent);
        }
    };

    return (
        <FullCalendar
            className={styles.calendar}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            selectable={true}
            select={handleDateSelect}
            events={events} // Use the events passed through props
            eventColor="#05B774" 
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: '' 
            }}
        />
    );
}

export default WeeklySchedule;
