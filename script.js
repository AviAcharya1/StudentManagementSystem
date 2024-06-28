// DOM Elements
const mainContent = document.getElementById('mainContent');
const homeLink = document.getElementById('homeLink');
const registerLink = document.getElementById('registerLink');
const studentListLink = document.getElementById('studentListLink');
const logoutLink = document.getElementById('logoutLink');

// Function to set background image
function setBackgroundImage(imageName) {
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${imageName}')`;
    document.body.classList.add('bg-image');
}

// Function to set background image
function setBackgroundImage(imageName) {
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${imageName}')`;
    document.body.classList.add('bg-image');
}


// Local Storage Keys
const STUDENTS_KEY = 'students';
const LOGGED_IN_KEY = 'loggedIn';

// Initialize students array
let students = JSON.parse(localStorage.getItem(STUDENTS_KEY)) || [];

// Event Listeners
homeLink.addEventListener('click', showHome);
registerLink.addEventListener('click', showRegisterForm);
studentListLink.addEventListener('click', showStudentList);
logoutLink.addEventListener('click', logout);

// Check if user is logged in
function checkLoggedIn() {
    const loggedIn = localStorage.getItem(LOGGED_IN_KEY);
    if (!loggedIn) {
        showLoginForm();
    } else {
        showHome();
    }
}

// Login Form
function showLoginForm() {
    setBackgroundImage('education,school');
    mainContent.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="content-wrapper animate__animated animate__fadeIn">
                    <h2 class="mb-4">Login</h2>
                    <form id="loginForm">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username:</label>
                            <input type="text" class="form-control" id="username" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password:</label>
                            <input type="password" class="form-control" id="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-animated">Login</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.getElementById('loginForm').addEventListener('submit', login);
}

// Login Function
function login(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // For demonstration, we'll use a simple check
    if (username === 'admin' && password === 'password') {
        localStorage.setItem(LOGGED_IN_KEY, 'true');
        showHome();
    } else {
        alert('Invalid credentials');
    }
}

// Logout Function
function logout() {
    localStorage.removeItem(LOGGED_IN_KEY);
    showLoginForm();
}

// Home Page
function showHome() {
    setBackgroundImage('campus,university');
    mainContent.innerHTML = `
        <div class="content-wrapper animate__animated animate__fadeIn">
            <h2 class="mb-4">Welcome to Student Management System</h2>
            <p>Use the navigation menu to manage students.</p>
        </div>
    `;
}


// Register Student Form
function showRegisterForm() {
    setBackgroundImage('student,classroom');
    mainContent.innerHTML = `
        <div class="content-wrapper animate__animated animate__fadeIn">
            <h2 class="mb-4">Register New Student</h2>
            <form id="registerForm">
                <div class="mb-3">
                    <label for="name" class="form-label">Name:</label>
                    <input type="text" class="form-control" id="name" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email:</label>
                    <input type="email" class="form-control" id="email" required>
                </div>
                <div class="mb-3">
                    <label for="age" class="form-label">Age:</label>
                    <input type="number" class="form-control" id="age" required>
                </div>
                <div class="mb-3">
                    <label for="grade" class="form-label">Grade:</label>
                    <input type="text" class="form-control" id="grade" required>
                </div>
                <button type="submit" class="btn btn-primary btn-animated">Register Student</button>
            </form>
        </div>
    `;
    document.getElementById('registerForm').addEventListener('submit', registerStudent);
}

// Register Student Function
function registerStudent(e) {
    e.preventDefault();
    const student = {
        id: Date.now(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        grade: document.getElementById('grade').value
    };
    students.push(student);
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
    alert('Student registered successfully!');
    showStudentList();
}

// Show Student List
function showStudentList() {
    removeBackgroundImage();
    let studentListHTML = `
        <div class="content-wrapper animate__animated animate__fadeIn">
            <h2 class="mb-4">Student List</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Grade</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    students.forEach(student => {
        studentListHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.age}</td>
                <td>${student.grade}</td>
                <td>
                    <button class="btn btn-sm btn-primary btn-animated" onclick="editStudent(${student.id})">Edit</button>
                    <button class="btn btn-sm btn-danger btn-animated" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    studentListHTML += `
                </tbody>
            </table>
        </div>
    `;
    mainContent.innerHTML = studentListHTML;
}

// Edit Student
function editStudent(id) {
    setBackgroundImage('study,books');
    const student = students.find(s => s.id === id);
    if (student) {
        mainContent.innerHTML = `
            <div class="content-wrapper animate__animated animate__fadeIn">
                <h2 class="mb-4">Edit Student</h2>
                <form id="editForm">
                    <input type="hidden" id="editId" value="${student.id}">
                    <div class="mb-3">
                        <label for="editName" class="form-label">Name:</label>
                        <input type="text" class="form-control" id="editName" value="${student.name}" required>
                    </div>
                    <div class="mb-3">
                        <label for="editEmail" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="editEmail" value="${student.email}" required>
                    </div>
                    <div class="mb-3">
                        <label for="editAge" class="form-label">Age:</label>
                        <input type="number" class="form-control" id="editAge" value="${student.age}" required>
                    </div>
                    <div class="mb-3">
                        <label for="editGrade" class="form-label">Grade:</label>
                        <input type="text" class="form-control" id="editGrade" value="${student.grade}" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-animated">Update Student</button>
                </form>
            </div>
        `;
        document.getElementById('editForm').addEventListener('submit', updateStudent);
    }
}

// Update Student Function
function updateStudent(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('editId').value);
    const updatedStudent = {
        id: id,
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        age: document.getElementById('editAge').value,
        grade: document.getElementById('editGrade').value
    };
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = updatedStudent;
        localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
        alert('Student updated successfully!');
        showStudentList();
    }
}

// Delete Student
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== id);
        localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
        showStudentList();
    }
}

// Initialize the application
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingOverlay').style.display = 'none';
        checkLoggedIn();
    }, 1500); // Simulating a 1.5 second load time
});