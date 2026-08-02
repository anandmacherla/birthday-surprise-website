let envelopeOpened = false;

function showLetterScreen() {
  envelopeOpened = false;

  document.getElementById("envelopeClosed").style.pointerEvents = "auto";

  const screen = document.getElementById("letter-screen");

  const envelope = document.getElementById("envelopeClosed");

  envelope.onclick = openEnvelope;

  envelope.style.pointerEvents = "auto";

  screen.style.display = "flex";

  // Reset everything

  gsap.set("#letter-screen", {
    opacity: 0,
  });

  gsap.set("#letterBg", {
    opacity: 0,
  });

  gsap.set("#letterTitle", {
    opacity: 0,
    y: -40,
  });

  gsap.set("#envelopeWrapper", {
    opacity: 0,
    y: 220,
    scale: 1,
  });

  gsap.set("#tapHint", {
    opacity: 0,
  });

  gsap.set("#letterPaper", {
    display: "block",
    opacity: 0,
    scale: 0.6,
    xPercent: -50,
    yPercent: -50,
  });

  gsap.set("#heartPin", {
    opacity: 0,
    y: -30,
  });

  gsap.set("#bunny", {
    opacity: 0,
    scale: 0.6,
  });

  gsap.set("#typedLetter", {
    opacity: 0,
  });

  gsap
    .timeline()

    .to("#letter-screen", {
      opacity: 1,
      duration: 0.5,
    })

    .to("#letterBg", {
      opacity: 1,
      duration: 1.2,
    })

    .to("#letterTitle", {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })

    .to("#envelopeWrapper", {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "back.out(1.7)",
    })

    .to("#tapHint", {
      opacity: 1,
      duration: 0.5,
    })

    .call(() => {
      gsap.to("#tapHint", {
        opacity: 1,

        duration: 0.5,
      });
    })

    .call(() => {
      gsap.to("#envelopeWrapper", {
        scale: 1.02,

        duration: 1.4,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut",
      });
    });
}

function openEnvelope() {
  if (envelopeOpened) return;

  envelopeOpened = true;

  gsap.killTweensOf("#envelopeWrapper");

  document.getElementById("envelopeClosed").style.pointerEvents = "none";

  // Show paper
  gsap.set("#letterPaper", {
    display: "block",
    opacity: 0,
    scale: 0.6,
    xPercent: -50,
    yPercent: -50,
  });

  const tl = gsap.timeline();

  // Small bounce

  tl.to("#tapHint", {
    opacity: 0,
    duration: 0.3,
  });

  tl.to("#envelopeWrapper", {
    scale: 1.04,
    duration: 0.18,
  });

  tl.to("#envelopeWrapper", {
    scale: 1,
    duration: 0.18,
  });

  // Fade out the entire envelope

  tl.to("#envelopeWrapper", {
    opacity: 0,

    scale: 0.9,

    duration: 0.3,

    ease: "power2.inOut",
  });

  tl.to("#letterPaper", {
    opacity: 1,
    scale: 1,
    xPercent: -50,
    yPercent: -50,
    duration: 0.8,
  });

  // Start typing

  tl.to("#heartPin", {
    opacity: 1,

    y: 0,

    duration: 0.35,
  });

  tl.to(
    "#bunny",
    {
      opacity: 1,

      scale: 1,

      duration: 0.35,
    },
    "<",
  );

  tl.call(() => {
    startLetterTyping();
  });
}

function startLetterTyping() {
  const typed = document.getElementById("typedLetter");

  typed.innerHTML = "";

  typed.style.opacity = 1;

  const message = `Dear Keerthi...❤️,

Happy Birthday to someone truly special! 🎂

You are sweet, loyal, my rock, and I am so grateful to have you in my life.

You bring so much happiness wherever you go.

Thank you for being YOU.

❤️`;

  let i = 0;

  const timer = setInterval(() => {
    typed.textContent += message.charAt(i);

    i++;

    autoGrowPaper();

    if (i >= message.length) {
      clearInterval(timer);

      showContinueButton();

      document.getElementById("letterContinueBtn").onclick = function () {
        closeLetterScreen();
      };
    }
  }, 35);
}

function autoGrowPaper() {
  const paper = document.getElementById("letterPaper");
  const paperImage = document.getElementById("paperImage");
  const typed = document.getElementById("typedLetter");

  const newHeight = Math.max(720, typed.scrollHeight + 180);

  paper.style.height = newHeight + "px";
  paperImage.style.height = newHeight + "px";
}

function showContinueButton() {
  const btn = document.getElementById("letterContinueBtn");

  btn.style.pointerEvents = "auto";

  gsap.fromTo(
    btn,

    {
      opacity: 0,

      y: 40,

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
}

function closeLetterScreen() {
  const tl = gsap.timeline();

  tl.to("#letterPaper", {
    opacity: 0,

    scale: 0.85,

    duration: 0.6,
  })

    .to(
      "#letterTitle",
      {
        opacity: 0,

        y: -30,

        duration: 0.5,
      },
      "<",
    )

    .to(
      "#letterBg",
      {
        opacity: 0,

        duration: 0.7,
      },
      "<",
    )

    .call(() => {
      document.getElementById("letter-screen").style.display = "none";

      showGalleryScreen();
    });
}
