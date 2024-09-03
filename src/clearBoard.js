export default function clearBoard(){
    const todayTaskEl = document.querySelector(".today_tasks");
    const tommorowTaskEl = document.querySelector(".tomorrow_tasks");
    const nextWeekTaskEl = document.querySelector(".nextWeek_tasks");
    const laterTaskEl = document.querySelector(".later_tasks");
    const overDueTaskEl = document.querySelector(".overdue_tasks");

    todayTaskEl.innerHTML = "";
    tommorowTaskEl.innerHTML = "";
    nextWeekTaskEl.innerHTML = "";
    overDueTaskEl.innerHTML = "";
    laterTaskEl.innerHTML = "";
}