// =====================================
// BALLOON SCREEN
// =====================================

let popped = 0;

const totalBalloons = 4;

const balloons = document.querySelectorAll(".balloon");

const title = document.getElementById("balloon-title");
const subtitle = document.getElementById("balloon-subtitle");

const popup = document.getElementById("popup-message");
const finalMessage = document.getElementById("final-message");

const continueBtn = document.getElementById("continue-btn");

// =====================================
// START SCREEN
// =====================================

function startBalloonScreen() {
  popped = 0;

  balloons.forEach((balloon) => {
    balloon.classList.remove("done");

    balloon.style.visibility = "visible";

    balloon.style.opacity = "1";

    balloon.style.transform = "";
  });

  attachBalloonEvents();

  animateBalloons();
}

// =====================================
// ATTACH EVENTS
// =====================================

function attachBalloonEvents() {
  balloons.forEach((balloon) => {
    balloon.onclick = () => {
      popBalloon(balloon);
    };
  });
}

// =====================================
// ENTRANCE ANIMATION
// =====================================

function animateBalloons() {
  gsap.set(".balloon", {
    opacity: 0,

    y: 120,

    scale: 0.85,
  });

  gsap.to(".balloon", {
    opacity: 1,

    y: 0,

    scale: 1,

    duration: 0.9,

    stagger: 0.15,

    ease: "back.out(1.8)",

    onComplete() {
      startFloating();
    },
  });
}

// =====================================
// FLOATING
// =====================================

function startFloating() {
  balloons.forEach((balloon) => {
    gsap.killTweensOf(balloon);
    gsap.to(balloon, {
      y: -10,

      duration: 2.2 + Math.random(),

      repeat: -1,

      yoyo: true,

      ease: "sine.inOut",
    });
  });
}

// =====================================
// POP
// =====================================

function popBalloon(balloon) {
  if (balloon.classList.contains("done")) return;

  balloon.classList.add("done");

  popped++;

  updateTitle();

  burstEffect(balloon);

  showPopup(balloon);

  gsap.to(balloon, {
    scale: 1.25,

    rotation: gsap.utils.random(-8, 8),

    opacity: 0,

    duration: 0.35,

    ease: "back.in(2)",

    onComplete() {
      balloon.style.visibility = "hidden";
    },
  });

  if (popped === totalBalloons) {
    setTimeout(showFinalMessage, 3000);
  }
}

// =====================================
// TITLE UPDATE
// =====================================

function updateTitle() {
  const left = totalBalloons - popped;

  switch (left) {
    case 3:
      title.innerHTML = "🎈 3 Balloons Left 🎈";
      subtitle.innerHTML = "Three little surprises are waiting... 💖";
      break;

    case 2:
      title.innerHTML = "🎈 2 Balloons Left 🎈";
      subtitle.innerHTML = "You're getting closer... ✨";
      break;

    case 1:
      title.innerHTML = "🎈 Just One More... ❤️";
      subtitle.innerHTML = "The sweetest surprise is almost here...";
      break;

    case 0:
      title.innerHTML = "🎉 You Found Them All! 🎉";
      subtitle.innerHTML = "";
      break;
  }

  gsap.fromTo(
    ".balloon-header",
    {
      scale: 0.96,
      y: 8,
    },
    {
      scale: 1,
      y: 0,
      duration: 0.35,
      ease: "back.out(2)",
    },
  );
}

// =====================================
// POPUP MESSAGE
// =====================================

function showPopup(balloon) {
  popup.innerHTML = balloon.dataset.msg;

  const rect = balloon.getBoundingClientRect();

  gsap.set(popup, {
    left: rect.left + rect.width / 2,
    top: rect.top + rect.height / 2,
    xPercent: -50,
    yPercent: -50,
  });

  gsap.fromTo(
    popup,
    {
      opacity: 0,
      scale: 0.6,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1.25,
      ease: "back.out(2)",

      onComplete() {
        gsap.to(popup, {
          opacity: 0,
          y: -40,
          delay: 1,
          duration: 0.35,
        });
      },
    },
  );
}

// =====================================
// CONFETTI
// =====================================

function burstEffect(balloon) {
  const rect = balloon.getBoundingClientRect();

  confetti({
    particleCount: 65,

    spread: 90,

    startVelocity: 35,

    scalar: 0.9,

    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    },
  });
}

// =====================================
// TYPEWRITER
// =====================================

function typeText(element, text, speed = 45) {
  return new Promise((resolve) => {
    element.innerHTML = "";

    let i = 0;

    const timer = setInterval(() => {
      element.textContent += text.charAt(i);

      i++;

      if (i >= text.length) {
        clearInterval(timer);

        resolve();
      }
    }, speed);
  });
}

// =====================================
// FINAL MESSAGE
// =====================================

async function showFinalMessage() {
  confetti({
    particleCount: 300,

    spread: 180,

    startVelocity: 45,

    origin: {
      x: 0.5,
      y: 0.35,
    },
  });

  gsap.to(".balloon-grid", {
    opacity: 0,
    duration: 0.5,
    onComplete() {
      const grid = document.querySelector(".balloon-grid");
      grid.style.pointerEvents = "none";
    },
  });

  gsap.set(finalMessage, {
    display: "flex",
  });

  gsap.to(finalMessage, {
    opacity: 1,

    duration: 2,
  });

  const finalTitle = document.getElementById("final-title");
  const finalSubtitle = document.getElementById("final-subtitle");

  await typeText(
    finalTitle,
    "Every balloon carried a little piece of my heart... ❤️",
    100,
  );

  await new Promise((r) => setTimeout(r, 1200));

  await typeText(
    finalSubtitle,
    "Thank you for opening every little surprise. 🥹",
    80,
  );

  // Wait before switching screens
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const balloon = document.getElementById("balloon-screen");
  const cake = document.getElementById("cake-screen");

  // Hide balloon screen
  balloon.style.display = "none";

  // Hide final message
  finalMessage.style.display = "none";

  // Show cake screen
  cake.style.display = "flex";

  // IMPORTANT: Make it visible
  gsap.to(cake, {
    opacity: 1,
    duration: 0.8,
  });

  // Start cake animation
  initCakeScreen();
}
