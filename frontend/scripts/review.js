const stars = document.querySelectorAll('.stars');
const flightBtn = document.getElementById('flight-btn');
const airlineBtn = document.getElementById('airline-btn');


flightBtn.addEventListener("click", () => toggleVisibilityforpopUp(true));
airlineBtn.addEventListener("click", () => toggleVisibilityforpopUp(false));

stars.forEach(star => {
  star.addEventListener('click', () => {
    const rating = parseInt(star.getAttribute('data-rating'));
    highlightStars(rating);
  });
});

const highlightStars = (rating) => {
  stars.forEach(star => {
    const starRating = parseInt(star.getAttribute('data-rating'));
    if (starRating <= rating) {
      star.style.color = '#2F3E46';
    } else {
      star.style.color = '#ADB5BD';
    }
  });
}

const toggleVisibilityforpopUp = (showProfile) => {
  flightBtn.classList.toggle("primary-bg", showProfile);
  airlineBtn.classList.toggle("primary-bg", !showProfile);
  flightBtn.classList.toggle("onclick-nav-bg", !showProfile);
  airlineBtn.classList.toggle("onclick-nav-bg", showProfile);
};
const addReviewButton = document.getElementById('add-review-btn');
const reviewPopup = document.getElementById('review-popup');

addReviewButton.addEventListener('click', function() {
  reviewPopup.style.display = 'block';
});
