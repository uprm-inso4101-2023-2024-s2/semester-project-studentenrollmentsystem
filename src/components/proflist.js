import React from 'react';
import Grid from './grid'; // Import the generic Grid component
import Profcard from './profcard.js';

const ProfList = ({ profes }) => {
    return (
        <Grid>
            {profes.map((prof) => (
               <Profcard
               key={prof.id}
               imageUrl={prof.image}
               profName={prof.title}
               profOffice={prof.office}
               profDescrip={prof.description} // Extracting instructor assuming format "Instructor, Credits"
               profPhone={prof.number}
               profEmail={prof.email}
                />
            ))}
        </Grid>
    );
};

export default ProfList;
