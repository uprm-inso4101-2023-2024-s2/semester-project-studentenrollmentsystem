import React, { useState, useEffect, useReducer, useMemo } from "react";
import { fbapp } from "../firebase";
import {getFirestore,collection,getDocs,doc,getDoc} from 'firebase/firestore'
import ProgramTables from "../components/programTables";
import styles from "../styles/pages/studentProgram.module.scss"

export default function StudentProgram({ID})
{
    //Collect data of tables in the appropiate program database.
    //Create set amount of tables displaying this same information.
    //Each student has a "program" variable depending on what they are studying. Use this to determine where to pull data from.
    //Programs are in "programs/{programName}/[y1s1,y1s2...]}"
    const db = getFirestore();

    var program = ""
    var [name, setName] = useState("");
    const [programData, setProgramData] = useState(new Object());
    useEffect(()=>{
        const studentRef = doc(db,"students",ID);
        //Depending on student id, look at their "program" tag to know which program tables to render

        getDoc(studentRef)
        .then((snapshot)=>{
            var dumProg = snapshot.data()["program"];
            program = dumProg;
            setName(dumProg);
        });
    },[])

    useEffect(()=>{
        const programRef = collection(db,"programs");
        getDocs(programRef)
        .then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{if(doc.id===program){setProgramData(doc.data())}})
        })
    },[])

    var contains = Object.keys(programData);
    contains.sort();
    return(
        <>
            <h className={styles.tableview}>{"Program: " + name}</h>
            {contains.map((sem)=>(
                <div className={styles.tableview}>
                    <div>{"Year" + " " + sem[1] + ": Semester" + " " + sem[3]}</div>
                    <ProgramTables DATA={programData[sem]}/>
                </div>
            ))}
        </>
    );
}