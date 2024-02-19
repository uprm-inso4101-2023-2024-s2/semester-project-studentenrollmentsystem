import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import styles from "../styles/components/weeklySchedule.module.scss"

function WeeklySchedule() {
    const [events, setEvents] = useState([
        { title: 'Event 1', start: '2024-02-18T10:00:00', end: '2024-02-18T12:00:00' },
        { title: 'Event 2', start: '2024-02-19T13:00:00', end: '2024-02-19T15:00:00' }
        // Initialize with default events or empty array
    ]);

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

            setEvents(currentEvents => [...currentEvents, newEvent]);
        }
    };

    return (
        <FullCalendar
            className={styles.calendar}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            selectable={true}
            select={handleDateSelect}
            events={events}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: '' // Keep the calendar in a weekly view
            }}
        />
    );
}

export default WeeklySchedule;
