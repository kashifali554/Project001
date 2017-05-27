var products = [];

$(document).ready(function() {
  $.ajax({
    method: 'GET',
    url: '/api/products',
    success: function onSuccess(products) {
      products.forEach(function(product){
        renderProduct(product);
      });
      editForm();
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
      url: '/api/products/' + $(this).attr('data-id'),
      success: deleteProductSuccess,
      error: deleteProductError
    });
  });

  $saleitems.on('click', '.update-product', function() {
    $(this).parent().children('form').show()
  });
});

function editForm() {
  $('form').on('submit', function(ev) {
    ev.preventDefault();
    $.ajax({
      method: 'PUT',
      url: '/api/products/' + $(this).attr('data-id'),
      data: $(this).serialize(),
      success: updateProductSuccess,
      error: updateProductError
    });
    location.reload();
  });
};

function updateProductSuccess (req) {
  var productId = req._id;
  var updateProductIndex = products.findIndex(function(element, index) {
    return (parseInt(element._id) === parseInt(req._id)); //params are strings
  });
  var productToUpdate = products[updateProductIndex];
  products.splice(updateProductIndex, 1, req);
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
     `<div style=display:inline-block><img id="img" src=${product.image}><p>\$${product.price} ${product.description}</p>
        <button type="button" class="btn btn-primary update-product">Edit</button>
        <button type="button" class="delete-product btn btn-danger" data-id=${product._id}>Delete</button>
          <form data-id=${product._id} hidden>
            Image URL:<br>
            <input type="text" name="image">
            <br>
            Price:<br>
            <input type="text" name="price">
            <br>
            Description:<br>
            <textarea id="description" name="description"></textarea>
            <br>
            <input type="submit" />
          </form>
      </div>`);
   $('#saleitems').prepend(templateHtml);
  } else {
    var templateHtml = (
      `<div style=display:inline-block><img src=${product.image}><p>\$${product.price} ${product.description.slice(0, 30) + '...'}</p>
        <button type="button" class="delete-product btn btn-danger" data-id=${product._id}>Delete</button>
        <button type="button" class="btn btn-primary update-product">Edit</button>
        <form data-id=${product._id} hidden>
           <fieldset>
              Image URL:<br>
              <input type="text" name="image">
              <br>
              Price:<br>
              <input type="text" name="price">
              <br>
              Description:<br>
              <textarea id="description" name="description"></textarea>
              <br>
              <input type="submit" />
           </fieldset>
          </form>
      </div>`);
    $('#saleitems').prepend(templateHtml);
  }
}
