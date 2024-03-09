import React from "react";
import styles from "../styles/components/scheduleTable.module.scss";
import {useState, useEffect} from "react";
import Data from "../dummydata/spring2024.csv";
import Papa from "papaparse";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css"

export default function Scheduletable()
{
    //Only works with npm papaparse (npm install papaparse)
    //Will potentially be changed in the future depending on data inputs
    const [data,setData] = useState([])
    useEffect(()=> {
        const fetchData = async()=> {
            const response = await fetch(Data);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csvData = decoder.decode(result.value);
            const parsedData = Papa.parse(csvData, {header:true, skipEmptyLines:true}).data;
            setData(parsedData);
        };
        fetchData();
    }, []);

    const getClassEvents = [
        {
            title: "MATE4145",
            start: "2024-03-MonT13:00:00",
            end: "2024-03-MonT14:50:00",
        },
        {
            title: "MATE4145",
            start: "2024-03-13T13:00:00",
            end: "2024-03-13T14:50:00",
        },
        {
            title: "MATE4145",
            start: "2024-03-15T13:00:00",
            end: "2024-03-15T13:50:00",
        },

    ]

    const range = (keyCount) => [...Array(keyCount).keys()];
    const timeX = ["6:30am","--------","7:30am","--------","8:30am","--------","9:30am","--------","10:30am","--------","11:30am","--------","12:30pm","--------","1:30pm","--------","2:30pm","--------","3:30pm","--------","4:30pm","--------","5:30pm","--------","6:30pm","--------","7:30pm","--------","8:30pm","--------","9:30pm"];

    function classGen(CLASS,DAY){
        if(CLASS=="13" && (DAY=="L" || DAY=="W" || DAY=="V"))
        {
            return(<>MATE4145</>)
        }
        return(<></>)
    }

    return(
        <>
            <table className={styles.Scheduletable}>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    {range(31).map((time)=>(
                        <tr id={time}>{timeX[time]}
                            <td id="L">{classGen(time,"L")}</td>
                            <td id="M">{classGen(time,"M")}</td>
                            <td id="W">{classGen(time,"W")}</td>
                            <td id="J">{classGen(time,"J")}</td>
                            <td id="V">{classGen(time,"V")}</td>
                            <td id="S">{classGen(time,"S")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <>
                {}
            </>
            {/* <FullCalendar
                plugins={[dayGridPlugin,timeGridPlugin]}
                initialView="timeGridWeek"
                aspectRatio={0.8}
                events={getClassEvents}
            /> */}
        </>
    );
}       