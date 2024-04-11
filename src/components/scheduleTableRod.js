import React from "react";
import styles from "../styles/components/scheduleTableRod.module.scss";

function Rod([CLASS,TIME,NUMBER])
{
    return(
        <div className={styles.Rod} style={{height : NUMBER, fontSize: window.innerWidth/250, width: window.innerWidth/30}}>
            {CLASS}<br></br>
            {TIME}
        </div>
    );
}
export default function Rodcreator([CLASS,TIME,NUMBER])
{
    return(<>{Rod([CLASS,TIME,NUMBER])}</>)
}