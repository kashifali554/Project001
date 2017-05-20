var products = [];

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
  $saleitems = $('#saleitems');
  $saleitems.on('click', '.delete-product', function() {
    console.log('clicked delete button to', '/api/products/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/products/'+$(this).attr('data-id'),
      success: deleteProductSuccess,
      error: deleteProductError
    });
  });

  $saleitems.on('click', '.update-product', function() {
    console.log('clicked update button to', '/api/products/'+$(this).attr('data-id'));
    $.ajax({
      method: 'PUT',
      url: '/api/products/'+$(this).attr('data-id'),
      success: updateProductSuccess,
      error: updateProductError
    });
  });

});

function updateProductSuccess (req, res) {
  console.log('product update', req.params);
  var productId = req.params.id;
  var updateProductIndex = products.findIndex(function(element, index) {
    return (element._id === parseInt(req.params.id)); //params are strings
  });
  console.log('updating product with index', updateProductIndex);
  var productToUpdate = products[updateProductIndex];
  products.splice(updateProductIndex, 1, req.params);
}

function updateProductError() {
  console.log('update product error!');
}

function deleteProductSuccess(json) {
  var product = json;
  console.log(json);
  console.log('delete product', product._id);
  for(var index = 0; index < products.length; index++) {
    if(products[index]._id === product._id) {
      products.splice(index, 1);
      break;
    }
  }
  location.reload();
}

function deleteProductError() {
  console.log('delete product error!');
}

function renderProduct(product) {
  if (product.description.length < 30) {
   var templateHtml = (
     `<div style=display:inline-block><img id="img" src=${product.image}><p>\$${product.price} ${product.description}</p><button type="button" class="delete-product btn btn-danger" data-id=${product._id}>Delete</button>
      <button type="button" class="btn btn-primary update-product" data-id=${product._id}>Edit</button></div>`);
   $('#saleitems').prepend(templateHtml);
  } else {
    var templateHtml = (
      `<div style=display:inline-block><img src=${product.image}><p>\$${product.price} ${product.description.slice(0, 30) + '...'}</p><button type="button" class="delete-product btn btn-danger" data-id=${product._id}>Delete</button>
      <button type="button" class="btn btn-primary update-product" data-id=${product._id}>Edit</button></div>`);
    $('#saleitems').prepend(templateHtml);
  }
}
