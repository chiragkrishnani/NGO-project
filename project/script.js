// Simulated user database (for demo purposes)
const users = [];

// Tab switching for Login/Signup
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-container');

    tabs.forEach(tab => tab.classList.remove('active'));
    forms.forEach(form => form.classList.remove('active'));

    document.querySelector(`button[onclick="showTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Show Forgot Password Modal
function showForgotPasswordModal() {
    document.getElementById('forgot-password-modal').style.display = 'flex';
    document.getElementById('forgot-password-step-1').style.display = 'block';
    document.getElementById('forgot-password-step-2').style.display = 'none';
}

// Close Forgot Password Modal
function closeForgotPasswordModal() {
    document.getElementById('forgot-password-modal').style.display = 'none';
}

// Show Detail Modal
function showDetailModal() {
    document.getElementById('detail-modal').style.display = 'flex';
    document.getElementById('detail-result').style.display = 'none';
    document.getElementById('search-name').value = '';
}

// Close Detail Modal
function closeDetailModal() {
    document.getElementById('detail-modal').style.display = 'none';
}

// Detail Search Form Submission
document.getElementById('detail-search-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchName = document.getElementById('search-name').value.toLowerCase();
    const persons = JSON.parse(localStorage.getItem('persons')) || [];
    const person = persons.find(p => p.name.toLowerCase() === searchName);

    const resultDiv = document.getElementById('detail-result');
    if (person) {
        let detailsHtml = `<h3>Details for ${person.name}</h3>`;
        detailsHtml += `<p><strong>Category:</strong> ${person.category}</p>`;
        switch (person.category) {
            case 'Student':
                
            detailsHtml += `
              <p><strong>Age:</strong> ${person.age || 'N/A'}</p>
                        <p><strong>Date of Birth:</strong> ${person.dob || 'N/A'}</p>
                        <p><strong>School Name:</strong> ${person.school || 'N/A'}</p>
                        <p><strong>Grade:</strong> ${person.grade || 'N/A'}</p>
                        <p><strong>Mother Name:</strong> ${person.motherName || 'N/A'}</p>
                        <p><strong>Mother Occupation:</strong> ${person.motherOccupation || 'N/A'}</p>
                        <p><strong>Father Name:</strong> ${person.fatherName || 'N/A'}</p>
                        <p><strong>Father Occupation:</strong> ${person.fatherOccupation || 'N/A'}</p>
                        <p><strong>Caste:</strong> ${person.cast || 'N/A'}</p>
                        <p><strong>Mother Tongue:</strong> ${person.motherTongue || 'N/A'}</p>
                        <p><strong>Village:</strong> ${person.village || 'N/A'}</p>
                        <p><strong>Student Dream:</strong> ${person.studentDream || 'N/A'}</p>
                        <p><strong>Aadhar Card:</strong> ${person.aadharCard || 'N/A'}</p>
                        <p><strong>Birth Certificate:</strong> ${person.birthCertificate || 'N/A'}</p>
                        <p><strong>Mother Phone No:</strong> ${person.motherPhoneNo || 'N/A'}</p>
                        <p><strong>Father Phone No:</strong> ${person.fatherPhoneNo || 'N/A'}</p>
                        <p><strong>Teacher Name:</strong> ${person.teacherName || 'N/A'}</p>
                        <p><strong>Center Incharge:</strong> ${person.centerIncharge || 'N/A'}</p>
                `;
                break;
            case 'Women Empowerment':
                detailsHtml += `
                    <p><strong>Age:</strong> ${person.age}</p>
                    <p><strong>Skill Trained:</strong> ${person.skill}</p>
                    <p><strong>Monthly Income (₹):</strong> ${person.income}</p>
                `;
                break;
            case 'Alcoholic/Drug Addict':
                detailsHtml += `
                    <p><strong>Age:</strong> ${person.age}</p>
                    <p><strong>Addiction Type:</strong> ${person.addictionType}</p>
                    <p><strong>Duration (Years):</strong> ${person.duration}</p>
                `;
                break;
            // Add cases for other categories (Senior Citizen, Staff Member, Widows) with their specific fields
            default:
                detailsHtml += '<p>No specific details available for this category.</p>';
        }
        resultDiv.innerHTML = detailsHtml;
    } else {
        resultDiv.innerHTML = '<p>No person found with that name.</p>';
    }
    resultDiv.style.display = 'block';
});

// Logout Function
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// Only run login/signup/forgot password logic on index.html
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    // Login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = users.find(u => (u.email === email || u.username === email) && u.password === password);
        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'achievements.html';
        } else {
            alert('Invalid email/username or password!');
        }
    });

    // Sign Up form submission
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        console.log(email);
        console.log(username);
        if (users.some(u => u.email === email || u.username === username)) {
            alert('Email or username already exists!');
            return;
        }

        users.push({ email, username, password });
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'achievements.html';
    });

    // Forgot Password Form Submission (Step 1: Email Verification)
    document.getElementById('forgot-password-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;

        const user = users.find(u => u.email === email);
        if (user) {
            document.getElementById('forgot-password-step-1').style.display = 'none';
            document.getElementById('forgot-password-step-2').style.display = 'block';
        } else {
            alert('Email not found! Please sign up or try again.');
        }
    });

    // Reset Password Form Submission (Step 2: Update Password)
    document.getElementById('reset-password-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const user = users.find(u => u.email === email);
        if (user) {
            user.password = newPassword;
            alert('Password reset successfully! Please log in with your new password.');
            closeForgotPasswordModal();
        } else {
            alert('An error occurred. Please try again.');
        }
    });
}

// Check if user is logged in on achievements page
if (window.location.pathname.includes('achievements.html')) {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
    }
}

// Handle category-specific form submissions
// ... (previous code remains the same until formHandlers)

const formHandlers = {
    'student-form': function() {
        const name = document.getElementById('student-name').value;
            const age = document.getElementById('student-age').value;
            const dob = document.getElementById('student-dob').value;
            const school = document.getElementById('student-school').value;
            const motherName = document.getElementById('mother-name').value;
            const motherOccupation = document.getElementById('mother-occupation').value;
            const fatherName = document.getElementById('father-name').value;
            const fatherOccupation = document.getElementById('father-occupation').value;
            const cast = document.getElementById('cast').value;
            const motherTongue = document.getElementById('mother-tongue').value;
            const village = document.getElementById('village').value;
            const studentDream = document.getElementById('student-dream').value;
            const aadharCard = document.getElementById('addhar-card').files[0]?.name || 'Not uploaded';
            const birthCertificate = document.getElementById('birth-certificate').files[0]?.name || 'Not uploaded';
            const motherPhoneNo = document.getElementById('mother-phone-no').value;
            const fatherPhoneNo = document.getElementById('father-phone-no').value;
            const teacherName = document.getElementById('teacher-name').value;
            const centerIncharge = document.getElementById('center-incharge').value;
            return {
                name, age, dob, school, motherName, motherOccupation, fatherName, fatherOccupation,
                cast, motherTongue, village, studentDream, aadharCard, birthCertificate, motherPhoneNo,
                fatherPhoneNo, teacherName, centerIncharge, category: 'Student'
            };
    },
    'women-empowerment-form': function() {
        const name = document.getElementById('women-name').value;
        const age = document.getElementById('women-age').value;
        const skill = document.getElementById('women-skill').value;
        const income = document.getElementById('women-income').value;
        return { name, age, skill, income, category: 'Women Empowerment' };
    },
    'alcoholic-drug-addict-form': function() {
        const name = document.getElementById('addict-name').value;
        const age = document.getElementById('addict-age').value;
        const addictionType = document.getElementById('addict-type').value;
        const duration = document.getElementById('addict-duration').value;
        return { name, age, addictionType, duration, category: 'Alcoholic/Drug Addict' };
    },
    'senior-citizen-form': function() {
        const name = document.getElementById('senior-name').value;
        const age = document.getElementById('senior-age').value;
        const health = document.getElementById('senior-health').value;
        const support = document.getElementById('senior-support').value;
        return { name, age, health, support, category: 'Senior Citizen' };
    },
    'staff-member-form': function() {
        const name = document.getElementById('staff-name').value;
        const age = document.getElementById('staff-age').value;
        const role = document.getElementById('staff-role').value;
        const years = document.getElementById('staff-years').value;
        return { name, age, role, years, category: 'Staff Member' };
    },
    'widows-form': function() {
        const name = document.getElementById('widow-name').value;
        const age = document.getElementById('widow-age').value;
        const husband = document.getElementById('widow-husband').value;
        const children = document.getElementById('widow-children').value;
        return { name, age, husband, children, category: 'Widows' };
    }
};

Object.keys(formHandlers).forEach(formId => {
    document.getElementById(formId)?.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = formHandlers[formId]();
        const persons = JSON.parse(localStorage.getItem('persons')) || [];
        persons.push(data);
        localStorage.setItem('persons', JSON.stringify(persons));
        alert('Form submitted successfully!');
        window.location.href = 'achievements.html';
    });
});

console.log(users);