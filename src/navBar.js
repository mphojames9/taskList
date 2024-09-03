export default function openNavBar(){
    const navBar = document.querySelector(".navBar");
    const menuL1 = document.querySelector(".line1");
    const menuL2 = document.querySelector(".line2");
    const menuL3 = document.querySelector(".line3");

    navBar.classList.toggle("navBar_open");
    menuL1.classList.toggle("l1-rotate");
    menuL2.classList.toggle("l2-rotate");
    menuL3.classList.toggle("l3-rotate");
}