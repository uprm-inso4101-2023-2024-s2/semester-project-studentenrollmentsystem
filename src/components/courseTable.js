import React from "react";
import styles from "../styles/components/courseTable.module.scss";
import {useState, useEffect} from "react";
import Data from "../dummydata/spring2024.csv";
import Papa from "papaparse"

export default function Coursetable()
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
                <table className={styles.Coursetable}>
                    <thead>
                        <tr>
                        <th>Curso</th>
                        <th>Seccion</th>
                        <th>Creditos</th>
                        <th>Reuniones</th>
                        <th>Profesor</th>
                        <th>Grades</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row,index)=>(
                            <tr key ={index}>
                                <td>{row.Curso}</td>
                                <td>{row.Seccion}</td>
                                <td>{row.Creditos}</td>
                                <td>{row.Reuniones}</td>
                                <td>{row.Profesor}</td>
                                <td>{row.Grades}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </>
    );
}