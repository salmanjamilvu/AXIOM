const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = movieSelect.value;

populateUI();

function updateSelectedCount() {
	const countSeats = document.querySelectorAll('.row .seat.selected');
	const seatIndex = [...countSeats].map((seat) => [...seats].indexOf(seat));
	const countSeatsCount = countSeats.length;
	count.innerText = countSeatsCount;
	total.innerText = countSeatsCount*ticketPrice;
	localStorage.setItem('selectedSeates', JSON.stringify(seatIndex))
}

container.addEventListener('click', e => {
	if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
		e.target.classList.toggle('selected');
		updateSelectedCount();
	}
})

function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeates'));
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		})
	}
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

// Set Movie Price in local Storage
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

movieSelect.addEventListener('change', e => {
	ticketPrice = + e.target.value;
	console.log(e.target.selectedIndex, e.target.value)
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
})
updateSelectedCount();