import styles from "../styles/components/scheduleTable.module.scss";
import {useState, useEffect, useRef} from "react";
import Papa from "papaparse";
import Rodcreator from "./scheduleTableRod";

export default function Scheduletable({DATA})
{
    //Only works with npm papaparse (npm install papaparse)
    //Will potentially be changed in the future depending on data inputs
    const [data,setData] = useState([])
    const [values,setValues] = useState([])
    useEffect(()=> {
        const fetchData = async()=> {
            const response = await fetch(DATA);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csvData = decoder.decode(result.value);
            const valuesArray=[];
            const parsedData = Papa.parse(csvData, {header:true, skipEmptyLines:true, complete: function (results) {results.data.map((d)=>{valuesArray.push(Object.values(d)+",")})}}).data;
            setData(parsedData);
            setValues(valuesArray);
        };
        fetchData();
    }, []);

    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const { offsetHeight } = ref.current;
        const { offsetWidth } = ref.current;
        setHeight(offsetHeight);
        setWidth(offsetWidth);
    }, []);


    const range = (keyCount) => [...Array(keyCount).keys()];
    const timeX = ["6:30am","7:00am","7:30am","8:00am","8:30am","9:00am","9:30am","10:00am","10:30am","11:00am","11:30am","12:00pm","12:30pm","1:00pm","1:30pm","2:00pm","2:30pm","3:00pm","3:30pm","4:00pm","4:30pm","5:00pm","5:30pm","6:00pm","6:30pm","7:00pm","7:30pm","8:00pm","8:30pm","9:00pm","9:30pm"];

    function timer(TIME)
    {
        if(TIME%2===0)
        {
            return(<>{timeX[TIME]}</>)
        }
        else{
            return(<>-----</>)
        }
    }

    function classGen(TIME,DAY){
        for(var i = 0; i<values.length; i++)
        {
            var name = ""; //For displaying
            var runtime = ""; //For getting information
            var place = "";
            var commacount = 0;
            var spacecount = 0;
            var addedDash = false;
            for(var j = 0; j<values[i].length; j++)
            {
                if(values[i][j]==",")
                {
                    commacount++;
                }
                else if(commacount==0 || commacount==1 || commacount==3)
                {
                    if(commacount==0)
                    {
                        //Name of course
                        name = name + values[i][j];
                    }
                    else if(commacount==1)
                    {
                        //Section of course
                        if(!addedDash)
                        {
                            name = name + "-";
                            addedDash = true;
                        }
                        name = name + values[i][j];
                    }
                    else if(commacount==3)
                    {
                        //Runtime of course
                        runtime = runtime + values[i][j];
                        if(values[i][j]==" ")
                        {
                            spacecount++;
                        }
                        if(spacecount==2)
                        {
                            place = place + values[i][j];
                        }
                    }
                }
            }

            var startTime = timeX.findIndex(x=>x==runtime.slice(0,runtime.indexOf("-")));
            var startTime2 = runtime.slice(0,runtime.indexOf("-"));
            var endTime = runtime.slice(runtime.indexOf("-")+1,runtime.indexOf(" "));
            if(runtime.includes("|"))
            {
                //If a class has different schedules on different days, it is assumed it will be split so on the csv file with a "|"
            }

            if(TIME==startTime && runtime.includes(DAY))
            {
                return(<>{Rodcreator([name,place,createHeighter(startTime2,endTime)*(height/940)])}</>)
            }
        }
        return(<></>)
    }

    //Converts US time reading to military time and calculates minutes between classes
    function createHeighter(START,END)
    {
        if(START.length<7)
        {
            while(START.length!=7)
            {
                START = "0" + START;
            }
        }
        if(END.length<7)
        {
            while(END.length!=7)
            {
                END = "0" + END;
            }
        }
        //Base Case: 01:00pm-02:50pm -> 1450-1300 = 1 hour 50 mins = 110mins
        //Military Time Conversion
        if(START.slice(5,7)=="am")
        {
            START = START.slice(0,2)+START.slice(3,5);
        }
        else if(START.slice(5,7)=="pm")
        {
            if(START.slice(0,2)!="12")
            {
                var beginning = parseInt(START.slice(0,2))+12;
                START = beginning + START.slice(3,5);
            }
            else if (START.slice(0,2)=="12")
            {
                START = START.slice(0,2)+START.slice(3,5);
            }
        }

        if(END.slice(5,7)=="am")
        {
            END = END.slice(0,2)+END.slice(3,5);
        }
        else if(END.slice(5,7)=="pm")
        {
            if(END.slice(0,2)!="12")
            {
                var beginning = parseInt(END.slice(0,2))+12;
                END = beginning + END.slice(3,5);
            }
            else if (END.slice(0,2)=="12")
            {
                END = END.slice(0,2)+END.slice(3,5);
            }
        }

        var result = 0;
        if(parseInt(START.slice(2,4))>parseInt(END.slice(2,4)))
        {
            var difference = parseInt(END.slice(0,2))-parseInt(START.slice(0,2));
            result = (parseInt(END)-parseInt(START))-(difference*40);
        }
        else
        {
            var difference = parseInt(END.slice(0,2))-parseInt(START.slice(0,2));
            result = parseInt(END)-parseInt(START)-(difference*40);
        }
        return(result)
    }

    return(
        <div className={styles.schedule}>
            <table className={styles.Scheduletable} ref={ref}>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    {range(31).map((time)=>(
                        <tr className={styles.timerow} id={time}>{timer(time)}
                            <td className={styles.rows} id="L">{classGen(time,"L")}</td>
                            <td className={styles.rows} id="M">{classGen(time,"M")}</td>
                            <td className={styles.rows} id="W">{classGen(time,"W")}</td>
                            <td className={styles.rows} id="J">{classGen(time,"J")}</td>
                            <td className={styles.rows} id="V">{classGen(time,"V")}</td>
                            <td className={styles.rows} id="S">{classGen(time,"X")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}       