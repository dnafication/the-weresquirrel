import { uuidv4 } from "./utils"
const activities = ["walk", "talk", "work", "gym", "fight"]
const food = ["pizza", "chips", "burger", "beer", "coke", "fanta"]

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function dummyData() {
  let data = []
  for (let index = 0; index < 100; index++) {
    data.push({
      id: uuidv4(),
      events: [getRandomItem(activities), getRandomItem(food)],
      squirrel: Math.random() >= 0.5,
    })
  }
  return data
}

export { dummyData }
