document.addEventListener("DOMContentLoaded", () => {
  createParticles();

  const tl = gsap.timeline();

  tl.to("#loader-logo", {
    opacity: 1,

    y: 0,

    duration: 0.8,

    ease: "power3.out",
  })

    .to(
      "#loader-heart",
      {
        opacity: 1,

        y: 0,

        duration: 0.8,

        ease: "back.out(2)",
      },
      "-=0.3",
    )

    .to(
      "#loader-message",
      {
        opacity: 1,

        y: 0,

        duration: 0.8,

        ease: "power2.out",
      },
      "-=0.4",
    )

    .to(
      "#loader-progress-wrapper",
      {
        opacity: 1,

        y: 0,

        duration: 0.8,

        ease: "power2.out",
      },
      "-=0.4",
    );

  const progressFill = document.getElementById("loader-progress");

  let progress = 0;

  const loader = setInterval(() => {
    progress++;

    progressFill.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(loader);

      finishLoader();

      setTimeout(() => {
        startWelcomeScene();
      }, 1800);
    }
  }, 35);
});

function createParticles() {
  const layer = document.getElementById("particle-layer");

  const particleTypes = ["dust", "glow", "spark"];

  for (let i = 0; i < CONFIG.loader.particles; i++) {
    const particle = document.createElement("div");

    particle.classList.add("particle");

    const randomType =
      particleTypes[Math.floor(Math.random() * particleTypes.length)];

    particle.classList.add(randomType);

    particle.style.left = Math.random() * 100 + "%";

    particle.style.top = Math.random() * 100 + "%";

    particle.style.animationDuration = 8 + Math.random() * 8 + "s";

    particle.style.animationDelay = Math.random() * 5 + "s";

    layer.appendChild(particle);
  }
}

function finishLoader() {
  const tl = gsap.timeline();

  tl.to("#loader-heart", {
    scale: 1.15,
    duration: 0.18,
    ease: "power2.out",
  })

    .to("#loader-heart", {
      scale: 1,
      duration: 0.35,
      ease: "elastic.out(1,0.4)",
    })

    .to(
      ".loader-container",
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "+=0.1",
    )

    .to(
      "#particle-layer",
      {
        opacity: 0,
        duration: 0.6,
      },
      "<",
    )

    .to("#loader-screen", {
      opacity: 0,
      duration: 0.5,

      onComplete: () => {
        document.getElementById("loader-screen").style.display = "none";
      },
    });
}
