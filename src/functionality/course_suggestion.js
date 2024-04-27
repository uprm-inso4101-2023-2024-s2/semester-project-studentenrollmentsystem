export function plannedCourseworkPerSemester(courses, creditsPerSemester) {
  const courseworkPerSemester = [];
  courses = courses.filter((course) => course.credits <= creditsPerSemester);

  let currentSemester = [], creditsInCurrentSemester = 0;
  let totalCoursesInPlan = 0;
  while (totalCoursesInPlan < courses.length) {
    for (let i = 0; i < courses.length; ++i) {
      if (courses[i].credits + creditsInCurrentSemester <= creditsPerSemester) {
        currentSemester.push(courses[i]);
        totalCoursesInPlan += 1;
        creditsInCurrentSemester += courses[i].credits
      }
    }
    courseworkPerSemester.push(currentSemester);
    currentSemester = [];
    creditsInCurrentSemester = 0;
  }

  if (courseworkPerSemester.length === 0) {
    courseworkPerSemester.push([]);
  }
  return courseworkPerSemester;
}

function fetchProgramCourses(program) {
  switch(program) {
    // CIIC Example.
    case "CIIC":
      return [
        { code: "MATE 3031", name: "Calculus I", credits: 4, prerequisites: "", corequisites: ""},
        { code: "QUIM 3131", name: "General Chemistry I", credits: 3, prerequisites: "", corequisites: "QUIM 3133"},
        { code: "QUIM 3133", name: "General Chemistry I Lab", credits: 1, prerequisites: "", corequisites: "QUIM 3131"},
        { code: "CIIC 3015", name: "Intro. to Computer Programming", credits: 4, prerequisites: "", corequisites: ""},
        { code: "MATE 3032", name: "Calculus II", credits: 3, prerequisites: "MATE 3031", corequisites: ""},
        { code: "QUIM 3132", name: "General Chemistry II", credits: 3, prerequisites: "QUIM 3131,QUIM 3133", corequisites: "QUIM 3134"},
        { code: "QUIM 3134", name: "General Chemistry II Lab", credits: 1, prerequisites: "QUIM 3131,QUIM 3133", corequisites: "QUIM 3132"},
        { code: "CIIC 3075", name: "Foundations of Computing", credits: 3, prerequisites: "CIIC 3015", corequisites: ""},
        { code: "CIIC 4010", name: "Advanced Programming", credits: 4, prerequisites: "CIIC 3015", corequisites: ""},

        { code: "MATE 3063", name: "Calculus III", credits: 3, prerequisites: "MATE 3032", corequisites: ""},
        { code: "FISI 3171", name: "General Physics I", credits: 4, prerequisites: "MATE 3031", corequisites: "QUIM 3133"},
        { code: "FISI 3173", name: "General Physics I Lab", credits: 1, prerequisites: "", corequisites: "QUIM 3131"},
        { code: "CIIC 4020", name: "Data Structures", credits: 4, prerequisites: "CIIC 4010,CIIC 3075", corequisites: ""},
        { code: "CIIC 4025", name: "Algorithm Analysis", credits: 3, prerequisites: "CIIC 4020", corequisites: ""},
        { code: "FISI 3172", name: "General Physics II", credits: 4, prerequisites: "FISI 3171", corequisites: "QUIM 3134"},
        { code: "FISI 3174", name: "General Physics II Lab", credits: 1, prerequisites: "", corequisites: "QUIM 3132"},
        { code: "INEL 3105", name: "Analysis Electrical Systems", credits: 3, prerequisites: "MATE 3032,CIIC 3015", corequisites: ""}
      ];
    // ICOM Example.
    case "ICOM":
      return [];
    // Default
    default:
      return [];
  }
}

class Course {
  constructor() {
      this.prerequisites = [];
  }
}

function topologicalSort(graph) {
  const visited = new Set();
  const stack = [];

  function dfs(course) {
    visited.add(course);
    graph[course].forEach(neighbor => {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    });
    stack.push(course);
  }

  for (const course in graph) {
    if (!visited.has(course)) {
      dfs(course);
    }
  }
  return stack.reverse();
}

function countUnlockedCourses(course, graph) {
  const visited = new Set();

  function dfs(course) {
    visited.add(course);
    let count = 1;
    graph[course].forEach(neighbor => {
      if (!visited.has(neighbor)) {
        count += dfs(neighbor);
      }
    });
    return count;
  }
  return dfs(course);
}

export function suggestCourseOrder(program) {
  const graph = {};
  const unsortedCurriculum = fetchProgramCourses(program);

  const courseObjects = {};
  unsortedCurriculum.forEach(course => {
    graph[course.code] = [];
    courseObjects[course.code] = new Course();
    if (course.prerequisites !== "") {
      courseObjects[course.code].prerequisites = course.prerequisites.split(",");
    } else {
      courseObjects[course.code].prerequisites = [];
    }
    const prerequisites = courseObjects[course.code].prerequisites;
      prerequisites.forEach(prerequisite => {
        graph[prerequisite].push(course.code);
    });
  });

  // Topological sort.
  const sortedCourses = topologicalSort(graph);

  // Calculate unlocking potential for each course
  const unlockingPotential = {};
  sortedCourses.forEach(course => {
      const potential = countUnlockedCourses(course, graph);
      unlockingPotential[course] = potential;
  });

  // Sort courses by unlocking potential
  sortedCourses.sort((a, b) => unlockingPotential[b] - unlockingPotential[a]);

  // Return the course object.
  let sortedCoursesObjs = [];
  sortedCourses.forEach(course_code => {
    unsortedCurriculum.forEach(course => {
      if (course.code == course_code) {
        sortedCoursesObjs.push(course);
      }
    })
  })
  return sortedCoursesObjs;
}
