const profile = document.getElementById("profile-section");
const booking = document.getElementById("booking-section");
const profileBtn = document.getElementById("profile-btn");
const bookingBtn = document.getElementById("booking-btn");

const toggleVisibility = (showProfile) => {
  profile.style.display = showProfile ? "block" : "none";
  booking.style.display = showProfile ? "none" : "block";
  profileBtn.classList.toggle("primary-bg", showProfile);
  bookingBtn.classList.toggle("primary-bg", !showProfile);
  profileBtn.classList.toggle("onclick-nav-bg", !showProfile);
  bookingBtn.classList.toggle("onclick-nav-bg", showProfile);
};

profileBtn.addEventListener("click", () => toggleVisibility(true));
bookingBtn.addEventListener("click", () => toggleVisibility(false));
