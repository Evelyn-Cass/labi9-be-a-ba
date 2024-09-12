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
            alphabet = alphabet.replace(result, "");
            return result;
        });

        this.inputedWords = [];
        this.word = "";
        // this.error = false;
        this.streak = 0;
    },
    validateWord: async function (word) {
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

    }
}





// https://api.dicionario-aberto.net/word/${word}