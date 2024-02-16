import React from "react";
import styles from "../styles/components/courseTable.module.scss";

export default function Coursetable()
{
    return(
        <table className={styles.Coursetable}>
        <tr>
            <th>Curso</th>
            <th>Seccion</th>
            <th>Reuniones</th>
            <th>Profesor</th>
            <th>Info. Adicional</th>
        </tr>
        <tr>
            <td>MATE4145</td>
            <td>070</td>
            <td>
                1:00pm-2:50pm LW AE406
                <br/>1:00pm-1:50pm V AE406
            </td>
            <td>
                Angel Cruz
            </td>
            <td>[Redacted]</td>
        </tr>
        <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>F</td>
        </tr>
        <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>F</td>
        </tr>
        <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>F</td>
        </tr>
        <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>F</td>
        </tr>
        </table>
    );
}