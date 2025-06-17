document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
  
        const filter = this.getAttribute('data-filter');
  
        productItems.forEach(item => {
          // Usamos uma animação sutil para a transição
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
            // Timeout para garantir que o display mude após a animação de "fade out"
            setTimeout(() => {
              item.style.display = 'block';
            }, 150);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
             setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  });