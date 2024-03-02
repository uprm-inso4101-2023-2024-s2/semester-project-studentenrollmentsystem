import React from "react";
import styles from "../styles/components/activeExams.module.scss";
import {useState, useEffect} from "react";
import Data from "../dummydata/spring2024exams.csv";
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
                        <th>Curso</th>
                        <th>Examen1</th>
                        <th>Examen2</th>
                        <th>Examen3</th>
                        <th>Examen4</th>
                        <th>Examen5</th>
                        <th>ExamenFinal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row,index)=>(
                            <tr key ={index}>
                                <td>{row.Curso}</td>
                                <td>{row.Examen1}</td>
                                <td>{row.Examen2}</td>
                                <td>{row.Examen3}</td>
                                <td>{row.Examen4}</td>
                                <td>{row.Examen5}</td>
                                <td>{row.ExamenFinal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </>
    );
}