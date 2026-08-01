function showLetterScreen() {
  const screen = document.getElementById("letter-screen");

  screen.style.display = "flex";

  gsap.fromTo(
    screen,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1,
    },
  );
}
