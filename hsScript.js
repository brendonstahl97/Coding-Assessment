var tableEl = document.getElementById("hsTable");
var resetBtn = document.getElementById("reset");

var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

highscores.forEach(element => {
    var newRow = document.createElement("tr");
    var rowName = document.createElement("td");
    var rowScore = document.createElement("td");

    rowName.textContent = element.name;
    rowScore.textContent = element.score;

    tableEl.appendChild(newRow);
    newRow.appendChild(rowName);
    newRow.appendChild(rowScore);
});

function resetHighscores() {
    localStorage.clear();
    window.location.href = "highscore.html"
}

resetBtn.addEventListener("click", function (event) {
    event.preventDefault();
    resetHighscores();
})




