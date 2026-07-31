function showBouquetScreen() {
  document.getElementById("bouquet-screen").style.display = "flex";

  gsap.to("#bouquet-screen", {
    opacity: 1,
    duration: 1,
  });

  gsap.fromTo(
    "#bouquet",

    {
      opacity: 0,
      x: -220,
      y: -220,
      rotation: -45,
      scale: 0.6,
    },

    {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 1.6,
      ease: "back.out(1.8)",
    },
  );

  // Gentle breathing

  gsap.to("#bouquet", {
    scale: 1.04,

    duration: 2.5,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut",
  });

  createPetals();
}

const PETALS = [
  "assets/images/petals/petal1.webp",
  "assets/images/petals/petal2.webp",
  "assets/images/petals/petal3.webp",
  "assets/images/petals/petal4.webp",
  "assets/images/petals/petal5.webp",
  "assets/images/petals/petal6.webp",
  "assets/images/petals/petal7.webp",
];

function createPetals() {
  const layer = document.getElementById("petal-layer");

  for (let i = 0; i < 35; i++) {
    createSinglePetal(layer);
  }
}

function createSinglePetal(layer) {
  const petal = document.createElement("img");

  petal.src = PETALS[Math.floor(Math.random() * PETALS.length)];

  petal.className = "falling-petal";

  petal.style.left = Math.random() * 100 + "vw";

  petal.style.top = "-30px";

  layer.appendChild(petal);

  animatePetal(petal);
}

function animatePetal(petal) {
  gsap.fromTo(
    petal,

    {
      y: -40,

      x: 0,

      rotation: Math.random() * 360,
    },

    {
      y: window.innerHeight + 40,

      x: gsap.utils.random(-80, 80),

      rotation: "+=" + gsap.utils.random(360, 1080),

      duration: gsap.utils.random(8, 15),

      ease: "none",

      onComplete: () => {
        petal.style.left = Math.random() * 100 + "vw";

        animatePetal(petal);
      },
    },
  );
}
