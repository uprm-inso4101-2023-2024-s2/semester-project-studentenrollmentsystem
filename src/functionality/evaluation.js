class GradesEvaluation {
    constructor(grades = [], credits = []) {
        this.gpa = '0.00'; 
        this.grades = grades;
        this.credits = credits;
        this.totalCredits = 153; 
        this.creditsTaken = 0;
        this.creditsDue = this.totalCredits;
        this.calculateGPA(); 
        this.calculateCredits(); 
    }

    convertGradeToPoint(grade) {
        const gradeMap = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
        return gradeMap.hasOwnProperty(grade) ? gradeMap[grade] : NaN;
    }

    calculateGPA() {
        const validGrades = this.grades.map(grade => this.convertGradeToPoint(grade)).filter(point => !isNaN(point));
        if (validGrades.length === 0) {
            console.error("No valid grades found.");
            this.gpa = 'NaN';
            return;
        }
        const totalPoints = validGrades.reduce((acc, grade) => acc + grade, 0);
        const gpa = totalPoints / validGrades.length;
        this.gpa = gpa.toFixed(2); 
    }

    calculateCredits() {
        const passingGrades = ['A', 'B', 'C', 'D']; 
        this.creditsTaken = this.grades.reduce((acc, grade, index) => {
            if (passingGrades.includes(grade)) {
                // Add credit if grade is passing
                return acc + this.credits[index];
            }
            return acc;
        }, 0);

        this.creditsDue = this.totalCredits - this.creditsTaken; 
    }

    getGPA() {
        return this.gpa;
    }

    getCreditsDue(){
        return this.creditsDue;
    }
    getCreditsTaken(){
        return this.creditsTaken;
    }
}

export default GradesEvaluation;
