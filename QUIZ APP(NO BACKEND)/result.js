$(document).ready(function() {
    var quizId = localStorage.getItem('quizId') || Date.now().toString(); // Unique ID for the quiz
    localStorage.setItem('quizId', quizId);



    var shareLink = `${window.location.origin}/frnds.html?quizId=${quizId}`;
    $('#shareLink').val(shareLink);

    // Copy link to clipboard
    $('#copyLinkButton').click(function() {
        var copyText = document.getElementById('shareLink');
        copyText.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    });

    // Display results of friends who took the quiz
    var friendResults = JSON.parse(localStorage.getItem('friendResults') || '[]');
    var friendResultsHtml = '<h3>Friends who took the quiz:</h3><ul>';
    friendResults.forEach(function(friendResult) {
        friendResultsHtml += '<li>' + friendResult.name + ': ' + friendResult.score + ' points</li>';
    });
    friendResultsHtml += '</ul>';
    $('#friendResults').html(friendResultsHtml);

    $('#createQuizButton').click(function() {
        window.location.href = 'index.html'; // Redirect to the quiz creation page
    });
});
