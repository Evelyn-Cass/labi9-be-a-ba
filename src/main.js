import { game } from "./game.js";

const newGameButtonElem = document.getElementById("new-game");
const inputElem = document.getElementById('word');
const errorElem = document.getElementById('error');
const streakElem = document.getElementById('streak');


newGameButtonElem.addEventListener("click", function () {
    game.newGame();

    const lettersElem = document.querySelectorAll(".square");

    for (let i = 0; i < lettersElem.length; i++) {
        lettersElem[i].innerHTML = game.letters[i];
    }

    inputElem.disabled = false;
    inputElem.value = "";
    inputElem.focus();
    streakElem.innerHTML = "0";

    errorElem.style = "visibility: hidden";
});

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const word = formData.get('word');

    const isWordValid = await game.validateWord(word.toLowerCase());

    if (isWordValid) {
        streakElem.innerHTML = game.streak;
        errorElem.style = "visibility: hidden"
    }
    else {
        errorElem.style = "visibility: visible";
    }

});