$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var quizId = urlParams.get('quizId');
    var userName = decodeURIComponent(urlParams.get('userName'));

    var questions = JSON.parse(localStorage.getItem('quizResults') || '[]');
    var currentQuestionIndex = 0;
    var friendAnswers = [];

    $('#quizTitle').text("Let's test how much you know about your friend " + userName + "!");

    function displayQuestion(index) {
        var q = questions[index].question;
        var options = questions[index].options; // Ensure options is an array

        var questionHtml = '<div class="question-container"><h3 class="question">' + q + '</h3></div><ul>';
        options.forEach(function(option) {
            questionHtml += '<li class="radio-container"><input type="radio" name="option" value="' + option + '"><span>' + option + '</span></li>';
        });
        questionHtml += '</ul>';
        $('#questionBox').html(questionHtml);
    }

    function nextQuestion() {
        var selectedOption = $('input[name="option"]:checked').val();
        if (selectedOption) {
            friendAnswers.push({ question: questions[currentQuestionIndex].question, answer: selectedOption });
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion(currentQuestionIndex);
            } else {
                $('#nextButton').hide();
                $('#submitButton').show();
            }
        } else {
            alert('Please select an option before proceeding.');
        }
    }

    function submitQuiz() {
        var friendName = $('#friendNameInput').val();
        if (friendName) {
            var score = 0;
            friendAnswers.forEach(function(answer, index) {
                if (answer.answer === questions[index].answer) {
                    score++;
                }
            });

            var friendResults = JSON.parse(localStorage.getItem('friendResults') || '[]');
            friendResults.push({ name: friendName, score: score });
            localStorage.setItem('friendResults', JSON.stringify(friendResults));

            alert('Quiz submitted! You scored ' + score + ' points.');
            window.location.href = 'result.html'; // Redirect to result page
        } else {
            alert('Please enter your name.');
        }
    }

    $('#startQuizButton').click(function() {
        var friendName = $('#friendNameInput').val();
        if (friendName) {
            $('#friendNameInput').hide();
            $('#startQuizButton').hide();
            $('#questionBox').show();
            $('#nextButton').show();
            displayQuestion(currentQuestionIndex);
        } else {
            alert('Please enter your name.');
        }
    });

    $('#nextButton').click(nextQuestion);
    $('#submitButton').click(submitQuiz);

    // Initial hide
    $('#questionBox').hide();
    $('#nextButton').hide();
    $('#submitButton').hide();
});
