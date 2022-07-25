'use strict';

const init = function () {
	launchSlider();
	adaptHeaderColor();
	openMobileMenu();
};

const launchSlider = function () {
	if (!document.querySelector('.main--gallery')) return;
	const slides = document.querySelectorAll('.gallery__slide');
	const allPhotos = document.querySelectorAll('.gallery__img');
	const galleryDots = document.querySelector('.gallery__dots');
	const gallerySlides = Array.from(document.querySelector('.gallery__wrapper').children);
	const maxSlide = gallerySlides.length;

	let curSlide = 0;

	const goToSlide = function (slide) {
		slides.forEach((s, i) => {
			s.style.transform = `translateX(${(i - slide) * 100}%)`;
		});
	};

	const generateSliderDots = function () {
		if (!galleryDots) return;
		for (let i = 0; i < 9; i++) {
			galleryDots.insertAdjacentHTML(
				'beforeend',
				`<button class="btn gallery__dot" data-slide="${
					i + 1 > 4 ? i - 4 + 1 : i + maxSlide - 3
				}">${i + 1 > 4 ? i - 4 + 1 : i + maxSlide - 3}</button>`
			);
		}
	};
	generateSliderDots();

	const galleryDotsElements = Array.from(galleryDots.children);
	const curSlideNumber = galleryDotsElements[4];

	const activateSlider = function () {
		if (!galleryDots) return;

		const btnRight = document.querySelector('.gallery__btn--right');
		const btnLeft = document.querySelector('.gallery__btn--left');

		const setCurSlideNumber = function (slide) {
			curSlideNumber.classList.add('gallery__dot--current');
			curSlideNumber.dataset.slide = curSlideNumber.textContent = slide;
		};

		setCurSlideNumber(1);

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
				setCurSlideNumber(maxSlide);
				curSlide = maxSlide - 1;
			} else {
				curSlide--;
			}
			goToSlide(curSlide);
		};

		btnRight.addEventListener('click', function () {
			galleryDotsElements.forEach(el => {
				if (+el.dataset.slide > maxSlide - 1) {
					el.textContent = 1;
					el.dataset.slide = 1;
				} else {
					el.textContent = +el.textContent + 1;
					el.dataset.slide = +el.dataset.slide + 1;
				}
			});
			nextSlide();
		});

		btnLeft.addEventListener('click', function () {
			galleryDotsElements.forEach(el => {
				if (+el.dataset.slide === 1) {
					el.textContent = maxSlide;
					el.dataset.slide = maxSlide;
				} else {
					el.textContent = +el.textContent - 1;
					el.dataset.slide = +el.dataset.slide - 1;
				}
			});
			prevSlide();
		});
	};

	activateSlider();
};

const adaptHeaderColor = function () {
	const header = document.querySelector('.header');
	const sectionHero = document.querySelector('.hero');
	if (!sectionHero) return;

	const adaptColor = function (entries, observer) {
		const [entry] = entries;

		if (!entry.isIntersecting) {
			header.classList.add('header--light');
		} else {
			header.classList.remove('header--light');
		}
	};

	const observer = new IntersectionObserver(adaptColor, {
		root: null,
		threshold: 0.85,
	});

	observer.observe(sectionHero);
};

const openMobileMenu = function () {
	const header = document.querySelector('.header');
	const nav = document.querySelector('.nav');
	if (!header) return;
	header.addEventListener('click', function (e) {
		if (e.target.closest('.nav__mobile-btn')) {
			nav.classList.toggle('nav--open');
		}
		if (e.target.closest('.nav__link')) {
			nav.classList.remove('nav--open');
		}
	});
};

init();
