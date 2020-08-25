let studentData = JSON.parse(localStorage.getItem("student"));
let courseData = JSON.parse(localStorage.getItem("courseGPA"));

var credit_count = document.getElementsByClassName("summary")[0];
var completed_courses = document.getElementsByClassName("courses")[0];
var additional_courses = document.getElementsByClassName("additionals")[0];

//sending student info to displaygpa.html
document.getElementsByClassName("stuName")[0].innerText = studentData[0].Name;
document.getElementsByClassName("stuRollno")[0].innerText =
    studentData[0].RollNo;
document.getElementsByClassName("stuBranch")[0].innerText =
    studentData[0].Branch;
document.getElementsByClassName("stuType")[0].innerText =
    studentData[0].StudentType;

//inserting rows into the completed courses table
var totalCredits = 0.0,
    sumGrades = 0.0;

var excludedCourses = [
    "Minor core",
    "Honors core",
    "Honours project",
    "Honours coursework",
    "FCC",
    "Additional",
];

var CourseTypes = {
    "Departmental Core Theory": 0,
    "Basic Sciences": 0,
    "Basic Engineering Skills": 0,
    "Creative Arts Elective": 0,
    "Liberal Arts Elective": 0,
    "Free Elective": 0,
    "CY Elective": 0,
    "MA Elective": 0,
    "PH Elective": 0,
    "Minor core": 0,
    "Honors core": 0,
    "Honours project": 0,
    "Honours coursework": 0,
    FCC: 0,
    Additional: 0,
};

for (i = 0; i < courseData.length; i++) {
    //gathering data for the Credit Count table
    if (courseData[i].Type == "Departmental Elective") {
        if (courseData[i].Code.indexOf("CY") == 0) CourseTypes["CY Elective"]++;
        else if (courseData[i].Code.indexOf("MA") == 0)
            CourseTypes["MA Elective"]++;
        else if (courseData[i].Code.indexOf("PH") == 0)
            CourseTypes["PH Elective"]++;
    } else if (courseData[i].Type == "Creative Arts") {
        CourseTypes["Creative Arts Elective"]++;
    } else {
        CourseTypes[courseData[i].Type]++;
    }

    //-1 is for the S and I grade
    if (
        excludedCourses.indexOf(courseData[i].Type) == -1 &&
        courseData[i].NumberGrade != -1
    ) {
        totalCredits = totalCredits + parseFloat(courseData[i].Credits);
        sumGrades +=
            parseFloat(courseData[i].NumberGrade) * parseFloat(courseData[i].Credits);
    }

    //creating a row for a course
    var row = document.createElement("tr");
    row.innerHTML = `<td class="semester">${courseData[i].Semester}</td>
                    <td>${courseData[i].Code}</td>
                    <td>${courseData[i].Course}</td>
                    <td>${courseData[i].Type}</td>
                    <td class="credit">${courseData[i].Credits}</td>
                    <td class="grade">${courseData[i].Grade}</td>`;

    if (excludedCourses.indexOf(courseData[i].Type) == -1)
    //completed courses
        completed_courses.appendChild(row);
    else if (excludedCourses.indexOf(courseData[i].Type) == 5)
    //additional courses
        additional_courses.appendChild(row);
}

var CGPA = (sumGrades / totalCredits).toFixed(2);

document.getElementsByClassName("cgpa")[0].innerText = CGPA;

//filling the credit count table
for (var course in CourseTypes) {
    if (CourseTypes[course] > 0) {
        var row = document.createElement("tr");
        row.innerHTML = `<td>${course}</td>
                    <td>${CourseTypes[course]}</td>`;

        credit_count.appendChild(row);

        console.log(course);
        console.log(CourseTypes[course]);
        //row.createElement("td").innerHTML = course;
    }
}

var columns = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
};

//function to sort the tables
var curry = function(n) {
    return function sortTable() {
        console.log(n);
        var table,
            rows,
            switching,
            i,
            x,
            y,
            shouldSwitch,
            direction,
            switchcount = 0;

        //table = document.getElementById("myTable");
        table = document.getElementsByClassName("courses")[0];
        switching = true;

        //Set the sorting direction to ascending:
        direction = "asc";

        /*Make a loop that will continue until
              no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;

            /*Loop through all table rows (except the
                      first, which contains table headers):*/

            for (i = 1; i < rows.length - 1; i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;

                /*Get the two elements you want to compare,
                              one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("td")[n];
                y = rows[i + 1].getElementsByTagName("td")[n];
                console.log(x.innerHTML);
                console.log(y.innerHTML);

                /*check if the two rows should switch place,
                              based on the direction, asc or desc:*/
                if (direction == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (direction == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                              and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount++;
            } else {
                /*If no switching has been done AND the direction is "asc",
                              set the direction to "desc" and run the while loop again.*/
                if (switchcount == 0 && direction == "asc") {
                    direction = "desc";
                    switching = true;
                }
            }
        }
    };
};

document.getElementById("zero").addEventListener("click", curry(0));
document.getElementById("one").addEventListener("click", curry(1));
document.getElementById("two").addEventListener("click", curry(2));
document.getElementById("three").addEventListener("click", curry(3));
document.getElementById("four").addEventListener("click", curry(4));
document.getElementById("five").addEventListener("click", curry(5));