var score = 0;
// const startContainer = document.querySelector("#start-btn")
const startBtn = document.querySelector("#start-btn");
var container = document.getElementById('quiz-container');
var questionEl = document.getElementById('question');
var nextButton = document.getElementById('next-button');
var resultCont = document.getElementById('result');
var optionList = document.querySelector('.label-container')

// Modal
var modal = document.querySelector('.modal')
var modalClose = document.querySelector('.modal__close')
var modalBody = document.querySelector('.modal__body')
var modalClose = document.querySelector('.modal__close')

var que_count = 0
let que_numb = 1;
let userScore = 0;

// if startQuiz button clicked
startBtn.onclick = (e) => {
    e.preventDefault()
    modal.classList.add('open')
    container.classList.add("activeContainer"); //show info box
    // startContainer.classList.add('hide')
}

nextButton.onclick = () => {
    if (que_count < questions.length - 1) { //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function

        nextButton.classList.remove("show"); //hide the next button
    } else {

        showResult(); //calling showResult function
    }
}

modalClose.onclick = (e) => {
    e.preventDefault();
    modal.classList.remove('open');
    container.classList.remove("activeContainer");
}


function showQuetions(index) {
    const que_text = document.querySelector(".question");
    let img_gif = document.querySelector("#images-gif");
    let que_tag = questions[index].numb + ". " + questions[index].question;
    let que_img = questions[index].img;

    let option_tag = '<label class="option"><input type="radio" class="radio" name="option" value="1" /><span id="opt1">' + questions[index].options[0] + '</span></label>' +
        '<label class="option"><input type="radio" class="radio" name="option" value="1" /><span id="opt1">' + questions[index].options[1] + '</span></label>' +
        '<label class="option"><input type="radio" class="radio" name="option" value="1" /><span id="opt1">' + questions[index].options[2] + '</span></label>' +
        '<label class="option"><input type="radio" class="radio" name="option" value="1" /><span id="opt1">' + questions[index].options[3] + '</span></label>';
    que_text.innerHTML = que_tag;
    img_gif.innerHTML = que_img;

    optionList.innerHTML = option_tag;

    const option = optionList.querySelectorAll(".option");

    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer) {

    let userAns = answer.textContent;



    console.log(userAns);
    let correcAns = questions[que_count].answer;

    const allOptions = optionList.children.length;


    if (userAns == correcAns) { //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("active");
    } else {
        answer.classList.add("unactive");
        answer.children[0].classList.add('error');

        for (i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer 
                optionList.children[i].setAttribute("class", "option active");
                optionList.children[i].children[0].setAttribute("class", "success");
            }
        }
    }

    for (i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }

    nextButton.classList.add("show");
}

showQuetions(0)


function showResult() {
    const scoreText = document.querySelector('.score')
    container.classList.remove("activeContainer");

    resultCont.classList.add("activeResult");
    if (userScore > 3) { // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
    } else if (userScore > 1) { // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else { // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

const quitQuiz = document.querySelector(".quit-quiz");

// if quitQuiz button clicked
quitQuiz.onclick = (e) => {
    e.preventDefault();
    window.location.reload(); //reload the current window
}