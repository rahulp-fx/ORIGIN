document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GLOBAL: Handle Navbar State
    updateNavbar();

    // 2. LOGIN PAGE: Handle Sign In
    const loginForm = document.querySelector('form[action="profile.html"]');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            if(email) {
                loginUser(email);
            }
        });
    }

    // 3. SIGNUP PAGE
    const signupForm = document.querySelector('h2.title') && document.querySelector('h2.title').innerText === "Join Origin" ? document.querySelector('form') : null;
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            if(email) {
                loginUser(email);
            }
        });
    }

    // 4. PROFILE PAGE: Handle Logout (FIXED)
    // We use 'logout-btn' (ID) not '.btn-logout' (Class)
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            window.location.href = 'index.html'; // Corrected redirect
        });
    }

    // 5. UPLOAD PAGE: File Drop Interaction (NEW FIX)
    const dropZone = document.querySelector('.drop-zone');
    const fileInput = document.querySelector('.drop-zone input[type="file"]');
    
    if (dropZone && fileInput) {
        // When clicking the box, trigger the hidden file input
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });

        // Optional: Show filename when file is selected
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                document.querySelector('.drop-text').innerText = fileInput.files[0].name;
                document.querySelector('.drop-subtext').innerText = "File selected";
            }
        });
    }

    // 6. UPLOAD PAGE: Protect Submission
    const uploadBtn = document.querySelector('.btn-publish');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', (e) => {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (!isLoggedIn) {
                e.preventDefault();
                alert("You must be logged in to upload a portfolio.");
                window.location.href = 'login.html';
            }
        });
    }
});

// --- HELPER FUNCTIONS ---

function loginUser(email) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    window.location.href = 'profile.html';
}

function updateNavbar() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navLink = document.getElementById('nav-login-link');

    if (navLink) {
        if (isLoggedIn === 'true') {
            navLink.innerText = "My Profile";
            navLink.href = "profile.html";
            if (window.location.pathname.includes('profile.html')) {
                navLink.classList.add('active');
            }
        } else {
            navLink.innerText = "Log In";
            navLink.href = "login.html"; // Ensure this points to login, not index
        }
    }
}