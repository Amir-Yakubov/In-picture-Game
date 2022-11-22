
var gCurrQuestIdx
var gQuests

const onLoadSound = new Audio('Materials/sound/onLoad.mp3');
const smallVictorySound = new Audio('Materials/sound/smallWin.mp3');
const bigVictorySound = new Audio('Materials/sound/bigWin.mp3');
const lossSound = new Audio('Materials/sound/smallLoss.mp3');

function onInitGame() {
    gQuests = createQuests(3)
    gCurrQuestIdx = 0
}

function renderQuest() {
    var strHtml = ''

    var questionText = document.querySelector('.question-text')
    questionText.innerText = gQuests[gCurrQuestIdx].question

    var questionImg = document.querySelector('.question-img')
    questionImg.src = `Materials/img/${gCurrQuestIdx + 1}.jpg`

    var opts = gQuests[gCurrQuestIdx].opts

    for (var i = 0; i < opts.length; i++) {
        strHtml += ` <button class="board answer-btn" onclick="checkAnswer(this, ${i})">${opts[i]}</button>`
        if (i === 1) strHtml += '<br>'
    }

    var answerBox = document.querySelector('.answer-box')
    answerBox.innerHTML = strHtml
}

function checkAnswer(elAns, optIdx) {

    if (gQuests[gCurrQuestIdx].correctOptIndex !== optIdx) {
        lossSound.play()
        elAns.classList.add('wrongAns')
        return
    }

    if (gCurrQuestIdx === 2) {
        elAns.classList.add('correctAns')
        setTimeout(victoryMsg, 1500)
        setTimeout(renderRestartBtn, 1500)
        return
    }

    smallVictorySound.play()
    gCurrQuestIdx++
    elAns.classList.add('correctAns')
    setTimeout(renderQuest, 3000)
}

function onStartClick() {
    onLoadSound.play()
    setTimeout(renderQuest, 1500)

    var elBtn = document.querySelector('.button-1')
    elBtn.classList.add('inves')
}

function victoryMsg() {
    bigVictorySound.play()

    var questionText = document.querySelector('.question-text')
    questionText.innerText = `Congratulations! you won`

    var questionImg = document.querySelector('.question-img')
    questionImg.src = `Materials/img/money.png`

    var answerBox = document.querySelector('.answer-box')
    answerBox.innerHTML = ``

}

function createQuests(numberOfQuestions) {
    var setOfQuestions = []
    var currQuestion = {}

    var questions = [
        '1. In witch language is the following code written in?',
        '2. The following CSS code refers to?',
        '3. How many active functions in the following code?'
    ]

    var opts = [
        ['1. HTML', '2. CSS', '3. Java-Script', '4. Java'],
        ['1. tag', '2. class', '3. id', '4. span'],
        ['1. none', '2. 1', '3. 5', '4. 4']
    ]

    for (var i = 0; i < numberOfQuestions; i++) {
        currQuestion = {
            id: i + 1,
            question: questions[i],
            opts: opts[i],
            correctOptIndex: i
        }
        setOfQuestions.push(currQuestion)
    }
    return setOfQuestions
}

function renderRestartBtn() {
    var elBtn = document.querySelector('.button-1')
    elBtn.innerText = 'Restart!'
    elBtn.classList.remove('inves')
    gCurrQuestIdx = 0
}


