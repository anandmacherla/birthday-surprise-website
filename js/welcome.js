function createWelcomeStars() {
  const container = document.querySelector(".welcome-stars");

  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";

    star.style.top = Math.random() * 100 + "%";

    star.style.opacity = 0.08 + Math.random() * 0.45;

    star.style.width = star.style.height = 2 + Math.random() * 2 + "px";

    star.style.animation = `twinkle ${3 + Math.random() * 5}s ease-in-out ${Math.random() * 6}s infinite`;

    container.appendChild(star);
  }
}

function typeWriter(element, text, speed = 70) {
  return new Promise((resolve) => {
    element.innerHTML = "";

    let i = 0;

    const timer = setInterval(() => {
      // Handle new line
      if (text.charAt(i) === "\n") {
        element.innerHTML += "<br>";
      } else {
        element.innerHTML += text.charAt(i);
      }

      i++;

      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

async function startWelcomeScene() {
  const screen = document.getElementById("welcome-screen");

  screen.classList.add("active");

  createWelcomeStars();

  const tl = gsap.timeline();

  tl.fromTo(
    ".welcome-heart",
    {
      opacity: 0,
      scale: 0.55,
      y: 70,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.9,
      ease: "power3.out",
    },
  );

  await tl.then();

  await new Promise((resolve) => setTimeout(resolve, 600));

  await typeWriter(
    document.getElementById("typing-title"),
    CONFIG.welcome.title,
    80,
  );

  await new Promise((resolve) => setTimeout(resolve, 500));

  await typeWriter(
    document.getElementById("typing-name"),
    CONFIG.welcome.personName,
    70,
  );

  await new Promise((resolve) => setTimeout(resolve, 500));

  await typeWriter(
    document.querySelector(".sub1"),
    CONFIG.welcome.subtitle[0],
    45,
  );

  await typeWriter(
    document.querySelector(".sub2"),
    CONFIG.welcome.subtitle[1],
    45,
  );

  await typeWriter(
    document.querySelector(".sub3"),
    CONFIG.welcome.subtitle[2],
    45,
  );

  // Let the user enjoy the welcome screen
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Start transition to the next scene
  startPinkTransition();
}

function startPinkTransition() {
  const welcome = document.getElementById("welcome-screen");
  const heart = document.getElementById("transition-heart");
  const pink = document.getElementById("pink-screen");

  const tl = gsap.timeline();

  // Small pause after typing finishes
  tl.to({}, { duration: 1 });

  // Fade away the Welcome Screen
  tl.to(welcome, {
    opacity: 0,

    duration: 0.35,

    ease: "power2.out",
  });

  // Prepare Pink Screen behind

  tl.set(pink, {
    display: "block",

    visibility: "visible",

    pointerEvents: "auto",

    opacity: 0,
  });

  // Show Transition Heart
  tl.set(heart, {
    opacity: 1,

    scale: 1,
  });

  // First heartbeat
  tl.to(heart, {
    scale: 1.1,

    duration: 0.18,

    ease: "power2.out",
  });

  tl.to(heart, {
    scale: 1,

    duration: 0.18,

    ease: "power2.in",
  });

  // Second heartbeat
  tl.to(heart, {
    scale: 1.18,

    duration: 0.2,

    ease: "power2.out",
  });

  tl.to(heart, {
    scale: 1,

    duration: 0.22,

    ease: "power2.in",
  });

  tl.to("#transition-heart img", {
    filter:
      "drop-shadow(0 0 45px rgba(255,80,160,.75)) \
         drop-shadow(0 0 120px rgba(255,80,160,.75))",

    duration: 0.35,
  });

  // ===============================
  // HEART EXPLOSDES SMOOTHLY
  // ===============================

  const scales = [
    1.15, 1.3, 1.5, 1.7, 2, 2.4, 2.9, 3.5, 4.2, 5, 6, 7.2, 8.8, 10.5, 12.5, 15,
    16.5, 18, 19.5,
  ];

  scales.forEach((value) => {
    tl.to(heart, {
      scale: value,
      duration: 0.01,
      ease: "power1.in",
    });
  });

  // ===============================
  // SHOW PINK SCREEN
  // ===============================

  tl.to(
    pink,
    {
      opacity: 1,

      duration: 0.8,

      ease: "power2.out",
    },
    "-=0.45",
  );

  // ===============================
  // CLEANUP
  // ===============================

  tl.set(heart, {
    display: "none",
  });

  tl.set(welcome, {
    display: "none",
  });

  // =====================================
  // PINK WORLD ANIMATION
  // =====================================

  // Couple rises
  tl.to("#birthday-couple", {
    opacity: 1,
    y: -40,
    duration: 0.9,
    ease: "back.out(1.7)",
  });

  // Bounce
  tl.to("#birthday-couple", {
    y: -25,
    duration: 0.2,
    repeat: 1,
    yoyo: true,
    ease: "power1.out",
  });

  tl.call(() => {
    const couple = document.getElementById("birthday-couple");

    if (couple) {
      couple.classList.add("couple-idle");
    }
  });

  // =====================================
  // CONFETTI BURST
  // =====================================

  tl.call(() => {
    fireConfetti();
  });

  // ===============================
  // TITLE
  // ===============================

  tl.fromTo(
    "#excited-title",
    {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.8)",
    },
  );

  // ===============================
  // SUBTITLE
  // ===============================

  tl.fromTo(
    "#excited-subtitle",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    },
    "-=0.2",
  );

  tl.to({}, { duration: 0.4 });

  // =====================================
  // YES BUTTON
  // =====================================

  tl.to("#yes-btn", {
    opacity: 1,

    scale: 1,

    duration: 0.45,

    ease: "back.out(2)",
  });

  // =====================================
  // NO BUTTON
  // =====================================

  tl.to(
    "#no-btn",
    {
      opacity: 1,

      scale: 1,

      duration: 0.45,

      ease: "back.out(2)",
    },
    "-=0.2",
  );

  tl.call(() => {
    gsap.to("#yes-btn", {
      scale: 1.08,

      duration: 0.55,

      repeat: -1,

      yoyo: true,

      ease: "power1.inOut",
    });
  });

  tl.call(() => {
    activateNoEscape();
  });

  tl.call(() => {
    confetti({
      particleCount: 140,

      spread: 90,

      startVelocity: 35,

      origin: {
        x: 0.5,
        y: 0.32,
      },
    });
  });

  tl.call(() => {
    startPinkConfetti();
  });
}

function startPinkConfetti() {
  setInterval(() => {
    confetti({
      particleCount: 400,

      spread: 360,

      startVelocity: 65,

      gravity: 0.9,

      scalar: 0.8,

      origin: {
        x: Math.random(),

        y: 0,

        z: 120,
      },
    });
  }, 2500);

  gsap.from("#yes-btn", {
    scale: 0,

    duration: 0.6,

    ease: "back.out(2)",
  });

  document.querySelector("#yes-btn").classList.add("yes-heartbeat");
}

// =====================================
// CONFETTI
// =====================================

function fireConfetti() {
  confetti({
    particleCount: 700,
    spread: 360,
    startVelocity: 65,
    scalar: 1.2,

    origin: {
      x: 0.5,
      y: 0.35,
    },

    colors: ["#ff5ea8", "#ffca5f", "#8fd3ff", "#8cffc1", "#ffffff", "#dca0ff"],

    zIndex: 999999,
  });
}

// =====================================
// NO BUTTON ESCAPE
// =====================================

const noMessages = [
  "Hehe... not this one! 😜",

  "Please don't press NO 🥺",

  "Come on... click YES 💖",

  "Someone is waiting 🐻",

  "Cake is getting cold 🎂",

  "You're making Dudu sad 🥹",

  "Okay okay... just press YES 💕",
];

let noCounter = 0;

function activateNoEscape() {
  const no = document.getElementById("no-btn");

  no.addEventListener("mouseenter", () => {
    gsap.to(no, {
      x: gsap.utils.random(-220, 220),

      y: gsap.utils.random(-120, 120),

      rotation: gsap.utils.random(-18, 18),

      scale: 0.95,

      duration: 0.35,

      ease: "power2.out",

      onComplete: () => {
        gsap.to(no, {
          rotation: 0,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      },
    });

    const msg = document.getElementById("no-message");

    msg.innerHTML = noMessages[noCounter % noMessages.length];

    gsap.fromTo(
      msg,
      {
        opacity: 0,
        y: 8,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
      },
    );

    noCounter++;
  });
}

// =====================================
// YES CLICK
// =====================================

document
  .getElementById("yes-btn")
  .addEventListener("click", startBalloonTransition);

// =====================================
// BALLOON TRANSITION
// =====================================

function startBalloonTransition() {
  const pink = document.getElementById("pink-screen");

  const balloons = document.getElementById("balloon-screen");

  const couple = document.getElementById("birthday-couple");

  const tl = gsap.timeline();

  // Happy Jump

  tl.to(couple, {
    y: -40,
    duration: 0.2,
    repeat: 1,
    yoyo: true,
  });

  // Celebration Confetti

  tl.call(() => {
    fireConfetti();
  });

  // =====================================
  // FADE PINK SCREEN
  // =====================================

  tl.to("#pink-screen", {
    opacity: 0,
    duration: 0.6,
  });

  tl.set("#pink-screen", {
    display: "none",
  });

  // =====================================
  // SHOW BALLOON SCREEN
  // =====================================

  tl.set("#balloon-screen", {
    display: "block",
    opacity: 0,
  });

  tl.to("#balloon-screen", {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
  });

  // Balloon screen handles itself
  tl.call(() => {
    startBalloonScreen();
  });
}
