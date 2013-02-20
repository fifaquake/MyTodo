function removeActiveClass() {
  $('#home').addClass('active');
  $('#priority_all').removeClass('active');
  $('#priority_1').removeClass('active');
  $('#priority_2').removeClass('active');
  $('#priority_3').removeClass('active');
}

function initializeContent() {
  removeActiveClass();

  // binding the "delete" for ajax
  var allBrandDiv = $('div.brand');
  for (var i = 0; i < allBrandDiv.size() ; i++) {
    var curDiv = allBrandDiv.get(i);
    $('div', curDiv).bind('click', function (event) {
      $(this).parent().parent().remove();
      var toLink = '/deleteitem/' + this.id;
      $.ajax({
        url: toLink,
        dataType: 'jsonp',
        cache: false,
        jsonp: 'callback',
        timeout: 5000,
        success: function (data) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert('error ' + textStatus + ' ' + errorThrown);
        }
      });
    });
    $('div', curDiv).hide();
  }

  $('div.brand').bind('mouseover', function (event) {
    // TODO:Show post
    $('div', this).show();
  });

  $('div.brand').bind('mouseout', function (event) {
    $('div', this).hide();
  });

  // hide the "hideinput", "hideinput is just used to
  // avoid the automatically submit
  $('#hideinput').hide();
  $('#todoinput').bind('keydown', function (event) {
    // enter key is pressed
    if (event.which == '13') {
      var toLink = '/content';
      var todoId = Guid();
      $.ajax({
        url: toLink,
        dataType: 'jsonp',
        cache: false,
        jsonp: 'callback',
        timeout: 5000,
        type: 'POST',
        data: 'todoinput=' + $('#todoinput').val() + '&' + 'todoPriority=' +
          $('#todoPriority').val() + '&' + 'todoId=' + todoId,
        success: function (data) {
          var tileDivStart = null;
          if (data.priority == 1) {
            tileDivStart = '<div class = "tile double bg-color-pink">';
          } else if (data.priority == 2) {
            tileDivStart = '<div class = "tile bg-color-blue">';
          } else {
            tileDivStart = '<div class = "tile bg-color-green">';
          }

          var tileContent = '<div class = "tile-content">' + '<p>' +
            data.content + '</p>' + '</div>';
          var brand = '<div class = "brand">';
          var span = '<span class="win8name">' + data.date + '</span>';

          var divID = null;
          if (data.priority == 1) {
            divID = '<div id =' + data.id +
              ' class="win8badge error bg-color-pink"></div>';
          } else if (data.priority == 2) {
            divID = '<div id =' + data.id +
              ' class="win8badge error bg-color-blue"></div>';
          }
          else {
            divID = '<div id = ' + data.id +
              ' class="win8badge error bg-color-green"></div>';
          }
          var endDiv = '</div>';

          var newDiv = tileDivStart + tileContent + brand + span +
            divID + endDiv + endDiv;
          var curDiv = $('.tile-group').append(newDiv);
          $('#' + data.id, curDiv).bind('click', function (event) {
            $(this).parent().parent().remove();
            var toLink = '/deleteitem/' + this.id;
            $.ajax({
              url: toLink,
              dataType: 'jsonp',
              cache: false,
              jsonp: 'callback',
              timeout: 5000,
              success: function (data) {
              },
              error: function (jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + ' ' + errorThrown);
              }
            });
          });
          $('#' + data.id, curDiv).hide();
          $('div.brand', curDiv).bind('mouseover', function (event) {
            $('div', this).show();
          });
          $('div.brand', curDiv).bind('mouseout', function (event) {
            $('div', this).hide();
          });

        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert('error ' + textStatus + ' ' + errorThrown);
        }
      });

    }
  });
}

$(document).ready(function () {
  initializeContent();
});