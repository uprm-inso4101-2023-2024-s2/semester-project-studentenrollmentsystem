import React from "react";
import styles from "../styles/components/activeExams.module.scss";
import {useState, useEffect} from "react";

export default function Examtable({DATA})
{
    var data = [];
    for(var i = 0; DATA["examGrades" + i.toString()]!=undefined; i++)
    {
        data[i] = DATA["examGrades" + i.toString()];
    }

    return(
        <>
            {data.length ? (
                <table className={styles.Examtable}>
                    <thead>
                        <tr>
                        <th>Course</th>
                        <th>Exam 1</th>
                        <th>Exam 2</th>
                        <th>Exam 3</th>
                        <th>Exam 4</th>
                        <th>Exam 5</th>
                        <th>Final Exam</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row,index)=>(
                            <tr key ={index}>
                                <td>{row.Course}</td>
                                <td>{row.Exam_1}</td>
                                <td>{row.Exam_2}</td>
                                <td>{row.Exam_3}</td>
                                <td>{row.Exam_4}</td>
                                <td>{row.Exam_5}</td>
                                <td>{row.Final_Exam}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </>
    );
}