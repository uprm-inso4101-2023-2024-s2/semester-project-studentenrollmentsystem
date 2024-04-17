import React from "react";
import styles from "../styles/components/courseTable.module.scss";
import {useState, useEffect} from "react";

export default function Coursetable({DATA})
{
    var data = [];
    for(var i = 0; DATA["course" + i.toString()]!=undefined; i++)
    {
        data[i] = DATA["course" + i.toString()];
    }

    return(
        <>
            {data.length ? (
                <table className={styles.Coursetable}>
                    <thead>
                        <tr>
                        <th>Course</th>
                        <th>Section</th>
                        <th>Credits</th>
                        <th>Meetings</th>
                        <th>Professor</th>
                        <th>Grades</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row,index)=>(
                            <tr key ={index}>
                                <td>{row.Course}</td>
                                <td>{row.Section}</td>
                                <td>{row.Credits}</td>
                                <td>{row.Meetings}</td>
                                <td>{row.Professor}</td>
                                <td>{row.Grades}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </>
    );
}