import React from 'react';
import styles from '../styles/pages/professorreview.module.scss';
import ProfList from '../components/proflist.js'; // Adjust the import path as needed


function ProfessorReview() {
    const professorreview = [
        { id: 1, image: '/profimages/pedro.png', title: 'DR. PEDRO RIVERA VEGA', description: 'Info: Director / Professor / Catedrático', office: 'Office: S-613',
        number: 'Phone Number: (787)832-4040 Ext. 5864', email: 'Email:  p.rivera@upr.edu'},
        { id: 2, image: '/profimages/bienvenido.jpg', title: 'DR. BIENVENIDO VELÉZ', 
        description: 'Info: Catedrático / Professor / Acting Dean of Engineering', office: "Office: S-604", 
        number: "Phone Number: (787)832-4040 Ext. 3822, 3504, 3508", email: "Email: bienvenido.velez@upr.edu"},
        { id: 3, image: '/profimages/arzuaga.jpg', title: 'DR. EMMANUEL ARZUAGA', description: 'Info: Associate Director / Professor', 
        office: 'Office: S-600', number: 'Phone Number: (787)832-4040 Ext. 3532', email: 'Email: emmanuel.arzuaga@upr.edu'},
        { id: 4, image: '/profimages/marko.jpeg', title: 'DR. MARKO SCHUTZ', 
        description: 'Info: Professor/ Catedrático', office: "Office: S-326", number: "Phone Number: N/A", 
        email: "Email: marko.schutz@upr.edu"},
        { id: 5, image: '/profimages/wilson.jpeg', title: 'DR. WILSON RIVERA', 
        description: 'Info: Assistant Professor', office: "Office: S-411", 
        number: "Phone Number: (787)832-4040 Ext. 3097", email: "Email: wilson.riveragallego@upr.edu"},
        { id: 6, image: '/profimages/patarroyo.jpg', title: 'DR. JUAN F. PATARROYO', 
        description: 'Info: Professor/ Catedrático', office: "Office: OF-330", 
        number: "Phone Number: (787)832-4040 Ext. 5952", email: "Email: juan.patarroyo@upr.edu"},
        { id: 7, image: '/profimages/heidy.jpg', title: 'DR. HEIDY SIERRA', description: 'Info: Associate Professor', office: 'Office: S-402', 
        number: 'Phone Number: (787)832-4040 Ext. 3098', email: 'Email: heidy.sierra1@upr.edu'},
        { id: 8, image: '/profimages/martinez.jpg', title: 'DR. MANUEL RODRÍGUEZ MARTÍNEZ', description: 'Info: Professor / Catedrático', 
        office: 'Office: S-602', number: 'Phone Number: (787)832-4040 Ext. 3630', email:'Email: manuel.rodriguez7@upr.edu'},
        // Add more professors as needed
    ];

    const professoradem = [
        { id: 1, image: '/profimages/seijo.png', title: 'DR. ROBERTO L. SEIJO VIDAL', 
        description: 'Info: Dean / Professor' , office: 'Office: AE-321',
        number: 'Phone Number: (787)832-4040 Ext. 2095', email: 'Email:  roberto.seijo@upr.edu'},
        { id: 2, image: '/profimages/david.png', title: 'DAVID F. MUÑOZ GONZÁLEZ', 
        description: 'Info: Professor', office: "Office: AE-320", 
        number: "Phone Number: (787)832-4040 Ext. 3487", email: "Email: david.munoz@upr.edu"},
        { id: 3, image: '/profimages/monseratte.png', title: 'DRA. MONSERRATE CARDOZA BONET', description: 'Info: Professor', 
        office: 'Office: AE-426', number: 'Phone Number: (787)832-4040 Ext. 5370', email: 'Email: monserrate.cardoza@upr.edu'},
        { id: 4, image: '/profimages/jose.png', title: 'DR. JOSÉ G. MARTÍNEZ MARTÍNEZ', 
        description: 'Info: Professor', office: "Office: AE-133", number: "Phone Number: (787)832-4040 Ext. 5333", 
        email: "Email: jose.martinez39@upr.edu"},
        { id: 5, image: '/profimages/marco.png', title: 'DR. MARCOS ORTIZ RODRÍGUEZ', 
        description: 'Info: Professor', office: "Office: AE-427", 
        number: "Phone Number: (787)832-4040 Ext. 5371", email: "Email: marcos.ortiz10@upr.edu"},
        { id: 6, image: '/profimages/mariluz.png', title: 'DRA. MARI LUZ ZAPATA RAMOS', 
        description: 'Info: Professor', office: "Office: AE-313", 
        number: "Phone Number: (787)832-4040 Ext. 2242", email: "Email: maril.zapata@upr.edu"},
        { id: 7, image: '/profimages/edgar.png', title: 'DR. EDGAR SOTO RODRÍGUEZ', description: 'Info: Professor', office: 'Office: AE-322', 
        number: 'Phone Number: (787)832-4040 Ext. 5361', email: 'Email: edgar.soto@upr.edu'},
        { id: 8, image: '/profimages/karen.png', title: 'KAREN M. COTTO QUIJANO', description: 'Info: Professor', 
        office: 'Office: AE-325', number: 'Phone Number: (787)832-4040 Ext. 2035', email:'Email: karen.cotto@upr.edu'},
        // Add more professors as needed
    ];

    const professormath = [
        { id: 1, image: '/mathprof/luis.png', title: 'DR. LUIS F. CÁCERES', 
        description: 'Info: Professor' , office: 'Office: N/A',
        number: 'Phone Number: (787)832-4040 Ext. 5890', email: 'Email:  luis.caceres1@upr.edu'},
        { id: 2, image: '/mathprof/romero.png', title: 'DR. JUAN ROMERO', 
        description: 'Info: Professor', office: "Office: OF-314", 
        number: "Phone Number: (787)832-4040 Ext. 6310", email: "Email: juan.romero4@upr.edu"},
        { id: 3, image: '/mathprof/robert.png', title: 'DR. ROBERT ACAR', description: 'Info: Professor', 
        office: 'Office: N/A', number: 'Phone Number: N/A', email: 'Email: robert.acar@upr.edu'},
        { id: 4, image: '/mathprof/wilfredo.png', title: 'DR. WILFREDO QUIÑONES', 
        description: 'Info: Professor', office: "Office: F-327", number: "Phone Number: (787)832-4040 Ext. 3848", 
        email: "Email: wilfredo.quinones2@upr.edu"},
        // Add more professors as needed
    ];

    const professorscience = [
        { id: 1, image: '/science/miguel.png', title: 'DR. MIGUEL CASTRO', 
        description: 'Info: Professor' , office: 'Office:Q-131',
        number: 'Phone Number: (787)832-4040 Ext. 3134', email: 'Email:  miguel.castro2@upr.edu'},
        { id: 2, image: '/science/astrid.png', title: 'DR. ASTRID J. CRUZ POL', 
        description: 'Info: Chair Person / Professor', office: "Office: Q-274D", 
        number: "Phone Number: (787)832-4040 Ext. 2447", email: "Email: astrid.cruz2@upr.edu"},
        { id: 3, image: '/science/hector.png', title: 'DR. HÉCTOR MÉNDEZ', description: 'Info: Professor / Catedrático', 
        office: 'Office: F-469', number: 'Phone Number: (787)832-4040 Ext. 3799', email: 'Email: hector.mendez4@upr.edu'},
        { id: 4, image: '/science/samuel.png', title: 'DR. SAMUEL A. SANTANA COLÓN', 
        description: 'Info: Professor / Catedrático', office: "Office: F-211, F-473", number: "Phone Number: (787)832-4040 Ext. 3844, 2018", 
        email: "Email: samuel.santana1@upr.edu"},
        // Add more professors as needed
    ];

    return (
        <body>        
            <div className={styles.professorReview}>
            <div className={styles.header3}>
                <h2>CIIC/INSO 💻 </h2>
            </div>
                <ProfList profes={professorreview} />
            </div> 

            <div className={styles.professorReview}>
            <div className={styles.header3}>
                <h2>ADEM 📊</h2>
            </div>
                <ProfList profes={professoradem} />
            </div>

            <div className={styles.professorReview}>
            <div className={styles.header3}>
                <h2>MATH 🔢 </h2>
            </div>
                <ProfList profes={professormath} />
            </div> 

            <div className={styles.professorReview}>
            <div className={styles.header3}>
                <h2>SCIENCE 🔬 </h2>
            </div>
                <ProfList profes={professorscience} />
            </div> 


        </body>
);


}

export default ProfessorReview;
