$(function () {

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');

  const product = products[productId];

  if (product) {
    document.title = `${product.name} - Code and Coffee`;

    const imagePath = product.image.startsWith('assets') ? `../${product.image}` : product.image;

    $('.product-image-container img').attr('src', imagePath).attr('alt', product.name);
    $('.product-info h1').text(product.name);
    $('.product-info .price').text(product.price);

    const infoParagraphs = $('.product-info p');
    $(infoParagraphs[0]).html(product.description);
    $(infoParagraphs[1]).html(product.ingredients);

  } else {
    $('.product-details-section .container').html(`
      <div class="text-center">
        <h2>Produto não encontrado</h2>
        <p>O produto que você está procurando não existe ou foi removido.</p>
        <a href="/store.html" class="btn btn-dark">Voltar ao Menu</a>
      </div>
    `);
  }
});
