chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.txt === "start") {
        let courses = document.getElementsByClassName('hierarchyLi dataLi tab_body_bg');

        var arr = [];

        function trim(courseElement) {
            courseElement = courseElement.replace(/(?:^[\s\u00a0]+)|(?:[\s\u00a0]+$)/g, ''); //essentially a trim()
            return courseElement;
        }

        /*function toNumberGrade(letterGrade) {
            if (letterGrade == 'A+') {
                return 10;
            } else if (letterGrade == 'A') {
                return 10;
            } else if (letterGrade == 'A-') {
                return 9;
            } else if (letterGrade == 'B') {
                return 8;
            } else if (letterGrade == 'B-') {
                return 7;
            } else if (letterGrade == 'C') {
                return 6;
            } else if (letterGrade == 'C-') {
                return 5;
            } else if (letterGrade == 'D') {
                return 4;
            } else if (letterGrade == 'FR') {
                return 0;
            } else if (letterGrade == 'S') {
                return 'S';
            }
        }*/
        var numberGrades = {
            'A+': 10,
            'A': 10,
            'A-': 9,
            'B': 8,
            'B-': 7,
            'C': 6,
            'C-': 5,
            'D': 4,
            'FR': 0,
            'FS': 0,
            'S': -1
        };

        for (i = 0; i < courses.length; i++) {

            if (courses[i].children[7] != undefined) {

                CourseCode = trim((courses[i].children[0]).innerText);
                CourseName = trim((courses[i].children[1]).innerText);
                CourseCredits = trim((courses[i].children[2]).innerText);
                CourseType = trim((courses[i].children[4]).innerText);
                CourseGrade = trim((courses[i].children[7]).innerText);


                if (CourseGrade != '') {


                    console.log(courses[i].children[1].innerText);
                    console.log(CourseGrade);

                    arr.push({
                        Code: CourseCode,
                        Course: CourseName,
                        Credits: CourseCredits,
                        Type: CourseType,
                        Grade: CourseGrade,
                        //NumberGrade: toNumberGrade(CourseGrade)
                        NumberGrade: numberGrades[CourseGrade]
                    });
                }
            }
        }

        chrome.runtime.sendMessage({
            info: arr
        });
    }
})