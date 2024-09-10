function log() {
    window.location.href = "login.html";
}

function reg() {
    window.location.href = "registration.html";
}


//register
function register(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const userData = {
        username: username,
        accountNumber: accountNumber,
        password: password, 
        balance: 0 
    };

    localStorage.setItem('bankingUser', JSON.stringify(userData));
    alert("Registration successful");
    window.location.href = "login.html";
}

//login

function login(event) {
    event.preventDefault(); 

    const accountNumber = document.getElementById('accountNumber').value;
    const password = document.getElementById('password').value;

    const storedUser = JSON.parse(localStorage.getItem('bankingUser'));

    if (storedUser) {
        if (accountNumber === storedUser.accountNumber && password === storedUser.password) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(storedUser)); 
            alert("Login successful");
            window.location.href = "home.html"; 
        } else {
            alert("Incorrect account number or password");
        }
    } else {
        alert("No account found with this account number");
    }
}

//home

let currentUser = null;

window.onload = function() {
    currentUser = JSON.parse(sessionStorage.getItem('loggedInUser')); 

    if (currentUser) {
        updateBalance();
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
            localStorage.setItem('bankingUser', JSON.stringify(currentUser)); 
            sessionStorage.setItem('loggedInUser', JSON.stringify(currentUser)); 
            updateBalance();
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
                localStorage.setItem('bankingUser', JSON.stringify(currentUser)); 
                sessionStorage.setItem('loggedInUser', JSON.stringify(currentUser)); 
                updateBalance();
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



// function userName2() {
//     let user2 = localStorage.getItem("username"); 
//     let msg = document.getElementById("user");
//     console.log(user2);
    
//     if (user2) {
//         msg.innerHTML = user2;
//     } else {
//         msg.innerHTML = "No username found.";
//     }
// }
// userName2()

