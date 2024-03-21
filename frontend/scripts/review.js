const stars = document.querySelectorAll('.stars');

stars.forEach(star => {
  star.addEventListener('click', () => {
    const rating = parseInt(star.getAttribute('data-rating'));
    highlightStars(rating);
  });
});

function highlightStars(rating) {
  stars.forEach(star => {
    const starRating = parseInt(star.getAttribute('data-rating'));
    if (starRating <= rating) {
      star.style.color = '#ffd700';
    } else {
      star.style.color = '#ccc';
    }
  });
}