//import functions
import openNavBar from "./navBar";
import fillterToday from "./fillterToday";
import fillterTomorrow from "./fillterTomorrow";
import fillterNextWeek from "./fillterNextWeek";
import fillterOverDue from "./fitterOverDue";
import radioChecker from "./radioChecker";
import clearBoard from "./clearBoard";

//Elemets
const menuBtn = document.querySelector(".menuBtn");
const addForm = document.querySelector(".form");
const addBtn = document.querySelector(".add");
const submitBtn = document.querySelector(".submit");
const todaySec = document.querySelector(".today");
const tomorrowSec = document.querySelector(".tomorrow");
const nextWeekSec = document.querySelector(".nextWeek");
const overDueSec = document.querySelector(".overDue");
const todayTaskEl = document.querySelector(".today_tasks");
const tommorowTaskEl = document.querySelector(".tomorrow_tasks");
const nextWeekTaskEl = document.querySelector(".nextWeek_tasks");
const overDueTaskEl = document.querySelector(".overdue_tasks");

//display today's tasks on startup
window.onload = fillterToday();

menuBtn.addEventListener("click", ()=>{
    openNavBar()
} )

//display form
addBtn.addEventListener("click",()=>{
    addForm.style.display = "flex";
});

//display today's tasks
todaySec.addEventListener("click",fillterToday);

//display tomorrow's items/tasks
tomorrowSec.addEventListener("click",fillterTomorrow);

//display tasks for nextWeek
nextWeekSec.addEventListener("click",fillterNextWeek);

//display overDue Tasks
overDueSec.addEventListener("click", fillterOverDue)

//Add task to lacal storage
submitBtn.addEventListener("click",addTask);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
Date.prototype.getNextWeekDay = function(d) {
    if (d) {
      let next = this;
      next.setDate(this.getDate() - this.getDay() + 7 + d);
      return next;
    }
  }
  
  let today = new Date();
  let nextSevenDays = today.getNextWeekDay(1); // 0 = Sunday, 1 = Monday, ...
  let secondNextMonday = new Date(nextSevenDays).getNextWeekDay(1);

  function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
formatDate()

let nextWeek = formatDate(nextSevenDays);
let AfterNext = formatDate(secondNextMonday);
let now = new Date();
let DayofToday = formatDate(now);
function getTomorrow() {
    now.setDate(now.getDate() + 1); // even 32 is acceptable
    return `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
}
let theNextDay = getTomorrow();
let tommorow = formatDate(theNextDay);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
let myTaskList = JSON.parse(localStorage.getItem('data')) || []

function Task(taskName, dueDate, priorityLevelChecked){
    this.taskName = taskName;
    this.dueDate = dueDate;
    this.priorityLevelChecked = priorityLevelChecked;

}

function addTask(event){
    event.preventDefault();
    

    let taskName = document.querySelector(".input").value;
    let dueDate = document.querySelector(".dueDate").value;
    let priorityLevelChecked = radioChecker();
    if(taskName === "" || dueDate === ""){
        return
    }
    addForm.style.display = "none";

    const newToDo = new Task(taskName, dueDate, priorityLevelChecked);

    //Local storage settigs
    function settingLocalStorage(){;
        myTaskList.push(newToDo);
        localStorage.setItem('data', JSON.stringify(myTaskList));
    }
    settingLocalStorage();//Save data to local Storage

    document.querySelector(".input").value = "";
    document.querySelector(".dueDate").value = "";

    renderTasks()

    console.log(priorityLevelChecked)


}

function getLocalStorageItems(){
    const localStorageStringIteams = localStorage.getItem("data");
    let tasksToObejects = JSON.parse(localStorageStringIteams);
    return tasksToObejects;
}

function renderTasks(){
    clearBoard()
     const eachTask = getLocalStorageItems();
        for (let i = 0; i < eachTask.length; i++){
            let myTasks = eachTask[i];
    
            const displayCard = document.createElement("div");
            displayCard.innerHTML = `
            <div class="card">
                <div class="taskName">
                    <div class="priorityLevel" style="background-color: ${myTasks.priorityLevelChecked};"></div>
                    <div class="name"><p>${myTasks.taskName}</p></div>
                </div>
                <div class="taskTools">
                    <div class="dueDate">${myTasks.dueDate}</div>
                    <div class="delete">
                    <i class="material-icons" style="font-size:26px;color:rgb(177, 34, 34)">delete</i>
                </div>
                </div>
            </div>`
            if(myTasks.dueDate === DayofToday){
                todayTaskEl.appendChild(displayCard);
            }
            if(myTasks.dueDate < DayofToday){
                overDueTaskEl.appendChild(displayCard)  
            }if(myTasks.dueDate === tommorow){
                tommorowTaskEl.appendChild(displayCard)
            }if(myTasks.dueDate >= nextWeek && myTasks.dueDate <= AfterNext){
                nextWeekTaskEl.appendChild(displayCard)
            }
            const deleteButtons = document.querySelectorAll(".material-icons");
            deleteButtons.forEach(deleteButton => deleteButton.addEventListener("click",(e)=>{
                deleteTask(i)
            }))
        }
    }

function deleteTask(index){
        myTaskList.splice(index, 1)
        localStorage.setItem('data', JSON.stringify(myTaskList));
        renderTasks();
        }
 window.onload = renderTasks();


    

