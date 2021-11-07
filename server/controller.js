const goals = require('./db.json')
let globalId = 3;

module.exports = {
    giveComps: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!",
                           "Cool shirt!",
                           "Your Javascript skills are stellar.",
        ];
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    giveFortunes: (req, res) => {
        const fortunes = ["Your life will be happy and peaceful.", 
        "Your dreams are never silly; depend on them to guide you.",
        "Your infinite capacity for patience will be rewarded sooner or later.", 
        "Your first love has never forgotten you.", 
        "You are interested in higher education, whether material or spiritual.",
        "You are almost there.", 
        "You have the power to write your own fortune.",
        "You will have gold pieces by the bushel.", 
        "You are working hard."];
      
        let randomFortIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomFortIndex];
      
        res.status(200).send(randomFortune);
    },

    getGoals: (req, res) => res.status(200).send(goals),

    deleteGoal: (req, res) => {
        let index = goals.findIndex(elem => elem.id === +req.params.id)
        goals.splice(index, 1)
        res.status(200).send(goals)
    },

    createGoal: (req, res) => {
        let {goalText, imageURL, affirmText} = req.body
        let newGoal = {
            id: globalId,
            goalText,
            imageURL,
            affirmText
        }
        goals.push(newGoal)
        res.status(200).send(goals)
        globalId++;
    },
    updateGoal: (req, res) => {
        let { id } = req.params
        let {type} = req.body
        let index = goals.findIndex(elem => +elem.id === +id)

        if(type === 'affirmations'){
            goals[index].affirmText = 'this is totally gonna be your year!';
            console.log('test of aff button');
            res.status(200).send(goals);
        } else if (type === 'jokes'){
            goals[index].affirmText = 'funnyJokeHere!';
            res.status(200).send(goals);
        } else {
            res.sendStatus(400);
        }
    }
}