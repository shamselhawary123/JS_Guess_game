let gameName = "Guess the word";
document.title = gameName;
document.querySelector('h1').innerText = gameName; 
document.querySelector('footer').innerText = `${gameName} game - By: Shams Elhawary😊 © ${new Date().getFullYear()}`;

// setting game options

let numbersofTries = 6;
let numbersofLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// manage words
let wordToGuess = "";
const words =["Create","Update","Delete","Master","Branch","Mainly","Sondos","School","Shahab"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLocaleLowerCase(); 

// manage hints
document.querySelector('.hint span').innerHTML = numberOfHints;
const getHintBtn = document.querySelector('.hint');
getHintBtn.addEventListener('click', getHint);


let messageArea = document.querySelector('.message');

function generateInput() {
    let inputContainer = document.querySelector('.inputs');

    for(let i = 1; i <= numbersofTries; i++) {
        let tryDiv = document.createElement('div');
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;
        inputContainer.appendChild(tryDiv);

        if(i !== 1) tryDiv.classList.add('disabled-inputs');

        for(let j = 1; j <= numbersofLetters; j++) {
            let input = document.createElement('input');
            input.type = 'text';
            input.id = `try-${i}-letter-${j}`;
            input.setAttribute('maxlength', '1');
            tryDiv.appendChild(input);
        }
        inputContainer.appendChild(tryDiv);
    }
    // focus on the first input
    inputContainer.children[0].children[1].focus();

    // Disable all inputs except the first one
    const inputsInDisabledDiv = document.querySelectorAll('.disabled-inputs input');
    inputsInDisabledDiv.forEach(input => input.disabled = true);
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input,index ) => {
        // toUpperCase
        input.addEventListener('input', function(){
            this.value = this.value.toUpperCase();
            // console.log(index);
            const nextInput = inputs[index + 1];
            if(nextInput) nextInput.focus();
        });

        input.addEventListener('keydown', function(e){
            // console.log(e)
            const currentIndex = Array.from(inputs).indexOf(e.target);
            // console.log(currentIndex);
            
            if(e.key === "ArrowRight"){
                const nextInput = currentIndex + 1;
                if(nextInput < inputs.length) inputs[nextInput].focus();
            }

            if(e.key === "ArrowLeft"){
                const PrevInput = currentIndex - 1;
                if(PrevInput >= 0 ) inputs[PrevInput].focus();
            }
        });
    });
}
const checkBtn = document.querySelector('.check');
checkBtn.addEventListener('click',handeleGuess); 

// console.log(wordToGuess);
function handeleGuess(){
    let successGuess = true;
    for(let i = 1; i <= numbersofLetters; i++){
        let inputField = document.querySelector(`#try-${currentTry}-letter-${i}`);
        let letter = inputField.value.toLowerCase();
        // console.log(letter);
        let actualLetter = wordToGuess[i - 1];

        //Game logic
        if(letter === actualLetter){
            inputField.classList.add('yes-in-place');
        }else if (wordToGuess.includes(letter) && letter !== ""){
            inputField.classList.add('not-in-place');
            successGuess = false;
        }else{
            inputField.classList.add('wrong');
            successGuess = false;
        }
    }
    // check if the user won or lose
    if(successGuess){
        messageArea.innerHTML = `You win The word is <span>${wordToGuess}</span>`;
        if (numberOfHints === 2){
            messageArea.innerHTML= `<p><span>Great Job!</span> You won the game without using hints</p>`;
        }
        // Disable all inputs
        let allTries = document.querySelectorAll('.inputs > div');
        allTries.forEach(tryDiv => tryDiv.classList.add('disabled-inputs'));

        // disable the check button

        checkBtn.disabled = true;
        getHintBtn.disabled = true;
   
    }else{
        document.querySelector(`.try-${currentTry}`).classList.add('disabled-inputs');
        const currentTryinputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryinputs.forEach((input) => (input.disabled = true));

        currentTry++;

    const nextTry = document.querySelectorAll(`.try-${currentTry} input`);
        nextTry.forEach((input) => (input.disabled = false));

        let el = document.querySelector(`.try-${currentTry}`);
        if (el){
        document.querySelector(`.try-${currentTry}`).classList.remove('disabled-inputs');
        el.children[1].focus();
        }else{
            checkBtn.disabled = true;
            getHintBtn.disabled = true;

            messageArea.innerHTML = `You lose The word is <span>${wordToGuess}</span>`;
        }
}}

function getHint(){
    if(numberOfHints > 0){
        numberOfHints--;
        document.querySelector('.hint span').innerHTML = numberOfHints;
    }
    if(numberOfHints === 0){
        getHintBtn.disabled = true;
    }

    const enabledInputs = document.querySelectorAll('input:not([disabled])');
    // console.log(enabledInputs);
    const emptyEnabledInputs = Array.from(enabledInputs).filter(input => input.value === "");
    // console.log(emptyEnabledInputs);

    if (emptyEnabledInputs.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);

        if (indexToFill !== -1){
        randomInput.value = wordToGuess[indexToFill].toUpperCase(); 
        }
    }
}

function handelBackspace(e){
    if(e.key === "Backspace"){
        const inputs = document.querySelectorAll('input:not([disabled])');
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);

        if(currentIndex > 0){
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
    }}
}

document.addEventListener('keydown', handelBackspace);



 // Add reload button functionality
const reloadBtn = document.querySelector('.reload');
reloadBtn.addEventListener ('click', reloadGame);


function reloadGame(){
    window.location.reload();
}


window.onload = function(){
    generateInput();
}