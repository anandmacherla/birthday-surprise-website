let bgMusic = null;

window.addEventListener("DOMContentLoaded", () => {
    bgMusic = document.getElementById("bgMusic");

    if (!bgMusic) {
        console.log("Audio element not found");
        return;
    }

    bgMusic.volume = 1;
    bgMusic.loop = true;

    document.addEventListener("click", () => {
        bgMusic.currentTime = 0;
        bgMusic.play().catch(() => {});
    }, { once: true });
});

document.addEventListener(
  "click",
  () => {
    if (bgMusic.paused) {
      bgMusic.play();
    }
  },
  { once: true },
);
