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

  gsap.to(".tap-indicator", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
  });
}
