import React, { useState } from "react";
import styles from "../styles/components/textinput.module.scss";

export default function TextInput(){
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setMessage(event.target.value);
      };

    return(
        <div className={styles.textInput}>
        <input
          type="text"
          id="textInput"
          value={message}
          onChange={handleChange}
        />
      </div>
    );
}