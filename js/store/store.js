$(function() {
  const productGrid = $('#product-grid');

  if (typeof products === 'undefined' || !productGrid.length) {
    console.error("ERRO: A base de dados 'products.js' não foi carregada ou o container #product-grid não foi encontrado.");
    return;
  }

  function createProductCard(productId, product) {
    const shortDescription = product.description.length > 80 ?
                              product.description.substring(0, 80) + '...' :
                              product.description;

    // A MUDANÇA ESTÁ AQUI: no atributo data-* e na variável usada
    return `
      <div class="col product-item" data-type="${product.type}" style="display: none;">
        <div class="card product-card h-100">
          <div class="card-img-container">
            <img src="${product.image}" class="card-img-top" alt="${product.name}" />
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${shortDescription}</p>
            <div class="mt-auto">
              <p class="price">${product.price}</p>
              <a href="/product-details.html?product=${productId}" class="btn btn-details w-100">Ver detalhes</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderProducts() {
    let allProductsHtml = '';
    for (const productId in products) {
      allProductsHtml += createProductCard(productId, products[productId]);
    }
    productGrid.html(allProductsHtml);
    $('.product-item').fadeIn(400);
  }

  $('.filter-btn').on('click', function() {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    const filter = $(this).data('filter');

    $('.product-item').each(function() {
      // A MUDANÇA ESTÁ AQUI: lendo o data-type em vez de data-category
      if (filter === 'all' || $(this).data('type') === filter) {
        $(this).fadeIn(300);
      } else {
        $(this).fadeOut(300);
      }
    });
  });

  renderProducts();
});