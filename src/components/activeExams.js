import React from "react";
import styles from "../styles/components/activeExams.module.scss";
import {useState, useEffect} from "react";
import Data from "../data/dummy_data/spring2024exams.csv";
import Papa from "papaparse"

export default function Examtable()
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