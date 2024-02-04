//display overDue Tasks
export default function fillterOverDue(){
    const selectedFolder = document.querySelector(".folder");
    const todayTaskEl = document.querySelector(".today_tasks");
    const tommorowTaskEl = document.querySelector(".tomorrow_tasks");
    const nextWeekTaskEl = document.querySelector(".nextWeek_tasks");
    const overDueTaskEl = document.querySelector(".overdue_tasks");

    selectedFolder.innerHTML = "Over Due"
    todayTaskEl.style.display = "none";
    tommorowTaskEl.style.display = "none";
    nextWeekTaskEl.style.display = "none";
    overDueTaskEl.style.display = "block";

    console.log("over due ")
}