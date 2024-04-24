import React, { useState, useEffect, useReducer, useMemo } from "react";
import { fbapp } from "../firebase";
import {getFirestore,collection,getDocs,doc,getDoc} from 'firebase/firestore'
import ProgramTables from "../components/programTables";

export default function StudentProgram({ID})
{
    //Collect data of tables in the appropiate program database.
    //Create set amount of tables displaying this same information.
    //Each student has a "program" variable depending on what they are studying. Use this to determine where to pull data from.
    //Programs are in "programs/{programName}/[y1s1,y1s2...]}"
    const db = getFirestore();

    var program = ""
    const [programData, setProgramData] = useState(new Object());
    useEffect(()=>{
        const studentRef = doc(db,"students",ID);
        //Depending on student id, look at their "program" tag to know which program tables to render

        getDoc(studentRef)
        .then((snapshot)=>{
            var dumProg = snapshot.data()["program"];
            program = dumProg;
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

    return(
        <>
            {contains.map((sem)=>(<ProgramTables DATA={programData[sem]}/>))}
        </>
    );
}