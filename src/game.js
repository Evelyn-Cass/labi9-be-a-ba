export const game = {
    letters: [],
    // error: false,
    streak: 0,
    inputedWords: [],
    newGame: function () {
        this.letters = [];
        let alphabet = "aabcdeefghiijlmnoopqrstuuvxz";

        this.letters = new Array(3).fill().map(function (letter) {
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            const result = alphabet[randomIndex];
            alphabet = alphabet.replaceAll(result, "");
            return result;
        });

        this.inputedWords = [];
        this.word = "";
        // this.error = false;
        this.streak = 0;
    },
    validateWord: async function (word) {

        word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        for (let i = 0; i < this.letters.length; i++) {
            if (!word.includes(this.letters[i])) {
                // this.error = true;
                return 1;
            }
        }
        if (this.inputedWords.includes(word)) {
            return 2;
        }

        const rawData = await fetch(`https://api.dicionario-aberto.net/word/${word}`);
        const data = await rawData.json();

        if (!data.length) {
            return 3;
        }

        this.inputedWords.push(word)
        this.streak++;
        return 0;

    },

    validatLetter: function (word) {

        let isLetterFound = []
        if (word.includes(this.letters[0])) {
            isLetterFound[0] = true;
        }
        if (word.includes(this.letters[1])) {
            isLetterFound[1] = true;
        }
        if (word.includes(this.letters[2])) {
            isLetterFound[2] = true;
        }
        return isLetterFound;

    }

}



// https://api.dicionario-aberto.net/word/${word}