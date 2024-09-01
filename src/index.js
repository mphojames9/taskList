

let newTaskBtn = document.querySelector('.newTodoBtn')
let newProjectBtn = document.querySelector('.projectBtn');
let newTaskPopUp = document.querySelector('.addTaskPopUp');
const newProjectPopUp = document.querySelector('.addProjectPopUp');
let cancelBtn = document.querySelectorAll('.cancel')
let saveFolder = document.querySelector('#saveTo');
let disabled = document.querySelector('.disable')
let deletePopUp = document.querySelector('.hiddenCont')
let saveOption = document.querySelector('.selectFolder')

newProjectBtn.addEventListener('click', () => {
    newProjectPopUp.style.visibility = "visible";
    newProjectPopUp.style.zIndex = '2'
    disabled.style.visibility = 'visible'
})

newTaskBtn.addEventListener('click', () => {
    saveOption.style.display = "block"
    errDiv.style.display = 'none'
    newAddBtn.style.display = 'none'
    addTaskBtn.style.display = 'inline'
    emptify()
    newTaskPopUp.style.zIndex = '2'
    newTaskPopUp.style.visibility = 'visible';
    disabled.style.visibility = 'visible'
})


cancelBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        newProjectPopUp.style.visibility = "hidden";
        newTaskPopUp.style.visibility = 'hidden';
        disabled.style.visibility = 'hidden'
        deletePopUp.style.visibility = 'hidden'
    })
})

let projectName = document.querySelector("#projectName")
let projectSubmit = document.querySelector(".addToProject");
let content = document.querySelector('.content')
let projectList = document.querySelector('.projectList');
let LOCAL_STORAGE_KEY = 'tsk.lists'
let projectArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [{ "name": "Tasks", 'task': [] }];
let singleTasks = document.querySelector('.tasks')

function createProject(name) {
    return { name: name, id: name, task: [] }
};

let x = false;

function check() {
    projectList.childNodes.forEach(el => {
        if (el.textContent == projectName.value) {

            x = true
        }
    })
}

function lol() {
    projectArray.forEach(arr => {
        if (arr.name != "Tasks") {
            let newProject = document.createElement('button');
            newProject.textContent = arr.name;
            projectList.appendChild(newProject);
        }
    })
}

function start() {
    lol()
    forPopUp()
    renderList()
    renderTask()
    proDelete()
    projectStyle()
    btnFunc()
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projectArray))
}

let activeBtn = 'Tasks';

singleTasks.classList.add('activeBtn')

singleTasks.addEventListener('click', () => {
    activeBtn = 'Tasks'
    singleTasks.classList.add('activeBtn')
    renderTask()

    projectList.childNodes.forEach(btn => {
        btn.classList.remove('activeBtn')
    })
})

projectSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    disabled.style.visibility = 'hidden'
    if (projectName.value == "") {
        return
    } else {
        check()
        if (x == true) {
            let err = document.querySelector('.error')
            err.textContent = 'Name Already Exists!'
            newProjectPopUp.appendChild(err)
            x = false
            return
        }
        else {
            let err = document.querySelector('.error')
            err.textContent = ''
            projectArray.push(createProject(projectName.value));

            let child = projectList.lastElementChild
            while (child) {
                projectList.removeChild(child)
                child = projectList.lastElementChild
            }

            lol()
            forPopUp()
            proDelete()
            renderList()
            projectStyle()
            btnFunc()
            save()
            projectName.value = '';
            newProjectPopUp.style.visibility = 'hidden'

        }
    }
})

function projectStyle() {
    projectList.childNodes.forEach(btn => {

        if (btn.textContent == activeBtn) {
            btn.classList.add('activeBtn')
            singleTasks.classList.remove('activeBtn')
        } else {
            btn.classList.remove('activeBtn')
        }
    })
}

function btnFunc() {
    projectList.childNodes.forEach(el => {

        el.addEventListener('click', () => {
            activeBtn = el.textContent;
            renderTask()
            projectStyle()
        })
    })
}

let contentDiv = document.createElement('div')
contentDiv.classList.add('noContent')


function noContent() {
    contentDiv.style.display = "flex"
    content.style.alignItems = 'center'
    content.style.display = 'flex'
    content.style.justifyContent = 'center'
    content.appendChild(contentDiv)
}


function renderTask() {
    projectArray.forEach(li => {
        if (li.name == activeBtn) {
            let forCont = document.createElement('div');

            if (li.task.length == 0) {
                clearEl(content)
                noContent()
            } else {
                contentDiv.style.display = 'none'
                content.style.display = 'inline'
                clearEl(content)
                li.task.forEach(tsk => {
                    let titleLi = document.createElement('h3');
                    titleLi.classList.add('clickDiv')
                    let due = document.createElement('div');
                    if (tsk.date == '') {
                        due.textContent = 'No Specified Due-Date'
                    } else {
                        due.textContent = tsk.date
                    }

                    let wrapper = document.createElement('div')
                    let initialView = document.createElement('div');
                    initialView.classList.add('initial')
                    let deleteBtn = document.createElement('div');
                    deleteBtn.classList.add('taskDelete')
                    deleteBtn.classList.add('deleteBtn')
                    initialView.appendChild(titleLi)
                    titleLi.textContent = tsk.title
                    wrapper.classList.add('task-wrapper')
                    forCont.classList.add('taskCont')
                    let expandDiv = document.createElement('div')
                    expandDiv.classList.add('expand')


                    let dateDiv = document.createElement('div')
                    let dateContent = document.createElement(`span`)
                    dateContent.classList.add('text-style')
                    dateContent.textContent = 'Due-Date:' + ` ${tsk.date}`

                    dateDiv.appendChild(dateContent)
                    //dateDiv.textContent = ` ${tsk.date}`
                    let desDiv = document.createElement('div')
                    desDiv.textContent = `Description: ${tsk.des}`
                    let prioDiv = document.createElement('div')
                    prioDiv.textContent = `Priority: ${tsk.prio}`
                    let edit = document.createElement('div')
                    edit.classList.add('taskEdit')

                    edit.classList.add('editBtn')

                    expandDiv.appendChild(desDiv)
                    expandDiv.appendChild(dateDiv)
                    expandDiv.appendChild(prioDiv)

                    let menu = document.createElement('div')
                    menu.classList.add('task-control')
                    menu.appendChild(edit)
                    menu.appendChild(deleteBtn)


                    wrapper.appendChild(initialView)
                    wrapper.appendChild(expandDiv)
                    initialView.appendChild(menu)
                    forCont.appendChild(wrapper)
                    let prioColor = document.createElement('div')
                    prioColor.classList.add('prioColor')
                    menu.appendChild(prioColor)

                    if (tsk.prio == "Low") {
                        prioColor.style.backgroundColor = '#00ff26'
                    } else if (tsk.prio == "Medium") {
                        prioColor.style.backgroundColor = '#c3ff00'
                    } else if (tsk.prio == "High") {
                        prioColor.style.backgroundColor = '#ff0800'
                    }
                })
            }
            saveFolder.value = activeBtn
            content.appendChild(forCont)
            edit()
            deleteFn()
            expand()
            edit()
            save()
        }
    })
}

function clearEl(name) {
    let child = name.lastElementChild
    while (child) {
        name.removeChild(child)
        child = name.lastElementChild
    }
}

function forPopUp() {
    clearEl(saveFolder)

    projectArray.forEach(el => {
        let newOpt = document.createElement('option')
        newOpt.textContent = el.name;


        saveFolder.appendChild(newOpt)
    })
}

let taskName = document.querySelector('#taskName');
let taskDes = document.querySelector('#taskDescription');
let taskDue = document.querySelector('#taskDue');
let taskPrio = document.querySelectorAll('.taskPrio')
let priority = '';

function getPrio() {
    taskPrio.forEach(prio => {
        prio.addEventListener('click', () => {
            priority = prio.valu
        }
        )
    })
}

getPrio()

function getTask(title, description, date, priority) {
    return { title: title, des: description, date: date, prio: priority }

}

let addTaskPopUp = document.querySelector('.addTaskPopUp')
let addTaskBtn = document.querySelector('.addToTask');

function pushTask() {
    projectArray.forEach(el => {
        if (saveFolder.value == el.name) {
            el.task.push(getTask(taskName.value, taskDes.value, taskDue.value, priority))

        } else if (saveFolder.value == 'tasks') {
            if (el.name == 'Tasks') {
                el.task.push(getTask(taskName.value, taskDes.value, taskDue.value, priority))
            }
        }
    })
}

function expand() {
    let allTask = document.querySelectorAll('.clickDiv')
    allTask.forEach(task => {

        task.addEventListener('click', () => {
            task.parentNode.parentNode.lastChild.classList.toggle('expand')
        })
    })
}

function deleteFn() {
    let allDeleteBtn = document.querySelectorAll('.deleteBtn')
    allDeleteBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            projectArray.forEach(tsk => {
                if (activeBtn == tsk.name) {
                    tsk.task.forEach(el => {
                        if (el.title == btn.parentNode.parentNode.firstChild.textContent) {
                            let index = tsk.task.indexOf(el)

                            tsk.task.splice(index, 1)
                        }
                    })
                    renderTask()

                }
            })
        })
    })
}

function emptify() {
    taskName.value = ''
    taskDes.value = ''
    taskDue.value = ''
    taskPrio.value = ''
}

let t = ''

function checkName() {
    projectArray.forEach(pro => {
        pro.task.forEach(tsk => {
            if (tsk.title == taskName.value) {

                t = true
            }
        })
    })
}

let errDiv = document.createElement('div')
errDiv.textContent = 'Task Already Exists!'
errDiv.style.display = 'none'
newTaskPopUp.appendChild(errDiv)

addTaskBtn.addEventListener('click', (e) => {
    errDiv.style.display = 'none'
    if (taskName.value == '') {
        return
    }

    e.preventDefault()
    checkName()

    if (t == true) {
        errDiv.style.display = 'block'
        t = false
        return;

    } else {
        pushTask();
        renderTask()
        emptify()
        taskName.style.border = "none"
        addTaskPopUp.style.visibility = 'hidden'
        disabled.style.visibility = 'hidden'
        edit()
        t = false
    }
})

cancelBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        errDiv.style.display = 'none'
        t = false
    })
})

let txt = document.createElement('div')
let deleteCont = document.querySelector('.hiddenCont')

function proDelete() {
    let projetctDelete = document.querySelectorAll('.del')

    projetctDelete.forEach(del => {
        del.addEventListener('click', () => {

            deleteCont.style.visibility = 'visible'
            deleteCont.style.zIndex = '2'
            disabled.style.visibility = 'visible'
            txt.textContent = `Delete Project "${del.parentElement.textContent}"?`
            deleteCont.prepend(txt)
            let confirmDelete = document.querySelector('.confirm')

            confirmDelete.addEventListener('click', () => {

                projectArray.forEach(pro => {

                    if (del.parentNode.textContent == pro.name) {
                        let index = projectArray.indexOf(pro)
                        projectArray.splice(index, 1)
                        deletePopUp.style.visibility = 'hidden'
                        disabled.style.visibility = 'hidden'
                        renderList()
                        btnFunc()
                        forPopUp()
                        projectStyle()
                        save()
                        if (del.parentNode.textContent == activeBtn) {
                            clearEl(content)

                        }
                    }
                })

            })
        })
    })
}
const myicon = new Image();
myicon.src = "..images/trash.png";
    myicon.classList.add('del')

function renderList() {
    clearEl(projectList)
    projectArray.forEach(pro => {
        if (pro.name != "Tasks") {
            let button = document.createElement('div')
            button.textContent = pro.name
            button.classList.add('projectStyle')
            projectList.appendChild(button)
        }
    })
    projectList.childNodes.forEach(pro => {
        const myicon = new Image();
        myicon.src = DelIcon
        myicon.classList.add('del')
        pro.appendChild(myicon)
    })
    proDelete()
}

let newAddBtn = document.createElement('button')
newAddBtn.textContent = "Save";
newAddBtn.classList.add('newAddBtn')

let endex = ''

let editTask = ''
function edit() {

    let editBtns = document.querySelectorAll('.editBtn')
    editBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            errDiv.style.display = 'none'
            editTask = btn.parentNode.parentNode.firstChild.textContent
            addTaskPopUp.style.visibility = 'visible';
            addTaskBtn.style.display = 'none'
            let control = document.querySelector('.popUpControl')

            control.prepend(newAddBtn)
            newAddBtn.style.display = "inline"
            disabled.style.visibility = "visible"
            // saveOption.style.display = 'none'

            projectArray.forEach(pro => {

                if (pro.name == activeBtn) {
                    pro.task.forEach(tsk => {
                        if (tsk.title == editTask) {
                            endex = pro.task.indexOf(tsk)
                            taskName.value = tsk.title
                            taskDes.value = tsk.des


                            taskPrio.value = tsk.prio
                            taskDue.value = tsk.date
                        }
                    })
                }
            })
        })
    })

}

let taskExist = false

newAddBtn.addEventListener('click', (e) => {
    if (taskName.value == '') {
        return
    }
    e.preventDefault()

    projectArray.forEach(pro => {
        pro.task.forEach(tsk => {
            if (taskName.value == editTask && saveFolder.value == activeBtn || taskName.value == editTask && saveFolder.value != activeBtn) {
                taskExist = false
            }
            else if (tsk.title == taskName.value) {
                taskExist = true
            }
        })
    })

    console.log(taskExist)

    if (taskExist == false) {

        projectArray.forEach(pro => {
            if (saveFolder.value == activeBtn) {

                pro.task.forEach(tsk => {
                    if (tsk.title == editTask) {
                        pro.task.splice(pro.task.indexOf(tsk), 1, getTask(taskName.value, taskDes.value, taskDue.value, priority))
                    }
                })
            } else if (saveFolder.value == pro.name) {
                projectArray.forEach(po => {
                    po.task.forEach(tk => {
                        if (tk.title == editTask) {
                            po.task.splice(po.task.indexOf(tk), 1)
                            console.log('rtas')
                        }
                    })
                })
                pro.task.push(getTask(taskName.value, taskDes.value, taskDue.value, priority))
            }

        })
        renderTask()
        newTaskPopUp.style.visibility = 'hidden'
        disabled.style.visibility = 'hidden'
        newAddBtn.style.display = 'none'
        addTaskBtn.style.display = "inline"

    } else {
        taskExist = false
        addTaskPopUp.style.visibility = 'visible'
        errDiv.style.display = 'block'
    }
})


let temp = document.querySelector('.tempText')
let logo = document.querySelector('.logo')
let menu = document.querySelector('.menu')
let close = document.querySelector('.close')
close.style.visibility = 'hidden'
let hiddenNav = document.querySelector('.left-nav')
let burger = document.querySelector('.burger')
let activeDiv = document.createElement('div')
activeDiv.textContent = activeBtn
content.prepend(activeDiv)
burger.addEventListener('click', () => {
    hiddenNav.classList.toggle('show')
    if (hiddenNav.classList.contains('show')) {
        menu.style.visibility = 'hidden'
        close.style.visibility = 'visible'
    } else {
        menu.style.visibility = 'visible'
        close.style.visibility = 'hidden'
    }
})
content.addEventListener('click', () => {
    hiddenNav.classList.remove('show')
    menu.style.visibility = 'visible'
    close.style.visibility = 'hidden'

})
let media = window.matchMedia("(max-width:700px)")
media.addEventListener('change', () => {
    if (media.matches) {
        logo.textContent = activeBtn
        temp.style.display = 'none'

        window.addEventListener('click', () => {
            logo.textContent = activeBtn
        })

    } else {
        logo.textContent = "DONOT"
    }
})
start()



