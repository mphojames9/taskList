import renderTasks from "./index"

let myTaskList = JSON.parse(localStorage.getItem('data')) || []

export default function deleteTask(index){
myTaskList.splice(index, 1)
localStorage.setItem('data', JSON.stringify(myTaskList));
renderTasks();
}