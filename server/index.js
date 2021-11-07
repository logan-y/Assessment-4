const express = require("express");
const cors = require("cors");

const app = express();
//somechanges


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const {
  giveComps,
  giveFortunes,
  getGoals,
  deleteGoal,
  createGoal,
} = require('./controller')

app.get(`/api/compliment`, giveComps)
app.get(`/api/fortune`, giveFortunes)
app.get(`/api/goals`, getGoals)
app.delete(`/api/goals/:id`, deleteGoal)
app.post(`/api/goals`, createGoal)



app.listen(4000, () => console.log("Server running on 4000"));
