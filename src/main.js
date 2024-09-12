import { game } from "./game.js";

const newGameButtonElem = document.getElementById("new-game");
const inputElem = document.getElementById('word');
const alertElem = document.getElementById('alert');
const streakElem = document.getElementById('streak');
const boddyEle = document.querySelector('body');


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

    document.getElementById('first-letter').style = "background-color: transparent";
    document.getElementById('second-letter').style = "background-color: transparent";
    document.getElementById('third-letter').style = "background-color: transparent";


    alertElem.style = "visibility: hidden";
});

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const word = formData.get('word');

    const isWordValid = await game.validateWord(word.toLowerCase());

    // if (isWordValid) {
    //     streakElem.innerHTML = game.streak;
    //     alertElem.style = "visibility: hidden";

    // }
    // else {
    //     alertElem.style = "visibility: visible";
    // }

    switch (isWordValid) {
        case 0:
            streakElem.innerHTML = game.streak;
            alertElem.style = "visibility: visible; color: green";
            alertElem.innerHTML = "A palavra é valida!"

            inputElem.value = "";

            document.getElementById('first-letter').style = "background-color: transparent";
            document.getElementById('second-letter').style = "background-color: transparent";
            document.getElementById('third-letter').style = "background-color: transparent";

            break;
        case 1:
            alertElem.style = "visibility: visible";
            alertElem.innerHTML = "A palavra não contém as três letras!";
            break;
        case 2:
            alertElem.style = "visibility: visible";
            alertElem.innerHTML = "A palavra já foi digitada!";
            break;
        case 3:
            alertElem.style = "visibility: visible";
            alertElem.innerHTML = "A palavra não existe no dicionário!";
            break;

    }
});

inputElem.addEventListener('input', function () {
    let word = inputElem.value.toLowerCase();

    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    const isLetterFound = game.validatLetter(word);

    if (isLetterFound[0]) {
        document.getElementById('first-letter').style = "background-color: green";
    }
    else {
        document.getElementById('first-letter').style = "background-color: transparent";
    }
    if (isLetterFound[1]) {
        document.getElementById('second-letter').style = "background-color: green";
    }
    else {
        document.getElementById('second-letter').style = "background-color: transparent";
    }
    if (isLetterFound[2]) {
        document.getElementById('third-letter').style = "background-color: green";
    }
    else {
        document.getElementById('third-letter').style = "background-color: transparent";
    }

}
)