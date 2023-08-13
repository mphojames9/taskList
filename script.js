const input = document.querySelector(".input");
const submitBtn = document.querySelector(".submit");
const taskHolder = document.querySelector(".tasks");
const pendingNumber = document.querySelector(".count");

function addTask(){
    const task = input.value;
    if(!task){
        return
    }
    else{
        let li = document.createElement("li");
        li.classList.add("list")
        li.innerHTML = task;
        taskHolder.appendChild(li);
        let checkBox = document.createElement("checkBox");
        checkBox.classList.add("not")
        checkBox.innerHTML = "&#10003"
        li.appendChild(checkBox);
        let deleteButton = document.createElement("deleteButton");
        deleteButton.classList.add("deleteButton");
        deleteButton.innerHTML = "x";
        li.appendChild(deleteButton);
        save();
    }
    input.value = "";
    pandingTasks()
    
}

taskHolder.addEventListener("click", function(e){
    if(e.target.tagName === "DELETEBUTTON"){
        e.target.parentElement.remove();
        pandingTasks()

    }
    else if(e.target.tagName === "CHECKBOX"){
        e.target.classList.toggle("checked")
    }
    save()

});

function save(){
    localStorage.setItem("data", taskHolder.innerHTML);
    localStorage.setItem("num", pendingNumber.innerHTML);
}

function getLocalStarage(){
    taskHolder.innerHTML = localStorage.getItem("data");
    pendingNumber.innerHTML = localStorage.getItem("num");
    
}
function clearLocalStorage(){
    localStorage.clear();
    getLocalStarage();
    save()
    pandingTasks()
}

function pandingTasks(){
    let num = taskHolder.childNodes.length;
    if(num === 0){
        pendingNumber.innerHTML = "No Tasks to show, please add";
    }else if(num === 1){
        pendingNumber.innerHTML = `You have ${num} pending task`;
    }
    else{
        pendingNumber.innerHTML = `You have ${num} pending tasks`;
        save()
    }

}
getLocalStarage();

