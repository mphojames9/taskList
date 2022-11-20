const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const toDoList = document.querySelector('.todoList');
const clearBtn = document.querySelector('.footer button');

inputBox.addEventListener('keyup', ()=>{
    let userData = inputBox.value;
    if(userData != 0){
        addBtn.classList.add('active');
    }
    else {
        addBtn.classList.remove('active')
    }
})
dispalyTask()

addBtn.addEventListener('click', ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem('New Todo');
    if(getLocalStorage == null){
        listArr= [];
        //This means that if localStorage is null, blank array will be created
    } 
    else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem('New Todo', JSON.stringify(listArr));
    if(userData == ''){
        return
    }
    dispalyTask()
    const pendingNumber = document.querySelector('.pendingTask');
    pendingNumber.textContent = listArr.length
})

function dispalyTask(){//Displaying task that must be completed
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem('New Todo');
    if(getLocalStorage == null){
        listArr= [];
        //This means that if localStorage is null, blank array will be created
    } 
    else{
        listArr = JSON.parse(getLocalStorage);
    }

    let newLitag = '';
    listArr.forEach((element, index) => {
        newLitag += `<li> ${element} <span onclick="deleteTask(${index})"; ><div class="#">Delete</div></span></li>`;
    });
    toDoList.innerHTML = newLitag;
    inputBox.value = '';
}

function deleteTask(index){//Deleting each task
    let getLocalStorage = localStorage.getItem('New Todo');
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    const pendingNumber = document.querySelector('.pendingTask');//pending number
    pendingNumber.textContent = listArr.length//pending number length and number count
    localStorage.setItem('New Todo', JSON.stringify(listArr));
    dispalyTask();
}

clearBtn.addEventListener('click', ()=>{//To clear all pendind Tasks
    listArr = [];
    localStorage.setItem('New Todo', JSON.stringify(listArr));
    const pendingNumber = document.querySelector('.pendingTask');
    pendingNumber.textContent = listArr.length
    if(listArr.length = 0){
        clearBtn.classList.add('active');
    }
    else {
        clearBtn.classList.remove('active')
    }
    dispalyTask();
})
const pendingNumber = document.querySelector('.pendingTask');
pendingNumber.textContent = listArr.length


