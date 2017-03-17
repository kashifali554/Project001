$(document).ready(function() {
  console.log('app.js loaded!');


  $('#saleitems').on('click', '.product', handleImageClick);
  //Show single product on image click
    function handleImageClick(e) {
    var currentProductId = $(this);
    $('#productModal').data('product-id', currentProductId);
    $('#productModal').modal();  // display the modal!
    // make an ajax request for one single product
    $.ajax({
      url: '/api/products/' + currentProductId, // ADD THE ID YOU CAPTURED HERE,
      method: 'GET',
      success: renderOneProduct(currentProductId)    
      });
    // append product information into this open modal.
      function renderOneProduct(product){
      console.log("This is product ", product);
      $('#show-one').append(product);
      $(".modal").on("hidden.bs.modal", function(){
      $("#show-one").empty();
        location.reload();
      });
    }

    $('.delete-product').on('click', function handleDeleteClick(e){
      e.preventDefault();
    // var productId = $(this);
    var productId = $('.product').data('product-id');
      // console.log(currentProductId);
    console.log("the product ID found to delete is: ", productId);
    $.ajax({
      url: '/api/products/' + productId,
      method: 'DELETE',
      success: handleDeleteProductSuccess(productId)
      });
  // callback after DELETE /api/products/:id
    function handleDeleteProductSuccess(productId) {
    $('#show-one').remove();
    location.reload();
      }// end of handleDeleteProductSuccess

    }); //end of handleDeleteClick

  //   //handle edit click
  //   $('.btn-primary').on('click', function handleEditClick(e){
  //     e.preventDefault();
  //   var editProduct = $('.product').data('product-id');


  //   // show the save changes button
  //   $albumRow.find('.save-album').toggleClass('hidden');
  //   // hide the edit button
  //   $albumRow.find('.edit-album').toggleClass('hidden');


  //   console.log("the product ID to edit is: ", editProduct);
  //   // $.ajax({
  //   //   url: '/api/products/' + editProduct,
  //   //   method: 'DELETE',
  //   //   success: handleEditProductSuccess(editProduct)
  //   //   });
  // // callback after edit /api/products/:id
  //   function handleEditProductSuccess(editProduct) {
  //   // $('#show-one').remove();
  //   //   location.reload();
  //     }// end of handleDeleteProductSuccess
  //   }); 

  }//end handle image click function.


  //Show all products
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

  // CREATE NEW PRODUCT
  $('#singlebutton').on('click', function(ev) {
    ev.preventDefault();
    var formData = {
        image: $('#image').val(),
        price: $('#price').val(),
        description: $('#description').val()
      };
      console.log("BUTTON CLICKED: INFORMATION - " , formData);
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
  console.log(product);
   var templateHtml = (
     `<div style=display:inline-block class="product" data-product-id="${product._id}">
        <img src=${product.image} data-toggle="modal" data-target="#myModal">
        <p>\$${product.price} ${product.description}</p>
    </div>`);

    // console.log(templateHtml);
   $('#saleitems').prepend(templateHtml);
}