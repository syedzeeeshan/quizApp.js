$(document).ready(function() {
    $('#signupForm').on('submit', function(event){
        event.preventDefault();
        var newUsername = $('#newUsername').val();
        var newPassword = $('#newPassword').val();

        if (newUsername === '' || newPassword === ''){
            alert("Please fill in all required fields.");
            return;
        }

        // Stores user details in local storage
        localStorage.setItem('username', newUsername);
        localStorage.setItem('password', newPassword);

        alert("Sign Up successful! Welcome, " + newUsername);
        window.location.href = 'login.html';
    });

    $('#loginForm').on('submit', function(event){
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        if (username === '' || password === ''){
            alert("Please fill in all required fields.");
            return;
        }

        // Retrieve stored user details from local storage
        var storedUsername = localStorage.getItem('username');
        var storedPassword = localStorage.getItem('password');

        if (username === storedUsername && password === storedPassword){
            alert("Login successful!");
            window.location.href = 'index.html';
        } else {
            alert("Invalid Credentials. Please try again.");
        }
    });
});
