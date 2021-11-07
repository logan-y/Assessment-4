

const goalsContainer = document.querySelector('#goals-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/goals`

const goalsCallback = ({ data: goals }) => displayGoals(goals)
const errCallback = err => console.log(err)

const getAllGoals = () => axios.get(baseURL).then(goalsCallback).catch(errCallback)
const createGoal = body => axios.post(baseURL, body).then(goalsCallback).catch(errCallback)
const deleteGoal = id => axios.delete(`${baseURL}/${id}`).then(goalsCallback).catch(errCallback)
const updateGoal = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(goalsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let goalText = document.querySelector('#goalText')
    let imageURL = document.querySelector('#img')
    let affirmText = document.querySelector('#affirmText')


    let bodyObj = {
        goalText: goalText.value, 
        imageURL: imageURL.value,
        affirmText: affirmText.value
    }

    createGoal(bodyObj)

    goalText.value = ''
    imageURL.value = ''
    affirmText.value = ''
}

function createGoalCard(goal) {
    const goalCard = document.createElement('div')
   goalCard.classList.add('goals-card')

    goalCard.innerHTML = `<img alt='otter image' src=${goal.imageURL} class="goal-image"/>
    <p class="goalText">${goal.goalText}</p>
 
    <div class="btns-container">
    <button onclick="updateGoal(${goal.id}, 'affirmations')">Want an alternate affirmation?</button>   
    <p class= "affirmText">${goal.affirmText}</p>
    <button onclick="updateGoal(${goal.id}, 'jokes')">How about a joke?</button>
    <br>
    </div>    
    <button onclick="deleteGoal(${goal.id})">delete goal</button>`
    goalsContainer.appendChild(goalCard)
}

function displayGoals(arr) {
    goalsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGoalCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllGoals()