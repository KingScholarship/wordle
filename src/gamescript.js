//word inputs
const words = ["abyss", "baste", "blare", "brawl", "clash", "crawl", "crypt", "dingy", "dross", "eclat", "embay", "epode", "epoch", "fable", "faint", "ferry", "fiefs", "foray", "frail", "frown", "gavel", "ghoul", "girth", "gloss", "gnome", "gorge", "gruff", "hasty", "havoc", "hoist", "hoard", "joust", "kiosk", "knack", "lacer", "latch", "lurid", "mirth", "moist", "moult", "myrrh", "nadir", "nasal", "naïve", "ogive", "opine", "pasty", "patio", "pique", "plumb", "prune", "quaff", "quail", "quark", "querl", "quern", "quoth", "ramen", "ranch", "ravel", "rebus", "risen", "rouse", "saute", "shrew", "shorn", "smite", "snide", "stave", "steep", "stoic", "stout", "strop", "swish", "synod", "tardy", "theme", "thyme", "tress", "troll", "trope", "trout", "umbra", "uncut", "unlit", "upend", "usurp", "vault", "veldt", "venom", "verve", "vogue", "voila", "vouch", "whelp", "whiff", "whoop", "wrath", "wreak", "wryly", "yacht", "yokel", "zesty"];

var word = "";
var currentIndex = 0;
var tries = 0;

var resultDisplayed = false;

var rows = 6;
var columns = words[0].length;

const letterElements = document.getElementsByClassName('letters');
const letterContainer = document.getElementsByClassName('container')[0];

const displayResultElement = document.getElementsByClassName('result')[0];
const resultContainer = document.getElementsByClassName('result-container')[0];

document.addEventListener('DOMContentLoaded', (event) => {
    //whenever the DOM loaded we call restart
    restart();
})

document.addEventListener('keydown', (event)=> {
    const key = event.key.toUpperCase();
    
    //if result is currently displaying, dont handle inputs
    if (resultDisplayed === true) return;

    handleInputs(key);
})

const handleInputs = (key) => {

    //check letter row
    if (key === "ENTER") {
        checkCorrectAnswer(letterElements);
        console.log(currentIndex);
        return;
    }

    //remove letter
    if (key === "BACKSPACE" && currentIndex > 0) {
        --currentIndex;
        letterElements[(tries * columns) + currentIndex].innerHTML = "";
        return;
    }

    //add letter

    const keyASCII = key.charCodeAt(0);

    //key must only be a letter, and dont add if ever we reach column limit
    if (key.length !== 1 || currentIndex >= columns) return;
    if (keyASCII < 65 || keyASCII > 90) return;

    //add the letter
    letterElements[(tries * columns) + currentIndex].innerHTML = key;
    
    //increment currentIndex
    if (currentIndex < columns) currentIndex++;
}

const checkCorrectAnswer = () => {

    //if the columns is not yet filled, stop
    if (currentIndex !== columns) return;

    //counter for correct letters in the word
    let correct = 0;

    //loop through the letters in the input
    for (let i = 0; i < columns; i++) {
        //letterElement = div ; letterInput = text
        let letterElement = letterElements[tries * 5 + i];
        let letterInput = letterElement.innerHTML;

        //check if input equals at the correct position in the word
        if (letterInput === word[i]) {

            //concatenate classname with correct to indicate correct answer and increment counter
            letterElement.className += " correct";
            ++correct;

        } else {

            //check if the letter exists in the word
            if (word.includes(letterInput)) {
                //if it exists then concatenate classname with exist indicating it exists in the word
                letterElement.className += " exist";
            } else {
                //otherwise establish it as wrong letter and does not exist in the word
                letterElement.className += " wrong";
            }
        }
    }

    //if ever the counter equals to the length of the columns, meaning it is the correct answer, then concatenate the container displaying the correct answer
    if (correct === columns) {
        displayResult("win");
        return;
    }

    //increment number of tries
    ++tries;

    //if ever we ran out of tries, we concatenate the container displaying the correct answer
    if (tries === rows) {
        displayResult("lose");
        return;
    }

    //otherwise, just add another row of letter input boxes and set the currentIndex back to 0
    letterContainer.innerHTML += '<div class="letters"></div>\n<div class="letters"></div>\n<div class="letters"></div>\n<div class="letters"></div>\n<div class="letters"></div>\n';
    currentIndex = 0;
}

const randomWordChoose = () => {
    //get randomIndex and choose a word through the randomIndex
    let randomIndex = getRandomInt(0, words.length - 1);
    word = (words[randomIndex]).toUpperCase();

}

//not my function
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const restart = () => {
    //choose random word and then print to console the word
    randomWordChoose();
    console.log("Word Chosen: " + word);

    //set everything back to 0
    currentIndex = 0;
    tries = 0;

    //set the container into just 1 input row of boxes
    letterContainer.innerHTML = '<div class="letters"></div>\n<div class="letters"></div>\n<div class="letters"></div>\n<div class="letters"></div>\n<div class="letters"></div>\n';

    //hide result
    displayResultElement.className = "result";
    resultContainer.style.display = "none";

    //set resultDisplayed to false
    resultDisplayed = false;
}

const displayResult = (result) => {

    //display correct answer
    letterContainer.innerHTML += '<div class="letters correct-answer">' + word[0] + '</div>\n<div class="letters correct-answer">' + word[1] + '</div>\n<div class="letters correct-answer">' + word[2] + '</div>\n<div class="letters correct-answer">' + word[3] + '</div>\n<div class="letters correct-answer">' + word[4] + '</div>\n';

    //handle results
    if (result === "win") {
        displayResultElement.className += " win";
        displayResultElement.innerHTML = '<span class="resultdisplay">YOU WIN!</span><br><br>Click the Top-Right Icon to restart'; 
        resultContainer.style.display = "";
    } else if (result === "lose") {
        displayResultElement.className += " lose";
        displayResultElement.innerHTML = '<span class="resultdisplay">YOU LOSE!</span><br><br>Better luck next time! Click the Top-Right Icon to restart';
    }

    //show result
    resultContainer.style.display = "block";

    //prevent input handling
    resultDisplayed = true;
}