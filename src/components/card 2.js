import React from 'react';
import Card from '../components/card';

function CourseCard({ course }) {
  return (
    <Card
      imageUrl={course.image}
      title={course.title}
      description={course.description}
      // Remove the button or customize it based on your requirements
    />
  );
}

export default CourseCard;