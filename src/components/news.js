import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import portico1 from "../img/Portico.jpg";
import portico2 from "../img/terminal.png";
import styles from "../styles/components/news.module.scss";

const News = () => {
    const slideImages = [
        portico1,
        portico2,
    ];

    const properties = {
        duration: 3000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true
    };

    const newsList = ["Putty will no longer be used for enrollment", "The enrollment process will begin soon."]
    const headList = ["Putty's Replacement", "Enrollment"]

    return (
        <div className={styles["vertical-rectangle"]} style={{ position: "relative" }}>
            <Slide {...properties}>
                {slideImages.map((image, index) => (
                    <div key={index} className={styles.slide}>
                        <img src={image} alt={`Slide ${index + 1}`} className={styles.image} />
                        <div className={styles.overlay}></div>
                        <div className={styles.text}>
                            <h1>{headList[index]}</h1>
                            {newsList[index]}
                        </div>
                    </div>
                ))}
            </Slide>
            
        </div>
        
    );
};

export default News;
