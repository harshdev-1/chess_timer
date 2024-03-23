document.addEventListener("DOMContentLoaded", function() {
    var WhiteTime = 0;
    var BlackTime = 0;
    var WhiteSec = 0;
    var BlackSec = 0;
    var timerInterval;
    var isWhite = true;
    var timerDisplay = document.querySelector('.timer');
    var remainingTimeWhite = 0;
    var remainingTimeBlack = 0;

    Swal.fire({
        title: "Select time",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "10 min",
        denyButtonText: "5 min"
    }).then((result) => {
        if (result.isConfirmed) {
            WhiteTime = 10;
            BlackTime = 10;
            startTimer();
        } else if (result.isDenied) {
            WhiteTime = 5;
            BlackTime = 5;
            startTimer();
        }
    });

    // Function to start the timer based on the current player's turn
    function startTimer() {
        if (isWhite) {
            WhiteSec = remainingTimeWhite > 0 ? remainingTimeWhite : WhiteTime * 60;
            timerInterval = setInterval(whiteTimer, 1000);
        } else {
            BlackSec = remainingTimeBlack > 0 ? remainingTimeBlack : BlackTime * 60;
            timerInterval = setInterval(blackTimer, 1000);
        }
    }

    // Function for the white player's timer
    function whiteTimer() {
        var minutesLeft = Math.floor(WhiteSec / 60);
        var secondsLeft = WhiteSec % 60;

        timerDisplay.textContent = padZero(minutesLeft) + ":" + padZero(secondsLeft);

        if (WhiteSec <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's up!";
        } else {
            WhiteSec--;
            remainingTimeWhite = WhiteSec;
        }
    }

    // Function for the black player's timer
    function blackTimer() {
        var minutesLeft = Math.floor(BlackSec / 60);
        var secondsLeft = BlackSec % 60;

        timerDisplay.textContent = padZero(minutesLeft) + ":" + padZero(secondsLeft);

        if (BlackSec <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's up!";
        } else {
            BlackSec--;
            remainingTimeBlack = BlackSec;
        }
    }

    // Event listener for elements with class "white"
    document.querySelector('.white').addEventListener('click', function() {
        if (!isWhite) { // If it's not already white's turn
            clearInterval(timerInterval); // Clear the current timer
            isWhite = true; // Set the turn to white
            startTimer(); // Start white's timer
        }
    });

    // Event listener for elements with class "black"
    document.querySelector('.black').addEventListener('click', function() {
        if (isWhite) { // If it's not already black's turn
            clearInterval(timerInterval); // Clear the current timer
            isWhite = false; // Set the turn to black
            startTimer(); // Start black's timer
        }
    });

    // Function to pad zero for single digit minutes/seconds
    function padZero(num) {
        return (num < 10 ? '0' : '') + num;
    }
});
