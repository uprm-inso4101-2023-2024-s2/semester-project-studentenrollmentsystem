import React from "react";
import styles from "../styles/components/scheduleTableRodOH.module.scss";

function RodOH([CLASS,TIME,NUMBER])
{
    return(
        <div className={styles.Rod} style={{height : NUMBER, fontSize: window.innerWidth/250, width: window.innerWidth/30}}>
            {CLASS}<br></br>
            {TIME}
        </div>
    );
}
export default function RodcreatorOH([CLASS,TIME,NUMBER])
{
    return(<>{RodOH([CLASS,TIME,NUMBER])}</>)
}