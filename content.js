chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.txt === "start") {
        function trim(Element) {
            Element = Element.replace(/(?:^[\s\u00a0]+)|(?:[\s\u00a0]+$)/g, ''); //essentially a trim()
            return Element;
        }

        //getting student info
        var name = trim((document.getElementsByClassName('stuName')[0]).innerText);
        var container = document.getElementsByClassName('flexDiv');
        var rollNo = container[0].getElementsByTagName('span')[0];
        rollNo = trim(rollNo.innerText);
        var branch = container[1].children[0].getElementsByTagName('span')[0];
        branch = trim(branch.innerText);
        var studentType = container[1].children[1].getElementsByTagName('span')[0];
        studentType = trim(studentType.innerText);


        let courses = document.getElementsByClassName('hierarchyLi dataLi tab_body_bg');

        var courseInfo = [];
        var studentInfo = [];

        studentInfo.push({
            Name: name,
            RollNo: rollNo,
            Branch: branch,
            StudentType: studentType
        });



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
            'S': -1,
            'I': -1
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

                    courseInfo.push({
                        Code: CourseCode,
                        Course: CourseName,
                        Credits: CourseCredits,
                        Type: CourseType,
                        Grade: CourseGrade,
                        NumberGrade: numberGrades[CourseGrade]
                    });
                }
            }
        }

        //sending student and course information to background.js
        chrome.runtime.sendMessage({
            S_info: studentInfo,
            C_info: courseInfo
        });


    }
})