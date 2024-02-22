import CourseCard from '../components/coursecard.js';
import styles from '../styles/components/coursegrid.module.scss';

function CourseGrid({courses}) {
    return (
        <div className={styles.courseGrid}>
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    )
}

export default CourseGrid;