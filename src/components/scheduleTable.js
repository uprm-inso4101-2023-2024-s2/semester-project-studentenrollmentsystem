import styles from "../styles/components/scheduleTable.module.scss";
import {useState, useEffect, useRef, useMemo} from "react";
import Papa from "papaparse";
import Rodcreator from "./scheduleTableRod";
import RodcreatorOH from "./scheduleTableRodOH";

export default function Scheduletable({DATA,DATAOH,DISPLAYOH})
{
    //Only works with npm papaparse (npm install papaparse)
    //Will potentially be changed in the future depending on data inputs
    const [values,setValues] = useState([])
    const [valuesOH,setValuesOH] = useState([])
    const dictCHC = new Object();

    useEffect(()=> {
        const fetchData = async()=> {
            const response = await fetch(DATA);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csvData = decoder.decode(result.value);
            const valuesArray=[];
            const parsedData = Papa.parse(csvData, {header:true, skipEmptyLines:true, complete: function (results) {results.data.map((d)=>{valuesArray.push(Object.values(d)+",")})}}).data;
            //setData(parsedData);
            setValues(valuesArray);
        };
        fetchData();
    }, []);

    useEffect(()=> {
        const fetchData = async()=> {
            const response = await fetch(DATAOH);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csvData = decoder.decode(result.value);
            const valuesArray=[];
            const parsedData = Papa.parse(csvData, {header:true, skipEmptyLines:true, complete: function (results) {results.data.map((d)=>{valuesArray.push(Object.values(d)+",")})}}).data;
            //setOHData(parsedData);
            setValuesOH(valuesArray);
        };
        fetchData();
    }, []);

    const classHours = useMemo(()=>{
            var dictCH = new Object();
            for(var i = 0; i<values.length; i++)
            {
                var course = ""; //For displaying
                var runtime = ""; //For getting information
                var professor = "";
                var commacount = 0;
                for(var j = 0; j<values[i].length; j++)
                {
                    if(values[i][j]==",")
                    {
                        commacount++;
                    }
                    else if(commacount==0 || commacount==3 || commacount==4)
                    {
                        if(commacount==0)
                        {
                            //Name of course
                            course = course + values[i][j];
                        }
                        else if(commacount==3)
                        {
                            //Runtime
                            runtime = runtime + values[i][j];
                        }
                        else if(commacount==4)
                        {
                            //Professor
                            professor = professor + values[i][j];
                        }
                    }
                }

                
                
                //If a class has different office hour meetings and days, they should be divided in the csv file with "|"
                var lookAtDays = false;
                var cooldown = false;
                var hours = "";
                var place = runtime.slice(runtime.lastIndexOf(" "),runtime.length);
                for(var x = 0; x<runtime.length; x++)
                {
                    if(lookAtDays && runtime[x]==" ")
                    {
                       //
                    }
                    else if(lookAtDays && runtime[x]=="|")
                    {
                        lookAtDays=false;
                        cooldown = true;
                        hours = "";

                    }
                    else if(!lookAtDays && runtime[x]==" " && cooldown)
                    {
                        cooldown = false;
                    }
                    else if(!lookAtDays && runtime[x]==" " && !cooldown)
                    {
                        lookAtDays = true;
                    }
                    else if(!lookAtDays && runtime[x]!=" ")
                    {
                        hours = hours + runtime[x];
                    }
                    else if(lookAtDays && runtime[x]!=" ")
                    {
                        var day = runtime[x];
                        if(dictCH[day]==undefined)
                        {
                            dictCH[day] = hours;
                            dictCHC[day] = place;
                        }
                        else
                        {
                            for(var max = 1; max<50; max++)
                            {
                                var dayplus = day+max.toString();
                                if(dictCH[dayplus]==undefined)
                                {
                                    dictCH[dayplus] = hours;
                                    dictCHC[dayplus] = place;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        return dictCH;
    })

    const classHoursP = useMemo(()=>{
            var dictCHP = new Object();
            for(var i = 0; i<values.length; i++)
            {
                var course = ""; //For displaying
                var runtime = ""; //For getting information
                var professor = "";
                var commacount = 0;
                for(var j = 0; j<values[i].length; j++)
                {
                    if(values[i][j]==",")
                    {
                        commacount++;
                    }
                    else if(commacount==0 || commacount==3 || commacount==4)
                    {
                        if(commacount==0)
                        {
                            //Name of course
                            course = course + values[i][j];
                        }
                        else if(commacount==3)
                        {
                            //Runtime
                            runtime = runtime + values[i][j];
                        }
                        else if(commacount==4)
                        {
                            //Professor
                            professor = professor + values[i][j];
                        }
                    }
                }

                
                
                //If a professor has different office hour meetings and days, they should be divided in the csv file with "|"
                var lookAtDays = false;
                var cooldown = false;
                var hours = "";
                for(var x = 0; x<runtime.length; x++)
                {
                    if(lookAtDays && runtime[x]==" ")
                    {
                        //Nothing
                    }
                    else if(lookAtDays && runtime[x]=="|")
                    {
                        lookAtDays=false;
                        cooldown = true;
                        hours = "";
                    }
                    else if(!lookAtDays && runtime[x]==" " && cooldown)
                    {
                        cooldown = false;
                    }
                    else if(!lookAtDays && runtime[x]==" " && !cooldown)
                    {
                        lookAtDays = true;
                    }
                    else if(!lookAtDays && runtime[x]!=" ")
                    {
                        hours = hours + runtime[x];
                    }
                    else if(lookAtDays && runtime[x]!=" ")
                    {
                        var day = runtime[x];
                        if(dictCHP[day]==undefined)
                        {
                            dictCHP[day] = course;

                        }
                        else
                        {
                            for(var max = 1; max<50; max++)
                            {
                                var dayplus = day+max.toString();
                                if(dictCHP[dayplus]==undefined)
                                {
                                    dictCHP[dayplus] = course;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        return dictCHP;
    })

    const dictHours = useMemo(()=>{
            var dictOH = new Object();
            var dictOHP = new Object();
            for(var i = 0; i<valuesOH.length; i++)
            {
                var profname = ""; //For displaying
                var runtime = ""; //For getting information
                var office = "";
                var commacount = 0;
                for(var j = 0; j<valuesOH[i].length; j++)
                {
                    if(valuesOH[i][j]==",")
                    {
                        commacount++;
                    }
                    else if(commacount==0 || commacount==1 || commacount==2)
                    {
                        if(commacount==0)
                        {
                            //Name of professor
                            profname = profname + valuesOH[i][j];
                        }
                        else if(commacount==1)
                        {
                            //Runtime of office hours
                            runtime = runtime + valuesOH[i][j];
                        }
                        else if(commacount==2)
                        {
                            //Place of office hours
                            office = office + valuesOH[i][j];
                        }
                    }
                }

                
                
                //If a professor has different office hour meetings and days, they should be divided in the csv file with "|"
                var lookAtDays = false;
                var cooldown = false;
                var hours = "";
                for(var x = 0; x<runtime.length; x++)
                {
                    if(lookAtDays && runtime[x]==" ")
                    {
                        //Nothing
                    }
                    else if(lookAtDays && runtime[x]=="|")
                    {
                        lookAtDays=false;
                        cooldown = true;
                        hours = "";
                    }
                    else if(!lookAtDays && runtime[x]==" " && cooldown)
                    {
                        cooldown = false;
                    }
                    else if(!lookAtDays && runtime[x]==" " && !cooldown)
                    {
                        lookAtDays = true;
                    }
                    else if(!lookAtDays && runtime[x]!=" ")
                    {
                        hours = hours + runtime[x];
                    }
                    else if(lookAtDays && runtime[x]!=" ")
                    {
                        var day = runtime[x];
                        if(dictOH[day]==undefined)
                        {
                            dictOH[day] = hours;
                            dictOHP[day] = profname;
                        }
                        else
                        {
                            for(var max = 1; max<50; max++)
                            {
                                var dayplus = day+max.toString();
                                if(dictOH[dayplus]==undefined)
                                {
                                    dictOH[dayplus] = hours;
                                    dictOHP[dayplus] = profname;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        return dictOH;
    })

    const dictHoursP = useMemo(()=>{
        var dictOH = new Object();
        var dictOHP = new Object();
        for(var i = 0; i<valuesOH.length; i++)
        {
            var profname = ""; //For displaying
            var runtime = ""; //For getting information
            var office = "";
            var commacount = 0;
            for(var j = 0; j<valuesOH[i].length; j++)
            {
                if(valuesOH[i][j]==",")
                {
                    commacount++;
                }
                else if(commacount==0 || commacount==1 || commacount==2)
                {
                    if(commacount==0)
                    {
                        //Name of professor
                        profname = profname + valuesOH[i][j];
                    }
                    else if(commacount==1)
                    {
                        //Runtime of office hours
                        runtime = runtime + valuesOH[i][j];
                    }
                    else if(commacount==2)
                    {
                        //Place of office hours
                        office = office + valuesOH[i][j];
                    }
                }
            }

            
            
            //If a professor has different office hour meetings and days, they should be divided in the csv file with "|"
            var lookAtDays = false;
            var cooldown = false;
            var hours = "";
            for(var x = 0; x<runtime.length; x++)
            {
                if(lookAtDays && runtime[x]==" ")
                {
                    //Nothing
                }
                else if(lookAtDays && runtime[x]=="|")
                {
                    lookAtDays=false;
                    cooldown = true;
                    hours = "";
                }
                else if(!lookAtDays && runtime[x]==" " && cooldown)
                {
                    cooldown = false;
                }
                else if(!lookAtDays && runtime[x]==" " && !cooldown)
                {
                    lookAtDays = true;
                }
                else if(!lookAtDays && runtime[x]!=" ")
                {
                    hours = hours + runtime[x];
                }
                else if(lookAtDays && runtime[x]!=" ")
                {
                    var day = runtime[x];
                    if(dictOH[day]==undefined)
                    {
                        dictOH[day] = hours;
                        dictOHP[day] = profname;
                    }
                    else
                    {
                        for(var max = 1; max<runtime.length; max++)
                        {
                            var dayplus = day+max.toString();
                            if(dictOH[dayplus]==undefined)
                            {
                                dictOH[dayplus] = hours;
                                dictOHP[dayplus] = profname;
                                break;
                            }
                        }
                    }
                }
            }
        }
    return dictOHP;
    })

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

    //Generates student's classes in table schedule calendar
    function classGen(TIME,DAY){

        if(classHours[DAY]!=0 && classHours[DAY]!=undefined && timeX[TIME]==(classHours[DAY]).toString().slice(0,(classHours[DAY]).toString().indexOf("-")))
        {
            var hours = classHours[DAY];
            var course = classHoursP[DAY];
            var place = dictCHC[DAY];
            var startTime = (hours).toString().slice(0,(hours).toString().indexOf("-"));
            var endTime = (hours).toString().slice((hours).toString().indexOf("-")+1,(hours).toString().length)
            classHours[DAY]=0;
            classHoursP[DAY]=0;
            dictCHC[DAY]=0;
            return(<>{Rodcreator([course, place,createHeighter(startTime,endTime)*(height/940)])}</>);
        }
        else
        {
            for(var x = 1; x<50; x++)
            {
                var plus = DAY.toString()+x.toString();
                if(classHours[plus]!=0 && classHours[plus]!=undefined && timeX[TIME]==(classHours[plus]).toString().slice(0,(classHours[plus]).toString().indexOf("-")))
                {
                    var hours = classHours[plus];
                    var course = classHoursP[plus];
                    var place = dictCHC[plus];
                    var startTime = (hours).toString().slice(0,(hours).toString().indexOf("-"));
                    var endTime = (hours).toString().slice((hours).toString().indexOf("-")+1,(hours).toString().length)
                    classHours[plus]=0;
                    classHoursP[plus]=0;
                    dictCHC[plus]=0;
                    return(<>{Rodcreator([course, place,createHeighter(startTime,endTime)*(height/940)])}</>);
                }
            }
        }
        return(<></>)
    }

    
    function OHGen(TIME,DAY)
    {
        if(!DISPLAYOH)
        {
            return(<></>)
        }

        if(dictHours[DAY]!=0 && dictHours[DAY]!=undefined && timeX[TIME]==(dictHours[DAY]).toString().slice(0,(dictHours[DAY]).toString().indexOf("-")))
        {
            var officeHours = dictHours[DAY];
            var professor = dictHoursP[DAY];
            var startTime = (officeHours).toString().slice(0,(officeHours).toString().indexOf("-"));
            var endTime = (officeHours).toString().slice((officeHours).toString().indexOf("-")+1,(officeHours).toString().length)
            dictHours[DAY]=0;
            dictHoursP[DAY]=0;
            return(<>{RodcreatorOH([professor, officeHours,createHeighter(startTime,endTime)*(height/940)])}</>);
        }
        else
        {
            for(var x = 1; x<50; x++)
            {
                var plus = DAY.toString()+x.toString();
                if(dictHours[plus]!=0 && dictHours[plus]!=undefined && timeX[TIME]==(dictHours[plus]).toString().slice(0,(dictHours[plus]).toString().indexOf("-")))
                {
                    //document.write(plus);
                    var officeHours = dictHours[plus];
                    var professor = dictHoursP[plus];
                    var startTime = (officeHours).toString().slice(0,(officeHours).toString().indexOf("-"));
                    var endTime = (officeHours).toString().slice((officeHours).toString().indexOf("-")+1,(officeHours).toString().length)
                    dictHours[plus]=0;
                    dictHoursP[plus]=0;
                    return(<>{RodcreatorOH([professor, officeHours,createHeighter(startTime,endTime)*(height/940)])}</>);
                }
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
                            <td className={styles.rows} id="L">{classGen(time,"L")}{OHGen(time,"L")}</td>
                            <td className={styles.rows} id="M">{classGen(time,"M")}{OHGen(time,"M")}</td>
                            <td className={styles.rows} id="W">{classGen(time,"W")}{OHGen(time,"W")}</td>
                            <td className={styles.rows} id="J">{classGen(time,"J")}{OHGen(time,"J")}</td>
                            <td className={styles.rows} id="V">{classGen(time,"V")}{OHGen(time,"V")}</td>
                            <td className={styles.rows} id="X">{classGen(time,"X")}{OHGen(time,"X")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}       