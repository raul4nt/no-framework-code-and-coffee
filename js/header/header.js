$(function () {
  // --- LÓGICA DO MENU SIDEBAR (HAMBÚRGUER) ---
  const $sidebarToggle = $('#sidebarToggle');
  const $closeSidebarBtn = $('#closeSidebar');
  const $sidebar = $('#sidebar');
  const $sidebarOverlay = $('#sidebarOverlay');
  const $body = $('body');

  function openSidebar() {
    $sidebar.addClass('active');
    $sidebarOverlay.addClass('active');
    $body.addClass('sidebar-active');
  }

  function closeSidebar() {
    $sidebar.removeClass('active');
    $sidebarOverlay.removeClass('active');
    $body.removeClass('sidebar-active');
  }

  $sidebarToggle.on('click', function(e) {
    e.stopPropagation();
    openSidebar();
  });

  $closeSidebarBtn.on('click', function() {
    closeSidebar();
  });

  $sidebarOverlay.on('click', function() {
    closeSidebar();
  });

  // --- LÓGICA DA BARRA DE BUSCA ---
  const $searchToggle = $('#searchToggle');
  const $searchBar = $('#searchBar');

  $searchToggle.on('click', function (e) {
    e.stopPropagation(); // Impede que o clique feche o menu imediatamente
    $searchBar.toggleClass('active');
  });

  // Fecha a busca se clicar fora dela
  $(document).on('click', function (e) {
    if (!$searchBar.is(e.target) && $searchBar.has(e.target).length === 0 && !$searchToggle.is(e.target) && $searchToggle.has(e.target).length === 0) {
      $searchBar.removeClass('active');
    }
  });
});
