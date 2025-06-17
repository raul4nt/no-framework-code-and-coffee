$(function () {
  const $track = $('.carousel-track');
  const $slides = $track.children();
  const $prevButton = $('.carousel-button-left');
  const $nextButton = $('.carousel-button-right');

  const slideWidth = $slides.outerWidth(true); // largura + margin

  let currentIndex = 0;

  function moveToSlide(index) {
    if (index < 0) index = $slides.length - 1;
    if (index >= $slides.length) index = 0;
    $track.css('transform', 'translateX(-' + (slideWidth * index) + 'px)');
    currentIndex = index;
  }

  $prevButton.on('click', function () {
    moveToSlide(currentIndex - 1);
  });

  $nextButton.on('click', function () {
    moveToSlide(currentIndex + 1);
  });

  // Autoplay a cada 3.5 segundos
  setInterval(() => {
    moveToSlide(currentIndex + 1);
  }, 3500);
});
