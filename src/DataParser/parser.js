const fs = require('fs');
const pdf = require('pdf-parse');

async function parsePDF(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer, { encoding: 'latin1' });
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return null;
  }
}


function processCourseData(rawCoursesData, courseCodes) {
  // Remove unwanted text from `rawCoursesData`.
  rawCoursesData = rawCoursesData.replace(/\n/g, '').replace(/\s{2,}/g, ' ');

  // Processed Courses.
  const courses = [];
  const codifications = [];

  let match;
  const pattern =new RegExp(
    `(${courseCodes.join('|')})\\s+(\\d+)\\.\\s+(.*?)\\.`, 'gs'
  );
  while ((match = pattern.exec(rawCoursesData)) !== null) {
    const codification = `${match[1]}-${match[2]}`;
    const name = `"${match[3].trim()}"`;
    if (!codifications.includes(codification) && name === name.toUpperCase()) {
      courses.push([codification, name]);
      codifications.push(codification);
    }
  }

  // Write to CSV file.
  const csvHeader = 'Code,Name,Credits,Prerequisites,Description\n';
  const csvData = courses.map(course => course.join(',')).join('\n');
  fs.writeFileSync('course_data.csv', csvHeader + csvData);
}

// Read course codes from `course_codes.txt` file.
const courseCodes = fs.readFileSync('course_codes.txt', 'utf8')
  .replace(/\s+/g, '').split(',');

// Parse PDF file. This file must contain the pages of the Undergraduate
// Catalog corresponding to the "Courses of Instructions" section.
parsePDF('courses_of_instruction.pdf').then(text => {  
    processCourseData(text, courseCodes);
  }).catch(error => {
    console.error("Error parsing PDF: ", error);
  });
