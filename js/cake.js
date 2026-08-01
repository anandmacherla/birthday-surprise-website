// =====================================
// CAKE SCREEN
// Version 2.0
// =====================================

// Cake Images
const cake1 = document.getElementById("cake1");
const cake2 = document.getElementById("cake2");
const cake3 = document.getElementById("cake3");
const cake4 = document.getElementById("cake4");
const cake5 = document.getElementById("cake5");

// Buttons
const blowBtn = document.getElementById("blowBtn");

// Overlay
const cakeOverlay = document.getElementById("cake-overlay");

// =====================================
// INITIALIZE CAKE SCREEN
// =====================================

function initCakeScreen() {
  // Reset all cakes

  gsap.set([cake2, cake3, cake4, cake5], {
    opacity: 0,
  });

  gsap.set(cake1, {
    opacity: 1,
  });

  gsap.set(blowBtn, {
    opacity: 1,
    display: "inline-flex",
    scale: 1,
    y: 0,
  });

  // Cake Entrance

  gsap.fromTo(
    ".cake-wrapper",
    {
      scale: 0,
      rotation: -10,
    },
    {
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: "back.out(1.7)",
    },
  );

  // Button Entrance

  gsap.fromTo(
    blowBtn,
    {
      y: 60,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      delay: 0.8,
      duration: 0.8,
    },
  );

  // Floating Cake

  gsap.to(".cake-wrapper", {
    y: -8,

    duration: 2,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut",
  });

  blowBtn.addEventListener("click", blowCandles);
}

// =====================================
// CHANGE CAKE
// =====================================

function changeCake(from, to) {
  gsap.to(from, {
    opacity: 0,
    duration: 0.8,
  });

  gsap.fromTo(
    to,
    {
      opacity: 0,
      scale: 0.98,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    },
  );
}

// =====================================
// WAIT
// =====================================

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =====================================
// BLOW CANDLE
// =====================================

async function blowCandles() {
  blowBtn.disabled = true;

  //------------------------------------------------
  // Button Animation
  //------------------------------------------------

  gsap.to(blowBtn, {
    scale: 0.92,

    duration: 0.2,
  });

  await wait(200);

  gsap.to(blowBtn, {
    opacity: 0,

    y: -20,

    duration: 0.6,

    onComplete() {
      blowBtn.style.display = "none";
    },
  });

  //------------------------------------------------
  // Romantic Overlay
  //------------------------------------------------

  gsap.to("#cake-overlay", {
    background: "rgba(25,0,30,.18)",

    duration: 1,
  });

  //------------------------------------------------
  // Cake Zoom
  //------------------------------------------------

  gsap.to(".cake-wrapper", {
    scale: 1.05,

    duration: 1,
  });

  //------------------------------------------------
  // Small Pause
  //------------------------------------------------

  await wait(1200);

  //------------------------------------------------
  // Cake Shake
  //------------------------------------------------

  await gsap.to(".cake-wrapper", {
    x: -3,

    repeat: 7,

    yoyo: true,

    duration: 0.05,
  });

  gsap.set(".cake-wrapper", {
    x: 0,
  });

  //------------------------------------------------
  // Cake 1 -> Cake 2
  //------------------------------------------------

  changeCake(cake1, cake2);

  gsap.fromTo(
    cake2,

    {
      y: 15,
    },

    {
      y: -6,

      duration: 2,

      ease: "power1.out",
    },
  );

  await wait(1800);

  //------------------------------------------------
  // Cake2 -> Cake3
  //------------------------------------------------

  changeCake(cake2, cake3);

  gsap.fromTo(
    cake3,

    {
      y: 10,
    },

    {
      y: -10,

      duration: 2,
    },
  );

  await wait(2000);

  //------------------------------------------------
  // Cake3 -> Cake4
  //------------------------------------------------

  changeCake(cake3, cake4);

  await wait(1500);

  //------------------------------------------------
  // Wish Message
  //------------------------------------------------

  showWishMessage();
}

// =====================================
// SHOW WISH MESSAGE
// =====================================

async function showWishMessage() {
  const message = document.createElement("div");

  message.id = "wishMessage";

  document.body.appendChild(message);

  //------------------------------------
  // Message 1
  //------------------------------------

  await typeWriter(message, "✨ Close your eyes...");

  await wait(2500);

  message.innerHTML = "";

  //------------------------------------
  // Message 2
  //------------------------------------

  await typeWriter(message, "💖 Make your sweetest wish...");

  await wait(2500);

  message.innerHTML = "";

  //------------------------------------
  // Message 3
  //------------------------------------

  await typeWriter(
    message,
    "😄 I truly hope every little dream you whispered today finds its way into your life ❤️",
  );

  await wait(2500);

  //------------------------------------
  // Fade Message
  //------------------------------------

  gsap.to(message, {
    opacity: 0,

    y: -30,

    duration: 2.0,

    onComplete() {
      message.remove();
    },
  });

  //------------------------------------
  // Restore Screen
  //------------------------------------

  gsap.to("#cake-overlay", {
    background: "rgba(25,0,30,0)",

    duration: 1,
  });

  gsap.to(".cake-wrapper", {
    scale: 1,

    duration: 1,
  });

  //------------------------------------
  // Show Cut Button
  //------------------------------------

  await wait(3000);

  message.remove();

  // Fade Title & Subtitle
  gsap.to(".wish-title", {
    opacity: 0,
    y: -20,
    duration: 0.8,
  });

  gsap.to(".wish-subtitle", {
    opacity: 0,
    y: -15,
    duration: 0.8,
  });

  // Small romantic pause
  setTimeout(() => {
    showCutCakeButton();
  }, 1000);
}

// =====================================
// TYPE WRITER
// =====================================

function typeWriter(element, text) {
  return new Promise((resolve) => {
    let i = 0;

    element.innerHTML = "";

    const timer = setInterval(() => {
      element.innerHTML = text.substring(0, i);

      i++;

      if (i > text.length) {
        clearInterval(timer);

        resolve();
      }
    }, 100);
  });
}

// =====================================
// CUT BUTTON
// =====================================

function showCutCakeButton() {
  const btn = document.createElement("button");

  btn.id = "cutCakeBtn";

  btn.innerHTML = "🍰 Cut the Cake Together ❤️";

  document.body.appendChild(btn);

  gsap.fromTo(
    btn,
    {
      opacity: 0,
      y: 60,
      scale: 0.8,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
    },
  );

  gsap.to(btn, {
    y: -6,
    repeat: -1,
    yoyo: true,
    duration: 1.2,
    ease: "sine.inOut",
  });

  // NEW
  btn.addEventListener("click", cutCake);
}

// =====================================
// CUT CAKE
// =====================================

async function cutCake() {
  const btn = document.getElementById("cutCakeBtn");

  btn.disabled = true;

  //--------------------------------

  gsap.to(btn, {
    scale: 0.85,
    opacity: 0,
    duration: 0.4,
    onComplete() {
      btn.remove();
    },
  });

  //--------------------------------

  gsap.to(".cake-wrapper", {
    scale: 1.08,
    duration: 0.5,
  });

  //--------------------------------

  await animateKnife();

  //--------------------------------

  revealCutCake();
}

// =====================================
// KNIFE ANIMATION
// =====================================

function animateKnife() {
  return new Promise((resolve) => {
    gsap.set("#knife", {
      opacity: 1,
      top: -180,
    });

    gsap.to("#knife", {
      top: 60,
      duration: 0.8,
      ease: "power2.in",

      onComplete() {
        gsap.to(".cake-wrapper", {
          x: -3,
          repeat: 7,
          yoyo: true,
          duration: 0.05,
        });

        confetti({
          particleCount: 80,
          spread: 55,
          origin: { x: 0.5, y: 0.55 },
        });

        gsap.to("#knife", {
          opacity: 0,
          top: -180,
          duration: 0.4,
          delay: 0.2,
          onComplete: resolve,
        });
      },
    });
  });
}

// =====================================
// REVEAL CUT CAKE
// =====================================

function revealCutCake() {
  const cake4 = document.getElementById("cake4");
  const cake5 = document.getElementById("cake5");

  gsap.to(cake4, {
    opacity: 0,
    duration: 0.35,
  });

  gsap.fromTo(
    cake5,
    {
      opacity: 0,
      scale: 0.96,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,

      // Cake is fully visible now
      onComplete() {
        // Small pause so user enjoys the cut cake
        setTimeout(() => {
          transitionToBouquet();
        }, 1800);
      },
    },
  );
}

function transitionToBouquet() {
  const cakeScreen = document.getElementById("cake-screen");
  const bouquetScreen = document.getElementById("bouquet-screen");

  const tl = gsap.timeline();

  // Romantic pink glow
  tl.to("#cake-overlay", {
    background: "rgba(255,110,180,.45)",
    duration: 0.8,
  });

  // Cake glow
  tl.to(
    ".cake-wrapper",
    {
      scale: 1.08,
      filter: "drop-shadow(0 0 90px rgba(255,120,200,.9))",
      duration: 1,
    },
    "<",
  );

  // Whole screen becomes pink
  tl.to(cakeScreen, {
    opacity: 0,
    duration: 1.2,
    ease: "power2.inOut",
  });

  // Hide Cake
  tl.set(cakeScreen, {
    display: "none",
  });

  tl.to(bouquetScreen, {
    opacity: 1,
    duration: 1,
    ease: "power2.out",
  });

  // Start Bouquet Animation
  tl.call(() => {
    showBouquetScreen();
  });
}
