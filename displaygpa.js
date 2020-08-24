let data = JSON.parse(localStorage.getItem("courseGPA"));

var completed_courses = document.getElementsByClassName("courses")[0];

//inserting rows into the completed courses table
var totalCredits = 0.00,
    sumGrades = 0.00;

for (i = 0; i < data.length; i++) {

    if (data[i].NumberGrade != -1 & data[i].Type != 'Additional') {
        console.log(sumGrades);
        console.log(totalCredits);
        totalCredits = totalCredits + parseFloat(data[i].Credits);
        sumGrades += parseFloat(data[i].NumberGrade) * parseFloat(data[i].Credits);
    }

    var row = document.createElement("tr");
    row.innerHTML = `<td>${data[i].Code}</td>
                    <td>${data[i].Course}</td>
                    <td>${data[i].Type}</td>
                    <td class="credit">${data[i].Credits}</td>
                    <td class="grade">${data[i].Grade}</td>`

    completed_courses.appendChild(row);
}

var CGPA = (sumGrades / totalCredits).toFixed(2);

document.getElementsByClassName("cgpa")[0].innerText = CGPA;