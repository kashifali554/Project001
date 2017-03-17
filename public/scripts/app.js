$(document).ready(function() {
  console.log('app.js loaded!');
  $.ajax({
    method: 'GET',
    url: '/api/products',
    success: function onSuccess(products) {
      console.log(products);
      products.forEach(function(product){
        renderProduct(product);
      });
    },
    error: function onError (err) {
      console.log('err: ', err);
    }
  });

  $('#singlebutton').on('click', function(ev) {
    ev.preventDefault();
    var formData = {
        image: $('#image').val(),
        price: $('#price').val(),
        description: $('#description').val()
      };
    $.ajax({
      method: 'POST',
      url: '/api/products',
      data: formData,
      success: function onSuccess(product) {
        console.log(product)
        renderProduct(product);
      },
      error: function onError (err, d2, d3) {
        console.log('err: ', err);
        console.log('err: ', d2);
        console.log('err: ', d3);
      }
    });
    location.reload();
  });
});

function renderProduct(product) {
  if (product.description.length < 30) {
   var templateHtml = (
     `<div style=display:inline-block><img id="img" src=${product.image}><p>\$${product.price} ${product.description}</p></div>`);
   $('#saleitems').prepend(templateHtml);
  } else {
    var templateHtml = (
      `<div style=display:inline-block><img src=${product.image}><p>\$${product.price} ${product.description.slice(0, 30) + '...'}</p></div>`);
    $('#saleitems').prepend(templateHtml);
  }
}

