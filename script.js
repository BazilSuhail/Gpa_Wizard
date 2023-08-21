
/*==============================================================================================*/
/*                          Menu Bar Pop up At mobile                                           */
/*==============================================================================================*/

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*==============================================================================================*/
/*                          Typing Animation                                                    */
/*==============================================================================================*/
const typed = new Typed('.multiple', {
    strings: ['Find Cumulative Grade Point Average', 'Find Semester Grade Point Average'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000, loop: true
});


/*==============================================================================================*/
/*                         Sticky navbar + active sections                                      */
/*==============================================================================================*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    /* remove toogle icons navbar*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*==============================================================================================*/
/*                          Gpa Calculational Code                                              */
/*==============================================================================================*/

let courses = [];

function addCourse() {
    const courseDiv = document.createElement("div");
    courseDiv.innerHTML = `
        <div>
            <input type="text" class="courseName" placeholder="Enter Course Name">
            <!--    seperate div    -->
            <div class="container">
                <select class="creditHours">
                    <option value="10">Credit Hours</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <select class="grade" aria-placeholder="Grade">
                    <option value="4.00">Grade</option>
                    <option value="4.00">A+</option>
                    <option value="4.00">A</option>
                    <option value="3.67">A-</option>
                    <option value="3.33">B+</option>
                    <option value="3.00">B</option>
                    <option value="2.67">B-</option>
                    <option value="2.33">C+</option>
                    <option value="2.00">C</option>
                    <option value="1.67">C-</option>
                    <option value="1.33">D+</option>
                    <option value="1.00">D</option>
                    <option value="0.00">F</option>
                </select>
            </div>
        </div>`
        ;
    document.getElementById("courseInputs").appendChild(courseDiv);
}

function removeCourse() {
    const courseDivs = document.querySelectorAll("#courseInputs > div");
    if (courseDivs.length > 1) {
        document.getElementById("courseInputs").removeChild(courseDivs[courseDivs.length - 1]);
    } else {
        alert("Cannot remove the only course.");
    }
}
function calculateGPA() {
    courses = [];
    const courseDivs = document.querySelectorAll("#courseInputs > div");

    for (const courseDiv of courseDivs) {
        const courseName = courseDiv.querySelector(".courseName").value.trim();
        const creditHours = parseFloat(courseDiv.querySelector(".creditHours").value);
        const grade = parseFloat(courseDiv.querySelector(".grade").value);

        if (!courseName || isNaN(creditHours) || isNaN(grade)) {
            alert("Please fill all the required fields: Course Name, Credit Hours, and Grade.");
            return;
        }

        courses.push({
            courseName: courseName,
            creditHours: creditHours,
            grade: grade
        });
    }

    let totalCreditHours = 0;
    let totalGradePoints = 0;
    let currentGPA = parseFloat(document.querySelector(".currentGPA").value);
    let hoursEarned = parseFloat(document.querySelector(".hoursEarned").value);

    const gpaTable = document.getElementById("gpaTable");
    gpaTable.innerHTML = `
        <tr>
            <th>Course name</th>
            <th>Credit Hours</th>
            <th>Grade</th>
            <th>Grade Points</th>
        </tr>
    `;

    for (const course of courses) {
        const creditHours = course.creditHours;
        const grade = course.grade;
        const gradePoints = (creditHours * grade).toFixed(2);
        totalGradePoints += parseFloat(gradePoints);
        totalCreditHours += creditHours;

        gpaTable.innerHTML += `
            <tr>
                <td>${course.courseName}</td>
                <td>${creditHours}</td>
                <td>${grade}</td>
                <td>${grade.toFixed(2)} x ${creditHours} = ${gradePoints}</td>
            </tr>
        `;
    }

    const sumCreditHours = document.getElementById("sumCreditHours");
    sumCreditHours.textContent = totalCreditHours;

    const totalGradePointsElem = document.getElementById("totalGradePoints");
    totalGradePointsElem.textContent = totalGradePoints.toFixed(2);

    const calculatedGPA = document.getElementById("calculatedGPA");
    const calculatedCGPA = document.getElementById("calculatedCGPA");

    if (totalCreditHours === 0) {
        calculatedGPA.textContent = "N/A";
        calculatedCGPA.textContent = "N/A";
    } else {
        const gpa = totalGradePoints / totalCreditHours;
        calculatedGPA.textContent = gpa.toFixed(2);

        if (!isNaN(currentGPA) && !isNaN(hoursEarned)) {
            const cgpa = (totalGradePoints + (currentGPA * hoursEarned)) / (totalCreditHours + hoursEarned);
            calculatedCGPA.textContent = cgpa.toFixed(2);
        } else {
            calculatedCGPA.textContent = "N/A";
        }
    }

    const gpaTableDiv = document.getElementById("gpaTableDiv");
    gpaTableDiv.style.display = "block";
    const gpaDetailsSection = document.getElementById("gpaTableDiv");
    gpaDetailsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetFields() {
    courses = [];
    document.getElementById("courseInputs").innerHTML =
        `
        <div>
            <input type="number" class="currentGPA" placeholder="Enter Current CGPA__________(optional*)">
            <input type="number" class="hoursEarned" placeholder="Total Credit Hours Earned___(optional*)">
            <input type="text" class="courseName" placeholder="Enter Course Name">
            <!--    seperate div    -->
            <div class="container">
                <select class="creditHours">
                    <option value="10">Credit Hours</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <select class="grade" aria-placeholder="Grade">
                    <option value="4.00">Grade</option>
                    <option value="4.00">A+</option>
                    <option value="4.00">A</option>
                    <option value="3.67">A-</option>
                    <option value="3.33">B+</option>
                    <option value="3.00">B</option>
                    <option value="2.67">B-</option>
                    <option value="2.33">C+</option>
                    <option value="2.00">C</option>
                    <option value="1.67">C-</option>
                    <option value="1.33">D+</option>
                    <option value="1.00">D</option>
                    <option value="0.00">F</option>
                </select>
            </div>
        </div>
        `
        ;

    const gpaTableDiv = document.getElementById("gpaTableDiv");
    gpaTableDiv.style.display = "none";

    document.getElementById("sumCreditHours").textContent = "-";
    document.getElementById("totalGradePoints").textContent = "-";
    document.getElementById("calculatedGPA").textContent = "-";
}
