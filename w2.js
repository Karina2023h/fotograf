let slideIndex = 0;
const slides = document.querySelector(".slides");
const totalSlides = slides.children.length;

document.getElementById("next").addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % totalSlides;
  updateSlidePosition();
});

document.getElementById("prev").addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
});

function updateSlidePosition() {
  slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}
