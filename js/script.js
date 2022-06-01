'use strict';
const slides = document.querySelectorAll('.gallery__slide');
const allPhotos = document.querySelectorAll('.gallery__img');

const activateSlider = function () {
	const btnRight = document.querySelector('.gallery__btn--right');
	const btnLeft = document.querySelector('.gallery__btn--left');

	let curSlide = 0;
	const maxSlide = slides.length;

	const goToSlide = function (slide) {
		slides.forEach((s, i) => {
			s.style.transform = `translateX(${(i - slide) * 100}%)`;
		});
	};

	goToSlide(0);

	const nextSlide = function () {
		if (curSlide === maxSlide - 1) {
			curSlide = 0;
		} else {
			curSlide++;
		}

		goToSlide(curSlide);
	};

	const prevSlide = function () {
		if (curSlide === 0) {
			curSlide = maxSlide - 1;
		} else {
			curSlide--;
		}
		goToSlide(curSlide);
	};

	btnRight.addEventListener('click', function () {
		nextSlide();
	});

	btnLeft.addEventListener('click', function () {
		prevSlide();
	});
};
activateSlider();
