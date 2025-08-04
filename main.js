let currentIndex = 0;
const totalSlides = 5;

document.getElementById("nextBtn").onclick = () => {
    if (currentIndex < totalSlides - 1) currentIndex++;
    updateSlide();
};

document.getElementById("prevBtn").onclick = () => {
    if (currentIndex > 0) currentIndex--;
    updateSlide();
};

function updateSlide() {
    const container = document.querySelector(".slide-container");
    container.style.transform = `translateX(-${currentIndex * 60}vw)`;
}


document.addEventListener("DOMContentLoaded", function () {
  const scrollPercents = [0, 0.13, 0.29, 0.43, 0.56, 0.64, 0.77, 0.93, 0.99]; // 0% to 80% of total scrollable height
    let currentIndex = 0;

    document.addEventListener("keydown", function (e) {
        if (e.code === "Space") {
        e.preventDefault();

        currentIndex++;
        if (currentIndex >= scrollPercents.length) {
            currentIndex = 0; // loop back to the first scroll point
        }

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const target = scrollPercents[currentIndex] * maxScroll;

        window.scrollTo({
            top: target,
            behavior: "smooth"
        });
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
  const scrollPercents = [0, 0.13, 0.29, 0.43, 0.56, 0.64, 0.77, 0.93, 0.99];
  const dotNav = document.getElementById("dot-nav");

  scrollPercents.forEach((percent, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.dataset.index = index;

    // Position the dot within the container based on percent
    dot.style.top = `${percent * 100}%`;

    // On click, scroll to corresponding location
    dot.addEventListener("click", () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const target = percent * maxScroll;
      window.scrollTo({ top: target, behavior: "smooth" });
    });

    dotNav.appendChild(dot);
  });

  // Active dot detection
  window.addEventListener("scroll", () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentPercent = window.scrollY / maxScroll;

    let activeIndex = 0;
    let minDiff = Infinity;

    scrollPercents.forEach((p, i) => {
      const diff = Math.abs(currentPercent - p);
      if (diff < minDiff) {
        minDiff = diff;
        activeIndex = i;
      }
    });

    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === activeIndex);
    });
  });
});

