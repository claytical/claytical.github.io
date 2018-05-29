function initializeGrid() {
  $("#content").load("grid.html", function() {
    $( ".project" ).hover(
      function() {
        $(this).children('.is-image').hide();
        $(this).children('.title').show();
    },
      function() {
        $(this).children('.is-image').show();
        $(this).children('.title').hide();
    });
    
  });
}

function initializeImageGalleries() {
$(".slick").slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 2000,       
      });
}

function init(page) {
  $("#content").load("projects/" + page.replace('#', '') + ".html", function() {
    $(".project, #projects a").click(
    function() {
  //    $('.project').hide();
  //    $('.project-description').hide();

      var projectName = $(this).attr('href');
  //    $(projectName).show();
      $('a').removeClass("is-active");
      $( "a[href='"+projectName+"']" ).addClass("is-active");
      $("#content").load("projects/" + projectName.replace('#','') + ".html");

    });

  });

}

$(function() {
  if(window.location.hash != "") {
    init(window.location.hash);
  }
  else {
    init("hello");
  }
});

