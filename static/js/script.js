// =======================================================
// AI BASED FLOOD PREDICTION SYSTEM
// Professional JavaScript
// =======================================================

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Scroll To Top Button
    ========================== */

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topBtn.style.display = "block";
            topBtn.style.opacity = "1";
        } else {
            topBtn.style.opacity = "0";
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    /* ==========================
       Navbar Shadow
    ========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 12px 35px rgba(0,0,0,.25)";

        } else {

            header.style.boxShadow = "none";

        }

    });

    /* ==========================
       Reveal Animation
    ========================== */

    const revealElements = document.querySelectorAll(
        ".feature-card,.stat-card,.about-box,.hero-card,.cta"
    );

    function reveal() {

        revealElements.forEach(el => {

            const top = el.getBoundingClientRect().top;

            if (top < window.innerHeight - 80) {

                el.style.opacity = "1";
                el.style.transform = "translateY(0)";

            }

        });

    }

    reveal();

    window.addEventListener("scroll", reveal);

    revealElements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(60px)";
        el.style.transition = ".8s ease";

    });

    reveal();

    /* ==========================
       Button Ripple Effect
    ========================== */

    document.querySelectorAll(".btn-primary").forEach(btn => {

        btn.addEventListener("click", function(e){

            const circle = document.createElement("span");

            const diameter = Math.max(
                this.clientWidth,
                this.clientHeight
            );

            circle.style.width = circle.style.height =
                diameter + "px";

            circle.style.left =
                e.offsetX - diameter/2 + "px";

            circle.style.top =
                e.offsetY - diameter/2 + "px";

            circle.classList.add("ripple");

            this.appendChild(circle);

            setTimeout(()=>{

                circle.remove();

            },600);

        });

    });

    /* ==========================
       Counter Animation
    ========================== */

    const counters = document.querySelectorAll(".stat-card h2");

    counters.forEach(counter => {

        const value = counter.innerText;

        if(isNaN(value)) return;

        counter.innerText="0";

        let start=0;

        const end=parseInt(value);

        const speed=25;

        const update=()=>{

            start++;

            counter.innerText=start;

            if(start<end){

                setTimeout(update,speed);

            }

        };

        update();

    });

});




 
// PREDICT PAGE JS
// ==========================================================
// AI FLOOD PREDICTION SYSTEM - SCRIPT JS (FINAL POLISH)
// ==========================================================

// ================= SCROLL TO TOP BUTTON =================

let topBtn = document.getElementById("topBtn");

window.onscroll = function () {
    if (document.documentElement.scrollTop > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

if (topBtn) {
    topBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ================= BUTTON LOADING EFFECT =================

let predictForm = document.querySelector("form");

if (predictForm) {
    predictForm.addEventListener("submit", function () {
        let btn = document.querySelector(".predict-btn");

        if (btn) {
            btn.innerHTML = "Processing...";
            btn.style.opacity = "0.7";
            btn.style.pointerEvents = "none";
        }
    });
}

// ================= ACTIVE NAV LINK =================

let links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});

// ================= SMOOTH SCROLL (if used later) =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        let target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ================= BUTTON RIPPLE EFFECT =================

let buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
    btn.addEventListener("click", function (e) {
        let ripple = document.createElement("span");

        ripple.classList.add("ripple");

        let rect = btn.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";

        btn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
function fillFloodData() {

    document.querySelector('input[name="Temp"]').value = 35;
    document.querySelector('input[name="Humidity"]').value = 90;
    document.querySelector('input[name="Cloud_Cover"]').value = 95;
    document.querySelector('input[name="ANNUAL"]').value = 3000;
    document.querySelector('input[name="Jan_Feb"]').value = 400;
    document.querySelector('input[name="Mar_May"]').value = 600;
    document.querySelector('input[name="Jun_Sep"]').value = 1500;
    document.querySelector('input[name="Oct_Dec"]').value = 500;
    document.querySelector('input[name="Avg_June"]').value = 200;
    document.querySelector('input[name="Sub"]').value = 80;

}
// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

    });

}
document.querySelectorAll(".nav-links a").forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

    });

});