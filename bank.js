function log() {
    window.location.href = "login.html";
}

function reg() {
    window.location.href = "registration.html";
}
function register(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const accountNumber = document.getElementById('accountNumber').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!username || !accountNumber || !password || !confirmPassword) {
        alert("Please enter all details.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (localStorage.getItem(accountNumber)) {
        alert("Account with this account number already exists.");
    } else {
        const userData = {
            username,
            accountNumber,
            password,
            balance: 0 
        };
        localStorage.setItem(accountNumber, JSON.stringify(userData));
        alert("User registered successfully!");
        window.location.href = "login.html"; 
    }
}

// Login
function login(event) {
    event.preventDefault();

    const accountNumber = document.getElementById('accountNumber').value.trim();
    const password = document.getElementById('password').value.trim();
    const storedUser = JSON.parse(localStorage.getItem(accountNumber));

    if (storedUser) {
        if (password === storedUser.password) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(storedUser));
            alert("Login successful");
            window.location.href = "home.html"; 
        } else {
            alert("Incorrect password");
        }
    } else {
        alert("No account found with this account number");
    }
}

// Home
let currentUser = null;

window.onload = function() {
    currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (currentUser) {
        updateBalance();
        displayUsername();
        document.getElementById('setupPasswordSection').style.display = 'none';
        document.getElementById('bankingSection').style.display = 'flex';
    }
}

function deposit() {
    const depositAmount = parseFloat(document.getElementById('depositAmount').value);
    const depositPassword = document.getElementById('depositPassword').value.trim();

    if (depositPassword === currentUser.password) {
        if (!isNaN(depositAmount) && depositAmount > 0) {
            currentUser.balance += depositAmount; 
            localStorage.setItem(currentUser.accountNumber, JSON.stringify(currentUser));
            sessionStorage.setItem('loggedInUser', JSON.stringify(currentUser)); 
            updateBalance();
            alert("Deposit successful!");
        } else {
            alert("Please enter a valid deposit amount");
        }
    } else {
        alert("Incorrect password. Please try again");
    }

    document.getElementById('depositAmount').value = '';
    document.getElementById('depositPassword').value = '';
}

function withdraw() {
    const withdrawAmount = parseFloat(document.getElementById('withdrawAmount').value);
    const withdrawPassword = document.getElementById('withdrawPassword').value.trim();

    if (withdrawPassword === currentUser.password) {
        if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
            if (withdrawAmount <= currentUser.balance) {
                currentUser.balance -= withdrawAmount; 
                localStorage.setItem(currentUser.accountNumber, JSON.stringify(currentUser));
                sessionStorage.setItem('loggedInUser', JSON.stringify(currentUser)); 
                updateBalance();
                alert("Withdrawal successful!");
            } else {
                alert("Insufficient balance.");
            }
        } else {
            alert("Please enter a valid withdrawal amount");
        }
    } else {
        alert("Incorrect password. Please try again");
    }

    document.getElementById('withdrawAmount').value = '';
    document.getElementById('withdrawPassword').value = '';
}

function updateBalance() {
    document.getElementById('balance').innerText = `$${currentUser.balance.toFixed(2)}`;
}


function displayUsername() {
    const user2 = currentUser.username; 
    const msg = document.getElementById("user");

    if (user2) {
        msg.innerHTML = `Welcome, ${user2}`;
    } else {
        msg.innerHTML = "No username found.";
    }
}
