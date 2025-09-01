//word inputs
const words = ["apple", "plant", "story", "water", "light", "spoon", "happy", "table", "river", "dream", "house", "heart", "music", "night", "clock", "chair", "bread", "green", "train", "beaches", "flower", "phone", "ghost", "shark", "magic", "mouse", "noble", "ocean", "party", "quiet", "roads", "smile", "tiger", "unity", "vital", "waves", "young", "zebra", "adult", "blank", "craft", "dance", "eager", "faith", "giant", "honey", "ideal", "jolly", "kneel", "learn"];

const numberOfLetters = 5;
const numberOfTries = 5;

var word = "";
var currentIndex = 0;
var tries = 0;

var resultDisplayed = false;

var rows = numberOfTries + 2;
var columns = numberOfLetters;

const letterElements = document.getElementsByClassName('letters');
const letterContainer = document.getElementsByClassName('container')[0];

const displayResultElement = document.getElementsByClassName('result')[0];
const resultContainer = document.getElementsByClassName('result-container')[0];

const keyboardElement = document.getElementsByClassName('keyboard')[0];
const keyboardInputs = document.getElementsByClassName('keys');

document.addEventListener('DOMContentLoaded', (event) => {
    //whenever the DOM loaded we call restart
    restart();

    //setting eventListeners to each key
    for (let i = 0; i < keyboardInputs.length; i++) {
        let key = keyboardInputs[i];        

        if (key.innerHTML.length > 8) {
            console.log(key.addEventListener('click', (event) => {
                handleInputs("BACKSPACE");
            }));
            continue;
        }

        key.addEventListener('click', (event) => {
            handleInputs(key.innerHTML);
        })
    }
})

document.addEventListener('keydown', (event)=> {
    const key = event.key.toUpperCase();
    
    //if result is currently displaying, dont handle inputs
    if (resultDisplayed === true) {
        if (key == "ENTER") {
            restart();
        }
        return;
    }

    handleInputs(key);
})

const handleInputs = (key) => {

    //check letter row
    if (key === "ENTER") {
        checkCorrectAnswer(letterElements);
        return;
    }

    //remove letter
    if (key === "BACKSPACE" && currentIndex > 0) {
        handleInputBackSpace();
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

const handleInputEnter = () => {
    checkCorrectAnswer();
}

const handleInputBackSpace = () => {
    --currentIndex;
    letterElements[(tries * columns) + currentIndex].innerHTML = "";
}

const checkCorrectAnswer = () => {

    //if the columns is not yet filled, stop
    if (currentIndex !== columns) return;

    //counter for correct letters in the word
    let correct = 0;

    //loop through the letters in the input
    for (let i = 0; i < columns; i++) {
        //tries * columns + i represents the current index element;

        //letterElement = div ; letterInput = text
        let letterElement = letterElements[tries * columns + i];
        let letterInput = letterElement.innerHTML;

        //check if input equals at the correct position in the word
        if (letterInput === word[i]) {

            //concatenate classname with correct to indicate correct answer and increment counter
            concatenateClassName(letterInput, "correct", letterElement);

            ++correct;

        } else {

            //check if the letter exists in the word
            if (word.includes(letterInput)) {
                //if it exists then concatenate classname with exist indicating it exists in the word
                concatenateClassName(letterInput, "exist", letterElement);
            } else {
                //otherwise establish it as wrong letter and does not exist in the word
                concatenateClassName(letterInput, "wrong", letterElement);
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
    if (tries === numberOfTries) {
        displayResult("lose");
        return;
    }

    //otherwise, just add another row of letter input boxes and set the currentIndex back to 0
    for (let i = 0; i < columns; i++) {
        letterContainer.innerHTML += '<div class="letters"></div>\n';
    }
    currentIndex = 0;
}

const concatenateClassName = (letterInput, status, letterElement) => {
    for (let j = 0; j < keyboardInputs.length; j++) {
        if (keyboardInputs[j].innerHTML == letterInput) {
            keyboardInputs[j].className += ' ' + status;
            
            if (status == 'wrong') keyboardInputs[j].style.backgroundColor = "var(--unusable)";
            else keyboardInputs[j].style.backgroundColor = "var(--" + status + ")";

            
            break;
        }
    }
    
    letterElement.className += ' ' + status;
}

const randomWordChoose = () => {
    //get randomIndex and choose a word through the randomIndex
    let randomIndex = getRandomInt(0, words.length - 1);

    if (words[randomIndex].length != numberOfLetters) return randomWordChoose();

    return word = (words[randomIndex]).toUpperCase();
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

    //set the container's grid to adjust to columns and rows inputs
    // letterContainer.style.gridTemplateColumns = rows;
    letterContainer.style.gridTemplateColumns = 'repeat(' + numberOfLetters + ', 1fr)';
    letterContainer.style.gridTemplateRows = 'repeat(' + (numberOfTries + 2) + ', 1fr)';
    letterContainer.style.height = (110 * numberOfTries) + 'px';
    letterContainer.style.width = (100 * columns) + 'px';

    //set the container into just 1 input row of boxes
    letterContainer.innerHTML = '';
    for (let i = 0; i < columns; i++) {
        letterContainer.innerHTML += '<div class="letters"></div>\n';
    }

    keyboardElement.innerHTML = '<div class="keys">Q</div>\n<div class="keys">W</div>\n<div class="keys">E</div>\n<div class="keys">R</div>\n<div class="keys">T</div>\n<div class="keys">Y</div>\n<div class="keys">U</div>\n<div class="keys">I</div>\n<div class="keys">O</div>\n<div class="keys">P</div>\n<div class="keys">A</div>\n<div class="keys">S</div>\n<div class="keys">D</div>\n<div class="keys">F</div>\n<div class="keys">G</div>\n<div class="keys">H</div>\n<div class="keys">J</div>\n<div class="keys">K</div>\n<div class="keys">L</div>\n<div class="keys">Z</div>\n<div class="keys" style="grid-column: span 2;">ENTER</div>\n<div class="keys">X</div>\n<div class="keys">C</div>\n<div class="keys">V</div>\n<div class="keys">B</div>\n<div class="keys">N</div>\n<div class="keys">M</div>\n<div class="keys" style="grid-column: span 2;"><i class="fa-solid fa-delete-left"></i></div>';

    //hide result
    displayResultElement.className = "result";
    resultContainer.style.display = "none";

    //set resultDisplayed to false
    resultDisplayed = false;
}

const displayResult = (result) => {

    //display correct answer
    for (let i = 0; i < columns; i++) {
        letterContainer.innerHTML += '<div class="letters correct-answer">' + word[i] + '</div>\n';
    }

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