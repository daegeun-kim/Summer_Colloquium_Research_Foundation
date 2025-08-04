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