import React from 'react';
import styles from '../styles/pages/professorreview.module.scss';
import ProfList from '../components/proflist.js'; // Adjust the import path as needed


function ProfessorReview() {
    const professorreview = [
        { id: 1, image: 'pedro.png', title: 'DR. PEDRO RIVERA VEGA', description: 'Info: Director / Professor / Catedrático', office: 'Office: S-613',
        number: 'Phone Number: (787)832-4040 Ext. 5864', email: 'Email:  p.rivera@upr.edu'},
        { id: 2, image: 'Bienvenido.jpg', title: 'DR. BIENVENIDO VELÉZ', 
        description: 'Info: Catedrático / Professor / Acting Dean of Engineering', office: "Office: S-604", 
        number: "Phone Number: (787)832-4040 Ext. 3822, 3504, 3508", email: "Email: bienvenido.velez@upr.edu"},
        { id: 3, image: 'arzuaga.jpg', title: 'DR. EMMANUEL ARZUAGA', description: 'Info: Associate Director / Professor', 
        office: 'Office: S-600', number: 'Phone Number: (787)832-4040 Ext. 3532', email: 'Email: emmanuel.arzuaga@upr.edu'},
        { id: 4, image: 'marko.jpeg', title: 'MARKO SCHUTZ', 
        description: 'Info: Professor/ Catedrático', office: "Office: S-326", number: "Phone Number: N/A", 
        email: "Email: marko.schutz@upr.edu"},
        { id: 5, image: 'wilson.jpeg', title: 'DR .WILSON RIVERA', 
        description: 'Info: Assistant Professor', office: "Office: S-411", 
        number: "Phone Number: (787)832-4040 Ext. 3097", email: "Email: wilson.riveragallego@upr.edu"},
        { id: 6, image: 'patarroyo.jpg', title: 'DR.JUAN F. PATARROYO', 
        description: 'Info: Professor/ Catedrático', office: "Office: OF-330", 
        number: "Phone Number: (787)832-4040 Ext. 5952", email: "Email: juan.patarroyo@upr.edu"},
        { id: 7, image: 'heidy.jpg', title: 'DR. HEIDY SIERRA', description: 'Info: Associate Professor', office: 'Office: S-402', 
        number: 'Phone Number: (787)832-4040 Ext. 3098', email: 'Email: heidy.sierra1@upr.edu'},
        { id: 8, image: 'martinez.jpg', title: 'DR. MANUEL RODRÍGUEZ MARTÍNEZ', description: 'Info: Professor / Catedrático', 
        office: 'Office: S-602', number: 'Phone Number: (787)832-4040 Ext. 3630', email:'Email: manuel.rodriguez7@upr.edu'},
        // Add more professors as needed
    ];

    return (
        <body>        
            <div className={styles.professorReview}>
            <div className={styles.header2}>
                <h2>PROFESSORS INFO </h2>
            </div>
                <ProfList profes={professorreview} />
            </div>
                
        </body>
);
}

export default ProfessorReview;
