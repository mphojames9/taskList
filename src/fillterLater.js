export default function fillterLater(){
    const selectedFolder = document.querySelector(".folder");
    const todayTaskEl = document.querySelector(".today_tasks");
    const tommorowTaskEl = document.querySelector(".tomorrow_tasks");
    const nextWeekTaskEl = document.querySelector(".nextWeek_tasks");
    const overDueTaskEl = document.querySelector(".overdue_tasks");
    const laterTaskEl = document.querySelector(".later_tasks");

    selectedFolder.innerHTML = "Later"
    todayTaskEl.style.display = "none";
    tommorowTaskEl.style.display = "none";
    nextWeekTaskEl.style.display = "none";
    overDueTaskEl.style.display = "none";
    laterTaskEl.style.display = "block";
}