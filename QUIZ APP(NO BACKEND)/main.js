$(document).ready(function() {
    var questions = [
        { 
            question: "What are your hobbies?", 
            options: ["Photography", "Gardening", "Playing Games", "Reading", "Outdoor Activities"] 
        },
        { 
            question: "What is your favorite color?", 
            options: ["Red", "Blue", "Green", "Yellow", "Black", "White", "Gray", "Brown", "Orange", "Purple"] 
        },
        { 
            question: "What is your favorite food?", 
            options: ["Butter Chicken", "Biryani", "Dosa", "Idly", "Vada", "Paneer Masala", "Chole Bhature", "Palak Paneer", "Gulab Jamun", "Noodles", "Fried Chicken", "Shawarma", "Crab Fry"] 
        },
        { 
            question: "What is your birth month?", 
            options: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 
        },
        { 
            question: "What is your special talent?", 
            options: ["Singing", "Dancing", "Sports", "Recitation", "Public Speaking", "Organizing Events", "Volunteering", "Mimicry"] 
        },
        { 
            question: "What is your dream career?", 
            options: ["Doctor", "Engineer", "Computer Scientist", "Architect", "Pharmacist", "Racer", "Pilot", "Business Owner", "Teacher", "Athlete", "Photographer"] 
        },
        { 
            question: "What is your dream vacation destination?", 
            options: ["Dubai", "Oman", "Saudi Arabia", "Kuwait", "USA", "UK", "Australia", "Europe", "India", "Maldives", "Sri Lanka", "Thailand", "Singapore", "Malaysia", "Turkey", "Iran", "Jordan", "Lebanon", "Egypt"] 
        },
        { 
            question: "What is your favorite pet animal?", 
            options: ["Dog", "Cat", "Fish", "Birds", "Horse", "Turtle", "Snake", "Rabbit", "Sheep", "Cow"] 
        },
        { 
            question: "How many close friends do you have in your class?", 
            options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] 
        },
        { 
            question: "Who is your favorite music director?", 
            options: ["A R Rahman", "G V Prakash", "Anirudh", "DSP", "Ilayaraja", "Anu Malik", "Himesh Reshammiya", "Haris Jayaraj", "Yuvan Shankar"] 
        }
    ];

    var currentQuestionIndex = 0;
    var attendedQuestions = [];
    var userName = '';

    function displayQuestion(index) {
        var q = questions[index].question;
        var options = questions[index].options; // Ensure options is an array

        var questionHtml = '<div class="question-container"><h3 class="question">' + q + '</h3></div><ul>';
        options.forEach(function(option) {
            questionHtml += '<li class="radio-container"><input type="radio" name="option" value="' + option + '"><span>' + option + '</span></li>';
        });
        questionHtml += '<li class="radio-container"><input type="radio" name="option" value="custom"><span>Enter Custom Option</span></li>';
        questionHtml += '</ul>';
        questionHtml += '<div id="customOptionDiv" style="display:none;"><input type="text" id="customOptionInput" placeholder="Enter your option"><button id="saveCustomOptionButton" class="btn">Save Option</button></div>';
        $('#questionBox').html(questionHtml);

        $('input[name="option"]').change(function() {
            if ($(this).val() === 'custom') {
                $('#customOptionDiv').show();
            } else {
                $('#customOptionDiv').hide();
            }
        });

        $('#saveCustomOptionButton').click(function() {
            var customOption = $('#customOptionInput').val();
            if (customOption) {
                $('input[name="option"][value="custom"]').val(customOption).next().text(customOption);
                $('#customOptionDiv').hide();
            } else {
                alert('Please enter an option.');
            }
        });
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function nextQuestion() {
        var selectedOption = $('input[name="option"]:checked').val();
        if (selectedOption) {
            attendedQuestions.push({ question: questions[currentQuestionIndex].question, answer: selectedOption });
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
        localStorage.setItem('userName', userName); // Store user name
        localStorage.setItem('quizResults', JSON.stringify(attendedQuestions)); // Store results
        window.location.href = 'result.html'; // Redirect to result page
    }

    function startQuiz() {
        userName = $('#userNameInput').val();
        if (userName) {
            $('#nameContainer').hide();
            $('#quizContainer').show();
            displayQuestion(currentQuestionIndex);
        } else {
            alert('Please enter your name.');
        }
    }

    $('#startQuizButton').click(startQuiz);
    $('#nextButton').click(nextQuestion);
    $('#submitButton').click(submitQuiz);

    // Initial load
    displayQuestion(currentQuestionIndex);
});
