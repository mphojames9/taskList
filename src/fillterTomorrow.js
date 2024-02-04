//display tommorow's Tasks
export default function fillterTomorrow(){
    const selectedFolder = document.querySelector(".folder");
    const todayTaskEl = document.querySelector(".today_tasks");
    const tommorowTaskEl = document.querySelector(".tomorrow_tasks");
    const nextWeekTaskEl = document.querySelector(".nextWeek_tasks");
    const overDueTaskEl = document.querySelector(".overdue_tasks");

    selectedFolder.innerHTML = "Tomorrow";
    todayTaskEl.style.display = "none";
    tommorowTaskEl.style.display = "block";
    nextWeekTaskEl.style.display = "none";
    overDueTaskEl.style.display = "none";
    console.log("tommorow running")
}
