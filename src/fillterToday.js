//display today's Tasks
export default function fillterToday(){
    const selectedFolder = document.querySelector(".folder");
    const todayTaskEl = document.querySelector(".today_tasks");
    const tommorowTaskEl = document.querySelector(".tomorrow_tasks");
    const nextWeekTaskEl = document.querySelector(".nextWeek_tasks");
    const overDueTaskEl = document.querySelector(".overdue_tasks");
    const laterTaskEl = document.querySelector(".later_tasks");
    console.log(laterTaskEl)

    selectedFolder.innerHTML = "Today"
    todayTaskEl.style.display = "block";
    tommorowTaskEl.style.display = "none";
    nextWeekTaskEl.style.display = "none";
    overDueTaskEl.style.display = "none";
    laterTaskEl.style.display = "none";
}