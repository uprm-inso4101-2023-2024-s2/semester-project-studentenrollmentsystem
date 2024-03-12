import React from "react";
import styles from "../styles/components/dataview.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";

export default function DataView() {
  const [data, setData] = React.useState(Array.from({length:25}));
  return (
    <div>
      <InfiniteScroll className={styles.DataView} dataLength={data.length}>
        {data.map((item,index)=>{
          return <div>This is Test #{index + 1}</div>
        })}
      </InfiniteScroll>
    </div>
  );
}