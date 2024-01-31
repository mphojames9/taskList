const navBar = document.querySelector(".navBar");
const addForm = document.querySelector(".form");
const todayTaskEl = document.querySelector(".today_tasks");
const tommorowTaskEl = document.querySelector(".tomorrow_tasks");
const nextWeekTaskEl = document.querySelector(".nextWeek_tasks");
const overDueTaskEl = document.querySelector(".overdue_tasks");
const selectedFolder = document.querySelector(".folder");
const menuL1 = document.querySelector(".line1");
const menuL2 = document.querySelector(".line2");
const menuL3 = document.querySelector(".line3");

const weekDays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
function clearoard(){
    todayTaskEl.innerHTML = "";
    tommorowTaskEl.innerHTML = "";
    nextWeekTaskEl.innerHTML = "";
    overDueTaskEl.innerHTML = "";
}
function openNavBar(){
    navBar.classList.toggle("navBar_open");
    menuL1.classList.toggle("l1-rotate");
    menuL2.classList.toggle("l2-rotate");
    menuL3.classList.toggle("l3-rotate");
}

function displayForm(){
    addForm.style.display = "flex";
}

function closeForm(){
    addForm.style.display = "none";
}

//display today's Tasks
function fillterToday(){
    selectedFolder.innerHTML = "Today"
    todayTaskEl.style.display = "block";
    tommorowTaskEl.style.display = "none";
    nextWeekTaskEl.style.display = "none";
    overDueTaskEl.style.display = "none";
}

//display tommorow's Tasks
function fillterTomorrow(){
    selectedFolder.innerHTML = "Tomorrow";
    todayTaskEl.style.display = "none";
    tommorowTaskEl.style.display = "block";
    nextWeekTaskEl.style.display = "none";
    overDueTaskEl.style.display = "none";

}

//display nextWeek's Tasks
function fillterNextWeek(){
    selectedFolder.innerHTML = "Next week";
    todayTaskEl.style.display = "none";
    tommorowTaskEl.style.display = "none";
    nextWeekTaskEl.style.display = "block";
    overDueTaskEl.style.display = "none";
}

//display overDue Tasks
function fillterOverDue(){
    selectedFolder.innerHTML = "Over Due"
    todayTaskEl.style.display = "none";
    tommorowTaskEl.style.display = "none";
    nextWeekTaskEl.style.display = "none";
    overDueTaskEl.style.display = "block";
}

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

    function settingLocalStorage(){;
        myTaskList.push(newToDo);
        localStorage.setItem('data', JSON.stringify(myTaskList));
    }
    settingLocalStorage()
    renderTasks()
    radioChecker()

    document.querySelector(".input").value = "";
    document.querySelector(".dueDate").value = "";
}

function getLocalStorageItems(){
    const localStorageStringIteams = localStorage.getItem("data");
    let tasksToObejects = JSON.parse(localStorageStringIteams);
    return tasksToObejects;
}
    
function renderTasks(){
    clearoard()
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
                <i class="material-icons" onclick="deleteTask(${i})" style="font-size:26px;color:rgb(177, 34, 34)">delete</i>
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
    }
}

renderTasks();

function deleteTask(index){
 myTaskList.splice(index, 1)
localStorage.setItem('data', JSON.stringify(myTaskList));
 renderTasks();
}

function radioChecker(){
    const radios = document.querySelectorAll("input[name]")
    let valueChecked;
    for (radio of radios){
        if(radio.checked){
            valueChecked = radio.value;
        }
    }
    return valueChecked;
}