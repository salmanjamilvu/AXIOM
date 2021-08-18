//Get Dome Elements
const word = document.getElementById("word");
const incorrectLetters = document.getElementById("incorrect-letters");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const playBtn = document.getElementById("play-btn");
const notification = document.getElementById("notification-container");

//Get Dome Elements
const figureParts = document.querySelectorAll(".figure-part");
const words = ["ten","route","cattle","roll","rain","tide", "triangle","swing","harbor", "effort","worker","rocky", "north","physical","becoming","sing","she","above", "weigh","later","chance","prize","deal","key", "reader","able","mountain","follow","least","knife", "bone","indicate","price","sure","dead","sail", "factory","rope","outer","ask","rest","joy"];

let selecteWord = words [Math.floor(Math.random() * words.length)];
// tracking array for correct and incorrect
const correctLettersArray = [];
const incorrectLettersArray = [];

//Function to display selectedWord in the DOM
function displayWord(argument) {
	//display selecter words
    word.innerHTML = `
        ${selecteWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLettersArray.includes(letter) ? letter : '' }
                </span>
            `).join('')
        }
    `
    //replace newline character and from inner word
    const innerWord = word.innerText.replace(/\n/g, '')

    //Compare inner word to selected word, if it's the same then game over and user won
    if(innerWord === selecteWord){
        finalMessage.innerText = "Congratulation! You Won!"
        popup.style.display = "flex"
    }
};

// Funstion to show the notification
function showNotification() {
    //add show class to the notification container
    notification.classList.add('show')
    //After 2 second, hide the notification
    setTimeout(()=>{
        notification.classList.remove('show')
    }, 2000)
}

//function to update incorrect letter
function updateIncorrectLetters() {
    //display incorrect latter
    incorrectLetters.innerHTML = `
        ${incorrectLettersArray.length > 0 ? '<p>Incorrect latter</p>' : ''}
        ${incorrectLettersArray.map(letter => `<span>${letter}</span>`)}
    `
    //display the hagman part
    figureParts.forEach((part, index) =>{
        //How many incorrect letters has the user guessed
        const error = incorrectLettersArray.length
        if (index < error) {
            part.style.display = 'block'
        }else{
            part.style.display = 'none'
        }
    })
    //check if user lost
    if (incorrectLettersArray.length === figureParts.length) {
        finalMessage.innerText = "You Lost!"
        popup.style.display = "flex"
    }
}

//Event handler
//1. Listen from keyboard
window.addEventListener('keydown', e =>{
    if (e.keyCode >=65 && e.keyCode <=90) {
        const letter = e.key
        //check letter is in the selected words
        if (selecteWord.includes(letter)) {
            //check if letter is already in correctLettersArray
            if (!correctLettersArray.includes(letter)) {
                //Add letter into the correctLettersArray
                correctLettersArray.push(letter)
                //Run displayWord function again to display new letter
                displayWord()
            }else{
                showNotification()
            }
        }else{
            //check if letter is already in incorrectLettersArray
            if (!incorrectLettersArray.includes(letter)) {
                //Add letter into the incorrectLettersArray
                incorrectLettersArray.push(letter)
                //Update the incorrect letters UI
                updateIncorrectLetters()
            }else{
                showNotification()
            }
        }
    }
})

// 2. Listen for click on play again button
playBtn.addEventListener('click', e =>{
    //Empty correctLettersArray & incorrectLettersArray
    correctLettersArray.splice(0)
    incorrectLettersArray.splice(0)
    //select new random word
    selecteWord = words [Math.floor(Math.random() * words.length)]
    //Clear incorrect letter display
    updateIncorrectLetters()
    //Hide popup
    popup.style.display = "none"
    //refresh displayWord
    displayWord();
})

//Execute displayWord on page load
displayWord();