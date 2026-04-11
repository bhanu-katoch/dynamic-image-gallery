$(document).ready(function () {

  // 🔷 Add Image
function addImage() {
  var url = $('#image-url').val().trim();
  if (url === '') { alert('⚠️ Please enter an image URL.'); return; }

  var newCard = $(
    '<div class="image-card">' +
      '<img src="' + url + '" alt="Gallery Image" />' +
      '<button class="remove-btn">Remove</button>' +
    '</div>'
  );

  // validate — remove card if image fails to load
  newCard.find('img').on('error', function () {
    newCard.remove();
    alert('❌ Invalid image URL. Please enter a valid image link.');
  });

  $('#gallery').append(newCard);
  $('#image-url').val('');
}

  // 🔷 Remove Image
  function removeImage(button) {
    $(button).closest('.image-card').remove();
  }

  // 🔷 Render Gallery 
  function renderGallery(imageArray) {
    $('#gallery').empty();
    $.each(imageArray, function (index, url) {
      $('#gallery').append(
        '<div class="image-card">' +
          '<img src="' + url + '" alt="Gallery Image" />' +
          '<button class="remove-btn">Remove</button>' +
        '</div>'
      );
    });
  }

  // 🔷 Event Listeners

  // add button click
  $('#add-btn').on('click', function () { addImage(); }); 
  // enter key support                       
  $('#image-url').on('keypress', function (e) { if (e.which === 13) addImage(); }); 
  // delegated remove
  $('#gallery').on('click', '.remove-btn', function () { removeImage(this); });  
  // clear entire gallery
  $('#clear-gallery').on('click', function () {                                  
    if ($('#gallery .image-card').length === 0) { alert('ℹ️ Gallery is already empty.'); return; }
    if (confirm('🗑️ Clear all images?')) $('#gallery').empty();
  });

});
