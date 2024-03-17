import React from "react";
import styles from "../styles/dataview.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import Data from "../dumbdata.csv";
import Papa from "papaparse";
import SmallCard from "../../../components/smallcard";

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
      <div className={styles.header}>
        <div className={styles.title}>
          <h2 className={styles.title}>Dummy Data Visualizer</h2>  
        </div>
        <div className={styles.description}>
          The following data is live throughout all components in the page.
        </div>
      </div>
      <div className={styles.toolBox}>
        <InfiniteScroll className={styles.viewingBox} dataLength={data.length}>
          {data.map((item, index)=>{
            return <SmallCard data={item} id={index + 1}/>
          })}
        </InfiniteScroll>  
      </div>
    </div>
  );
}