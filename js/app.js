const bgMusic = document.getElementById("bgMusic");

function startBackgroundMusic() {
  if (!bgMusic) return;

  bgMusic.volume = 0;

  bgMusic.play().catch(() => {
    console.log("Waiting for user interaction...");
  });

  let volume = 0;

  const fade = setInterval(() => {
    volume += 0.05;

    bgMusic.volume = Math.min(volume, 0.45);

    if (volume >= 0.45) {
      clearInterval(fade);
    }
  }, 200);
}

document.addEventListener(
  "click",
  () => {
    if (bgMusic.paused) {
      bgMusic.play();
    }
  },
  { once: true },
);
