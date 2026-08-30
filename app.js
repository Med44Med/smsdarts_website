const pricing_toggle = document.getElementById("pricing_toggle");
const pricing_indicator = document.getElementById("pricing_indicator");
const pricing_content = document.getElementById("pricing_content");
const menu = document.querySelector("#responsiveMenu");
const menuIcon = document.querySelector("#menuIcon");
const faqItems = document.querySelectorAll(".faq-item");

let pricing_toggle_state = false;

pricing_toggle.addEventListener("click", () => {
  pricing_indicator.classList.toggle("translate-x-6");
  pricing_content.classList.toggle("-translate-x-1/2");
  pricing_toggle_state = !pricing_toggle_state;
});

// CHECK USER AUTH

window.addEventListener("DOMContentLoaded", async () => {
  const btns = document.querySelectorAll("#get_started_btn");
  const {
    data: { user },
  } = await window.supabase.auth.getUser();
  if (!user) return;
  console.log(user);

  btns.forEach((btn) => {
    btn.href = "https://app.smsdarts.com";
    btn.innerText = "Tableau de bord";
  });
});

function toggleMenu() {
  menu.classList.toggle("translate-x-full");
  menuIcon.innerHTML = menuIcon.children[0].classList.contains("fa-bars")
    ? "<i class='fa-solid fa-xmark text-text text-xl'></i>"
    : "<i class='fa-solid fa-bars text-text text-xl'></i>";
}

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.children[0].children[1].classList.toggle("rotate-180");
    item.children[1].classList.toggle("max-h-0");
    item.children[1].classList.toggle("max-h-72");
  });
});

generateKeys()