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
    16.5,18,19.5,
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
}
