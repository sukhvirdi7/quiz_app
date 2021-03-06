const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('Correct')
  } else {
    element.classList.add('Wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('Correct')
  element.classList.remove('Wrong')
}

const questions = [
  {
    question: 'Who is the best team in the Premier League?',
    answers: [
      { text: 'Liverpool', correct: true },
      { text: 'Manchester City', correct: false }
    ]
  },
  {
    question: 'Who is the best footballer?',
    answers: [
      { text: 'Messi', correct: true },
      { text: 'Ronaldo', correct: false },
      { text: 'Neymar', correct: false },
      { text: 'Lewandowski', correct: false }
    ]
  },
  {
    question: 'Who is the best team in Europe?',
    answers: [
      { text: 'Bayern Munich', correct: false },
      { text: 'Liverpool', correct: true },
      { text: 'Barcelona', correct: false },
      { text: 'Real Madrid', correct: false }
    ]
  },
  {
    question: 'Will Liverpool win the Premier League?',
    answers: [
      { text: 'No', correct: false },
      { text: 'Yes', correct: true }
    ]
  }
]