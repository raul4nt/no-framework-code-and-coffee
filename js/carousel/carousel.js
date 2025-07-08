$(function () {
  const $carousel = $('.carousel');
  const $track = $carousel.find('.carousel-track');
  let $slides = $track.children();

  // Se não houver slides, não faz nada
  if ($slides.length === 0) {
    return;
  }

  const $prevButton = $carousel.find('.carousel-button-left');
  const $nextButton = $carousel.find('.carousel-button-right');

  let currentIndex;
  let isMoving = false; // Flag para evitar cliques múltiplos durante a animação
  let autoplayInterval = null;
  const AUTOPLAY_SPEED = 4000;

  // Função para configurar ou reconfigurar o carrossel
  function setupCarousel() {
    // Limpa clones e estilos antigos antes de reconfigurar
    $track.css('transition', 'none');
    $slides.filter('.is-clone').remove();
    $slides = $track.children(); // Re-seleciona os slides originais

    const slideWidth = $slides.first().outerWidth(true);
    const visibleSlides = Math.floor($carousel.find('.carousel-track-container').width() / slideWidth);

    // Se todos os slides já são visíveis, desativa o carrossel
    if ($slides.length <= visibleSlides) {
      $prevButton.hide();
      $nextButton.hide();
      clearInterval(autoplayInterval);
      return;
    } else {
      $prevButton.show();
      $nextButton.show();
    }

    // --- A MÁGICA DO CLONE ---
    // Clona os últimos slides para o início
    const clonesEnd = $slides.slice(-visibleSlides).clone().addClass('is-clone');
    $track.prepend(clonesEnd);

    // Clona os primeiros slides para o fim
    const clonesStart = $slides.slice(0, visibleSlides).clone().addClass('is-clone');
    $track.append(clonesStart);

    // Atualiza a referência para incluir os clones
    $slides = $track.children();

    // Ponto inicial: o primeiro slide *original*
    currentIndex = visibleSlides;

    // Move para a posição inicial sem animação
    const initialOffset = -$slides.eq(currentIndex).position().left;
    $track.css('transform', 'translateX(' + initialOffset + 'px)');
  }

  function move(direction) {
    if (isMoving) return;
    isMoving = true;

    // Adiciona a transição que foi removida
    $track.css('transition', 'transform 0.5s ease');

    // Move para o próximo ou anterior
    currentIndex += direction;

    const offset = -$slides.eq(currentIndex).position().left;
    $track.css('transform', 'translateX(' + offset + 'px)');

    resetAutoplay();
  }

  // --- O CONTROLE DO LOOP INFINITO ---
  $track.on('transitionend', function () {
    const visibleSlides = Math.floor($carousel.find('.carousel-track-container').width() / $slides.first().outerWidth(true));

    // Se chegou nos clones do fim, salta para os slides originais do início
    if (currentIndex >= $slides.length - visibleSlides) {
      $track.css('transition', 'none');
      currentIndex = visibleSlides;
      const offset = -$slides.eq(currentIndex).position().left;
      $track.css('transform', 'translateX(' + offset + 'px)');
    }

    // Se chegou nos clones do início, salta para os slides originais do fim
    if (currentIndex < visibleSlides) {
      $track.css('transition', 'none');
      currentIndex = $slides.length - (2 * visibleSlides);
      const offset = -$slides.eq(currentIndex).position().left;
      $track.css('transform', 'translateX(' + offset + 'px)');
    }

    isMoving = false;
  });

  // --- AUTOPLAY ---
  function startAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => move(1), AUTOPLAY_SPEED);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // --- EVENTOS DE CLIQUE E RESIZE ---
  $nextButton.on('click', () => move(1));
  $prevButton.on('click', () => move(-1));

  $(window).on('resize', function () {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(function () {
      setupCarousel();
      startAutoplay();
    }, 250);
  });

  // --- INICIALIZAÇÃO ---
  setupCarousel();
  startAutoplay();
});
