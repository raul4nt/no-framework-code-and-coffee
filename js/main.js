$(document).ready(function () {
  $('#btn-toggle-sidebar').click(function () {
    $('.sidebar').addClass('active');
    $('.sidebar-overlay').addClass('active');
  });

  $('#btn-close-sidebar, .sidebar-overlay').click(function () {
    $('.sidebar').removeClass('active');
    $('.sidebar-overlay').removeClass('active');
  });
});
