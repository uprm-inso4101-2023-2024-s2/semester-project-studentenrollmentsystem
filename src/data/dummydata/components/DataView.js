import React from "react";
import styles from "../styles/dataview.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import Data from "../dumbdata.csv";
import Papa from "papaparse"

export default function DataView() {
  const [data,setData] = React.useState([])
    React.useEffect(()=> {
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
  
  return (
    <div className={styles.DataView}>
      <InfiniteScroll className={styles.viewingBox} dataLength={data.length}>
        {data.map((item)=>{
          return <div>{item.Curso}</div>
        })}
      </InfiniteScroll>
    </div>
  );
}