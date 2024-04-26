import styles from "../styles/components/courseTable.module.scss";
export default function ProgramTables({DATA})
{ 
    var data = [];
    for(var i = 0; DATA["course" + i.toString()]!=undefined; i++)
    {
        data[i] = DATA["course" + i.toString()];
    }

    return(
        <>
            {data.length ? (
                <table className={styles.Coursetable}>
                    <thead>
                        <tr>
                        <th>Course</th>
                        <th>Title</th>
                        <th>Pre-requisites</th>
                        <th>Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row,index)=>(
                            <tr key ={index}>
                                <td>{row.Course}</td>
                                <td>{row.Title}</td>
                                <td>{row.Prerequisites}</td>
                                <td>{row.Credits}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </>
    );
};