import React from "react";
import styles from "../styles/components/courseTable2.module.scss";

export default function Coursetable2()
{
    return(
        <table className={styles.Coursetable}>
        <tr>
            <th>Curso</th>
            <th>Seccion</th>
            <th>Creditos</th>
            <th>Horarios</th>
            <th>Professor</th>
            <th>Grades</th>
        </tr>
        <tr>
            <td>MATE3031</td>
            <td>040</td>
            <td>4</td>
            <td>
                3:00pm-2:50pm LW F406
                <br/>5:00pm-1:50pm V F406
            </td>
            <td>
                Uroyoan Walker
            </td>
            <td>[Redacted]</td>
        </tr>
        <tr>
            <td>QUIM3131</td>
            <td>070</td>
            <td>3</td>
            <td>1:00pm-2:50pm MJ Q201</td>
            <td>Martha Lopez</td>
            <td>[Redacted]</td>
        </tr>
        <tr>
            <td>A</td>
            <td>B</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>[Redacted]</td>
        </tr>
        <tr>
            <td>A</td>
            <td>B</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>[Redacted]</td>
        </tr>
        <tr>
            <td>A</td>
            <td>B</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>[Redacted]</td>
        </tr>
        </table>
    );
}