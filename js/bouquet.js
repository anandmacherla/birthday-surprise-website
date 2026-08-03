let lyricsOpened = 0;

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
      rotation: -25,
      scale: 1,
      duration: 1.6,
      ease: "back.out(1.8)",
    },
  );

  // Gentle breathing

  gsap.to("#bouquet", {
    scale: 1.04,

    duration: 2,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut",
  });

  createPetals();

  setTimeout(() => {
    startLyricsSystem();
  }, 3000);

  const continueBtn = document.getElementById("bouquetContinueBtn");

  continueBtn.onclick = () => {
    console.log("lyricsOpened =", lyricsOpened);

    if (lyricsOpened === 0) {
      gsap.fromTo(
        continueBtn,
        {
          x: -8,
        },
        {
          x: 8,
          duration: 0.08,
          repeat: 5,
          yoyo: true,
        },
      );

      showLyricHint();

      return;
    }

    transitionToLetterScreen();
  };
}

const LYRICS = [
  "assets/images/lyrics/song1.png",
  "assets/images/lyrics/song2.png",
  "assets/images/lyrics/song3.png",
  "assets/images/lyrics/song4.png",
  "assets/images/lyrics/song5.png",
  "assets/images/lyrics/song6.png",
  "assets/images/lyrics/song7.png",
  "assets/images/lyrics/song8.png",
  "assets/images/lyrics/song9.png",
  "assets/images/lyrics/song10.png",
  "assets/images/lyrics/song11.png",
  "assets/images/lyrics/song12.png",
  "assets/images/lyrics/song13.png",
  "assets/images/lyrics/song14.png",
  "assets/images/lyrics/song15.png",
  "assets/images/lyrics/song16.png",
  "assets/images/lyrics/song17.png",
];

let lyricQueue = [...LYRICS];

let activeLyrics = [];

const MAX_VISIBLE_LYRICS = 5;

const PETALS = [
  "assets/images/flowers/petals1.webp",
  "assets/images/flowers/petals2.webp",
  "assets/images/flowers/petals3.webp",
  "assets/images/flowers/petals4.webp",
  "assets/images/flowers/petals5.webp",
  "assets/images/flowers/petals6.webp",
  "assets/images/flowers/petals7.webp",
];

function createPetals() {
  const layer = document.getElementById("petal-layer");

  layer.innerHTML = "";

  for (let i = 0; i < 135; i++) {
    createSinglePetal(layer);
  }
}

function createSinglePetal(layer) {
  const petal = document.createElement("img");

  const size = gsap.utils.random(8, 14);

  petal.style.width = size + "px";
  petal.style.height = size + "px";

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

function shuffleLyrics() {
  lyricQueue.sort(() => Math.random() - 0.5);
}

function startLyricsSystem() {
  shuffleLyrics();

  for (let i = 0; i < MAX_VISIBLE_LYRICS; i++) {
    gsap.delayedCall(i * 0.4, spawnLyric);
  }

  showContinueButton();
}

function spawnLyric() {
  if (lyricQueue.length === 0) return;

  const layer = document.getElementById("lyrics-layer");

  const card = document.createElement("div");

  card.className = "lyric-card";

  const pos = getRandomPosition();

  card.style.left = pos.x + "vw";

  card.style.top = pos.y + "vh";

  card.style.rotate = gsap.utils.random(-12, 12) + "deg";

  const img = document.createElement("img");

  img.src = lyricQueue.shift();

  // Random crop (safe values)
  img.style.left = -gsap.utils.random(0, 20) + "%";
  img.style.top = -gsap.utils.random(0, 12) + "%";

  card.appendChild(img);

  layer.appendChild(card);

  gsap.from(card, {
    scale: 0,

    opacity: 0,

    duration: 0.8,

    ease: "back.out(1.8)",
  });

  activeLyrics.push(card);

  floatLyric(card);

  card.addEventListener("click", () => {
    openLyric(card, img.src);
  });
}

function floatLyric(card) {
  gsap.to(card, {
    x: gsap.utils.random(-70, 70),

    y: gsap.utils.random(-70, 70),

    rotation: "+=" + gsap.utils.random(-8, 8),

    duration: gsap.utils.random(6, 10),

    ease: "sine.inOut",

    repeat: -1,

    yoyo: true,
  });
}

function showContinueButton() {
  const btn = document.getElementById("bouquetContinueBtn");

  btn.disabled = true;

  btn.style.cursor = "not-allowed";

  btn.style.opacity = "0.55";

  gsap.to(btn, {
    opacity: 1,
    duration: 1,
    delay: 2.5,
  });
}

function showLyricHint() {
  const hint = document.getElementById("lyricHint");

  if (!hint) return;

  gsap.killTweensOf(hint);

  gsap.set(hint, {
    opacity: 0,
    y: 20,
  });

  gsap.to(hint, {
    opacity: 1,
    y: 0,
    duration: 0.45,
    ease: "back.out(1.7)",
  });

  gsap.to(hint, {
    opacity: 0,
    y: -10,
    delay: 2,
    duration: 0.5,
  });
}

function getRandomPosition() {
  let x, y;

  let tries = 0;

  do {
    x = gsap.utils.random(3, 82);

    y = gsap.utils.random(4, 72);

    tries++;
  } while (tries < 50 && x > 30 && x < 68 && y > 10 && y < 82);

  return { x, y };
}

function openLyric(card, imageSrc) {
  // Stop floating animation
  gsap.killTweensOf(card);

  if (lyricsOpened === 0) {
    lyricsOpened = 1;

    gsap.killTweensOf("#lyricHint");

    gsap.set("#lyricHint", {
      opacity: 0,
      display: "none",
    });

    const btn = document.getElementById("bouquetContinueBtn");

    btn.disabled = false;

    btn.style.cursor = "pointer";

    btn.style.opacity = "1";

    gsap.fromTo(
      btn,
      {
        scale: 1,
      },
      {
        scale: 1.12,
        duration: 0.25,
        repeat: 1,
        yoyo: true,
      },
    );
  }

  const popup = document.getElementById("lyrics-popup");

  const popupImg = document.querySelector("#lyrics-popup img");

  popupImg.src = imageSrc;

  popup.style.display = "flex";

  // Get current card position
  const rect = card.getBoundingClientRect();

  // Start popup from same position
  gsap.set(popupImg, {
    position: "fixed",
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  });

  gsap.fromTo(popup, { opacity: 0 }, { opacity: 1, duration: 0.3 });

  gsap.to(popupImg, {
    left: "50%",
    top: "50%",
    xPercent: -50,
    yPercent: -50,
    width: "auto",
    height: "78vh",
    duration: 0.6,
    ease: "power3.out",
  });

  popup.onclick = () => closeLyric(card);
}

function closeLyric(card) {
  const popup = document.getElementById("lyrics-popup");
  const popupImg = document.querySelector("#lyrics-popup img");

  const rect = card.getBoundingClientRect();

  gsap.to(popupImg, {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    xPercent: 0,
    yPercent: 0,
    duration: 0.45,
    ease: "power2.in",

    onComplete: () => {
      popup.style.display = "none";

      if (lyricsOpened === 1) {
        gsap.set("#lyricHint", {
          display: "block",
          opacity: 0,
        });
      }

      gsap.to(card, {
        opacity: 0,
        scale: 0.4,
        duration: 0.35,

        onComplete: () => {
          card.remove();

          spawnLyric();
        },
      });
    },
  });
}

function transitionToLetterScreen() {
  const tl = gsap.timeline();

  // Fade lyrics
  tl.to(".lyric-card", {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    stagger: 0.03,
  });

  // Fade petals
  tl.to(
    "#petal-layer",
    {
      opacity: 0,
      duration: 0.5,
    },
    "<",
  );

  // Fade bouquet
  tl.to(
    "#bouquet",
    {
      scale: 0.8,
      opacity: 0,
      duration: 0.7,
    },
    "<",
  );

  // Fade continue button
  tl.to(
    "#bouquetContinueBtn",
    {
      opacity: 0,
      duration: 0.4,
    },
    "<",
  );

  // Fade whole screen
  tl.to("#bouquet-screen", {
    opacity: 0,
    duration: 0.8,
  });

  tl.call(() => {
    document.getElementById("bouquet-screen").style.display = "none";

    document.getElementById("confetti-layer").style.display = "none";

    // NEXT SCREEN
    showLetterScreen();
  });
}

function showLetterScreen() {
  document.getElementById("letter-screen").style.display = "flex";
}
