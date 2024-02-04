//display nextWeek's Tasks
export default function fillterNextWeek(){
    const selectedFolder = document.querySelector(".folder");
    const todayTaskEl = document.querySelector(".today_tasks");
    const tommorowTaskEl = document.querySelector(".tomorrow_tasks");
    const nextWeekTaskEl = document.querySelector(".nextWeek_tasks");
    const overDueTaskEl = document.querySelector(".overdue_tasks");

    selectedFolder.innerHTML = "Next week";
    todayTaskEl.style.display = "none";
    tommorowTaskEl.style.display = "none";
    nextWeekTaskEl.style.display = "block";
    overDueTaskEl.style.display = "none";
}