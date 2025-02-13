const triggerBtn = document.getElementById("trigger");
const growingBtn = document.getElementById("growing");
const newScreen = document.querySelector(".new-screen");
let scale = 1;
const growthPerClick = 1.4;
const maxScale = 8;
let isMaxSize = false;
let currentTextIndex = -1;

const buttonTexts = [
  "Gracias por tantos años conociéndonos",
  "Sé que es muy difícil estar lejos",
  "Pero",
  "Mi cariño por ti llega más lejos<br>que cualquier frontera!",
];

function updateButtons() {
  growingBtn.style.transform = `scale(${scale})`;
  growingBtn.style.fontSize = `${8 * Math.min(scale, 1.2)}px`; // Fuente no demasiado grande

  const growingBounds = growingBtn.getBoundingClientRect();
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  growingBtn.innerHTML = buttonTexts[currentTextIndex];

  // Mantener el botón dentro de los límites
  if (growingBounds.width >= screenWidth) {
    growingBtn.style.width = `${screenWidth - 40}px`;
  }
  if (growingBounds.height >= screenHeight) {
    growingBtn.style.height = `${screenHeight - 40}px`;
  }

  // Mantener el botón rojo visible hasta que el azul alcance el máximo
  if (scale >= maxScale) {
    triggerBtn.style.display = "none";
    isMaxSize = true;
    growingBtn.textContent = "Y quiero que sepas que...";
  } else {
    triggerBtn.style.display = "block";
  }
}

triggerBtn.addEventListener("click", () => {
  if (scale < maxScale) {
    scale += growthPerClick;
    currentTextIndex = (currentTextIndex + 1) % buttonTexts.length;
    growingBtn.textContent = buttonTexts[currentTextIndex];
    updateButtons();
  }
});

growingBtn.addEventListener("click", () => {
  if (isMaxSize) {
    newScreen.classList.add("visible");
  }
});

window.addEventListener("resize", updateButtons);
