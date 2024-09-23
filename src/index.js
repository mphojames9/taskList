import {createEventListener} from "./creatingProject";
import { listEvent} from "./creatingTask";
import { editContainerEventListener} from "./editingProject";
import {dragAndDropEvent} from "./dragAndDrop";
import {displayAllTasks} from "./homeSection";

listEvent();
createEventListener();
editContainerEventListener();
dragAndDropEvent();
displayAllTasks();

//hide side menu event listener
const hiddenMenu = document.querySelector(".hiddenMenu");
hiddenMenu.addEventListener("click", ()=>{
    const leftPanel = document.querySelector(".leftPanel");
    leftPanel.classList.toggle("hidden");
});
