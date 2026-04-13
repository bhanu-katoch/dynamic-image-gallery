$(document).ready(function () {
  // Custom animation: fade + slide together
  $.fn.fadeSlideToggle = function(speed, callback) {
    return this.animate({
      opacity: 'toggle',
      height: 'toggle'
    }, speed, callback);
  };

  function addImage() {
    var url = $('#image-url').val().trim();
    if (!url) {
      alert('⚠️ Please enter an image URL.');
      return;
    }

    var newCard = $(
      '<div class="image-card">' +
        '<img src="' + url + '" alt="Gallery Image" />' +
        '<button class="remove-btn">Remove</button>' +
      '</div>'
    );

    // Apply hybrid animation
    newCard.hide();
    $('#gallery').append(newCard);
    newCard.fadeSlideToggle(1200);

    // Handle image load error
    newCard.find('img').on('error', function () {
      newCard.fadeSlideToggle(1200, function () {
        $(this).remove();
      });
      alert('❌ Invalid image URL.');
    });

    // Zoom effect
    newCard.find('img').on('click', function () {
      $(this).toggleClass('zoomed');
    });

    // Double-click to remove
    newCard.on('dblclick', function () {
      $(this).fadeSlideToggle(1200, function () {
        $(this).remove();
      });
    });

    $('#image-url').val('');
  }

  // Remove with hybrid animation
  function removeImage(button) {
    $(button).closest('.image-card').fadeSlideToggle(1200, function () {
      $(this).remove();
    });
  }

  // Render gallery with hybrid effect
  function renderGallery(imageArray) {
    $('#gallery').empty();
    $.each(imageArray, function (index, url) {
      var $card = $(
        '<div class="image-card">' +
          '<img src="' + url + '" alt="Gallery Image" />' +
          '<button class="remove-btn">Remove</button>' +
        '</div>'
      );
      $('#gallery').append($card);
      $card.hide().fadeSlideToggle(1200);

      $card.find('img').on('click', function () {
        $(this).toggleClass('zoomed');
      });
    });
  }

  // Event Listeners
  $('#add-btn').on('click', addImage);
  $('#image-url').on('keypress', function (e) {
    if (e.which === 13) addImage();
  });
  $('#gallery').on('click', '.remove-btn', removeImage);
  $('#clear-gallery').on('click', function () {
    if ($('.image-card').length === 0) {
      alert('ℹ️ Gallery is already empty.');
      return;
    }
    if (confirm('🗑️ Clear all images?')) {
      $('.image-card').fadeSlideToggle(1200, function () {
        $(this).remove();
      });
    }
  });

  // Initialize zoom
  $('#gallery img').on('click', function () {
    $(this).toggleClass('zoomed');
  });
});   