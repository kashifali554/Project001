$(document).ready(function() {
  console.log('app.js loaded!');
  // $('.row product').attr('data-product-id');
  $.ajax({
    method: 'GET',
    url: '/api/products',
    success: function onSuccess(products) {
      console.log(products);
      renderProduct(products);
    },
    error: function onError (err) {
      console.log('err: ', err);
    }
  });

  $('.form-group').on('submit', function(ev) {
    ev.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/api/products',
      data: formData,
      success: function onSuccess(product) {
        console.log(product)
        location.reload();
      },
      error: function onError (err) {
        console.log('err: ', err);
      }
    });
  });

});

function renderProduct(products) {
  var html = '';
  products.forEach(function (product) {
    var templateHtml = (
      `<div style=display:inline-block><img src=${product.image}><p>\$${product.price} ${product.description}</p></div>`
      );
    console.log(templateHtml);
    $('#saleitems').append(templateHtml);
  });
}

//     var productHtml = (`
//      <!-- one product -->
//      <div class='row product' data-product-id=${product.title}>
//      <div class='col-md-10 col-md-offset-1'>
//      <div class='panel panel-default'>
//      <div class='panel-body'>
//      <!-- begin product internal row -->
//      <div class='row'>
//      <div class='col-md-3 col-xs-12 thumbnail product-art'>
//      // <img src='../images/800x800.png' alt='product image'>
//      </div>
//      <div class='col-md-9 col-xs-12'>
//      <ul class='list-group'>
//      <li class='list-group-item'>
//      <h4 class='inline-header'>Product title:</h4>
//      <span class='product-name'>${product.title}</span>
//      </li>
//      <li class='list-group-item'>
//      <h4 class='inline-header'>Product price:</h4>
//      <span class='artist-name'>${product.price}</span>
//      </li>
//      <li class='list-group-item'>
//      <h4 class='inline-header'>Product description:</h4>
//      <span class='product-name'>${product.description}</span>
//      </li>
//      <li class="list-group-item">
//      <h4 class="inline-header">Product image</h4>
//      <span class='song-name'>${product.image}</span>
//      </li>
//      </ul>
//      </div>
//      </div>
//      <!-- end of product internal row -->
//      <div class='panel-footer'>
//      <button class='btn btn-primary add-song'>Add Song</button>
//      <button class='btn btn-danger delete-song'>Delete product</button>
//      </div>
//      </div>
//      <div class='panel-footer'>
//      </div>
//      </div>
//      </div>
//      <!-- end one product -->
//      `);
// $('#products').prepend(productHtml);

// });

