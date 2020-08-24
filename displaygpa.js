let studentData = JSON.parse(localStorage.getItem("student"));
let courseData = JSON.parse(localStorage.getItem("courseGPA"));

var credit_count = document.getElementsByClassName("summary")[0];
var completed_courses = document.getElementsByClassName("courses")[0];
var additional_courses = document.getElementsByClassName("additionals")[0];

//sending student info to displaygpa.html
document.getElementsByClassName("stuName")[0].innerText = studentData[0].Name;
document.getElementsByClassName("stuRollno")[0].innerText = studentData[0].RollNo;
document.getElementsByClassName("stuBranch")[0].innerText = studentData[0].Branch;
document.getElementsByClassName("stuType")[0].innerText = studentData[0].StudentType;

//inserting rows into the completed courses table
var totalCredits = 0.00,
    sumGrades = 0.00;


var excludedCourses = [
    'Minor core',
    'Honors core',
    'Honours project',
    'Honours coursework',
    'FCC',
    'Additional'
];


var CourseTypes = {
    'Departmental Core Theory': 0,
    'Basic Sciences': 0,
    'Basic Engineering Skills': 0,
    'Creative Arts Elective': 0,
    'Liberal Arts Elective': 0,
    'Free Elective': 0,
    'CY Elective': 0,
    'MA Elective': 0,
    'PH Elective': 0,
    'Minor core': 0,
    'Honors core': 0,
    'Honours project': 0,
    'Honours coursework': 0,
    'FCC': 0,
    'Additional': 0

};

for (i = 0; i < courseData.length; i++) {

    //gathering data for the Credit Count table
    if (courseData[i].Type == 'Departmental Elective') {
        if ((courseData[i].Code).indexOf('CY') == 0)
            CourseTypes['CY Elective']++;
        else if ((courseData[i].Code).indexOf('MA') == 0)
            CourseTypes['MA Elective']++;
        else if ((courseData[i].Code).indexOf('PH') == 0)
            CourseTypes['PH Elective']++;

    } else if (courseData[i].Type == 'Creative Arts') {
        CourseTypes['Creative Arts Elective']++;
    } else {
        CourseTypes[courseData[i].Type]++;
    }

    //-1 is for the S and I grade
    if (excludedCourses.indexOf(courseData[i].Type) == -1 && courseData[i].NumberGrade != -1) {
        totalCredits = totalCredits + parseFloat(courseData[i].Credits);
        sumGrades += parseFloat(courseData[i].NumberGrade) * parseFloat(courseData[i].Credits);
    }

    //creating a row for a course
    var row = document.createElement("tr");
    row.innerHTML = `<td>${courseData[i].Code}</td>
                    <td>${courseData[i].Course}</td>
                    <td>${courseData[i].Type}</td>
                    <td class="credit">${courseData[i].Credits}</td>
                    <td class="grade">${courseData[i].Grade}</td>`

    if (excludedCourses.indexOf(courseData[i].Type) == -1) //completed courses
        completed_courses.appendChild(row);
    else if (excludedCourses.indexOf(courseData[i].Type) == 5) //additional courses
        additional_courses.appendChild(row);
}

var CGPA = (sumGrades / totalCredits).toFixed(2);

document.getElementsByClassName("cgpa")[0].innerText = CGPA;

//filling the credit count table
for (var course in CourseTypes) {
    if (CourseTypes[course] > 0) {
        var row = document.createElement("tr");
        row.innerHTML = `<td class>${course}</td>
                    <td>${CourseTypes[course]}</td>`;

        credit_count.appendChild(row);


        console.log(course);
        console.log(CourseTypes[course]);
        //row.createElement("td").innerHTML = course;

    }
}