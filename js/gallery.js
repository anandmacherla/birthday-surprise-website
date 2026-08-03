const galleryImages = [
  {
    image: "assets/images/gallery/1.jpg",
    text: "A little princess whose smile could brighten the whole world. 👑❤️",
  },

  {
    image: "assets/images/gallery/2.jpg",
    text: "Some smiles are born to stay beautiful forever. 😊",
  },

  {
    image: "assets/images/gallery/3.jpg",
    text: "Childhood memories... pure, innocent and priceless. 🌸",
  },

  {
    image: "assets/images/gallery/4.jpg",
    text: "Every tiny step was leading you towards this beautiful journey. ✨",
  },

  {
    image: "assets/images/gallery/5.jpg",
    text: "From cute little moments to countless beautiful memories. 💕",
  },

  {
    image: "assets/images/gallery/6.jpg",
    text: "Family... where every beautiful story begins. ❤️",
  },

  {
    image: "assets/images/gallery/7.jpg",
    text: "A smile that only became more beautiful with time. 🌷",
  },

  {
    image: "assets/images/gallery/8.jpg",
    text: "Your happiness has always been the most precious thing. 🌼",
  },

  {
    image: "assets/images/gallery/9.jpg",
    text: "Growing up gracefully, yet keeping the same beautiful heart. 🌹",
  },

  {
    image: "assets/images/gallery/10.jpg",
    text: "Every picture tells a story... yours always completes me as Family. 😊",
  },

  {
    image: "assets/images/gallery/11.jpg",
    text: "A beautiful soul inside and out. 💖",
  },

  {
    image: "assets/images/gallery/12.jpg",
    text: "One smile... and suddenly my whole world felt brighter. ☀️❤️",
  },

  {
    image: "assets/images/gallery/13.jpg",
    text: "Somewhere along the way, our paths became one. 🤍",
  },

  {
    image: "assets/images/gallery/14.jpg",
    text: "Every moment spent with you becomes my favorite memory. 🥰",
  },

  {
    image: "assets/images/gallery/15.jpg",
    text: "No matter where we are... being with you always feels like home. 🏡",
  },

  {
    image: "assets/images/gallery/16.jpg",
    text: "Every laugh, every conversation... forever close to my heart. 💞",
  },

  {
    image: "assets/images/gallery/17.jpg",
    text: "Thank you for filling my life with countless beautiful memories. 🌺",
  },

  {
    image: "assets/images/gallery/18.jpg",
    text: "With you, ordinary days become extraordinary memories. 💫",
  },

  {
    image: "assets/images/gallery/19.jpg",
    text: "Every journey feels magical when you're beside me. 🌍❤️",
  },

  {
    image: "assets/images/gallery/20.jpg",
    text: "Every picture reminds me how lucky I am to have you. 📸💕",
  },

  {
    image: "assets/images/gallery/21.jpg",
    text: "My today, my tomorrow... and every tomorrow after that. ❤️",
  },

  {
    image: "assets/images/gallery/22.jpg",
    text: "Happy Birthday, Keerthi. Thank you for being the most beautiful chapter of my life. I Love You Forever. ❤️🎂",
  },
];

/*==========================================
        GALLERY SCREEN
==========================================*/

const galleryScreen = document.getElementById("gallery-screen");
const galleryStack = document.getElementById("gallery-stack");
const galleryTitle = document.getElementById("galleryTitle");
const gallerySubtitle = document.getElementById("gallerySubtitle");

let galleryCards = [];
let galleryStarted = false;

/*==========================================
        CREATE GALLERY
==========================================*/

function createGallery() {
  galleryStack.innerHTML = "";

  galleryCards = [];

  currentCard = 0;

  galleryImages.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "gallery-card";

    card.dataset.index = index;

    card.innerHTML = `<img src="${item.image}" draggable="false">`;

    galleryStack.appendChild(card);

    galleryCards.push(card);
  });

  galleryCards.forEach((card, index) => {
    if (index !== 0) {
      gsap.set(card, {
        opacity: 0,
        display: "none",
      });
    }
  });
}

/*==========================================
        SHOW GALLERY
==========================================*/

function showGallery() {
  if (galleryStarted) return;

  galleryStarted = true;

  galleryScreen.style.display = "flex";

  createGallery();

  gsap
    .timeline()

    .to(galleryScreen, {
      opacity: 1,

      duration: 1,
    })

    .to(
      galleryTitle,
      {
        opacity: 1,

        y: 0,

        duration: 0.8,
      },
      "-=.4",
    )

    .to(
      gallerySubtitle,
      {
        opacity: 1,

        y: 0,

        duration: 0.6,
      },
      "-=.5",
    )

    .call(() => {
      document.getElementById("gallery-stack").style.pointerEvents = "auto";

      enableGalleryClick();

      showNextCard();
    });
}

/*==========================================
        FINISH
==========================================*/

function galleryFinished() {
  confetti({
    particleCount: 250,
    spread: 120,
    origin: { y: 0.6 },
  });

  gsap.to("#gallery-screen", {
    opacity: 0,
    duration: 1,
    onComplete() {
      document.getElementById("gallery-screen").style.display = "none";

      const finalScreen = document.getElementById("final-screen");

      finalScreen.style.display = "flex";

      gsap.fromTo(
        finalScreen,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
        },
      );
    },
  });
}

/*==========================================
        IMAGE PRELOAD
==========================================*/

function preloadGallery() {
  galleryImages.forEach((item) => {
    const img = new Image();

    img.src = item.image;
  });
}

preloadGallery();

let currentCard = 0;

function enableGalleryClick() {
  const stack = document.getElementById("gallery-stack");

  stack.onclick = null;

  stack.onclick = () => {
    if (currentCard >= galleryCards.length) return;

    const card = galleryCards[currentCard];

    gsap
      .timeline()

      .to(card, {
        scale: 1.03,
        duration: 0.12,
      })

      .to(card, {
        x: -420,
        rotation: -18,
        opacity: 0,
        duration: 0.55,
        ease: "power3.in",
      })

      .call(() => {
        card.style.display = "none";

        gsap.to("#gallery-caption", {
          opacity: 0,
          duration: 0.2,
        });

        currentCard++;

        showNextCard();
      });
  };
}

function showNextCard() {
  if (currentCard >= galleryCards.length) {
    galleryFinished();

    return;
  }

  const card = galleryCards[currentCard];

  const caption = document.getElementById("gallery-caption");

  caption.innerHTML = galleryImages[currentCard].text;

  gsap.set(caption, {
    opacity: 0,
    y: 20,
  });

  gsap.to(caption, {
    opacity: 1,
    y: 0,
    duration: 0.5,
  });

  card.style.display = "flex";

  gsap.set(card, {
    opacity: 0,
    scale: 0.92,
    y: 20,
  });

  gsap.to(card, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.6,
  });
}

const restartBtn = document.getElementById("restart-btn");

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    location.reload();
  });
}
